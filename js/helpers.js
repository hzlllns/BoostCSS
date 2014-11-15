//clean array elements by value
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


//generate unique id
var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
})();

//set cookie
function setCookie(cookieName, cookieValue, expDays) {
    var date = new Date();
    date.setTime(date.getTime() + (expDays*24*60*60*1000));
    var expires = "expires="+date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

//get coockie
function getCookie(cookieName) {
    var key = cookieName + "=";
    var cookies = document.cookie.split(';');
    for(var i=0; i<cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0)==' ') cookie = cookie.substring(1);
        if (cookie.indexOf(key) != -1) return cookie.substring(key.length, cookie.length);
    }
    return "";
}


//month array
var m_names = new Array("Jan", "Feb", "Mar", 
    "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
    "Oct", "Nov", "Dec");