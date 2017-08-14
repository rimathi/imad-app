var counter=0;
var button=document.getElementById("counter");
button.onclick=function()
{
request=XMLHttpRequest();

request.onReadyStateChange=function()
{
    if(request.readyState===XMLHttpRequest.DONE)
    {
    if(request.status===200)
    {
        var counter=request.resposeText;
        var span=document.getElementById("count");
        span.innerHTML=counter.toString();
    }
    }
   };
   request.open("Get","http://rimathivanan.imad.hasura-app.io/counter");
   request.send(null);
};

