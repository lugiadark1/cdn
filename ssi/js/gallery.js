$(document).ready(function(){
	var path="img/gallery/",
		galleryc=document.getElementsByClassName("gallery-mod")[0],
		imagesc=galleryc.getElementsByClassName("gallery-img"),
		fullc=galleryc.getElementsByClassName("full")[0],
		fullcc=fullc.getElementsByClassName("frame")[0],
		exitb=fullc.getElementsByClassName("exit")[0],
		onClick=function(){
			fullcc.style.backgroundImage="url('"+this.galleryImage+"')";
			fullc.className="full";
		};
	exitb.onclick=function(){
		fullc.className="full hidden";
	}
	for(var i=0;i<imagesc.length;i++){
		var a=imagesc[i],
			ap=a.getAttribute("gallery-name"),
			node=document.createElement("div"),
			pathap=path+ap;
		node.onclick=onClick;
		node.galleryImage=pathap;
		node.style.backgroundImage="url('"+pathap+"')";
		a.appendChild(node);
	}
});