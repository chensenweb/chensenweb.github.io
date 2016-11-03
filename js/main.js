function rnd(n1,n2){
    return Math.floor(Math.random()*(n2-n1)+n1);
}
window.onload=function(){
    var oPage=document.querySelector('.page');
    var oScreen=oPage.querySelector('.screen');
    var aDiv=oScreen.children;
    var oLogin_box=document.querySelector('.login-page');
    var oHeader=document.querySelector('.header-line');
    var oLogin=document.querySelector('.header-line a');
    var oLogin_btn=document.querySelector('.login-page .login-btn');
    var oLogin_a=document.querySelector('.login-page a');
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
    setPage();
    //登录页面，放大消失，缩小出现
    var iNow=0;
    oLogin_btn.onclick=oLogin_a.onclick=function(){
        oLogin_box.style.WebkitTransform='scale(10,10)';
        oLogin_box.style.opacity='0';
        setTimeout(function(){
            oLogin_box.style.display='none';
        },300);
    };
    oLogin.onclick=function(){
        oLogin_box.style.display='block';

        setTimeout(function(){
            oLogin_box.style.WebkitTransform='scale(1,1)';
            oLogin_box.style.opacity='1';
        },300);

    };
    //滚轮添加
    var bw=false;
    addWheel(document,function(bDown){
        // alert(1);
        //console.log(bw);
        if(bw){
            return;
        }
        //alert(1);
        bw=true;
        if(bDown){
            iNow++;
            if(iNow>=1){
                oHeader.style.msTransition='3s all ease';
                oHeader.style.WebkitTransition='3s all ease';
                oHeader.style.OTransition='3s all ease';
                oHeader.style.MozTransition='3s all ease';
                oHeader.style.opacity='0';

                //oHeader.style.display='none';
            }
            if(iNow==3){
                oScreen.style.top=0+'px';
                iNow=2;
                bw=false;
            }
        }else{
            iNow--;
            if(iNow<0){
                iNow=0;
                oHeader.style.opacity='1';
                bw=false;
                return;
                //oHeader.style.display='none';
            }
            if(iNow>=1){
                oHeader.style.msTransition='3s all ease';
                oHeader.style.WebkitTransition='3s all ease';
                oHeader.style.OTransition='3s all ease';
                oHeader.style.MozTransition='3s all ease';
                oHeader.style.opacity='0';
                //oHeader.style.display='none';
            }
        }
        function tranEnd(){
            oScreen.removeEventListener('transitionend',tranEnd,false);
            bw=false;
        }
        oScreen.addEventListener('transitionend',tranEnd,false);
       // console.log(iNow);
        oScreen.style.top=-iNow*document.documentElement.clientHeight+'px';
    });
    //头部字体闪烁
    var oShine=document.querySelector('.header-line ul .header-box h2');
    setInterval(function(){
        //oShine.style.color='rgb(255,0,0)';
        oShine.style.color='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
        //console.log(rnd(0,256));
    },300);
    //自我介绍闪烁
    var oShine2=document.querySelectorAll('.page-self .intro4  li');
    setInterval(function(){
        //oShine.style.color='rgb(255,0,0)';
        oShine2[4].style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
        //console.log(rnd(0,256));
    },300);
    //showpage 爆炸效果
    var oShowpage=document.querySelector('.show-page');
    var oShowbox=document.querySelector('.show-page .show-box');
    var R = 4;
    var C = 7;
    for(var i=0;i<R;i++){
        for(var j=0;j<C;j++){
            var oS = document.createElement('span');
            oS.style.width = oShowbox.offsetWidth/C+'px';
            oS.style.height = oShowbox.offsetHeight/R+'px';
            oShowbox.appendChild(oS);
            oS.style.left = j*oS.offsetWidth+'px';
            oS.style.top = i*oS.offsetHeight+'px';
            /*oS.style.background='rgb('+rnd(0,255)+','+rnd(0,255)+','+rnd(0,255)+')';*/
            oS.style.backgroundPosition = -j*oS.offsetWidth+'px -'+i*oS.offsetHeight+'px';
        }
    }
    var aS = oShowbox.children;
    setTimeout(function(){
        for(var i=0;i<aS.length;i++){
            var x = aS[i].offsetLeft+aS[i].offsetWidth/2-oShowbox.offsetWidth/2;
            var y = aS[i].offsetTop+aS[i].offsetHeight/2-oShowbox.offsetHeight/2;

            aS[i].style.msTransition = '.5s all ease-out';
            aS[i].style.WebkitTransition = '.5s all ease-out';
            aS[i].style.OTransition = '.5s all ease-out';
            aS[i].style.MozTransition = '.5s all ease-out';
            aS[i].style.msTransform = 'translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg) ';
            aS[i].style.WebkitTransform = 'translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg) ';
            aS[i].style.OTransform = 'translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg) ';
            aS[i].style.MozTransform = 'translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg) ';
            aS[i].style.opacity = 0;
        }
        function tranEnd(){
            aS[aS.length-1].removeEventListener('transitionend',tranEnd,false);

            for(var i=0;i<aS.length;i++){
                aS[i].style.WebkitTransition = 'none';

                aS[i].style.msTransform = 'translate(0px,0px) rotateY(0deg) rotateX(0deg)';
                aS[i].style.WebkitTransform = 'translate(0px,0px) rotateY(0deg) rotateX(0deg)';
                aS[i].style.OTransform = 'translate(0px,0px) rotateY(0deg) rotateX(0deg)';
                aS[i].style.MozTransform = 'translate(0px,0px) rotateY(0deg) rotateX(0deg)';
                aS[i].style.opacity = 1;

            }
        }
        aS[aS.length-1].addEventListener('transitionend',tranEnd,false);
        setTimeout(function(){
            oShowpage.style.display='none';
        },500);

    },500);
    /**/
    //第三页列表穿墙效果
    var aLi=document.querySelectorAll('.page .screen .subjects ul li');
    for(var i=0;i<aLi.length;i++){
        through(aLi[i]);
    }
    //链接跳转
    aLi[0].onclick=function(){
        window.open('JD','_blank');
    };
    aLi[1].onclick=function(){
        window.open('JDSC','_blank');
    };
    aLi[2].onclick=function(){
        window.open('easy_setup','_blank');
    };
    aLi[3].onclick=function(){
        window.open('#','_blank');
    };
    aLi[4].onclick=function(){
        window.open('#','_blank');
    };
    aLi[5].onclick=function(){
        window.open('#','_blank');
    };
	

    //3D盒子，首页
    var oBox = document.querySelector('.page .screen .main-page .box');
    var x = 0;
    var y = 0;
    var iSpeedX = 0;
    var iSpeedY = 0;
    var lastX = 0;
    var lastY = 0;
    var timer1=null;
    function cube(){
        clearInterval(timer1);
        timer1=setInterval(function(){
            x+=1;
            y+=1;
            oBox.style.msTransform = 'perspective(800px) rotateX('+x+'deg) rotateY('+y+'deg)';
            oBox.style.WebkitTransform = 'perspective(800px) rotateX('+x+'deg) rotateY('+y+'deg)';
            oBox.style.OTransform = 'perspective(800px) rotateX('+x+'deg) rotateY('+y+'deg)';
            oBox.style.MozTransform = 'perspective(800px) rotateX('+x+'deg) rotateY('+y+'deg)';
        },16);
    }
    cube();
    oBox.onmouseover=function(){
        clearInterval(timer1);
    };
    oBox.onmouseout=function(){
        cube();
    };
	
   
    //首页文字效果
    var aP=document.querySelectorAll('.page .screen .main-page .title ul p');
    var bok=true;
    aP[1].style.opacity='0';
    setInterval(function(){
        if(bok){
            aP[1].style.msTransition='2s all ease';
            aP[1].style.WebkitTransition='2s all ease';
            aP[1].style.OTransition='2s all ease';
            aP[1].style.MozTransition='2s all ease';
            aP[1].style.opacity='1';
        }else{
            aP[1].style.msTransition='2s all ease';
            aP[1].style.WebkitTransition='2s all ease';
            aP[1].style.OTransition='2s all ease';
            aP[1].style.MozTransition='2s all ease';
            aP[1].style.opacity='0';
        }

        bok=!bok;
        //console.log(bok);
    },2000);
    var aLine=document.querySelectorAll('.page .screen .main-page .title ul li ul li');
    for(var i=0;i<aLine.length;i++){
        aLine[0].style.width= 400+'px';
        aLine[1].style.height=300 +'px';
        aLine[2].style.width= 300+'px';
        aLine[3].style.height=200 +'px';
    }

    //左侧点击跳转
	var oLeft=document.querySelector('.left-content');
    var aChange=oLeft.querySelectorAll('li');
    for(var i=0;i<aChange.length;i++){
        aChange[i].index=i;
        aChange[i].onclick=function(){
            iNow=this.index;
            oScreen.style.top=-iNow*document.documentElement.clientHeight+'px';
        };
    }
    //介绍添加
    var aMoveCube=document.querySelectorAll('.page-self li');
    //alert(aMoveCube.length);
    for(var i=0;i<aMoveCube.length;i++){
        ball(aMoveCube[i]);
    }
    setInterval(function(){
        //alert(1);
        aMoveCube[4].style.background='+rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
    },100);
    
};