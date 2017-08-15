var counter=0;
var button=document.getElementById("counter");
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
   request.open("Get","http://rimathivanan.imad.hasura-app.io/counter",true);
   request.send(null);
};


var nameInput=documnet.document.getElementById("name");
var nam=nameInput.value;
var submit=documnet.document.getElementById("submit_btn");
submit.onclick=function()
{
    var names=["name1","name2","name3"];
    var List='';
    for(i=0;i<names.length;i++)
    {
    List+='<li>'+names[i];+'</li>';
    }
    
    var ul=documnet.document.getElementById("nameList");
    ul.innerHTML=List;
    
};


        