var mySwiper = new Swiper ('.swiper-container', {
    direction: "horizontal",
    loop: true,
    //
    // // 如果需要分页器
    // pagination: '.swiper-pagination',
    //
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
    // // 如果需要滚动条
    // scrollbar: '.swiper-scrollbar',
    //
    freeMode:true,
    effect : 'flip',
    flip: {
        slideShadows : true,
        limitRotation : true,
    }
})
var state = "wait";
$(".add").click(function(){
    $("#bd").val("")

    $(".tc").delay(500).queue(function(){
        $(".tc").addClass("show").dequeue()
        $("#main").css("filter","blur(2px)")
        $("#zz").css("display","block")
        
    })
})
var btn = $(".choosebox div").click(function () {
    btn.removeClass("active");
    $(this).addClass("active");
    if($(".undo").hasClass("active")){
        state="wait";
    }else {
        state="done";
    }
    reWrite();
    // ContentScroll.scrollTo(0,0,0)
});
function getData(){
    return localStorage.bcsj?JSON.parse(localStorage.bcsj):[];
}
function saveData(data){
    localStorage.bcsj=JSON.stringify(data);
    console.log(1)
}

function reWrite(){
    var str = "";
    var data = getData();
    data.reverse();
    if(state==="wait"){
        data.forEach(function (ele, index) {
                if(!ele.isDone){
                    str +="<li id='"+index+"' style='background:"+ele.Bcolor+"'><time><span class='year'>"+ele.btime+"</span><span class='hours'>"+ele.xtime+"</span></time><div class='note'>"+ele.con+"</div><div class='del'>完成</div></li>"
                }
        })
    }
    if(state==="done"){
        data.forEach(function (ele, index) {
            if(ele.isDone){
                str +="<li id='"+index+"' style='background:#ccc'><time><span class='year'>"+ele.btime+"</span><span class='hours'>"+ele.xtime+"</span></time><div class='note'>"+ele.con+"</div><div class='delete'>删除</div></li>"
            }
        })
    }
    $(".content ul").html(str);
    addEvent();
}
$("#tj").click(function(){
        if(($("#bd").val())===""){
            // return;
        $("#main").css("filter","none")
        $("#zz").css("display","none")
        $(".tc").hide()
    }else{
            console.log(1)
        $("#main").css("filter","none");
        $("#zz").css("display","none");
        $(".tc").hide();
        var data=getData();
        var text= $("#bd").val();
        var bigtime=getDate();
        var smalltime=getTime();
        var bcolor=getColor();
        data.push({con:text,btime:bigtime,xtime:smalltime,Bcolor:bcolor,isDone:0})  ; /*?????*/
            // $("li").style.background=getColor()
        saveData(data);
    }
    reWrite()
})
console.log($(".close"))
$(".close").click(function(){
    $("#main").css("filter","none")
    $("#zz").css("display","none")
    $(".tc").hide()
})


function getDate(/*ms*/){
    var date=new Date();
    // date.setTime(ms);
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=addZero(date.getDate());
    return year+"-"+month+"-"+day
}
function getTime(/*ms*/){
    var date=new Date;
    // date.setTime(ms)
    var hour=addZero(date.getHours())
    var minute=addZero(date.getMinutes())
    var second=addZero(date.getSeconds())
    return hour+":"+minute+":"+second
};
$(".choosebox div").click(function(){
    $(".choosebox div").removeClass("active");
    $(this).addClass("active");
    if($(".todo").hasClass("active")){
        state="wait"
    }else{
        state="done"
    }
    reWrite();
})
function addZero(num){
    return num<10?"0"+num:num;
}
var color = ["0","3","6","9","c",]
console.log(color.length)
function getColor(){
    var str = "#";
    for (var i = 0; i < 3; i++) {
        var pos = Math.floor(Math.random()*color.length)
        str+=color[pos];
    }
    return str;
}
reWrite()
    var myScroll = new IScroll(".content",{checkDOMChanges:true});
    // var hammerObj=new Hammer()
    // hammerObj.on("panleft",function(){
    //
    // })
// 拖拽
var max= $(window).width()/3;
function addEvent(){
    $(".content ul li").each(function(index,ele){
        var hammer = new Hammer(ele);
        var mx;
        var state = "start";
        hammer.on("panstart",function(){
            $(ele).css("transiton","none");
        });
        hammer.on("pan",function(e){
           mx=e.deltaX;
            if(state==="start"){
                if(mx>0){
                    return;
                }
                if(Math.abs(mx)>max){
                    return;
                }
            }
            if(state==="end") {
                if (mx < 0) {
                    return;
                }
                if (Math.abs(mx) > max) {
                    return;
                }
                mx=-max+mx;
            }
            $(ele).css("transform","translate3d("+mx+"px,0,0)")
        });
        hammer.on("panend",function(){
            $(ele).css("transition","all .5s");
            if(mx<-max/2){
                $(ele).css("transform","translate3d("+(-max)+"px,0,0)")
                state="end";
            }else {
                $(ele).css("transform","translate3d(0,0,0)")
                state="start";
            }
        })
    // });
    })
}
    $(".content").on("click",".del",function () {
        var data=getData();
        var index=$(this).parent().attr('id'); /*获取li id*/
        data.reverse();
        data[index].isDone=1;
        data.reverse();
        saveData(data);
        reWrite();

    })
    $(".content").on("click",".delete",function () {
        var data=getData();
        var index=$(this).parent().attr('id'); /*获取li id*/
       data.reverse();
        data.splice(index,1);
        saveData(data);
        reWrite();

    })




