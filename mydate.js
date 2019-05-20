Date.prototype.addDays = function (days) {
    return new Date(this.valueOf() + days * 864e5);
}

function convertStrToDate(str) {
    var dArr = str.split('-');
    return new Date(dArr[2], dArr[1], dArr[0]);
}

function convertDateToString(date) {
    return  ('0' + date.getDate()).slice(-2) + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear();
}



var mydate = function () {

    
}