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
    this.__controllerPath = "home";
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
    $.__views.homeScrollView = Ti.UI.createScrollView({
        backgroundColor: Alloy.CFG.Colors.BackgroundColor,
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "homeScrollView"
    });
    $.__views.homeScrollView && $.addTopLevelView($.__views.homeScrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var __ = require("platformSupport");
    var loadingWindow = require("loadingWindow");
    var myAnimation = require("animation");
    var loader = require("loader");
    require("strings");
    var args = arguments[0] || {};
    var FIXED_ITEM_BIG_WIDTH = 213;
    var FIXED_ITEM_BIG_HEIGHT = 150;
    var FIXED_ITEM_SMALL_WIDTH = 107;
    var FIXED_ITEM_SMALL_HEIGHT = 75;
    var FIXED_SCREEN_WIDTH = 320;
    var ITEM_BIG_HEIGHT = 0;
    var ITEM_BIG_WIDTH = 0;
    var ITEM_SMALL_HEIGHT = 0;
    var ITEM_SMALL_WIDTH = 0;
    var SCREEN_WIDTH = 0;
    var SCREEN_HEIGHT = 0;
    var updateFromVal = function() {
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        Ti.App.Properties.setInt("From", limit + from);
    };
    var openItemGrid = function(args) {
        updateFromVal();
        Alloy.Globals.data = args;
        var itemGrid = Alloy.createController("itemGrid", args).getView();
        myAnimation.in(itemGrid);
    };
    var startItemGrid = function(args) {
        loadingWindow.startLoading();
        var limit = Alloy.CFG.LimitOfPosts;
        Ti.App.Properties.setInt("From", 0);
        var loaderArgs = {
            callbackFunction: openItemGrid,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/" + limit + "/from/0"
        };
        console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/" + limit + "/from/0");
        loader.get(loaderArgs);
    };
    var openItemMap = function(args) {
        var itemMap = Alloy.createController("itemMap", args).getView();
        myAnimation.in(itemMap);
    };
    var startItemMap = function(args) {
        loadingWindow.startLoading();
        var loaderArgs = {
            callbackFunction: openItemMap,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all"
        };
        loader.get(loaderArgs);
    };
    var homeLayoutLeft = function(itemsData) {
        var params = {
            ITEM_BIG_WIDTH: ITEM_BIG_WIDTH,
            ITEM_BIG_HEIGHT: ITEM_BIG_HEIGHT,
            ITEM_SMALL_WIDTH: ITEM_SMALL_WIDTH,
            ITEM_SMALL_HEIGHT: ITEM_SMALL_HEIGHT,
            openItemGrid: startItemGrid,
            openItemMap: startItemMap,
            itemsData: itemsData
        };
        var layout = Alloy.createController("homeLayoutLeft", params).getView();
        return layout;
    };
    var homeLayoutRight = function(itemsData) {
        var params = {
            ITEM_BIG_WIDTH: ITEM_BIG_WIDTH,
            ITEM_BIG_HEIGHT: ITEM_BIG_HEIGHT,
            ITEM_SMALL_WIDTH: ITEM_SMALL_WIDTH,
            ITEM_SMALL_HEIGHT: ITEM_SMALL_HEIGHT,
            openItemGrid: startItemGrid,
            openItemMap: startItemMap,
            itemsData: itemsData
        };
        var layout = Alloy.createController("homeLayoutRight", params).getView();
        return layout;
    };
    var calculateSize = function() {
        SCREEN_WIDTH = __.getScreenWidth();
        SCREEN_HEIGHT = __.getScreenHeight();
        ITEM_BIG_WIDTH = SCREEN_WIDTH / FIXED_SCREEN_WIDTH * FIXED_ITEM_BIG_WIDTH - 1;
        ITEM_SMALL_WIDTH = SCREEN_WIDTH / FIXED_SCREEN_WIDTH * FIXED_ITEM_SMALL_WIDTH - 1;
        ITEM_BIG_HEIGHT = ITEM_BIG_WIDTH / FIXED_ITEM_BIG_WIDTH * FIXED_ITEM_BIG_HEIGHT - 1;
        ITEM_SMALL_HEIGHT = ITEM_SMALL_WIDTH / FIXED_ITEM_SMALL_WIDTH * FIXED_ITEM_SMALL_HEIGHT - 1;
    };
    var init = function() {
        if (null != args) {
            calculateSize();
            $.homeScrollView.contentWidth = SCREEN_WIDTH;
            $.homeScrollView.width = SCREEN_WIDTH;
            $.homeScrollView.height = Ti.UI.FILL;
            for (var i = 0; i < args.length; i++) $.homeScrollView.add(0 == i | i % 2 == 0 ? homeLayoutLeft(args[i]) : homeLayoutRight(args[i]));
        }
        loadingWindow.endLoading();
    };
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;