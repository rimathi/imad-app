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
        console.log("user loged in");
        alert("User loged sucessfully");
    }
    else if(request.status===403)
    {
        alert("Username/Password is incorrect");
    }
    else if(request.status===500)
    {
        alert("Some the went wrong on the server");
    }
    
    }
   };
   
   var username=document.getElementById("username").value;
   var password=document.getElementById("password").value;
   request.open("Post","http://rimathivanan.imad.hasura-app.io/login",true);
   request.setRequestHeader('Content-Type',"application/json");
   request.send(JSON.stringify({username:username,password:password}));
};






        