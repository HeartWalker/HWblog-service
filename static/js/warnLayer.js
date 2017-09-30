;
(function warnLayer(layerId,message) {
    var id = layerId;
    var msg = message;
    var timer = null;
    clearTimeout(timer);
    if(arguments.length <= 1){
        id = 'warnLayer';
        msg = layerId || '';
    }
    if(!document.getElementById(id)){
        var layer = document.createElement('div');
        layer.id = id;
        layer.innerHTML = msg;
        layer.style = "display:block;position:fixed; top:20%;margin:0 auto;" +
            "text-align:'center';font-size:26px;color:'orange';";
        document.body.appendChild(layer);
        var timer = setTimeout(function () {
            layer.style.display = 'none';
        },2000);
        timer();

    }
    layer.innerHTML = msg;
    timer();
    return warnLayer;
})()
