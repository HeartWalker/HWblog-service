;
function warnLayer(layerId,message) {
    var id = layerId;
    var msg = message;
    var timer = null;
    clearTimeout(timer);
    if(arguments.length <= 1){
        id = 'warnLayer';
        msg = layerId || '';
    }
    var layer = document.getElementById(id) || document.createElement('div');
    timer = function () {
        setTimeout(function () {
            layer.style.display = 'none';
        },2000);
    }
    layer.innerHTML = msg;
    if(!document.getElementById(id)){
        layer.id = id;
        layer.style = "display:block;position:fixed; top:20%;transform:translatex(-50%);left:50%;" +
            "text-align:'center';font-size:42px;color:orange;";
        document.body.appendChild(layer);

    }
    layer.style.display = 'block'
    timer();


}
