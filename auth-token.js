window.onload = function() {
    var authCode = localStorage.getItem('authCode');
    if (authCode) {
        var authRequest = new XMLHttpRequest();
        authRequest.open('POST', urlConfig.token_url, true);
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
        authTokenConfig.code = authCode;
        authTokenConfig.code_verifier = localStorage.getItem('codeVerifier');
        tokenParams = createParams(authTokenConfig, false);
        authRequest.send(tokenParams);
    }
}

var getHeroes = function() {
    var accessToken = localStorage.getItem('accessToken');
    var refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
        var heroRequest = new XMLHttpRequest();
        heroRequest.open('GET', urlConfig.heroes_url, true);
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