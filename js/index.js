/*addwheel*/
/*滚轮添加*/
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
}
function addWheel(obj,fn){
    function wheel(ev){
        var oEvent = ev || event;
        var bDown = true;
        bDown = oEvent.detail?oEvent.detail>0:oEvent.wheelDelta < 0;
        fn && fn(bDown);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
    if(window.navigator.userAgent.indexOf('Firefox')!=-1){
        obj.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        // obj.onmousewheel = wheel;
        addEvent(obj,'mousewheel',wheel);
    }
}
/*moveCube*/
//弹性碰撞
function ball(obj){
    var iSpeedX=0;
    var iSpeedY=0;
    var lastX=0;
    var lastY=0;
    var timer;
    obj.onmousedown=function(ev){
        clearInterval(timer);
        var oEvent=ev || event;
        var disX=oEvent.clientX-obj.offsetLeft;
        var disY=oEvent.clientY-obj.offsetTop;

        document.onmousemove=function(ev){
            var oEvent=ev || event;
            obj.style.left=oEvent.clientX-disX+'px';
            obj.style.top=oEvent.clientY-disY+'px';

            // 当前坐标
            // 上一次坐标
            iSpeedX=oEvent.clientX-lastX;
            iSpeedY=oEvent.clientY-lastY;
            // 更新上一次坐标
            lastX=oEvent.clientX;
            lastY=oEvent.clientY;
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
            collision();
        };
        return false;
    };

    function collision(){
        clearInterval(timer);
        timer=setInterval(function(){
            iSpeedY+=3;
            var l=obj.offsetLeft+iSpeedX;
            var t=obj.offsetTop+iSpeedY;

            if(t>=document.documentElement.clientHeight-obj.offsetHeight){
                t=document.documentElement.clientHeight-obj.offsetHeight;
                iSpeedY*=-0.8;
                iSpeedX*=0.8;
            }
            if(l>document.documentElement.clientWidth-obj.offsetWidth){
                l=document.documentElement.clientWidth-obj.offsetWidth;
                iSpeedX*=-0.8;
                iSpeedY*=0.8;
            }
            if(t<0){
                t=0;
                iSpeedY*=-0.8;
                iSpeedX*=0.8;
            }
            if(l<0){
                l=0;
                iSpeedX*=-0.8;
                iSpeedY*=0.8;
            }

            obj.style.left=l+'px';
            obj.style.top=t+'px';

            // 速度小于1
            if(Math.abs(iSpeedX)<1){
                iSpeedX=0;
            }
            if(Math.abs(iSpeedY)<1){
                iSpeedY=0;
            }
            if(iSpeedX==0 && iSpeedY==0 && t==document.documentElement.clientHeight-obj.offsetHeight){
                clearInterval(timer);
            }
        }, 30);
    }
}
/*through*/
function through(obj){
    function a2d(n){
        return n*180/Math.PI;
    }
    function d2a(n){
        return n*Math.PI/180;
    }
    function getPos(obj){
        var l=0;
        var t=0;
        while(obj){
            l+=obj.offsetLeft;
            t+=obj.offsetTop;

            obj=obj.offsetParent;
        }
        return {left: l, top: t};
    }
    function hoverDir(obj,ev){
        var x = getPos(obj).left+obj.offsetWidth/2 -ev.clientX;
        var y = getPos(obj).top+obj.offsetHeight/2 -ev.clientY;
        //console.log(obj.offsetLeft);
        // console.log(getPos(obj).left);
        return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
    }
    //进来
    obj.onmouseover = function(ev){
        var oS =obj.children[0];
        var oEvent = ev||event;
        var oFrom = oEvent.fromElement||oEvent.relatedTarget;
        if(obj.contains(oFrom)){
            return;
        }
        //滑过方向
        var dir = hoverDir(obj,oEvent);
        switch(dir){
            //右边0
            case 0:
                oS.style.left = '280';
                oS.style.top = '0px';
                break;
            //下边1
            case 1:
                oS.style.left = '0px';
                oS.style.top = '280px';
                break;
            //左边2
            case 2:
                oS.style.left = '-280px';
                oS.style.top = '0px';
                break;
            //上边3
            case 3:
                oS.style.left = '0';
                oS.style.top = '-280px';
                break;
        }
        move(oS,{left:0,top:0});
    };
    //出去
    obj.onmouseout = function(ev){
        var oS =obj.children[0];
        var oEvent = ev||event;
        var oTo = oEvent.toElement||oEvent.relatedTarget;
        if(obj.contains(oTo)){return;}
        var dir = hoverDir(obj,oEvent);
        switch(dir){
            case 0:
                move(oS,{left:280,top:0});
                break;
            case 1:
                move(oS,{left:0,top:280});
                break;
            case 2:
                move(oS,{left:-280,top:0});
                break;
            case 3:
                move(oS,{left:0,top:-280});
                break;
        }
    };
}
/*setPage*/
function setPage(){
    ;(function(win,doc){
        function setStyle(){
            oPage.style.width=doc.documentElement.clientWidth+'px';
            oPage.style.height=doc.documentElement.clientHeight+'px';
            oScreen.style.width=doc.documentElement.clientWidth+'px';
            oScreen.style.height=3*doc.documentElement.clientHeight+'px';
            for(var i=0;i<aDiv.length;i++){
                aDiv[i].style.width=doc.documentElement.clientWidth+'px';
                aDiv[i].style.height=doc.documentElement.clientHeight+'px';
                //alert(oScreen.style.width);
            }
        }
        setStyle();
        win.onresize=function(){
            setStyle();
        };
    })(window,document);
}
