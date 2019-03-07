function beforeAfterCheck(inside) {
	// https://codepen.io/nosurprisethere/pen/xrXjYV
	Array.from((inside||document).querySelectorAll('.before-after')).forEach(function(container) {
		beforeAfterCheck_once(container);
	});
}
function beforeAfterCheck_once(container) {
	// https://codepen.io/nosurprisethere/pen/xrXjYV
	if (!beforeAfterCheck_once._container) beforeAfterCheck_once._container = [];
	if (beforeAfterCheck_once._container.indexOf(container)>-1) return;
	beforeAfterCheck_once._container.push(container);
	console.log(container);
	var active = false;
	setTimeout(function() {
		if (active) return;
		if (container) container.classList.add('is-new');
	}, 1*1000);
	setTimeout(function() {
		if (container) container.classList.remove('is-new');
	}, 3*1000);
	var scroller = container.querySelector('.before-after-scroller');
	scroller.addEventListener('mousedown',function(){
		if (!scroller) return;
		active = true;
		// Add our scrolling class so the scroller has full opacity while active
		scroller.classList.add('scrolling');
	});
	document.body.addEventListener('mouseup',function(){
		if (!scroller) return;
		active = false;
		scroller.classList.remove('scrolling');
	});
	document.body.addEventListener('mouseleave',function(){ // khm)
		if (!scroller) return;
		active = false;
		scroller.classList.remove('scrolling');
	});
	document.body.addEventListener('mousemove',function(e){
		if (!scroller) return;
		if (!active) return;
		// Their mouse is here...
		let x = e.pageX;
		// but we want it relative to our wrapper
		x -= container.querySelector('.before-after-wrapper').getBoundingClientRect().left;
		// Okay let's change our state
		scrollIt(x);
	});
	function scrollIt(x){
		let transform = Math.max(0,(Math.min(x,container.querySelector('.before-after-wrapper').offsetWidth)));
		container.querySelector('.before-after-after').style.width = transform+"px";
		container.querySelector('.before-after-scroller').style.left = transform-25+"px";
	}
	scroller.addEventListener('touchstart',function(){
		if (!scroller) return;
		active = true;
		scroller.classList.add('scrolling');
	}, {passive: true});
	document.body.addEventListener('touchend',function(e){
		if (!scroller) return;
		active = false;
		scroller.classList.remove('scrolling');
		e.preventDefault();
	}, {passive: false});
	document.body.addEventListener('touchcancel',function(){
		if (!scroller) return;
		active = false;
		scroller.classList.remove('scrolling');
	});
	document.body.addEventListener('touchmove',function(e){
		if (!scroller) return;
		if (!active) return;
		e.preventDefault();
	}, {passive: false});
	document.body.addEventListener('touchmove',function(e){
		if (!scroller) return;
		if (!active) return;
		// Their mouse is here...
		let x = ((e.changedTouches||e.touches)[0]||{}).pageX;
		if (!x) return;
		// but we want it relative to our wrapper
		x -= container.querySelector('.before-after-wrapper').getBoundingClientRect().left;
		// Okay let's change our state
		scrollIt(x);
	});
	scrollIt(150);
}
beforeAfterCheck();
document.addEventListener("DOMContentLoaded", function(event) {
	setTimeout(beforeAfterCheck, 0.1*1000);
});
