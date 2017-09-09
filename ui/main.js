//submit username/login
var submint=document.getElementById("submit_btn");

button.onclick=function()
{
  
request=new XMLHttpRequest();

request.onreadystatechange = function () {

    
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
   
   var username=document.getElementById("username");
   var password=document.getElementById("password");
   request.open("Post","http://rimathivanan.imad.hasura-app.io",true);
   request.send(JSON.strinfigy({username:username,password:password}));
};






        