var fontIconLoader = require("icomoonlib");
var dialogBox = require("psdialog");

var accessToken = null;
var accessTokenSecret = null;

///////////LOAD ACCESS TOKEN
loadAccessToken = function(pService) {

    Ti.API.info('Loading access token for service [' + pService + '].');

    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
    if (file.exists() == false) {
        return;
    }
    var contents = file.read();
    if (contents == null) {
        return;
    }
    var config;
    try {
        config = JSON.parse(contents.text);
    } catch(ex) {
        return;
    }
    if (!config) {
        return;
    }
    if (config.accessToken) {
        accessToken = config.accessToken;
    }
    if (config.accessTokenSecret) {
        accessTokenSecret = config.accessTokenSecret;
    }

    Ti.API.info('Loading access token: done [accessToken:' + accessToken + '][accessTokenSecret:' + accessTokenSecret + '].');
};
///////////SAVE ACCESS TOKEN
saveAccessToken = function(pService) {
    Ti.API.info('Saving access token [' + pService + '].');
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
    if (file == null) {
        file = Ti.Filesystem.createFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
    }
    file.write(JSON.stringify({
        accessToken : accessToken,
        accessTokenSecret : accessTokenSecret
    }));
    Ti.API.info('Saving access token: done.');
};

///////////CLEAR ACCESS TOKEN
clearAccessToken = function(pService) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
    if (file == null) {
        file = Ti.Filesystem.createFile(Ti.Filesystem.applicationDataDirectory, pService + '.config');
    }
    file.write(JSON.stringify({
        accessToken : null,
        accessTokenSecret : null
    }));
    accessToken = null;
    accessTokenSecret = null;
};

var Codebird = require("codebird");
var cb = new Codebird();
///////////SET TWEET FUNCTION


function setTweet() {
    cb.__call("statuses_update", {
        "status" : _message
    }, function(reply) {
        Ti.API.info("Tweet Successful");
        
        if (reply.httpstatus == 200) {
             dialogBox.loadCustomDialog("Tweet", Alloy.CFG.Languages.twitterShareSuccess);
		} else {
            alert(reply.errors[0].message);
       }
    });
}
var _message = "";
exports.tweet = function(message, key, secret){
	_message = message;
	cb.setConsumerKey(key,secret);
	
	var window = Ti.UI.createWindow({
    	height : Ti.UI.FILL,
    	width : Ti.UI.FILL,
    	layout : "vertical",
    	backgroundColor : "#FFF"
    });
    
    var closeImgView = Ti.UI.createImageView({
        top : 5,
        right : 10,
        height : '35dp'
    });
    var closeIcon = fontIconLoader.getIcon("panacea","times",35,{color:Alloy.CFG.Colors.twitterColor});
	closeImgView.image = closeIcon;
    window.add(closeImgView);
   
    closeImgView.addEventListener('click', function(e) {
        window.close();
    });
    var webView = Titanium.UI.createWebView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL
    });
     window.add(webView);
                      
	loadAccessToken('twitter');
    if (accessTokenSecret != null && accessToken != null) {
        cb.setToken(accessToken, accessTokenSecret);
        setTweet();
    } else {
        cb.__call("oauth_requestToken", {
            oauth_callback : "oob"
        }, function(reply) {
            // stores it
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // gets the authorize screen URL
            cb.__call("oauth_authorize", {}, function(auth_url) {

                //window.codebird_auth = window.open(auth_url);
                Ti.API.info(auth_url);
                webView.url = auth_url;
                var destroyAuthorizeUI = function() {
                    Ti.API.info('destroyAuthorizeUI');
                    // remove the UI
                    try {
                        webView.removeEventListener('load', authorizeUICallback);
                        window.remove(webView);
                        window.close();
                        
                    } catch(ex) {
                        Ti.API.info('Cannot destroy the authorize UI. Ignoring.');
                    }
                };
                
                var authorizeUICallback = function(e) {
                    Ti.API.info('authorizeUILoaded');

                    var val = webView.evalJS('window.document.querySelector(\'kbd[aria-labelledby="code-desc"] > code\').innerHTML');
                    Ti.API.info(val);

                    if (val) {
                        destroyAuthorizeUI();
                        cb.__call("oauth_accessToken", {
                            oauth_verifier : val
                        }, function(reply) {
                            // store the authenticated token, which may be different from the request token (!)
                            cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                            Ti.API.info(reply);
                            setTweet();
                            accessToken = reply.oauth_token;
                            accessTokenSecret = reply.oauth_token_secret;
                            saveAccessToken('twitter');
                            window.close();
                        });
                    }
                };
                webView.addEventListener('load', authorizeUICallback);
                
            });
        });
    }
    window.open();
    
};
