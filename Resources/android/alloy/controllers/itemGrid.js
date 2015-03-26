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
    this.__controllerPath = "itemGrid";
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
    var __defers = {};
    $.__views.itemGrid = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.Colors.BackgroundColor,
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "itemGrid"
    });
    $.__views.itemGrid && $.addTopLevelView($.__views.itemGrid);
    $.__views.__alloyId18 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.Colors.MainColor,
        top: 0,
        id: "__alloyId18"
    });
    $.__views.itemGrid.add($.__views.__alloyId18);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId18.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Item Grid"
    });
    $.__views.AppWrapper.add($.__views.mainTitle);
    closeWindow ? $.__views.mainTitle.addEventListener("click", closeWindow) : __defers["$.__views.mainTitle!click!closeWindow"] = true;
    $.__views.imgBack = Ti.UI.createImageView({
        width: 30,
        height: 30,
        left: 0,
        id: "imgBack"
    });
    $.__views.AppWrapper.add($.__views.imgBack);
    closeWindow ? $.__views.imgBack.addEventListener("click", closeWindow) : __defers["$.__views.imgBack!click!closeWindow"] = true;
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        right: "3",
        left: "3",
        bottom: "5",
        id: "__alloyId19"
    });
    $.__views.itemGrid.add($.__views.__alloyId19);
    $.__views.txtSearch = Ti.UI.createTextField({
        borderWidth: 1,
        borderColor: Alloy.CFG.Colors.MainColor,
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        borderRadius: 7,
        id: "txtSearch",
        hintText: "Keyword Search"
    });
    $.__views.__alloyId19.add($.__views.txtSearch);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    var loadingWindow = require("loadingWindow");
    var loader = require("loader");
    var args = arguments[0] || {};
    var ITEM_WIDTH = 160;
    var NUM_OF_COL = 0;
    var SCREEN_WIDTH = 0;
    var SCREEN_HEIGHT = 0;
    var EXTRA_PADDING = 0;
    var ITEMS_HEIGHT = [];
    var ACTUAL_TOTAL_WIDTH = 0;
    var loader = require("loader");
    var fontIconLoader = require("icomoonlib");
    var psScrollView = require("psScrollView");
    var contentView;
    var _psScrollView = new psScrollView();
    var calculateCol = function() {
        NUM_OF_COL = parseInt(SCREEN_WIDTH / ITEM_WIDTH);
        EXTRA_PADDING = SCREEN_WIDTH - NUM_OF_COL * ITEM_WIDTH;
        ITEM_WIDTH += EXTRA_PADDING / NUM_OF_COL;
        EXTRA_PADDING %= NUM_OF_COL;
        if (null != NUM_OF_COL) for (var i = 0; NUM_OF_COL > i; i++) ITEMS_HEIGHT.push(0);
        ACTUAL_TOTAL_WIDTH = SCREEN_WIDTH - EXTRA_PADDING;
    };
    var closeWindow = function() {
        Ti.App.Properties.setString("isWinOpen", "no");
        myAnimation.out($.itemGrid);
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
    var updateFromVal = function() {
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        Ti.App.Properties.setInt("From", limit + from);
    };
    var callBackInfiniteScrolling = function(data) {
        for (var i = 0; i < data.items.length; i++) {
            var scale = {
                width: data.items[i].images[0].width,
                height: data.items[i].images[0].height
            };
            Ti.API.info(Alloy.CFG.Urls.imagePathURL + data.items[i].images[0].path);
            var params = {
                image: Alloy.CFG.Urls.imagePathURL + data.items[i].images[0].path,
                title: data.items[i].name,
                like: 21 * i,
                msg: 13 * i,
                scale: scale,
                viewWidth: ITEM_WIDTH,
                item: data.items[i]
            };
            addView(itemGridLayout(params));
        }
        updateFromVal();
        _psScrollView.infiniteScrollingCompleted();
    };
    _psScrollView.addEventListener("InfiniteScrolling", function() {
        Ti.API.info("InfiniteScrolling event -> start loading data");
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        if ("" == $.txtSearch.value) var loaderArgs = {
            callbackFunction: callBackInfiniteScrolling,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/" + limit + "/from/" + from
        }; else var loaderArgs = {
            callbackFunction: callBackInfiniteScrolling,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/" + limit + "/from/" + from + "/keyword/" + $.txtSearch.value
        };
        loader.get(loaderArgs);
    });
    var init = function() {
        contentView = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            top: 0
        });
        contentView.add(_psScrollView);
        $.itemGrid.add(contentView);
        __.isiOS7Plus() && ($.AppWrapper.top = 20);
        Alloy.isTablet && (ITEM_WIDTH = 200);
        SCREEN_WIDTH = __.getScreenWidth();
        SCREEN_HEIGHT = __.getScreenHeight();
        calculateCol();
        $.mainTitle.text = args.name;
        for (var i = 0; i < args.items.length; i++) {
            var scale = {
                width: args.items[i].images[0].width,
                height: args.items[i].images[0].height
            };
            Ti.API.info(Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path);
            var params = {
                image: Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path,
                title: args.items[i].name,
                like: 21 * i,
                msg: 13 * i,
                scale: scale,
                viewWidth: ITEM_WIDTH,
                item: args.items[i]
            };
            addView(itemGridLayout(params));
        }
        loadIcon();
        $.txtSearch.blur();
    };
    $.txtSearch.addEventListener("return", function() {
        doSearch();
    });
    var doSearch = function() {
        $.txtSearch.blur();
        console.log("Search Keyword : " + $.txtSearch.value);
        if ("" != $.txtSearch.value) {
            var limit = Alloy.CFG.LimitOfPosts;
            var from = 0;
            var loaderArgs = {
                callbackFunction: callBackDoSearch,
                url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/" + limit + "/from/" + from + "/keyword/" + $.txtSearch.value
            };
            console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/" + limit + "/from/" + from + "/keyword/" + $.txtSearch.value);
            loader.get(loaderArgs);
        }
    };
    var callBackDoSearch = function(respData) {
        console.log("<<<<< Total Search Results >>>> : " + respData.items.length);
        args = respData;
        resetGridControls();
        _psScrollView.removeAllView();
        for (var i = 0; i < args.items.length; i++) {
            var scale = {
                width: args.items[i].images[0].width,
                height: args.items[i].images[0].height
            };
            Ti.API.info(Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path);
            var params = {
                image: Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path,
                title: args.items[i].name,
                like: 21 * i,
                msg: 13 * i,
                scale: scale,
                viewWidth: ITEM_WIDTH,
                item: args.items[i]
            };
            addView(itemGridLayout(params));
        }
    };
    var resetGridControls = function() {
        ITEM_WIDTH = 160;
        NUM_OF_COL = 0;
        SCREEN_WIDTH = 0;
        SCREEN_HEIGHT = 0;
        EXTRA_PADDING = 0;
        ITEMS_HEIGHT = [];
        ACTUAL_TOTAL_WIDTH = 0;
        __.isiOS7Plus() && ($.AppWrapper.top = 20);
        Alloy.isTablet && (ITEM_WIDTH = 200);
        SCREEN_WIDTH = __.getScreenWidth();
        SCREEN_HEIGHT = __.getScreenHeight();
        calculateCol();
    };
    var loadIcon = function() {
        var backIcon = fontIconLoader.getIcon("panacea", "back", 35, {
            color: Alloy.CFG.Colors.IconWhite
        });
        $.imgBack.image = backIcon;
    };
    $.itemGrid.addEventListener("open", function() {
        init();
        loadingWindow.endLoading();
    });
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.imgBack!click!closeWindow"] && $.__views.imgBack.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;