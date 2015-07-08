var vic = vic || {};
vic.lib = vic.lib || {};
vic.lib.sliderShow = vic.lib.sliderShow || {};
(function(){
	
	sliderMethod = {
		horizon:{
			animation:function( dom, id, dir, animation ){
				var dom = $( dom );
				if( id == 0 ){
					dom.css( 'top', '0%' );
					dom.css( 'left', dir === 'next' ? '100%' : '-100%' );
					dom.animate( { left:'0%' }, animation )
				}else{
					dom.animate( { left:dir === 'next' ? '-100%' : '100%' }, animation );
				}
			}
		},
		vertical:{
			animation:function( dom, id, dir, animation ){
				var dom = $( dom );
				if( id == 0 ){
					dom.css( 'left', '0%' );
					dom.css( 'top', dir === 'next' ? '100%' : '-100%' );
					dom.animate( { top:'0%' }, animation )
				}else{
					dom.animate( { top:dir === 'next' ? '-100%' : '100%' }, animation )
				}
			}
		},
		fadeInOut:{
			animation:function( dom, id, dir, animation ){
				var dom = $( dom );
				if( id == 0 ){
					dom.css( 'left', '0%' );
					dom.css( 'top', '0%' );
					dom.css( 'width', '100%' );
					dom.css( 'height', '100%' );
					dom.hide();
					dom.fadeIn( animation );
				}else{
					dom.fadeOut( animation );
				}
			}
		}
	}
	
	function View( elem, extra ){
		this._container = elem;
		this._list = [];
		this._sliderMethod = sliderMethod[extra.direction];
		this._animation = extra.animation;
		this._container.css({
			overflow: 'hidden',
			width: '100%',
			height: '100%',
			position:'relative'
		});
	}
	
	View.prototype = {
		open:function(){
			this._container.append( $( '<div></div>' ));
			this._container.append( $( '<div></div>' ));
			var self = this;
			this._container.children().each( function( id, dom ){
				var pos = 100 * id;
				self._list.push(dom);
				var query = $( dom );
				query.css({
					position: 'absolute',
					left: pos + '%',
					top:0,
					width:'100%',
					height:'100%'
				});
			});
		},
		close:function(){
			this._container.empty();
		},
		next:function(){
			this._list.push( this._list.shift() );
			this._animationPosition( 'next' );
		},
		prev:function(){
			this._list.unshift( this._list.pop() );
			this._animationPosition( 'prev' );
		},
		getCurrentDom:function(){
			return this._list[0];
		},
		_animationPosition:function( dir ){
			for( var i = 0; i < this._list.length; ++i ){
				var dom = $( this._list[i] );
				this._sliderMethod.animation( dom, i, dir, this._animation );
			}
		}
	}
	
	function Model( data ){
		this.event= $( '<div></div>' );
		this._data = data;
		this._pid = 0;
	}
	
	Model.prototype = {
		next:function(){
			if( ++this._pid >= this._data.length )	this._pid = 0;
			this.event.trigger( 'onPidNextEvent', {pid:this._pid, data:this._data[ this._pid ]} );
		},
		prev:function(){
			if( --this._pid < 0 )	this._pid = this._data.length - 1;
			this.event.trigger( 'onPidPrevEvent', {pid:this._pid, data:this._data[ this._pid ]} );
		},
		getCurrentData:function(){
			return this._data[ this._pid ];
		},
		gotoTarget:function( tid ){
			if( tid == this._pid || tid > this._data.length - 1 )	return;
			if( tid - this._pid > 0 ){
				this._pid = tid;
				this.event.trigger( 'onPidNextEvent', {pid:this._pid, data:this._data[ this._pid ]} );
			}else{
				this._pid = tid;
				this.event.trigger( 'onPidPrevEvent', {pid:this._pid, data:this._data[ this._pid ]} );
			}
		}
	}
	
	function Controller( view, model ){
		this._view = view;
		this._model = model;
		this.event = $('<div></div>' );
	}
	
	Controller.prototype = {
		open:function(){
			this._view.open();
			var self = this;
			this._model.event.on( 'onPidNextEvent', function( e, data ){
				self._view.next();
				self.event.trigger( 'onPidChangeEvent', {
					dom:self._view.getCurrentDom(),
					data:data.data,
					pid:data.pid
				} );
			});
			this._model.event.on( 'onPidPrevEvent', function( e, data ){
				self._view.prev();
				self.event.trigger( 'onPidChangeEvent', {
					dom:self._view.getCurrentDom(),
					data:data.data,
					pid:data.pid
				} );
			});
			this.event.trigger( 'onPidChangeEvent', {
				dom:self._view.getCurrentDom(),
				data:self._model.getCurrentData(),
				pid:0
			} );
		},
		close:function(){
			this._model.event.off( 'onPidNextEvent' );
			this._model.event.off( 'onPidPrevEvent' );
			this._view.close();
			this._view = undefined;
			this._model = undefined;
			this.event = undefined;
		},
		next:function(){
			this._model.next();
		},
		prev:function(){
			this._model.prev();
		},
		gotoTarget:function( tid ){
			this._model.gotoTarget( tid );
		}
	}
	
	
	function Facade(){
		this._coll_sliderShow = {};
	}
	
	var facadeInstance;
	Facade.getInst = function(){
		if( facadeInstance == undefined ){
			facadeInstance = new Facade();
		}
		return facadeInstance;
	}
	
	Facade.prototype = {
		open:function( view, model, extra ){
			if( this._coll_sliderShow[ extra.name ] == undefined ){
				//創建sliderShow控制器
				var ssm = new Controller( 
					//創建sliderShow視圖
					new View( view, 
						{	animation:extra.animation, 
							direction:extra.direction } ),
					//創建sliderShow模型
					new Model( model )
				);
				
				//監聽sliderShow切換事件來更改視圖
				ssm.event.on( 'onPidChangeEvent', extra.onPidChangeEvent );
				
				//開始sliderShow
				ssm.open();
				this._coll_sliderShow[ extra.name ] = ssm;
			}
			return this._coll_sliderShow[ extra.name ];
		},
		close:function( name ){
			var ss = this.getSliderShow( name );
			if( ss != undefined ){
				ss.close();
				ss = undefined;
				delete this._coll_sliderShow[ name ];
			}
		},
		next:function( name ){
			var ss = this.getSliderShow( name );
			if( ss != undefined ){
				ss.next();
			}
		},
		prev:function( name ){
			var ss = this.getSliderShow( name );
			if( ss != undefined ){
				ss.prev();
			}
		},
		gotoTarget:function( name, tid ){
			var ss = this.getSliderShow( name );
			if( ss != undefined ){
				ss.gotoTarget( tid );
			}
		},
		getSliderShow:function( name ){
			return this._coll_sliderShow[ name ]
		}
	}
	
	vic.lib.sliderShow.Facade = Facade;
})();
