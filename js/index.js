/*
* @Author: Administrator
* @Date:   2017-11-01 17:37:11
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-01 17:46:36
*/
$(".container").fullpage({
	anchors:["p1","p2","p3","p4","p5"],
	verticalCentered:true,
	// sectionsColor:["black","#0ff","darkcyan","#00f","#0ff"],
	resize:true,
	'navigation':true,
	keyboardScrolling:true,
	fixedelements:"#nav",
	menu:"#nav",
	afterLoad:function (val,index) {
		if(index==3){
			znb(cobj1,80,"red");
			znb(cobj2,79,"blue");
			znb(cobj3,90,"yellow");
		}
		if(index===1){
			$(".spanbox").animate({
				top: [350, 'easeOutBounce']
			})
		}
	},
	onLeave:function(index,val){
		if(index===1){
			$(".spanbox").animate({
				top: [0, 'easeOutBounce']
			})
		}
	}

})
$(".spanbox").animate({
	top: [350, 'easeOutBounce']
})




// ------进度条------
let cobj1 = document.querySelector("#canvas1").getContext("2d");
console.log(cobj1)
let cobj2= document.querySelector("#canvas2").getContext("2d");
let cobj3= document.querySelector("#canvas3").getContext("2d");
//获取渲染上下文渲染
function znb(cobj,max,color) {
//        cobj.save();
	cobj.textAlign="center";
	cobj.textBaseline="middle";
	cobj.font="26px 黑体";
	cobj.strokeStyle=color;
	cobj.lineWidth="20";
	cobj.lineCap="round";
	let num = 0;
	function progress() {
		num++;
		let angle=num*Math.PI/50;
		cobj.save();
		cobj.translate(100,100)
		cobj.save();
		cobj.clearRect(-100,-100,200,200);
		cobj.beginPath();
		cobj.rotate(-Math.PI/2);
		cobj.arc(0,0,70,0,angle);
		cobj.stroke();
		cobj.restore();
		cobj.fillStyle="white";
		cobj.fillText(num+"%",0,0);
		if(num<max){
			requestAnimationFrame(progress);

		}
		cobj.restore();
	}
	progress()
}
let container=document.querySelector(".jdbox");


// znb(cobj1,80,"red");
// znb(cobj2,79,"blue");
// znb(cobj3,90,"yellow");

