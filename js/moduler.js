var Moduler=function(typesCallback,homeModule){
	if(!Moduler.f){
		var _self=this,
			_callers=[],
			_components={},
			_componentsT={},
			_typesCallback={};
		if(typesCallback && typeof typesCallback==='object'){ _typesCallback=typesCallback; }
		this.onCallerClick=function(context,component){};
		this.addCaller=function(context,component,callback){ return _addCaller(context,component,callback); }
		function _noParent(node){
			var parent=node.parentNode;
			if(parent===null || parent===document){ return true; }
			var id=parent.getAttribute('moduler-id');
			return (typeof id==='string' && id.length>0 ? false : _noParent(parent));
		}
		function _bubbleComponent(c){
			if(c.parent!==null){ _bubbleComponent(c.parent); }
			if(c.type!==null && _typesCallback[c.type] instanceof Array){
				var tc=_typesCallback[c.type],
					any=tc[0],
					one=tc[1];
				if(typeof one==='function'){ one(c.node); }
				if(typeof any==='function'){
					var cc=_componentsT[c.type];
					for(var i=0,j;i<cc.length;i++){
						j=cc[i];
						if(j.node!==c.node){ any(j.node); }
					}	
				}
			}
		}
		function _onCallerClick(context,component){
			var componentObj=_components[component];
			_bubbleComponent(componentObj);
			_self.onCallerClick(context,componentObj.node);
			return false;
		}
		function _addCaller(context,component,cb){
			if(_components[component]){
				if(typeof cb!=="function"){ cb=function(){}; }
				_callers.push(context);
				context.onclick=function(){ _onCallerClick(context,component); cb(context,component); }
				return true;
			}
			return false;
		}
		function _addComponent(node,parent,key){
			if(parent!==null || _noParent(node)){
				var id=node.getAttribute("moduler-id"),
					type=node.getAttribute("moduler-type"),
					idFull=key+id;
				if(typeof id==='string' && id!=="" && _components[idFull]===undefined){
					var data={
							node: node,
							parent: parent,
							type: type
						},children=node.getElementsByClassName("moduler-cmp");
					_components[idFull]=data;
					if(typeof type==='string' && type.length>0){
						if(!(_componentsT[type] instanceof Array)){ _componentsT[type]=[]; }
						_componentsT[type].push(data);
					}
					for(var i=0;i<children.length;i++){
						_addComponent(children[i],data,idFull+".");
					}
					return idFull;
				}
			}
			return false;
		}
		var cmpo=document.getElementsByClassName("moduler-cmp"),
			callerso=document.getElementsByClassName("moduler-caller");
		for(var i=0;i<cmpo.length;i++){
			_addComponent(cmpo[i],null,'');
		}
		for(var i=0,j,k;i<callerso.length;i++){
			j=callerso[i];
			k=j.getAttribute('moduler-call');
			if(typeof k==='string'){ _addCaller(callerso[i],k); }
			else{ console.log(j,"moduler-call must be set as attribute!"); }
		}
		if(typeof homeModule==='string' && typeof _components[homeModule]!=='undefined'){
			_bubbleComponent(_components[homeModule]);
		}
		/*Moduler.cmp=_components;
		Moduler.cmpt=_componentsT;*/
	}
	Moduler.f=this;
};
Moduler.f=false;