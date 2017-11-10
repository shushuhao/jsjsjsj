/*
* @Author: Administrator
* @Date:   2017-10-18 23:30:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-20 06:37:31
*/
// 轮播
{
	 let imgs = document.querySelectorAll(".img-box img");
	 console.log(imgs)
	 let imgbox=document.querySelector(".mid-zt");
	 let lis = document.querySelectorAll(".dianbox li");
	 let prevObj = document.querySelector(".prev");
	 let nextObj = document.querySelector(".next");
	 let lbt = setInterval(action,3000);
	 let now = 0;
	 let flag = true;
	 let z = 10;
	 function action(){
	 		if (flag==true){
		 		imgs[now].classList.add("leftOut")
				lis[now].classList.remove("active")
				now++;
				if (now==imgs.length) {
					now =0;
				}
				imgs[now].classList.add("rightIn")
				lis[now].classList.add("active")
				imgs[now].style.zIndex=z++;
				console.log(now)
			}
			flag=false;
	 }
	 imgs.forEach(function(ele,index){
	 	ele.addEventListener("animationend",function(){
	 		flag=true;
	 		ele.className="";
	 	})

	 })
	 prevObj.onclick=function(){
	 		if (flag==true) {
	 		imgs[now].classList.add("rightOut")
			lis[now].classList.remove("active")
			now--;
			if (now==-1) {
				now =imgs.length-1;
			}
			imgs[now].classList.add("leftIn")
			lis[now].classList.add("active")
			imgs[now].style.zIndex=z++;
			console.log(now)
			}
			flag=false;
	 }
	 nextObj.onclick=function(){
	 	action()
	 }
	imgbox.onmouseout  = function () {
        lbt = setInterval(action,3000)
    };
    imgbox.onmouseover = function () {
        clearInterval(lbt);
    };
    window.addEventListener("blur",function(){
        clearInterval(lbt);
    });
    window.addEventListener("focus",function(){
        lbt = setInterval(action, 3000);
    });
    lis.forEach(function(ele,index){
	    ele.onclick=function(){
	    	if (flag==true) {
	    		if (index>now) {
		    		imgs[now].classList.add("leftOut");
		    		imgs[index].classList.add("rightIn");
	    		}else if (index<now) {
	    			imgs[now].classList.add("rightOut");
		    		imgs[index].classList.add("leftIn");
	    		}
	    		imgs[index].style.zIndex=z++;
	    		for(let i =0;i<lis.length;i++){
		    			lis[i].classList.remove("active");
		    		}
		    		ele.classList.add("active");
		    		now = index;
		    }
		    flag=false;		
	    }
	    	
    })
	
	 

 }
