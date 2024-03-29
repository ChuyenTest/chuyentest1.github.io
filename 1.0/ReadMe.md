Clone source code from here: git@gitlab.demo.fest.vn:fest/fest_fe_template.git

## Frontend template
  - Frontend template using HTML5/CSS3/JavaScript techniques
  - Technologies used:
    * [Jade](http://jade-lang.com)
    * [Sass](http://sass-lang.com)
    * [jQuery](http://jquery.com)
    * [Gulp](http://gulpjs.com/)
    * [Node.js](http://nodejs.org)
    * [Ruby](http://rubyinstaller.org)

## IDE Configuration
- Open Sublime Text 3
- Choose Preferences -> Settings - User
- The number of spaces a tab is considered equal to "tab_size": 2
- Set to true to insert spaces when tab is pressed "translate_tabs_to_spaces": true
- Set to true to removing trailing white space on save "trim_trailing_white_space_on_save": true
- Set to true to ensure the last line of the file ends in a newline character when saving "ensure_newline_at_eof_on_save": true
- Preferences.sublime-settings example:
  ```
  {
    "tab_size": 2,
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true,
    "ensure_newline_at_eof_on_save": true,
    "word_wrap": true,
    "highlight_line": true,
    "folder_exclude_patterns":
    [
      ".svn",
      ".git",
      ".hg",
      "CVS",
      "node_modules"
    ],
    "font_size": 11,
    "ignored_packages":
    [
      "Markdown",
      "Vintage"
    ]
  }
  ```

## Installation
### Install Node.js
  - Download [Node.js](http://nodejs.org)
  - Ensure you have administrator role when install to set the PATH environment variable..

### Install Ruby
  - Download [Ruby](http://rubyinstaller.org/downloads)
  - Ensure you install please press option number 2, and please change the path in your PC.

### Install Gulp (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
  - Open Command Line and run
    * npm install --global gulp-cli
    * npm init
    * npm install --save-dev gulp


## Development
  - gulp

## Deloy
  - gulp deploy

## Notes
  - Use **rimraf** to delete **node_modules** folder. See [rimraf](https://github.com/isaacs/rimraf)
