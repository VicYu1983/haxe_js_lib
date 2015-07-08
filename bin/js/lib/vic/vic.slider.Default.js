/**
 * ...
 * @author vic
 */
window.vic = window.vic || {};
window.vic.slider = window.vic.slider || {};
(function() {
	var Limit = window.vic.model.Limit;
	function SliderDefault( args ){
		this.ary_data = args.ary_data;
		this.gap = args.gap;
		this.event = $('<div></div>' );
		this.model = new Limit( this.ary_data, 0, false );
		this.totalDistance;
		this.ary_pos = [];
		this.ary_obj = [];
		this.totalDistance = this.ary_data.length * this.gap;
		var self = this;
		for( var i = 0; i < this.ary_data.length; ++i ){
			var pos = i * this.gap - this.totalDistance / 2 ;
			var div = $('<div></div>' );
			this.ary_pos.push( pos );
			this.ary_obj.push( {id:i, data:this.ary_data[i], div:div } );
		}
		_.each( _.range( Math.floor( self.ary_data.length / 2 )), function( num ){
			self.ary_pos.push( self.ary_pos.shift() );
		});
	}
	
	SliderDefault.prototype.build = function(){
		var self = this;
		/*
		this.totalDistance = this.ary_data.length * this.gap;
		for( var i = 0; i < this.ary_data.length; ++i ){
			var pos = i * this.gap - this.totalDistance / 2 ;
			var div = $('<div></div>' );
			this.ary_pos.push( pos );
			this.ary_obj.push( {id:i, data:this.ary_data[i], div:div } );
		}
		_.each( _.range( Math.floor( self.ary_data.length / 2 )), function( num ){
			self.ary_pos.push( self.ary_pos.shift() );
		});
		*/
		_.each( _.zip( this.ary_obj, this.ary_pos ), function( pairs ){
			self.event.trigger( 'onSliderDefaultCreateDiv', { data:pairs[0], pos:pairs[1] } );
		});
	}
	
	SliderDefault.prototype.open = function(){
		var self = this;
		this.model.event.on( 'onLimitIdChange', function( evt, args ){
			self.moveCard( args.id );
		});
	}
	
	SliderDefault.prototype.close = function(){
		this.model.event.off( 'onLimitIdChange' );
	}
	
	SliderDefault.prototype.prev = function(){
		this.model.prev();
	}
	
	SliderDefault.prototype.next = function(){
		this.model.next();
	}
	
	SliderDefault.prototype.moveCard = function( nowid ){
		var self = this;
		_.each( this.ary_obj, function( obj ){
			var div = obj.div;
			var divid = obj.id;
			var newposid = divid + nowid;
			var posid = newposid > self.ary_pos.length - 1 ? newposid - self.ary_pos.length : newposid;
			self.event.trigger( 'onSliderDefaultMoveCard', {div:div, pos:self.ary_pos[ posid ], posid:posid} );
		});
	}
	
	window.vic.slider.SliderDefault = SliderDefault;
	
})();