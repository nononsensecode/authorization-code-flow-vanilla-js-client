var createParams = function(paramsArray, isGet) {
    var params = '';
    var index = 1;
    for (var key of Object.keys(paramsArray)) {
        if (index == 1 && isGet) {
            params += '?';
        }
        params += key + '=' + paramsArray[key];
        if (index < Object.keys(paramsArray).length) {
            params += '&';
        }
        index++;
    }
    return params;
}