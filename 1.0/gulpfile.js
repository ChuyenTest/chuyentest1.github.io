// https://css-tricks.com/gulp-for-beginners/
// npm install gulp browser-sync gulp-jade gulp-sass gulp-sass-glob gulp-concat gulp-uglify gulp-jshint gulp-rename
// npm install gulp-autoprefixer gulp-watch gulp-plumber 
// npm install gulp-scss-lint gulp-clean-css gulp-sourcemaps
// npm install critical gulp-imagemin gulp-cache del
// https://stackoverflow.com/questions/38841204/events-js160-throw-er-unhandled-error-event

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade'); 
var sass = require("gulp-sass");
var sassGlob = require('gulp-sass-glob');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var scsslint = require('gulp-scss-lint');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var critical = require('critical').stream;

// Optimizing images
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// Cleaning up generated files automatically
var del = require('del');

// variables
var bases = {
 source: 'source/',
 public: 'public/',
};

var paths = {
  jade: ['jade/*.jade'],
  data: ['jade/data/*.jade'],
  dataJson: ['jade/data/*.json'],
  styles: ['scss/*.scss'],
  stylesCSSLint: ['!scss/vendors/*.scss', '!scss/vendors/**/*.scss', '!scss/reset/*.scss', '!scss/libs/*.scss', 'scss/help/*.scss', 'scss/blocks/*.scss', 'scss/fonts/*.scss', 'scss/pages/*.scss', 'scss/print/*.scss', 'scss/*.scss', 'scss/responsive/style.scss'],
  concatVendorLibsScripts: ['scripts/libs/jquery.min.js', 'scripts/libs/jquery-ui.js', 'scripts/vendors/*.js', 'scripts/libs/plugins/*.js'],
  PluginsScripts: ['scripts/site.js', 'scripts/plugins/*.js'],
  images: ['assets/images/*'],
  assets: ['assets/**/**/*'],
};

// Delete the public folder directory and Cleaning up generated files automatically
gulp.task('clean', function() {
  return del.sync(bases.public);
});

function logError(err) {
    if (err.file) {
        console.log("File ==>", err.file);
    }

    if (err.fileName) {
        console.log("File ==>", err.fileName);
    }

    if (err.line) {
        console.log("Line ==>", err.line);
    }

    if (err.lineNumber) {
        console.log("Line ==>", err.lineNumber);
    }

    if (err.message) {
        console.log("Full message ==>", err.message);
    }
}

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: bases.public
        }
    });
});

gulp.task('browserSync-resume', function () {
    browserSync.resume();
});

gulp.task('jade', function () {
    return gulp.src(paths.jade, {cwd: bases.source})
                .pipe(jade({
                    pretty: '  '
                }))
                .on('error', function (err) {
                    browserSync.pause();
                    browserSync.notify('<div style="color:red">JADE FAIL</div>', 30000);
                    console.log('**********************JADE FAIL**********************');
                    logError(err);
                })
                .pipe(gulp.dest(bases.public))
                .pipe(browserSync.stream());
});
gulp.task('data', function () {
    return gulp.src(paths.data, {cwd: bases.source})
                .pipe(jade({
                    pretty: '  '
                }))
                .on('error', function (err) {
                    browserSync.pause();
                    browserSync.notify('<div style="color:red">DATA FAIL</div>', 30000);
                    console.log('**********************DATA FAIL**********************');
                    logError(err);
                })
                .pipe(gulp.dest(bases.public + 'data/'))
                .pipe(browserSync.stream());
});

gulp.task('scss-lint', function () {
    return gulp.src(paths.stylesCSSLint, {cwd: bases.source})
               .pipe(scsslint({'config': 'SCSS-lint.yml'}));
});

gulp.task('scss', function () {
    return gulp.src(paths.styles, {cwd: bases.source})
                .pipe(sourcemaps.init())
                .pipe(sassGlob())
                .pipe(sass({
                    outputStyle: 'compressed'
                }).on('error', function (err) {
                    browserSync.pause();
                    console.log('**********************SCSS WRONG************************');
                    logError(err);
                    browserSync.notify('<div style="color:red">SCSS WRONG</div>', 30000);
                }))
                .pipe(autoprefixer({
                    browsers: ['IE >= 9', 'Firefox > 20', 'iOS 7']
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(bases.public + 'css/'))
                .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src(paths.PluginsScripts, {cwd: bases.source})
                .pipe(jshint())
                .pipe(jshint.reporter('default'))
                .pipe(plumber())
                .on('error', function (err) {
                    browserSync.pause();
                    console.log('**********************JS FAIL**********************');
                    logError(err);
                    browserSync.notify('<div style="color:red">JS FAIL</div>', 3000);
                })
                .pipe(plumber.stop())
                .pipe(browserSync.stream());
});


gulp.task('concatVendorLibsScripts', function () {
    return gulp.src(paths.concatVendorLibsScripts, {cwd: bases.source})
                .pipe(concat('libs.js'))
                .pipe(gulp.dest(bases.public + 'scripts/'));
});

gulp.task('concatPluginsScripts', function () {
    return gulp.src(paths.PluginsScripts, {cwd: bases.source})
                .pipe(concat('scripts.js'))
                .pipe(gulp.dest(bases.public + 'scripts/'));
});

// Optimizing Images
gulp.task('images', function(){
  return gulp.src('source/assets/images/**/*.+(png|jpg|gif|svg)')
              // Caching images that ran through imagemin
              .pipe(cache(imagemin({
                  interlaced: true
                })))
              .pipe(gulp.dest(bases.public + 'images/'));
});

// Copying content of asset folder from source to public
gulp.task('copy', function() {
  gulp.src(paths.assets, {cwd: bases.source})
              .pipe(gulp.dest(bases.public))
});

// Copying content of asset folder from source to public
gulp.task('copy-data-json', function() {
  gulp.src(paths.dataJson, {cwd: bases.source})
              .pipe(gulp.dest(bases.public+ 'data/'))
});

// Generating inline CSS for performance with Critical
gulp.task('critical', function () {
  return gulp.src('public/*.html')
              .pipe(critical({
                base: bases.public,
                inline: false,
                css: ['public/css/style.css'],
                minify: true,
                ignore: ['@font-face']
              }))
              .pipe(gulp.dest(bases.public));
});

// A development task to run anytime a file changes
gulp.task('watch', function() {
 gulp.watch('source/**/*', ['images', 'copy', 'jade', 'data', 'copy-data-json', 'scss-lint', 'scss', 'scripts', 'concatVendorLibsScripts', 'concatPluginsScripts', 'browserSync-resume']);
});

gulp.task('default', ['clean', 'images', 'copy', 'jade', 'data', 'copy-data-json', 'scss-lint', 'scss', 'scripts', 'concatVendorLibsScripts', 'concatPluginsScripts', 'watch', 'browser-sync'], function () {
    console.log('**********************GULP DONE**********************');
});
