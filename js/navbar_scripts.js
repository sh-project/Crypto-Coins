///////////////// Navbar Scripts /////////////////

(function ($) {
    "use strict";

    /* Preloader */
    $(window).on('load', function () {
        var preloaderFadeOutTime = 250;
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function () {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 250);
        }
        hidePreloader();
    });

    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function () {
        if ($(".navbar").offset().top > 20) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $(document).on('click', 'a.page-scroll', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('scroll')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function (event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });

    /* Rotating Text - Morphtext */
    $("#js-rotating").Morphext({
        animation: "fadeIn",
        separator: ",",
        speed: 2000,
        complete: function () {
        }
    });

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="#header" scroll="#header" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 500;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function () {
        $(this).blur();
    });

})(jQuery);