var leo = leo || {};
leo.utils = leo.utils || {};
(function(){
	function checkValidName( name, error ) {
		if( name.length < 2 ){
			alert( error );	
			return false;
		}
		return true;
	}

	function checkValidEmail( email, error ){
		var reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
		if( reg.test( email ) )	return true;
		alert( error );
		return false;
	}
	
	function checkValidNumber( number, error ){
		if( number.length > 5 )	return true;
		alert( error );
		return false;
	}

	function checkValidPhoneNumber( number, error ){
		var reg = /^[09]{2}[0-9]{8}$/;
		if( reg.test( number ) )	return true;
		alert( error );
		return false;
	}

	function checkValidAddress( address, error ){
		if( address.length < 7 ){
			alert( error );	
			return false;
		}
		return true;
	}
	
	function getHash() {
		var tmpv = {};
		var tmp = window.location.search.substring(1);
		var tmpary = tmp.split("&");
		for (var i = 0; i < tmpary.length; i++) {
			var pair = tmpary[i].split("=");
			if (typeof tmpv[pair[0]] === "undefined") {
				tmpv[pair[0]] = pair[1];
			} else if (typeof tmpv[pair[0]] === "string") {
				var arr = [tmpv[pair[0]], pair[1]];
				tmpv[pair[0]] = arr;
			} else {
				tmpv[pair[0]].push(pair[1]);
			}
		}
		return tmpv;
	}
	
	function getScreenWidth(){
		var asize = window.screen.availWidth;
		var bsize = window.innerWidth;
		var csize = document.documentElement.clientWidth;
		var min = Math.min( asize, bsize );
		min = Math.min( asize, csize );
		return min;
	}
	
	function getScreenHeight(){
		var asize = window.screen.availHeight;
		var bsize = window.innerHeight;
		var csize = document.documentElement.clientHeight;
		var min = Math.min( asize, bsize );
		min = Math.min( asize, csize );
		return min;
	}
	
	function addMouseWheelEvent( jdom, func ){
		jdom.on( 'DOMMouseScroll mousewheel wheel', function( event ){
			var delta  = event.originalEvent.deltaY ||
						event.originalEvent.wheelDelta  ||
						event.originalEvent.detail;
			
			if( detectBrowser().isSafari || isIE8Browser() ) delta *= -1;
			func( {delta :delta } );
		});
	}
	
	function removeMouseWheelEvent( jdom ){
		jdom.off( 'DOMMouseScroll mousewheel wheel' );
	}
	
	function detectBrowser(){
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
			// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
			// At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
		return {
			isOpera:isOpera,
			isFirefox:isFirefox,
			isSafari:isSafari,
			isChrome:isChrome,
			isIE:isIE
		}
	}
	
	function isIE8Browser() {
		var rv = -1;
		var ua = navigator.userAgent;
		var re = new RegExp("Trident\/([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseFloat(RegExp.$1);
		}
		return (rv == 4);
	}
	
	function isMobile(){
		var mobiles = new Array
            (
                "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
                "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
                "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
                "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
                "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
                "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
                "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
                "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
                "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
                "iPod", "incognito", "webmate", "dream", "cupcake", "webos",
                "s8000", "bada", "googlebot-mobile"
            )
 
		var ua = navigator.userAgent.toLowerCase();
		var isMobile = false;
		for (var i = 0; i < mobiles.length; i++) {
			if (ua.indexOf(mobiles[i]) > 0) {
				isMobile = true;
				break;
			}
		}
		return isMobile;
	}
	
	function getAge(year,month,date){
		var today = new Date();
		var dob = new Date();
		dob.setFullYear(year);
		dob.setMonth(month-1);
		dob.setDate(date);
		var timeDiff = today.valueOf() - dob.valueOf();
		var milliInDay = 24*60*60*1000;
		var noOfDays = timeDiff / milliInDay;
		var daysInYear = 365.242;
		return noOfDays / daysInYear;
	}
	
	leo.utils.checkValidName = checkValidName;
	leo.utils.checkValidEmail = checkValidEmail;
	leo.utils.checkValidNumber = checkValidNumber;
	leo.utils.checkValidPhoneNumber = checkValidPhoneNumber;
	leo.utils.checkValidAddress = checkValidAddress;
	leo.utils.isMobile = isMobile;
	leo.utils.getHash = getHash;
	leo.utils.getScreenWidth = getScreenWidth;
	leo.utils.getScreenHeight = getScreenHeight;
	leo.utils.addMouseWheelEvent = addMouseWheelEvent;
	leo.utils.removeMouseWheelEvent = removeMouseWheelEvent;
	leo.utils.isIE8Browser = isIE8Browser;
	leo.utils.detectBrowser = detectBrowser;
	leo.utils.getAge = getAge;
})();