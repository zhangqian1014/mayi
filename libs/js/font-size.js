
(function(window){
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = winW / 10 + "px";
    window.onresize = function(){
        var winW = document.documentElement.clientWidth || document.body.clientWidth;
        document.documentElement.style.fontSize = winW / 10 + "px";
    }
})(window);
