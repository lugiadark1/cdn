var navHeight=60,
	nbarDarkPos=100,
	windowHeight=600,
	ldOnScroll=function(){},
	ldOnResize=function(height,scroll){
		windowHeight=height;
		for(var i=0;i<covers.length;i++){
			var cover=covers[i],parent=cover.container,
				nHeight=height*cover.height,
				heightscroll=nHeight-scroll;
			parent.className=cover.containercn+(heightscroll<200 ? " toosmall" : "");
			parent.style.height=nHeight+"px";
			cover.node.style.height=heightscroll+"px";
			nbarDarkPos=nHeight-navHeight-5;
		}
	},
	covers=[],
	coverNodes=document.getElementsByClassName("ldCover");
for(var i=0;i<coverNodes.length;i++){
	var a=coverNodes[i],height=1,hh=Number(a.getAttribute("cover-height"));
	covers.push({
		node: a.getElementsByClassName("ldWrapper")[0],
		container: a,
		containercn: a.className,
		height: ((hh!==hh || hh<1 || hh>99) ? 1 : hh/100)
	});
}
$(document).ready(function(){
	var m=new Moduler({main: [
		function(node){
			node.style.display='none';
		},function(node){
			node.style.display='block';
		}
	]},'home');
	m.onCallerClick=function(c,module){
		$('html, body').animate({
	        scrollTop: $(module).offset().top-navHeight
	    }, 600);
	}
});