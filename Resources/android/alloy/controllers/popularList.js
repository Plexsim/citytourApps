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
    this.__controllerPath = "popularList";
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
    $.__views.itemGridView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "itemGridView",
        top: "0",
        backgroundColor: "white"
    });
    $.__views.itemGridView && $.addTopLevelView($.__views.itemGridView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var __ = require("platformSupport");
    require("animation");
    require("loadingWindow");
    var args = arguments[0] || {};
    require("strings");
    var ITEM_WIDTH = 160;
    var NUM_OF_COL = 0;
    var SCREEN_WIDTH = 0;
    var SCREEN_HEIGHT = 0;
    var EXTRA_PADDING = 0;
    var ITEMS_HEIGHT = [];
    var ACTUAL_TOTAL_WIDTH = 0;
    var loader = require("loader");
    require("icomoonlib");
    var loader = require("loader");
    var psScrollView = require("psScrollView");
    _psScrollView = new psScrollView();
    _psScrollView.addEventListener("InfiniteScrolling", function() {
        Ti.API.info("InfiniteScrolling event -> start loading data");
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        var loaderArgs = {
            callbackFunction: callBackInfiniteScrolling,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getPopularItems + limit + "/from/" + from
        };
        console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getPopularItems + limit + "/from/" + from);
        loader.get(loaderArgs);
    });
    var updateFromVal = function() {
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        Ti.App.Properties.setInt("From", limit + from);
    };
    var callBackInfiniteScrolling = function(data) {
        for (var i = 0; i < data.length; i++) {
            var scale = {
                width: data[i].item.images[0].width,
                height: data[i].item.images[0].height
            };
            Ti.API.info(Alloy.CFG.Urls.imagePathURL + data[i].item.images[0].path);
            var params = {
                image: Alloy.CFG.Urls.imagePathURL + data[i].item.images[0].path,
                title: data[i].item.name,
                like: 21 * i,
                msg: 13 * i,
                scale: scale,
                viewWidth: ITEM_WIDTH,
                item: data[i].item
            };
            addView(itemGridLayout(params));
        }
        updateFromVal();
        _psScrollView.infiniteScrollingCompleted();
    };
    var calculateCol = function() {
        NUM_OF_COL = parseInt(SCREEN_WIDTH / ITEM_WIDTH);
        EXTRA_PADDING = SCREEN_WIDTH - NUM_OF_COL * ITEM_WIDTH;
        ITEM_WIDTH += EXTRA_PADDING / NUM_OF_COL;
        EXTRA_PADDING %= NUM_OF_COL;
        if (null != NUM_OF_COL) for (var i = 0; NUM_OF_COL > i; i++) ITEMS_HEIGHT.push(0);
        ACTUAL_TOTAL_WIDTH = SCREEN_WIDTH - EXTRA_PADDING;
    };
    var getColNum = function() {
        var col = 0;
        for (var i = 1; NUM_OF_COL > i; i++) ITEMS_HEIGHT[col] > ITEMS_HEIGHT[i] && (col = i);
        return col;
    };
    var itemGridLayout = function(params) {
        var layout = Alloy.createController("itemGridLayout", params).getView();
        return layout;
    };
    var addView = function(view) {
        var col = getColNum();
        var leftPadding = col * ITEM_WIDTH;
        view.left = leftPadding;
        view.top = ITEMS_HEIGHT[col];
        ITEMS_HEIGHT[col] += view.iHeight;
        _psScrollView.addView(view);
    };
    var init = function() {
        Alloy.isTablet && (ITEM_WIDTH = 200);
        var limit = Alloy.CFG.LimitOfPosts;
        Ti.App.Properties.setInt("From", limit);
        $.itemGridView.add(_psScrollView);
        SCREEN_WIDTH = __.getScreenWidth();
        SCREEN_HEIGHT = __.getScreenHeight();
        calculateCol();
        $.itemGridView.contentWidth = ACTUAL_TOTAL_WIDTH;
        $.itemGridView.width = ACTUAL_TOTAL_WIDTH;
        $.itemGridView.left = EXTRA_PADDING / 2;
        for (var i = 0; i < args.length; i++) {
            var scale = {
                width: args[i].item.images[0].width,
                height: args[i].item.images[0].height
            };
            Ti.API.info(Alloy.CFG.Urls.imagePathURL + args[i].item.images[0].path);
            var params = {
                image: Alloy.CFG.Urls.imagePathURL + args[i].item.images[0].path,
                title: args[i].item.name,
                like: 21 * i,
                msg: 13 * i,
                scale: scale,
                viewWidth: ITEM_WIDTH,
                item: args[i].item
            };
            addView(itemGridLayout(params));
        }
    };
    var loadPopularItems = function() {
        var limit = Alloy.CFG.LimitOfPosts;
        Ti.App.Properties.setInt("From", 0);
        console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getPopularItems);
        var loaderArgs = {
            callbackFunction: callBackLoadPopularItems,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getPopularItems + limit + "/from/0"
        };
        loader.get(loaderArgs);
    };
    var callBackLoadPopularItems = function(data) {
        updateFromVal();
        args = data;
        init();
    };
    loadPopularItems();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;