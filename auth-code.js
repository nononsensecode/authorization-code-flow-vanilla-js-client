var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var getAuthorizationCode = function() {
    var state = randomString(20);
    authCodeConfig.state = state;
    var authParams = createParams(authCodeConfig, true);
    window.location = urlConfig.auth_url + authParams;
};

window.onload = function() {
    var urlWithAuthCode = new URL(window.location.href);
    var authCode = urlWithAuthCode.searchParams.get('code');
    if (authCode) {
        localStorage.setItem('authCode', authCode);
        window.location = 'access-token.html';
    }
}
