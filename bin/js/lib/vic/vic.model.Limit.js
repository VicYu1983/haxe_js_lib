/**
 * ...
 * @author vic
 */
window.vic = window.vic || {};
window.vic.model = window.vic.model || {};
(function() {
	
	function Limit( ary_data, id, loop ){
		this.id = ( id == undefined ? 0 : id );
		this.loop = ( loop == undefined ? true : false );
		this.ary_data = ary_data;
		this.max = this.ary_data.length - 1;
		this.event = $( '<div></div>' );
		this.hasPrev = true;
		this.hasNext = true;
	}
	
	Limit.prototype.prev = function(){
		if( --this.id < 0 ){
			if( this.loop )
				this.id = this.max;
			else{
				this.id = 0;
				return;
			}
		}
		this.checkHasPrevNext();
		this.event.trigger( 'onLimitIdChange', {id:this.id, 
												data:this.ary_data[this.id],
												hasPrev:this.hasPrev,
												hasNext:this.hasNext});
	}
	
	Limit.prototype.next = function(){
		if( ++this.id > this.max ){
			if( this.loop )
				this.id = 0;
			else{
				this.id = this.max;
				return;
			}
		}
		this.checkHasPrevNext();
		this.event.trigger( 'onLimitIdChange', {id:this.id, 
												data:this.ary_data[this.id],
												hasPrev:this.hasPrev,
												hasNext:this.hasNext});
	}
	
	Limit.prototype.checkHasPrevNext = function(){
		this.hasPrev = ( this.id != 0 );
		this.hasNext = ( this.id != this.max );
	}
	window.vic.model.Limit = Limit;
})();