console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="Welcome raj";

var img=document.getElementById("modi");
var marginLeft=0;

function moveRight()
{
marginLeft=marginLeft+10;
img.style.marginLeft=marginLeft+'px';

}

img.onclick=function()
{
var interval=setIntervel(moveRight,100)
};
