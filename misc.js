var now 	= new Date();
var today = now;
today.setHours(0, 0, 0, 0);



Date.prototype.addDays = function(days) {
	  var dat = new Date(this.valueOf());
	  dat.setDate(dat.getDate() + days);
	  return dat;
};

/** GLOBAL Parameters **/
var passengerTypeNames = ["ADULT","CHILD","INFANT","MILITARY","STUDENT","YOUTH","SENIORCITIZEN"];

function is_numeric(str) {
    return /^[- +()]*[0-9][- +()0-9]*$/.test(str);
}

function is_email(str) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
}

function stringToDate(str,delim){
	if(typeof str == 'undefined'  || str == null || typeof delim == 'undefined')
		return new Date();
	if(str.length != 10){
		return null;
	}
	if(delim == null)
		delim = '.';
	var _str = str.split(delim);

	if (delim == '.') {
	    return new Date(parseInt(_str[2]), parseInt(_str[1]) - 1, parseInt(_str[0]),0,0,0);
	} else {
	    return new Date(parseInt(_str[0]), parseInt(_str[1]) - 1, parseInt(_str[2]),0,0,0);
	}
}

function stringToLocalDate(str,delim){
    if(typeof str == 'undefined' || str == null || typeof delim == 'undefined')
        return new Date();
    if(str.length != 10){
        return null;
    }
    if(delim == null)
        delim = '-';
    var _str = str.split(delim);
    /* TODO: delim için kontrol eklenebilir.  */
   
    return {day: parseInt(_str[2]), month: parseInt(_str[1]), year: parseInt(_str[0])};
}

function dateToString(date, delim){
	  var year = date.getFullYear();
	  var month = (1 + date.getMonth()).toString();
	  month = month.length > 1 ? month : '0' + month;
	  var day = date.getDate().toString();
	  day = day.length > 1 ? day : '0' + day;
	  if (delim == "-") {
	      return year + delim + month + delim + day;
	  }
	  else {
	      return day + delim + month + delim + year; 
	  }
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function clearPlaceHolder(str){
	return str.replace(/\_/g, '').replace(/\ /g, '').replace(/\./g, '');
}

var app = {};
app.cookie = {
    /* set cookies */
    setCookie: function(name, value, exp, inMinutes) {
        var newExp = exp == null? 7 : exp;
        var exdate = new Date();
            if(inMinutes != null && inMinutes == true){
                exdate.setMinutes(exdate.getMinutes() + newExp);
            } else {
                exdate.setDate(exdate.getDate() + newExp);
            }
        var cookieValue = escape(value) + "; expires="+exdate.toUTCString() + "; path=/";
        document.cookie = name + "=" + cookieValue;
    },
 
    /* retrieve the value of a cookie */
    getCookie: function(name) {
        var i,x,y,ARRcookies = document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++){
            x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if (x==name){
                var value = unescape(y);
                return value;
            }
        }
        return null;
    }, 
    getDecodedCookie: function(name) {
        var i,x,y,ARRcookies = document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++){
            x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if (x==name){
                var value = decodeURIComponent(y);
                return value;
            }
        }
        return null;
    }, 
 
    /* delete cookies (set expiration time in the past) */
    deleleCookie: function() {
        this.setCookie(name, '', -365);
    },
    deleteCookie : function (name) {
    		if(typeof name === "undefined" || name == null ){
    			return;
    		}
    	
    	 	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

function copyText(el) {
	// resolve the element
	el = (typeof el === 'string') ? document.querySelector(el) : el;

	// handle iOS as a special case
	if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

		// save current contentEditable/readOnly status
		var editable = el.contentEditable;
		var readOnly = el.readOnly;

		// convert to editable with readonly to stop iOS keyboard opening
		el.contentEditable = true;
		el.readOnly = true;

		// create a selectable range
		var range = document.createRange();
		range.selectNodeContents(el);

		// select the range
		var selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		el.setSelectionRange(0, 999999);

		// restore contentEditable/readOnly to original state
		el.contentEditable = editable;
		el.readOnly = readOnly;
	} else {
		try {
			el.select();
		} catch (e) {
			var newRange = window.getSelection().getRangeAt(0);
			newRange.selectNode(el);
			window.getSelection().addRange(newRange);
		}

	}

	// execute copy command
	document.execCommand('copy');
}

function clipboard(selectorId){
    var mydata = document.createElement("input");
    document.body.appendChild(mydata);
    mydata.setAttribute("id", "mydata_id");
    document.getElementById("mydata_id").value= $(document).find("#" + selectorId).html();
    mydata.select();
    document.execCommand("Copy");
    document.body.removeChild(mydata);
}

(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
      // If the exp is undefined or zero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // If the value is not a number or the exp is not an integer...
      if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // If the value is negative...
      if (value < 0) {
        return -decimalAdjust(type, -value, exp);
      }
      // Shift
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
      Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
      };
    }
    // Decimal floor
    if (!Math.floor10) {
      Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
      };
    }
    // Decimal ceil
    if (!Math.ceil10) {
      Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
      };
    }
  })();


function multilanguageMessage(number, fmt) {
	try {
		if (number == 1) {
			return messages[fmt + "0"];
		} else if ( number > 1 && number < 5) {
			return messages[fmt + "1"];
		} else {
			return messages[fmt + "2"];
		}
	} catch (e) {
		 return "";
	}
}

function isOutsideOfElement(e, elemId) {
    var flyoutElement = document.getElementById(elemId),
    targetElement = e.target; 

	do {
	    if (targetElement == flyoutElement) {
	        return false;
	    }
	    targetElement = targetElement.parentNode;
	} while (targetElement);
	
	return true;
}