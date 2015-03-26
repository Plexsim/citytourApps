!function(undefined) {
    "use strict";
    Array.prototype.indexOf || (Array.prototype.indexOf = function(obj, start) {
        for (var i = start || 0; i < this.length; i++) if (this[i] === obj) return i;
        return -1;
    });
    var Codebird = function() {
        var _oauth_consumer_key = null;
        var _oauth_consumer_secret = null;
        var _oauth_bearer_token = null;
        var _endpoint_base = "https://api.twitter.com/";
        var _endpoint_base_media = "https://upload.twitter.com/";
        var _endpoint = _endpoint_base + "1.1/";
        var _endpoint_media = _endpoint_base_media + "1.1/";
        var _endpoint_oauth = _endpoint_base;
        var _endpoint_proxy = "https://api.jublo.net/codebird/";
        var _endpoint_old = _endpoint_base + "1/";
        var _use_jsonp = "undefined" != typeof navigator && "undefined" != typeof navigator.userAgent && (navigator.userAgent.indexOf("Trident/4") > -1 || navigator.userAgent.indexOf("Trident/5") > -1 || navigator.userAgent.indexOf("MSIE 7.0") > -1);
        var _use_proxy = "undefined" != typeof navigator && "undefined" != typeof navigator.userAgent;
        var _oauth_token = null;
        var _oauth_token_secret = null;
        var _version = "2.6.0-dev";
        var setConsumerKey = function(key, secret) {
            _oauth_consumer_key = key;
            _oauth_consumer_secret = secret;
        };
        var setBearerToken = function(token) {
            _oauth_bearer_token = token;
        };
        var getVersion = function() {
            return _version;
        };
        var setToken = function(token, secret) {
            _oauth_token = token;
            _oauth_token_secret = secret;
        };
        var setUseProxy = function(use_proxy) {
            _use_proxy = !!use_proxy;
        };
        var setProxy = function(proxy) {
            proxy.match(/\/$/) || (proxy += "/");
            _endpoint_proxy = proxy;
        };
        var _parse_str = function(str, array) {
            var glue1 = "=", glue2 = "&", array2 = String(str).replace(/^&?([\s\S]*?)&?$/, "$1").split(glue2), i, j, chr, tmp, key, value, bracket, keys, evalStr, fixStr = function(str) {
                return decodeURIComponent(str).replace(/([\\"'])/g, "\\$1").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
            };
            array || (array = this.window);
            for (i = 0; i < array2.length; i++) {
                tmp = array2[i].split(glue1);
                tmp.length < 2 && (tmp = [ tmp, "" ]);
                key = fixStr(tmp[0]);
                value = fixStr(tmp[1]);
                while (" " === key.charAt(0)) key = key.substr(1);
                -1 !== key.indexOf("\x00") && (key = key.substr(0, key.indexOf("\x00")));
                if (key && "[" !== key.charAt(0)) {
                    keys = [];
                    bracket = 0;
                    for (j = 0; j < key.length; j++) if ("[" !== key.charAt(j) || bracket) {
                        if ("]" === key.charAt(j) && bracket) {
                            keys.length || keys.push(key.substr(0, bracket - 1));
                            keys.push(key.substr(bracket, j - bracket));
                            bracket = 0;
                            if ("[" !== key.charAt(j + 1)) break;
                        }
                    } else bracket = j + 1;
                    keys.length || (keys = [ key ]);
                    for (j = 0; j < keys[0].length; j++) {
                        chr = keys[0].charAt(j);
                        (" " === chr || "." === chr || "[" === chr) && (keys[0] = keys[0].substr(0, j) + "_" + keys[0].substr(j + 1));
                        if ("[" === chr) break;
                    }
                    evalStr = "array";
                    for (j = 0; j < keys.length; j++) {
                        key = keys[j];
                        key = "" !== key && " " !== key || 0 === j ? "'" + key + "'" : eval(evalStr + ".push([]);") - 1;
                        evalStr += "[" + key + "]";
                        j !== keys.length - 1 && "undefined" === eval("typeof " + evalStr) && eval(evalStr + " = [];");
                    }
                    evalStr += " = '" + value + "';\n";
                    eval(evalStr);
                }
            }
        };
        var getApiMethods = function() {
            var httpmethods = {
                GET: [ "statuses/mentions_timeline", "statuses/user_timeline", "statuses/home_timeline", "statuses/retweets_of_me", "statuses/retweets/:id", "statuses/show/:id", "statuses/oembed", "statuses/retweeters/ids", "search/tweets", "direct_messages", "direct_messages/sent", "direct_messages/show", "friendships/no_retweets/ids", "friends/ids", "followers/ids", "friendships/lookup", "friendships/incoming", "friendships/outgoing", "friendships/show", "friends/list", "followers/list", "friendships/lookup", "account/settings", "account/verify_credentials", "blocks/list", "blocks/ids", "users/lookup", "users/show", "users/search", "users/contributees", "users/contributors", "users/profile_banner", "mutes/users/ids", "mutes/users/list", "users/suggestions/:slug", "users/suggestions", "users/suggestions/:slug/members", "favorites/list", "lists/list", "lists/statuses", "lists/memberships", "lists/subscribers", "lists/subscribers/show", "lists/members/show", "lists/members", "lists/show", "lists/subscriptions", "lists/ownerships", "saved_searches/list", "saved_searches/show/:id", "geo/id/:place_id", "geo/reverse_geocode", "geo/search", "geo/similar_places", "trends/place", "trends/available", "trends/closest", "oauth/authenticate", "oauth/authorize", "help/configuration", "help/languages", "help/privacy", "help/tos", "application/rate_limit_status", "statuses/lookup", "users/recommendations", "account/push_destinations/device", "activity/about_me", "activity/by_friends", "statuses/media_timeline", "timeline/home", "help/experiments", "search/typeahead", "search/universal", "discover/universal", "conversation/show", "statuses/:id/activity/summary", "account/login_verification_enrollment", "account/login_verification_request", "prompts/suggest", "beta/timelines/custom/list", "beta/timelines/timeline", "beta/timelines/custom/show" ],
                POST: [ "statuses/destroy/:id", "statuses/update", "statuses/retweet/:id", "statuses/update_with_media", "media/upload", "direct_messages/destroy", "direct_messages/new", "friendships/create", "friendships/destroy", "friendships/update", "account/settings__post", "account/update_delivery_device", "account/update_profile", "account/update_profile_background_image", "account/update_profile_colors", "account/update_profile_image", "blocks/create", "blocks/destroy", "account/update_profile_banner", "account/remove_profile_banner", "mutes/users/create", "mutes/users/destroy", "favorites/destroy", "favorites/create", "lists/members/destroy", "lists/subscribers/create", "lists/subscribers/destroy", "lists/members/create_all", "lists/members/create", "lists/destroy", "lists/update", "lists/create", "lists/members/destroy_all", "saved_searches/create", "saved_searches/destroy/:id", "users/report_spam", "oauth/access_token", "oauth/request_token", "oauth2/token", "oauth2/invalidate_token", "direct_messages/read", "account/login_verification_enrollment__post", "push_destinations/enable_login_verification", "account/login_verification_request__post", "beta/timelines/custom/create", "beta/timelines/custom/update", "beta/timelines/custom/destroy", "beta/timelines/custom/add", "beta/timelines/custom/remove" ]
            };
            return httpmethods;
        };
        var __call = function(fn, params, callback, app_only_auth) {
            "undefined" == typeof params && (params = {});
            "undefined" == typeof app_only_auth && (app_only_auth = false);
            if ("function" != typeof callback && "function" == typeof params) {
                callback = params;
                params = {};
                "boolean" == typeof callback && (app_only_auth = callback);
            } else "undefined" == typeof callback && (callback = function() {});
            switch (fn) {
              case "oauth_authenticate":
              case "oauth_authorize":
                return this[fn](params, callback);

              case "oauth2_token":
                return this[fn](callback);
            }
            "oauth_requestToken" === fn && setToken(null, null);
            var apiparams = {};
            "object" == typeof params ? apiparams = params : _parse_str(params, apiparams);
            var method = "";
            var param, i, j;
            var path = fn.split("_");
            for (i = 0; i < path.length; i++) {
                i > 0 && (method += "/");
                method += path[i];
            }
            var url_parameters_with_underscore = [ "screen_name", "place_id" ];
            for (i = 0; i < url_parameters_with_underscore.length; i++) {
                param = url_parameters_with_underscore[i].toUpperCase();
                var replacement_was = param.split("_").join("/");
                method = method.split(replacement_was).join(param);
            }
            var method_template = method;
            var match = method.match(/[A-Z_]{2,}/);
            if (match) for (i = 0; i < match.length; i++) {
                param = match[i];
                var param_l = param.toLowerCase();
                method_template = method_template.split(param).join(":" + param_l);
                if ("undefined" == typeof apiparams[param_l]) {
                    for (j = 0; 26 > j; j++) method_template = method_template.split(String.fromCharCode(65 + j)).join("_" + String.fromCharCode(97 + j));
                    console.warn('To call the templated method "' + method_template + '", specify the parameter value for "' + param_l + '".');
                }
                method = method.split(param).join(apiparams[param_l]);
                delete apiparams[param_l];
            }
            for (i = 0; 26 > i; i++) {
                method = method.split(String.fromCharCode(65 + i)).join("_" + String.fromCharCode(97 + i));
                method_template = method_template.split(String.fromCharCode(65 + i)).join("_" + String.fromCharCode(97 + i));
            }
            var httpmethod = _detectMethod(method_template, apiparams);
            var multipart = _detectMultipart(method_template);
            var internal = _detectInternal(method_template);
            return _callApi(httpmethod, method, apiparams, multipart, app_only_auth, internal, callback);
        };
        var oauth_authenticate = function(params, callback) {
            "undefined" == typeof params.force_login && (params.force_login = null);
            "undefined" == typeof params.screen_name && (params.screen_name = null);
            null === _oauth_token && console.warn("To get the authenticate URL, the OAuth token must be set.");
            var url = _endpoint_oauth + "oauth/authenticate?oauth_token=" + _url(_oauth_token);
            if (true === params.force_login) {
                url += "?force_login=1";
                null !== params.screen_name && (url += "&screen_name=" + params.screen_name);
            }
            callback(url);
            return true;
        };
        var oauth_authorize = function(params, callback) {
            "undefined" == typeof params.force_login && (params.force_login = null);
            "undefined" == typeof params.screen_name && (params.screen_name = null);
            null === _oauth_token && console.warn("To get the authorize URL, the OAuth token must be set.");
            var url = _endpoint_oauth + "oauth/authorize?oauth_token=" + _url(_oauth_token);
            if (true === params.force_login) {
                url += "?force_login=1";
                null !== params.screen_name && (url += "&screen_name=" + params.screen_name);
            }
            callback(url);
            return true;
        };
        var oauth2_token = function(callback) {
            null === _oauth_consumer_key && console.warn("To obtain a bearer token, the consumer key must be set.");
            "undefined" == typeof callback && (callback = function() {});
            var post_fields = "grant_type=client_credentials";
            var url = _endpoint_oauth + "oauth2/token";
            _use_proxy && (url = url.replace(_endpoint_base, _endpoint_proxy));
            var xml = _getXmlRequestObject();
            if (null === xml) return;
            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xml.setRequestHeader((_use_proxy ? "X-" : "") + "Authorization", "Basic " + _base64_encode(_oauth_consumer_key + ":" + _oauth_consumer_secret));
            xml.onreadystatechange = function() {
                if (xml.readyState >= 4) {
                    var httpstatus = 12027;
                    try {
                        httpstatus = xml.status;
                    } catch (e) {}
                    var response = "";
                    try {
                        response = xml.responseText;
                    } catch (e) {}
                    var reply = _parseApiReply(response);
                    reply.httpstatus = httpstatus;
                    200 === httpstatus && setBearerToken(reply.access_token);
                    callback(reply);
                }
            };
            xml.send(post_fields);
        };
        var _url = function(data) {
            return /boolean|number|string/.test(typeof data) ? encodeURIComponent(data).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A") : "";
        };
        var _sha1 = function() {
            function n(e, b) {
                e[b >> 5] |= 128 << 24 - b % 32;
                e[(b + 64 >> 9 << 4) + 15] = b;
                for (var c = new Array(80), a = 1732584193, d = -271733879, h = -1732584194, k = 271733878, g = -1009589776, p = 0; p < e.length; p += 16) {
                    for (var o = a, q = d, r = h, s = k, t = g, f = 0; 80 > f; f++) {
                        var m;
                        if (16 > f) m = e[p + f]; else {
                            m = c[f - 3] ^ c[f - 8] ^ c[f - 14] ^ c[f - 16];
                            m = m << 1 | m >>> 31;
                        }
                        c[f] = m;
                        m = l(l(a << 5 | a >>> 27, 20 > f ? d & h | ~d & k : 40 > f ? d ^ h ^ k : 60 > f ? d & h | d & k | h & k : d ^ h ^ k), l(l(g, c[f]), 20 > f ? 1518500249 : 40 > f ? 1859775393 : 60 > f ? -1894007588 : -899497514));
                        g = k;
                        k = h;
                        h = d << 30 | d >>> 2;
                        d = a;
                        a = m;
                    }
                    a = l(a, o);
                    d = l(d, q);
                    h = l(h, r);
                    k = l(k, s);
                    g = l(g, t);
                }
                return [ a, d, h, k, g ];
            }
            function l(e, b) {
                var c = (65535 & e) + (65535 & b);
                return (e >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c;
            }
            function q(e) {
                for (var b = [], c = (1 << g) - 1, a = 0; a < e.length * g; a += g) b[a >> 5] |= (e.charCodeAt(a / g) & c) << 24 - a % 32;
                return b;
            }
            var g = 8;
            return function(e) {
                var b = _oauth_consumer_secret + "&" + (null !== _oauth_token_secret ? _oauth_token_secret : "");
                null === _oauth_consumer_secret && console.warn("To generate a hash, the consumer secret must be set.");
                var c = q(b);
                c.length > 16 && (c = n(c, b.length * g));
                b = new Array(16);
                for (var a = new Array(16), d = 0; 16 > d; d++) {
                    a[d] = 909522486 ^ c[d];
                    b[d] = 1549556828 ^ c[d];
                }
                c = n(a.concat(q(e)), 512 + e.length * g);
                b = n(b.concat(c), 672);
                c = "";
                for (a = 0; a < 4 * b.length; a += 3) for (d = (b[a >> 2] >> 8 * (3 - a % 4) & 255) << 16 | (b[a + 1 >> 2] >> 8 * (3 - (a + 1) % 4) & 255) << 8 | b[a + 2 >> 2] >> 8 * (3 - (a + 2) % 4) & 255, 
                e = 0; 4 > e; e++) c = 8 * a + 6 * e > 32 * b.length ? c + "=" : c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 6 * (3 - e) & 63);
                return c;
            };
        }();
        var _base64_encode = function(a) {
            var d, e, f, b, g = 0, h = 0, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = [];
            if (!a) return a;
            do {
                d = a.charCodeAt(g++);
                e = a.charCodeAt(g++);
                f = a.charCodeAt(g++);
                b = d << 16 | e << 8 | f;
                d = b >> 18 & 63;
                e = b >> 12 & 63;
                f = b >> 6 & 63;
                b &= 63;
                c[h++] = i.charAt(d) + i.charAt(e) + i.charAt(f) + i.charAt(b);
            } while (g < a.length);
            c = c.join("");
            a = a.length % 3;
            return (a ? c.slice(0, a - 3) : c) + "===".slice(a || 3);
        };
        var _http_build_query = function(e, f, b) {
            function g(c, a, d) {
                var b, e = [];
                true === a ? a = "1" : false === a && (a = "0");
                if (null === a) return "";
                if ("object" == typeof a) {
                    for (b in a) null !== a[b] && e.push(g(c + "[" + b + "]", a[b], d));
                    return e.join(d);
                }
                if ("function" != typeof a) return _url(c) + "=" + _url(a);
                console.warn("There was an error processing for http_build_query().");
            }
            var d, c, h = [];
            b || (b = "&");
            for (c in e) {
                d = e[c];
                f && !isNaN(c) && (c = String(f) + c);
                d = g(c, d, b);
                "" !== d && h.push(d);
            }
            return h.join(b);
        };
        var _nonce = function(length) {
            "undefined" == typeof length && (length = 8);
            1 > length && console.warn("Invalid nonce length.");
            var nonce = "";
            for (var i = 0; length > i; i++) {
                var character = Math.floor(61 * Math.random());
                nonce += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(character, character + 1);
            }
            return nonce;
        };
        var _ksort = function(input_arr) {
            var sorter, k, keys = [];
            sorter = function(a, b) {
                var a_float = parseFloat(a), b_float = parseFloat(b), a_numeric = a_float + "" === a, b_numeric = b_float + "" === b;
                if (a_numeric && b_numeric) return a_float > b_float ? 1 : b_float > a_float ? -1 : 0;
                if (a_numeric && !b_numeric) return 1;
                if (!a_numeric && b_numeric) return -1;
                return a > b ? 1 : b > a ? -1 : 0;
            };
            for (k in input_arr) input_arr.hasOwnProperty(k) && keys.push(k);
            keys.sort(sorter);
            return keys;
        };
        var _clone = function(obj) {
            var clone = {};
            for (var i in obj) clone[i] = "object" == typeof obj[i] ? _clone(obj[i]) : obj[i];
            return clone;
        };
        var _sign = function(httpmethod, method, params, append_to_get) {
            "undefined" == typeof params && (params = {});
            "undefined" == typeof append_to_get && (append_to_get = false);
            null === _oauth_consumer_key && console.warn("To generate a signature, the consumer key must be set.");
            var sign_params = {
                consumer_key: _oauth_consumer_key,
                version: "1.0",
                timestamp: Math.round(new Date().getTime() / 1e3),
                nonce: _nonce(),
                signature_method: "HMAC-SHA1"
            };
            var sign_base_params = {};
            var value;
            for (var key in sign_params) {
                value = sign_params[key];
                sign_base_params["oauth_" + key] = _url(value);
            }
            null !== _oauth_token && (sign_base_params.oauth_token = _url(_oauth_token));
            var oauth_params = _clone(sign_base_params);
            for (key in params) {
                value = params[key];
                sign_base_params[key] = value;
            }
            var keys = _ksort(sign_base_params);
            var sign_base_string = "";
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                value = sign_base_params[key];
                sign_base_string += key + "=" + _url(value) + "&";
            }
            sign_base_string = sign_base_string.substring(0, sign_base_string.length - 1);
            var signature = _sha1(httpmethod + "&" + _url(method) + "&" + _url(sign_base_string));
            params = append_to_get ? sign_base_params : oauth_params;
            params.oauth_signature = signature;
            keys = _ksort(params);
            var authorization = "";
            if (append_to_get) {
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    value = params[key];
                    authorization += key + "=" + _url(value) + "&";
                }
                return authorization.substring(0, authorization.length - 1);
            }
            authorization = "OAuth ";
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                value = params[key];
                authorization += key + '="' + _url(value) + '", ';
            }
            return authorization.substring(0, authorization.length - 2);
        };
        var _detectMethod = function(method, params) {
            switch (method) {
              case "account/settings":
              case "account/login_verification_enrollment":
              case "account/login_verification_request":
                method = params.length ? method + "__post" : method;
            }
            var apimethods = getApiMethods();
            for (var httpmethod in apimethods) if (apimethods[httpmethod].indexOf(method) > -1) return httpmethod;
            console.warn("Can't find HTTP method to use for \"" + method + '".');
        };
        var _detectMultipart = function(method) {
            var multiparts = [ "statuses/update_with_media", "account/update_profile_background_image", "account/update_profile_image", "account/update_profile_banner" ];
            return multiparts.indexOf(method) > -1;
        };
        var _buildMultipart = function(method, params) {
            if (!_detectMultipart(method)) return;
            var possible_methods = [ "statuses/update_with_media", "account/update_profile_background_image", "account/update_profile_image", "account/update_profile_banner" ];
            var possible_files = {
                "statuses/update_with_media": "media[]",
                "account/update_profile_background_image": "image",
                "account/update_profile_image": "image",
                "account/update_profile_banner": "banner"
            };
            if (-1 === possible_methods.indexOf(method)) return;
            possible_files = possible_files[method].split(" ");
            var multipart_border = "--------------------" + _nonce();
            var multipart_request = "";
            for (var key in params) {
                multipart_request += "--" + multipart_border + '\r\nContent-Disposition: form-data; name="' + key + '"';
                possible_files.indexOf(key) > -1 && (multipart_request += "\r\nContent-Transfer-Encoding: base64");
                multipart_request += "\r\n\r\n" + params[key] + "\r\n";
            }
            multipart_request += "--" + multipart_border + "--";
            return multipart_request;
        };
        var _detectInternal = function(method) {
            var internals = [ "users/recommendations" ];
            return internals.join(" ").indexOf(method) > -1;
        };
        var _detectMedia = function(method) {
            var medias = [ "media/upload" ];
            return medias.join(" ").indexOf(method) > -1;
        };
        var _detectOld = function(method) {
            var olds = [ "account/push_destinations/device" ];
            return olds.join(" ").indexOf(method) > -1;
        };
        var _getEndpoint = function(method) {
            var url;
            url = "oauth" === method.substring(0, 5) ? _endpoint_oauth + method : _detectMedia(method) ? _endpoint_media + method + ".json" : _detectOld(method) ? _endpoint_old + method + ".json" : _endpoint + method + ".json";
            return url;
        };
        var _getXmlRequestObject = function() {
            var xml = null;
            if ("object" == typeof window && window && "undefined" != typeof window.XMLHttpRequest) xml = new window.XMLHttpRequest(); else if ("object" == typeof Ti && Ti && "undefined" != typeof Ti.Network.createHTTPClient) xml = Ti.Network.createHTTPClient(); else if ("undefined" != typeof ActiveXObject) try {
                xml = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.error("ActiveXObject object not defined.");
            } else if ("function" == typeof require && require) try {
                var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                xml = new XMLHttpRequest();
            } catch (e1) {
                try {
                    var XMLHttpRequest = require("xhr2");
                    xml = new XMLHttpRequest();
                } catch (e2) {
                    console.error("xhr2 object not defined, cancelling.");
                }
            }
            return xml;
        };
        var _callApi = function(httpmethod, method, params, multipart, app_only_auth, internal, callback) {
            "undefined" == typeof params && (params = {});
            "undefined" == typeof multipart && (multipart = false);
            "undefined" == typeof app_only_auth && (app_only_auth = false);
            "function" != typeof callback && (callback = function() {});
            if (internal) {
                params.adc = "phone";
                params.application_id = 333903271;
            }
            var url = _getEndpoint(method);
            var authorization = null;
            var xml = _getXmlRequestObject();
            if (null === xml) return;
            var post_fields;
            if ("GET" === httpmethod) {
                var url_with_params = url;
                "{}" !== JSON.stringify(params) && (url_with_params += "?" + _http_build_query(params));
                app_only_auth || (authorization = _sign(httpmethod, url, params));
                if (_use_jsonp) {
                    url_with_params += "{}" !== JSON.stringify(params) ? "&" : "?";
                    var callback_name = _nonce();
                    window[callback_name] = function(reply) {
                        reply.httpstatus = 200;
                        var rate = null;
                        "undefined" != typeof xml.getResponseHeader && "" !== xml.getResponseHeader("x-rate-limit-limit") && (rate = {
                            limit: xml.getResponseHeader("x-rate-limit-limit"),
                            remaining: xml.getResponseHeader("x-rate-limit-remaining"),
                            reset: xml.getResponseHeader("x-rate-limit-reset")
                        });
                        callback(reply, rate);
                    };
                    params.callback = callback_name;
                    url_with_params = url + "?" + _sign(httpmethod, url, params, true);
                    var tag = document.createElement("script");
                    tag.type = "text/javascript";
                    tag.src = url_with_params;
                    var body = document.getElementsByTagName("body")[0];
                    body.appendChild(tag);
                    return;
                }
                _use_proxy && (url_with_params = url_with_params.replace(_endpoint_base, _endpoint_proxy).replace(_endpoint_base_media, _endpoint_proxy));
                xml.open(httpmethod, url_with_params, true);
            } else {
                if (_use_jsonp) {
                    console.warn("Sending POST requests is not supported for IE7-9.");
                    return;
                }
                if (multipart) {
                    app_only_auth || (authorization = _sign(httpmethod, url, {}));
                    params = _buildMultipart(method, params);
                } else {
                    app_only_auth || (authorization = _sign(httpmethod, url, params));
                    params = _http_build_query(params);
                }
                post_fields = params;
                (_use_proxy || multipart) && (url = url.replace(_endpoint_base, _endpoint_proxy).replace(_endpoint_base_media, _endpoint_proxy));
                xml.open(httpmethod, url, true);
                multipart ? xml.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + post_fields.split("\r\n")[0].substring(2)) : xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            if (app_only_auth) {
                null === _oauth_consumer_key && null === _oauth_bearer_token && console.warn("To make an app-only auth API request, consumer key or bearer token must be set.");
                if (null === _oauth_bearer_token) return oauth2_token(function() {
                    _callApi(httpmethod, method, params, multipart, app_only_auth, false, callback);
                });
                authorization = "Bearer " + _oauth_bearer_token;
            }
            null !== authorization && xml.setRequestHeader((_use_proxy ? "X-" : "") + "Authorization", authorization);
            xml.onreadystatechange = function() {
                if (xml.readyState >= 4) {
                    var httpstatus = 12027;
                    try {
                        httpstatus = xml.status;
                    } catch (e) {}
                    var response = "";
                    try {
                        response = xml.responseText;
                    } catch (e) {}
                    var reply = _parseApiReply(response);
                    reply.httpstatus = httpstatus;
                    var rate = null;
                    "undefined" != typeof xml.getResponseHeader && "" !== xml.getResponseHeader("x-rate-limit-limit") && (rate = {
                        limit: xml.getResponseHeader("x-rate-limit-limit"),
                        remaining: xml.getResponseHeader("x-rate-limit-remaining"),
                        reset: xml.getResponseHeader("x-rate-limit-reset")
                    });
                    callback(reply, rate);
                }
            };
            xml.send("GET" === httpmethod ? null : post_fields);
            return true;
        };
        var _parseApiReply = function(reply) {
            if ("string" != typeof reply || "" === reply) return {};
            if ("[]" === reply) return [];
            var parsed;
            try {
                parsed = JSON.parse(reply);
            } catch (e) {
                parsed = {};
                if (0 === reply.indexOf('<?xml version="1.0" encoding="UTF-8"?>')) {
                    parsed.request = reply.match(/<request>(.*)<\/request>/)[1];
                    parsed.error = reply.match(/<error>(.*)<\/error>/)[1];
                } else {
                    var elements = reply.split("&");
                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i].split("=", 2);
                        parsed[element[0]] = element.length > 1 ? decodeURIComponent(element[1]) : null;
                    }
                }
            }
            return parsed;
        };
        return {
            setConsumerKey: setConsumerKey,
            getVersion: getVersion,
            setToken: setToken,
            setBearerToken: setBearerToken,
            setUseProxy: setUseProxy,
            setProxy: setProxy,
            getApiMethods: getApiMethods,
            __call: __call,
            oauth_authenticate: oauth_authenticate,
            oauth_authorize: oauth_authorize,
            oauth2_token: oauth2_token
        };
    };
    if ("object" == typeof module && module && "object" == typeof module.exports) module.exports = Codebird; else {
        "object" == typeof window && window && (window.Codebird = Codebird);
        "function" == typeof define && define.amd && define("codebird", [], function() {
            return Codebird;
        });
    }
}();