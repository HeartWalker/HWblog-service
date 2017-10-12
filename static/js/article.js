
var upImgClick = document.getElementById("upImgClick");
upImgClick && upImgClick.addEventListener('click',function (e) {
    if(!document.getElementById("img").value){
        return false;
    }
    var form = document.getElementById("upImg");
    if(!document.getElementById("formIframe")){
        var iframe = document.createElement("iframe");
        iframe.name = form.target;
        iframe.style.display = "none";
        form.appendChild(iframe);
    }
    iframe.onload = function(){
        var responseData = this.contentDocument.body.textContent
            || this.contentWindow.document.body.textContent;
        warnLayer(responseData);
        // console.log(responseData);
    };
    form.submit();
    form.reset();
});

var textSubmit = document.getElementById('textSubmit');
textSubmit && textSubmit.addEventListener('click',function (event) {
    var content = document.getElementById('content').value,
        title = document.getElementById('title').value;
    if(!title){
        warnLayer('标题不能为空');
        event.preventDefault();

    }else if(!content){
        warnLayer('内容不能为空');
        event.preventDefault();
    }


});