var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function generateRandomString() {
    var array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

// Calculate the SHA256 hash of the input text. 
// Returns a promise that resolves to an ArrayBuffer
function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

// Base64-urlencodes the input string
function base64urlencode(str) {
    // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
    // btoa accepts chars only within ascii 0-255 and base64 encodes them.
    // Then convert the base64 encoded to base64url encoded
    //   (replace + with -, replace / with _, trim trailing =)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function pkceChallengeFromVerifier(v) {
    hashed = await sha256(v);
    return base64urlencode(hashed);
}

var getAuthorizationCode = async function() {
    var state = randomString(20);
    var codeVerifier = randomString(100);
    localStorage.setItem('codeVerifier', codeVerifier);
    var codeChallenge = await pkceChallengeFromVerifier(codeVerifier);
    authCodeConfig.state = state;
    authCodeConfig.code_challenge = codeChallenge;
    authCodeConfig.code_challenge_method = 'S256';
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
