(function(){
    var docEl = document.documentElement;

    function setRemUint(){
        var width = docEl.clientWidth > 750 ? 750 : docEl.clientWidth;
        // var width = docEl.clientWidth;
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUint();

    window.addEventListener('resize', setRemUint);
})();