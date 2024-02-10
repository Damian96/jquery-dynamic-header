(function ($) {

    var settings = {};
    var defaults = {
        id: 0,
        header: null,
        pageWrapper: 'main'
    };

    $.fn.dynamicHeader = function (options = defaults) {
        this.settings = $.extend(true, {}, defaults, options);
        this.settings.header = this.get(0);
        this.settings.id = Date.now();
        this.settings.pageWrapper = document.querySelector(this.settings.pageWrapper);
        settings = this.settings;
        _debug(['init', this, this.settings]);

        $(this.settings.header).css({ 'position': 'fixed', 'top': 0, 'left': 0, 'width': '100%' })

        // add scroll event listener for headerCSS Property
        window.addEventListener('scroll', _throttle.bind(this, _onWindowScroll, 300));
        window.addEventListener('scrollend', _onWindowScrollEnd);
        document.addEventListener('DOMContentLoaded', _onWindowScroll, 300);

        // Initalize Observer
        const observerOpts = {
            rootMargin: `${$(this.settings.header).height() - 1}px`,
            threshold: .6
        };

        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) $(this.settings.header).addClass('small');
            })
        }

        const observer = new IntersectionObserver(callback, observerOpts)

        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(this.settings.pageWrapper);
        });
    };

    // Private function for debugging.
    function _debug(obj) {
        if (window.console && window.console.log) {
            window.console.log(obj);
        }
    };

    function _onWindowScroll(evt) {
        const headerHeight = $(settings.header).outerHeight() + 'px';
        document.documentElement.style.setProperty('--jq-header-height--' + settings.id, headerHeight);
        $(settings.pageWrapper).css({ 'margin-top': headerHeight })
    }

    function _onWindowScrollEnd(evt) {
        if (Math.floor(window.scrollY) == 0) $(settings.header).removeClass('small');
    }

    function _throttle(fn, delay, evt) {
        setTimeout(function () {
            fn(evt);
        }, delay);
    }
})(jQuery);