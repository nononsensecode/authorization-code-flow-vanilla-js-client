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
    var authParams = 'client_id=spa-heroes&redirect_uri=http://localhost:8000&scope=heroes openid&state=' + state + '&response_type=code';
    var authUrl = 'http://localhost:9000/auth/realms/heroes/protocol/openid-connect/auth' + '?' + authParams;
    window.location = authUrl;
};

window.onload = function() {
    var urlWithAuthCode = new URL(window.location.href);
    var authCode = urlWithAuthCode.searchParams.get('code');
    if (authCode) {
        localStorage.setItem('authCode', authCode);
        localStorage.setItem('redirectUri', 'http://localhost:8000');
        window.location = 'access-token.html';
    }
}
