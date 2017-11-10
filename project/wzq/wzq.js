    let start = document.querySelector("#start");
    let blank={};
    let h2=document.querySelector("h2");
    console.log(h2)
    start.onclick=function () {
        container.classList.add("show")
    }
    let isAI =document.querySelector(".ai")
    console.log(isAI)
    let flag=true;
    let sAI=false;
    // console.log(ai)
     isAI.onfocus=function(){
        sAI=true;
     }
    function j(x,y){
        return x+"_"+y;
    }
    let container=document.querySelector(".container");
    let cobj = document.querySelector("canvas").getContext("2d")
    let canvas=document.querySelector("canvas");
    let w = 40;
    function drawborder() {
        cobj.clearRect(0,0,600,600)
        cobj.save()
        cobj.beginPath();
        for(let i =0;i<15;i++){
        cobj.moveTo(20,i*w+20)
        cobj.lineTo(580,i*w+20)
        cobj.moveTo(i*w+20,20)
        cobj.lineTo(i*w+20,580)
        cobj.stroke();
        }
        // cobj.rect(20,20,580,580)
        cobj.stroke()
        cobj.restore()
        for(let i = 0;i<15;i++){
            for(let k = 0;k<15;k++){
                blank[j(i,k)]=true;
            }
        }
    }
    drawborder()
    function drawpointer(x,y) {
        cobj.save()
        cobj.beginPath();
       cobj.arc(x*w+20,y*w+20,5,0,Math.PI*2);
        cobj.fillStyle="green";
       cobj.fill();
        cobj.restore();
    }
    drawpointer(3,3)
    drawpointer(3,11)
    drawpointer(11,3)
    drawpointer(11,11)
    drawpointer(7,7) 
    function drawchess(x,y,color){
        cobj.save();
        cobj.beginPath();
        cobj.fillStyle=color;
        cobj.arc(x*40+20,y*40+20,15,0,Math.PI*2);
        cobj.fill();
        cobj.restore();
        delete blank[j(x,y)];            /**/
    }
    let pos={};


     function gettops() {
         let max=0;
         let po={};
         for(let i in blank){
             let x = parseInt(i.split("_")[0])
             let y = parseInt(i.split("_")[1])
             let length=check(x,y,"black")
             // console.log(length)
             if(length>max){
                max=length;
                 po={x,y}

             }
         }
         let max1=0;
         let po1={};
         for(let i in blank){
             let x = parseInt(i.split("_")[0])
             let y = parseInt(i.split("_")[1])
             let length=check(x,y,"white")
             // console.log(length)
             if(length>max1){
                 max1=length;
                 po1={x,y}
             }
         }
         if(max>max1){
             return po;
         }else{
             return po1;
         }
     }
     let zz=document.querySelector(".zz")
    canvas.onclick=function(e){
        let x = Math.round((e.offsetX-20)/w);
        let y = Math.round((e.offsetY-20)/w);
        if(pos[j(x,y)]){
            return
        }
        if(flag){
            drawchess(x,y,"black")
            pos[j(x,y)]="black";
            if(check(x,y,"black")===5){
                zz.style.display="block";
            }
            if (sAI) {  
                 let p=gettops(j(x,y));
                pos[j(p.x,p.y)]="white";          /**/
                drawchess(p.x,p.y,"white");
                 if (check(p.x,p.y,"white")===5) {
                      zz.style.display="block";
                        h2.innerHTML="寂寞还被电脑虐"
                 }
                return;
            }
        }else{
           
            drawchess(x,y,"white")
            pos[j(x,y)]="white";
            if(check(x,y,"white")===5){
                zz.style.display="block";
                h2.innerHTML="白面书生胜利"
            }
        }
        flag=!flag;
        console.log(pos)
    }
    
    function check(x,y,color) {
        let row = 1;
        let i = 1;
        while (pos[j((x + i) ,y)] === color) {
            row++;
            i++;
        }
        i=1;
        while (pos[j((x - i) ,y)] === color) {
            row++;
            i++;
        }
        let col = 1;
        i = 1;
        while (pos[j(x ,(y+i))] === color) {
            col++;
            i++;
        }
        i=1;
        while (pos[j(x ,(y-i))] === color) {
            col++;
            i++;
        }
        let xie = 1;
        i = 1;
        while (pos[j((x+i) ,(y+i))] === color) {
            xie++;
            i++;
        }
        i=1;
        while (pos[j((x-i) ,(y-i))] === color) {
            xie++;
            i++;
        }
        let xie1=1;
        i=1;
        while (pos[j((x+i) ,(y-i))] === color) {
            xie1++;
            i++;
        }
        i=1;
        while (pos[j((x-i) ,(y+i))] === color) {
            xie1++;
            i++;
        }
        return Math.max(row,col,xie,xie1)
    }







