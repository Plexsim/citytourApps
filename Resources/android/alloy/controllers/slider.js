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
    this.__controllerPath = "slider";
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
    $.__views.slider = Ti.UI.createWindow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#FFF",
        navBarHidden: "true",
        id: "slider"
    });
    $.__views.slider && $.addTopLevelView($.__views.slider);
    $.__views.__alloyId30 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.Colors.MainColor,
        top: 0,
        id: "__alloyId30"
    });
    $.__views.slider.add($.__views.__alloyId30);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId30.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "30",
        id: "mainTitle",
        text: "Gallery"
    });
    $.__views.AppWrapper.add($.__views.mainTitle);
    closeWindow ? $.__views.mainTitle.addEventListener("click", closeWindow) : __defers["$.__views.mainTitle!click!closeWindow"] = true;
    $.__views.imgBack = Ti.UI.createImageView({
        left: 5,
        width: 30,
        height: 30,
        right: 5,
        id: "imgBack"
    });
    $.__views.AppWrapper.add($.__views.imgBack);
    closeWindow ? $.__views.imgBack.addEventListener("click", closeWindow) : __defers["$.__views.imgBack!click!closeWindow"] = true;
    var __alloyId31 = [];
    $.__views.scroller = Ti.UI.createScrollableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        views: __alloyId31,
        id: "scroller"
    });
    $.__views.slider.add($.__views.scroller);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var psAnimation = require("animation");
    require("strings");
    var fontIconLoader = require("icomoonlib");
    var backIcon = fontIconLoader.getIcon("panacea", "back", 35, {
        color: Alloy.CFG.Colors.IconWhite
    });
    $.imgBack.image = backIcon;
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var closeWindow = function() {
        psAnimation.out($.slider);
    };
    var init = function() {
        if ("itemDetail" == args.fromWhere) var images = args.item.images; else if ("dishDetail" == args.fromWhere) var images = args.dish_images; else var images = args.images;
        var cnt = 1;
        for (var i = 0; i < images.length; i++) {
            var productImageView = Ti.UI.createView({
                height: Ti.UI.FILL,
                width: Ti.UI.FILL
            });
            var productImage = Ti.UI.createImageView({
                image: Alloy.CFG.Urls.imagePathURL + images[i].path
            });
            productImageView.add(productImage);
            var scrollView = Titanium.UI.createScrollView({
                contentWidth: "auto",
                contentHeight: "auto",
                top: 0,
                bottom: 50,
                showVerticalScrollIndicator: true,
                showHorizontalScrollIndicator: true,
                maxZoomScale: 100,
                minZoomScale: .1
            });
            productImageView.add(scrollView);
            var indicatorLabel = Ti.UI.createLabel({
                backgroundColor: Alloy.CFG.Colors.SliderIndexBGColor,
                color: "#000000",
                right: "10",
                top: "10",
                width: Ti.UI.SIZE,
                height: "30",
                text: " " + cnt + "  of  " + images.length + " "
            });
            cnt++;
            scrollView.add(productImage);
            productImageView.add(indicatorLabel);
            $.scroller.addView(productImageView);
        }
        var backIcon = fontIconLoader.getIcon("panacea", "back", 35, {
            color: Alloy.CFG.Colors.IconWhite
        });
        $.imgBack.image = backIcon;
    };
    $.slider.addEventListener("open", function() {
        init();
    });
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.imgBack!click!closeWindow"] && $.__views.imgBack.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;