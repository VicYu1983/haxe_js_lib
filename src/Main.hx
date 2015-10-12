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
		
		var sss = 'S123';
		
		switch( sss ) {
			case fs if ( fs.substr( 0, 1 ) == 'S' ):
				switch( fs ) {
					case _fs if ( _fs.substr( 1, 3 ) == '123' ):
						trace( _fs );
				}
				
		}
	}
	
}