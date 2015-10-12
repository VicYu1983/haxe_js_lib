(function (console) { "use strict";
var HxOverrides = function() { };
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Main = function() { };
Main.main = function() {
	var sss = "S123";
	var fs = sss;
	if(HxOverrides.substr(fs,0,1) == "S") {
		var _fs = fs;
		if(HxOverrides.substr(_fs,1,3) == "123") console.log(_fs);
	}
};
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=haxejslib.js.map