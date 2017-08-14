var counter=0;
var button=document.getElementById("counter");
button.onclick=function()
{
  
request=new XMLHttpRequest();

request.onreadystatechange = function () {

      alert("I am working");
    if(request.readyState===XMLHttpRequest.DONE)
    {
    if(request.status===200)
    {
        var counter=request.responseText;
        var span=document.getElementById("count");
        span.innerHTML=counter.toString();
    }
    }
   };
   request.open("Get","http://rimathivanan.imad.hasura-app.io/counter",true);
   request.send(null);
};

