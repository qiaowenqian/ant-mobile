const React = require('react');
export default class Url extends React.Component {
    static getQueryString(name) {
		 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
	}
    static funcUrlDel(name){
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name)>-1) {
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            delete obj[name];
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
            return url
        };
    }
    //计算日期相差天数 
    static  DateDiff(s1){ 
	   	var	s1 = new Date(s1.replace(/-/g, "/"));
		var s2 = new Date();
		var days = s2.getTime() - s1.getTime();
		var time = parseInt(days / (1000 * 60 * 60 * 24));
		if(s1>s2){
			time = (-(time))+1
		}else{
			time = (-(time));
		}
       return  time  
    }
}