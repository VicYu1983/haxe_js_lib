var myapp = myapp || {};
myapp.facebook = myapp.facebook || {};
(function(){
	
	function init( appId, callback ){
		window.fbAsyncInit = function() {
			myapp.facebook.FB = FB;
			FB.init({
			  appId      : appId,
			  xfbml      : true,
			  version    : 'v2.2'
			});
			if(callback !=undefined)	callback();
		};
		
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
	function login( callback, error ){
		FB.login( function( res ){
			if (res.authResponse) {
				callback( res.authResponse );
			}else{
				if( error != undefined )	error( res );
			}
		});
		/*
		var _status="";
		FB.getLoginStatus( function( res ){
			_status=res.status;
			_authResponse =res.authResponse; 
			if(_status!="connected"){  
				FB.login( function( res ){
					if (res.authResponse) {
						callback( res.authResponse );
					}else{
						if( error != undefined )	error( res );
					}
				});
			}else{
				console.log(res);			
				callback(_authResponse );
			}	
		});	
		*/
	}
	function getLoginStatus( callback ){
		FB.getLoginStatus( function( res ){
			callback( res.status, res.authResponse, res );
		});
	}
	function postMessageToMyboard( e, options ){
			FB.ui({
				method: 'feed', // 發布貼文
				name: options.name,
				link: options.link + '?id=' + e.id,
				picture: options.picture,
				caption: options.caption,
				description: options.description
			},function(response){
			
				options.callback( e, response );
			});
	}
	function getData( id, callback ){
		FB.api(
			id,
			function (response) {
				callback( response );
			}
		);
	}
	function getMyData( callback ){
		FB.api(
			"/me",
			function (response) {
				callback( response );
			}
		);
	}
	function shareWithLoginAndGetMe(options,error){
		//FB.getLoginStatus( function( res ){
		//	_status=res.status;
		//	if(_status!="connected"){  
				FB.login( function( res ){
					if (res.authResponse) {
						getMyData(function (e) {
							postMessageToMyboard(e,options);
						});
					}else{
						if( error != undefined )	error( res );
					}
				});	
		//	}else{		
		//		getMyData(function (e) {
		//			postMessageToMyboard(e,options);
		//		});
		//	}			
	//	});
	}
	
	myapp.facebook.init = init;
	myapp.facebook.login = login;
	myapp.facebook.getLoginStatus = getLoginStatus;
	myapp.facebook.postMessageToMyboard = postMessageToMyboard;
	myapp.facebook.getData = getData;
	myapp.facebook.getMyData = getMyData;
	myapp.facebook.shareWithLoginAndGetMe = shareWithLoginAndGetMe;
})();
