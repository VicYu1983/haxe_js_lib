package;

import js.Lib;

/**
 * ...
 * @author vic
 */
class Main 
{
	
	static function main() 
	{
		//var b2World:Dynamic = untyped __js__( 'b2World' );
		var wab = Type.createInstance( untyped __js__( 'b2AABB' ), [] );
		var b2w = Type.createInstance( untyped __js__( 'b2World' ), [ wab ] );
		b2w.Step();
		trace( b2w );
	}
	
}