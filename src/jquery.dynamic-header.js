(function ($) {

    var settings = {};
    var defaults = {
        id: 0,
        header: null,
    };

    $.fn.dynamicHeader = function (options = defaults) {
        this.settings = $.extend(true, {}, defaults, options);
        this.settings.header = this.get(0);
        this.settings.id = Date.now();
        settings = this.settings;
        _debug(['init', this, this.settings]);

        $(this.settings.header).css({ 'position': 'fixed', 'top': 0, 'left': 0, 'width': '100%' })

        // add scroll event listener for headerCSS Property
        window.addEventListener('scroll', _throttle.bind(this, _onWindowScroll, 300));
        document.addEventListener('DOMContentLoaded', setHeaderProp);
    };

    // Private function for debugging.
    function _debug(obj) {
        if (window.console && window.console.log) {
            window.console.log(obj);
        }
    };

    function _onWindowScroll(evt) {
        setHeaderProp();

        if (window.scrollY > window.innerHeight * .25) $(settings.header).addClass('small');
        else $(settings.header).removeClass('small');
    }

    function _throttle(fn, delay, evt) {
        setTimeout(function () {
            fn(evt);
        }, delay);
    }

    function setHeaderProp() {
        const headerHeight = $(settings.header).outerHeight() + 'px';
        document.documentElement.style.setProperty('--jq-header-height--' + settings.id, headerHeight);
        $(settings.pageWrapper).css({ 'margin-top': headerHeight })
    }
})(jQuery);