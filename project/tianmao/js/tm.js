    /*
* @Author: Marte
* @Date:   2017-10-21 14:12:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-23 18:05:09
*/
/*-------------------轮播------------------------*/
let banner=document.querySelector(".banner")
let lbd = document.querySelectorAll(".lbdd")
console.log(lbd)
let imgs = document.querySelectorAll(".banner-img img")
console.log(imgs)

     lbd.forEach(function(ele,index){
        ele.onclick=function(){
            for (var i = 0; i < lbd.length; i++) {
               lbd[i].classList.remove("lbdd1");
               imgs[i].classList.remove("active");
            }
            ele.classList.add("lbdd1");
            imgs[index].classList.add("active");
            now=index;
        }
     })
     let now =0;
     let ut = setInterval(fnn,2000)
     function fnn(){
        now++
        if (now ==imgs.length) {
            now=0
        }
        
        for (var i = 0; i < 6; i++) {
                lbd[i].classList.remove("lbdd1");
               imgs[i].classList.remove("active");
            };
            lbd[now].classList.add("lbdd1");
            imgs[now].classList.add("active");
     }
    banner.onmouseover=window.onblur=function(){
        clearInterval(ut);
    }
    banner.onmouseout=window.onfocus=function(){
        ut=setInterval(fnn,2000);
    }
/*-------------------轮播------------------------*/





/*-------------------回到顶部------------------------*/
// let body;
// let topfixed=document.querySelector(".topfixd")
// window.addEventListener("scroll", function () {
//     body = document.documentElement.scrollTop === 0 ? document.body : document.documentElement;
//     console.log(topfixed);
//             if (body.scrollTop > 800) {
//                 topfixed.style.marginTop = 0;
//             } else { 
//                 topfixed.style.marginTop = -50 + "px";
//             }
//     });

/*-------------------回到顶部------------------------*/

