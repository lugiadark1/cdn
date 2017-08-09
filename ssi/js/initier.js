var navbar=document.getElementsByClassName("navbar")[0],
	navbarcn=navbar.className,
	navbarr=document.getElementById('navbar'),
	navbarr_links=navbarr.getElementsByTagName("a"),
    $window=$(window),
	$document=$(document),
	scrollPosition=0,
	onWindowResize=function(){
		var h=$window.height(),nh=h-scrollPosition;
		if(nh<0){ nh=0; }
		ldOnResize(h,scrollPosition);
	},
	onWindowScrolling=function(){
		scrollPosition=$window.scrollTop();
		navbar.className=navbarcn+(scrollPosition>=nbarDarkPos ? ' darked' : '');
		ldOnScroll(scrollPosition);
		onWindowResize();
	};
	for(var i=0;i<navbarr_links.length;i++){
		var j=navbarr_links[i];
	}
$document.ready(function(){
	$window.resize(onWindowResize);
	$window.scroll(onWindowScrolling);
	onWindowScrolling();
	$(document).scrollTop(0);
});
