package testMacro;

/**
 * ...
 * @author vic
 */
@:build( testMacro.Profiler.profile() )
class SomeClass
{

	public function new() 
	{
		
	}
	
	public function doSomething():Void {
		var x = 0.0;
		for ( i in 0...100000 ) {
			x += .1;
		}
	}
}