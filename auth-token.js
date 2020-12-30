window.onload = function() {
    var authCode = localStorage.getItem('authCode');
    var redirectUri = localStorage.getItem('redirectUri');
    if (authCode) {
        var authRequest = new XMLHttpRequest();
        var tokenUrl = 'http://localhost:9000/auth/realms/heroes/protocol/openid-connect/token';
        authRequest.open('POST', tokenUrl, true);
        authRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8;');
        authRequest.onload = function() {
            var tokenBody = {};
            try {
                tokenBody = JSON.parse(authRequest.response);
            } catch(e) {
                console.error(e);
            }
            if (authRequest.status == 200) {
                document.getElementById('access_token').innerText = tokenBody.access_token;
                document.getElementById('refresh_token').innerText = tokenBody.refresh_token;
                localStorage.setItem('accessToken', tokenBody.access_token);
                localStorage.setItem('refreshToken', tokenBody.refresh_token);
            } else {
                document.getElementById('access_token').innerText = tokenBody.error;
            }
        };
        var tokenParams = 'grant_type=authorization_code&client_id=spa-heroes&redirect_uri=' + redirectUri + '&code=' + authCode;
        authRequest.send(tokenParams);
    }
}

var getHeroes = function() {
    var accessToken = localStorage.getItem('accessToken');
    var refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
        var heroRequest = new XMLHttpRequest();
        var heroUrl = 'http://localhost:10001/api/heroes';
        heroRequest.open('GET', heroUrl, true);
        heroRequest.setRequestHeader('Content-Type', 'application/json');
        heroRequest.setRequestHeader('authorization', 'Bearer ' + accessToken);
        heroRequest.onload = function() {
            var heroes = '';
            try {
                heroes = JSON.stringify(heroRequest.response);
            } catch(e) {
                console.error(e);
            }
            document.getElementById('heroes').innerText = heroes;            
        }
        heroRequest.send();
    }
};