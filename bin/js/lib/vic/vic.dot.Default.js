/**
 * ...
 * @author vic
 */
 
window.vic = window.vic || {};
window.vic.dot = window.vic.dot || {};
(function() {
	
	function DotDefault( args ){
		this.countPerPage = args.countPerPage;
		this.ary_data = args.ary_data;
		this.ary_div = [];
		this.gap = args.gap;
		this.event = $('<div></div>');
	}
	
	DotDefault.prototype.build = function(){
		var dotCount = Math.ceil( this.ary_data.length / this.countPerPage );
		this.createDot( dotCount );
	}
	
	DotDefault.prototype.createDot = function( _dotCount ){
		var self = this;
		var totalDistance = _dotCount * this.gap;
		for( var i = 0; i < _dotCount; ++i ){
			var pos = i * this.gap - totalDistance / 2 ;
			var div = $('<div></div>' );
			div.attr( 'id', i );
			div.css( 'left', pos + 'px' );
			div.click( self.onDotClick( self ) );
			self.ary_div.push( div );
			self.event.trigger( 'onDotCreate', {div:div, id:i} );
		}
	}
	
	DotDefault.prototype.onDotClick = function( self ){
		return function(){
			var sid = this.id * self.countPerPage;
			var eid = ( sid + self.countPerPage ) > ( self.ary_data.length - 1 ) ? self.ary_data.length : ( sid + self.countPerPage );
			var newdata = self.ary_data.slice( sid, eid );
			self.event.trigger( 'onDotClick', {div:$( this ), id:this.id, allDiv:self.ary_div, data:newdata} );
		}
	}
	
	DotDefault.prototype.close = function(){
		
	}
	
	window.vic.dot.DotDefault = DotDefault;
})();