$(document).ready(function(){

	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;

	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;



	var game = {score:0, min:100, max:100};
	$('#canvas1').fire({
		width:610,	
		height:150,
		speed:15,
		fireTransparency:70,
		transparency:25,
		maxPow:10,
		minPow:1,
		gravity:5,
		fadingFlameSpeed:3,
		yOffset:0,
		maxPowZone:'right',
		flameWidth:3,
		flameHeight:1,
		plasm:false,
		mouseEffect:false,
		cartoon:true
	});	

	$('#canvas2').fire({
		width:610,	
		height:150,
		speed:15,
		fireTransparency:70,
		transparency:25,
		maxPow:10,
		minPow:1,
		gravity:5,
		fadingFlameSpeed:3,
		yOffset:-50,
		maxPowZone:'right',
		flameWidth:3,
		flameHeight:1,
		plasm:false,
		mouseEffect:false,
		cartoon:true
	});	
	var can1 = document.getElementById('canvas1');
	var can2 = document.getElementById('canvas2');
    var dur = 3, ts = 1, ez = Power0.easeNone;
    tl = new TimelineMax();
    if(isChrome){
    	TweenMax.set("canvas", {css:{clipPath:"inset(0px 610px 0px 0px)"}});	
	    tl
	    .add("enter1")
	    .to(".goal-ind", dur, {width:"100%", ease: ez}, "enter1")
	  	.to(game, dur, {score:100, roundProps:"score", onUpdate:updateHandler, ease: ez}, "enter1")
	  	.to($(".progress-ind"), dur, {width:"33%", ease: ez}, "enter1")	
	    .add("enter2")
	    .to("#canvas1", dur, {
			clipPath: "inset(0px 1px 0px 0px)", ease:ez
	    }, "enter2")
	  	.to(game, dur, {score:200, roundProps:"score", onUpdate:updateHandler, ease:ez}, "enter2")
	  	.to($(".progress-ind"), dur, {width:"66%", ease:ez}, "enter2")	
	    .add("enter3")
	  	.to(game, dur, {score:300, roundProps:"score", onUpdate:updateHandler, ease:ez}, "enter3") 
	  	.to($(".progress-ind"), dur, {width:"100%", ease:ez}, "enter3")	
	    .to("#canvas1", dur, {
	    	clipPath: "inset(0px 0px 0px 610px)", ease:ez
	    }, "enter3")
	    .to("#canvas2", dur, {
	    	clipPath: "inset(0px 1px 0px 0px)", ease:ez
	    }, "enter3")
	    ;
    }else{
    	TweenMax.set("canvas", {css:{clip:"rect(0px 0px 200px 0px)"}});	
	    tl
	    .add("enter1")
	    .to(".goal-ind", dur, {width:"100%", ease:ez}, "enter1")
	  	.to(game, dur, {score:100, roundProps:"score", onUpdate:updateHandler, ease:ez}, "enter1")
	  	.to($(".progress-ind"), dur, {width:"33%", ease:ez}, "enter1")	
	    .add("enter2")
	    .to("#canvas1", dur, {
	    	clip: "rect(0px 610px 200px 0px)", ease:ez
	    }, "enter2")
	  	.to(game, dur, {score:200, roundProps:"score", onUpdate:updateHandler, ease:ez}, "enter2")
	  	.to($(".progress-ind"), dur, {width:"66%", ease:ez}, "enter2")	
	    .add("enter3")
	  	.to(game, dur, {score:300, roundProps:"score", onUpdate:updateHandler, ease:ez}, "enter3") 
	  	.to($(".progress-ind"), dur, {width:"100%", ease:ez}, "enter3")	
	    .to("#canvas1", dur, {
	    	clip: "rect(0px 610px 200px 610px)", ease:ez
	    }, "enter3")
	    .to("#canvas2", dur, {
	    	clip: "rect(0px 610px 200px 0px)", ease:ez
	    }, "enter3")
	    ;
    }
    tl.timeScale(ts);

    /*pauseTl();*/
	function pauseTl(){
		tl.pause();
	}

	function playTl(){
		tl.play();
	}

	function resetTl(){
		tl.tweenTo("enter1").duration(1);
	}
	/*function updateFilter(){
		var ratio = this.ratio;
		TweenMax.set("#canvas1", {css:{filter:"invert(" + ratio*100 + "%)"}} );
	}*/
	function updateHandler() {
        document.getElementById("score").innerHTML = game.score;
    }
	$("button#play").on("click", playTl);
	$("button#pause").on("click", pauseTl);
	$("button#reset").on("click", resetTl);
});