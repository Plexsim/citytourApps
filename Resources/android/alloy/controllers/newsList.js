function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "newsList";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.feedListView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "feedListView",
        top: "0",
        backgroundColor: "white"
    });
    $.__views.feedListView && $.addTopLevelView($.__views.feedListView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    require("animation");
    require("platformSupport");
    var loader = require("loader");
    var psScrollView = require("psScrollView");
    _psScrollView = new psScrollView();
    _psScrollView.addEventListener("InfiniteScrolling", function() {
        Ti.API.info("InfiniteScrolling event -> start loading data");
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        var loaderArgs = {
            callbackFunction: callBackInfiniteScrolling,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getFeeds + limit + "/from/" + from
        };
        console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getFeeds + limit + "/from/" + from);
        loader.get(loaderArgs);
    });
    var updateFromVal = function() {
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        Ti.App.Properties.setInt("From", limit + from);
    };
    var callBackInfiniteScrolling = function(data) {
        for (var i = 0; i < data.length; i++) {
            oneFeed = Alloy.createController("newsRow", data[i]).getView();
            _psScrollView.addView(oneFeed);
        }
        updateFromVal();
        _psScrollView.infiniteScrollingCompleted();
    };
    var init = function() {
        if (null != args) {
            {
                args.length;
            }
            var limit = Alloy.CFG.LimitOfPosts;
            Ti.App.Properties.setInt("From", limit);
            _psScrollView.setViewLayout("vertical");
            $.feedListView.add(_psScrollView);
            for (var i = 0; i < args.length; i++) {
                oneFeed = Alloy.createController("newsRow", args[i]).getView();
                _psScrollView.addView(oneFeed);
            }
        }
    };
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;