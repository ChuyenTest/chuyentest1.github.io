/**
 * @name Site.
 * @author Hang Trieu.
 * @date 2018-02-28.
 * @description Define global variables and functions.
 * @version 1.0
 */
var siteGlobal = (function($, window, undefined) {
	var $document = $(document),
			$Body = $('body'),
			$win = $('window'),
			CssClass = {
				active: 'active fadeIn animated',
			},
			toogleActiveClassAdvance = function(clickEl, activeEl) {
				if(!activeEl) {
					activeEl = clickEl;
				}

				cssClassActive = CssClass.active;

				clickEl.on('click', function() {
					activeEl.toggleClass(cssClassActive);
				});
			};

			/*countdown*/
			// Set the date we're counting down to
			var countDownDate = new Date("Mar 21, 2018 11:59:00").getTime();

			// Update the count down every 1 second
			var countdownfunction = setInterval(function() {

					// Get todays date and time
					var now = new Date().getTime();
					
					// Find the distance between now an the count down date
					var distance = countDownDate - now;
					
					// Time calculations for days, hours, minutes and seconds
					var days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
					var hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
					var minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
					var seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));
					
					// Output the result in an element with id="countdown-block"
					document.getElementById("countdown-block").innerHTML = 
						"<div class='inner'>"
							+ "<div class='item'>"
								+ "<div class='label'>DAYS</div>"
								+ "<span>" + days + "</span>"
							+ "</div>"
							+ "<div class='item'>"
								+ "<div class='label'>HOURS</div>"
								+ "<span>" + hours + "</span>"
							+ "</div>"
							+ "<div class='item'>"
								+ "<div class='label'>MINUTES</div>"
								+ "<span>" + minutes + "</span>"
							+ "</div>"
							+ "<div class='item'>"
								+ "<div class='label'>SECOND</div>"
								+ "<span>" + seconds + "</span>"
							+ "</div>"
						+ "</div>";
					
					// If the count down is over, write some text 
					if (distance < 0) {
							clearInterval(countdownfunction);
							document.getElementById("demo").innerHTML = "EXPIRED";
					}
			}, 1000);

			function pad(n) {
				return (n < 10 ? '0' : '') + n;
			};
			/*countdown*/

			// Fixed menu
			var navbarDefault = $('[data-stick-menu]'),
				navbarDefaultHeight = navbarDefault.outerHeight(true);

			navbarDefault.css("height", navbarDefaultHeight);
			$(window).resize(function () {
				navbarDefaultHeight = navbarDefault.outerHeight(true);
				navbarDefault.css("height", navbarDefaultHeight);
			});

			$(window).scroll(function() {
				if ( $(window).scrollTop()
							>= (parseInt($('[data-stick-menu]:eq(0)').css('margin-top'))
									+ $('[data-stick-menu]:eq(0)').height()
							)
				) {
					navbarDefault.addClass('sticky');
				}
				else {
					navbarDefault.removeClass('sticky');
				}
			});
			// End Fixed menu

			// Select all links with hashes
			$('a[href*="#"]')
			  // Remove links that don't actually link to anything
			  .not('[href="#"]')
			  .not('[href="#0"]')
			  .click(function(event) {
				// On-page links
				if (
				  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
				  && 
				  location.hostname == this.hostname
				) {
				  // Figure out element to scroll to
				  var target = $(this.hash);
				  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				  // Does a scroll target exist?
				  if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
					  scrollTop: target.offset().top - navbarDefaultHeight - 20
					}, 1000, function() {
					  // Callback after animation
					  // Must change focus!
					  var $target = $(target);
					  $target.focus();
					  if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					  } else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					  };
					});
				  }
				}
			  });			
	return {
		CssClass: CssClass,
		Func: {
			toogleActiveClassAdvance: toogleActiveClassAdvance,
		},
	};

})(jQuery, window);


if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs   = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				FNOP    = function() {},
				fBound  = function() {
					return fToBind.apply(this instanceof FNOP ? this : oThis,
								 aArgs.concat(Array.prototype.slice.call(arguments)));
				};

		FNOP.prototype = this.prototype;
		fBound.prototype = new FNOP();

		return fBound;
	};
}
