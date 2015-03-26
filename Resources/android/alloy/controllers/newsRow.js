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
    this.__controllerPath = "newsRow";
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
    $.__views.feedContainer = Ti.UI.createView({
        width: "300",
        height: Ti.UI.SIZE,
        top: 15,
        id: "feedContainer"
    });
    $.__views.feedContainer && $.addTopLevelView($.__views.feedContainer);
    openFeedDetail ? $.__views.feedContainer.addEventListener("click", openFeedDetail) : __defers["$.__views.feedContainer!click!openFeedDetail"] = true;
    $.__views.imgFeed = Ti.UI.createImageView({
        left: 5,
        top: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
        id: "imgFeed"
    });
    $.__views.feedContainer.add($.__views.imgFeed);
    $.__views.reviewView = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 0,
        left: "80",
        id: "reviewView"
    });
    $.__views.feedContainer.add($.__views.reviewView);
    $.__views.lblFeedTitle = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        text: "Feed Title",
        id: "lblFeedTitle",
        color: "#464646"
    });
    $.__views.reviewView.add($.__views.lblFeedTitle);
    $.__views.lblFeedDesc = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: "100",
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        text: "Feed Desc",
        id: "lblFeedDesc",
        color: "#464646"
    });
    $.__views.reviewView.add($.__views.lblFeedDesc);
    $.__views.gotoView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        left: 5,
        top: 5,
        id: "gotoView"
    });
    $.__views.reviewView.add($.__views.gotoView);
    $.__views.imgTime = Ti.UI.createImageView({
        left: 5,
        top: 0,
        width: 15,
        height: 15,
        right: 5,
        id: "imgTime"
    });
    $.__views.gotoView.add($.__views.imgTime);
    $.__views.lblFeedTime = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.SIZE,
        top: 0,
        text: "Date & Time",
        id: "lblFeedTime",
        color: "#464646"
    });
    $.__views.gotoView.add($.__views.lblFeedTime);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    require("strings");
    var __ = require("platformSupport");
    var fontIconLoader = require("icomoonlib");
    require("loadingWindow");
    var psAnimation = require("animation");
    var init = function() {
        $.imgFeed.image = 0 == args.images.length ? "/images/reviewUser.png" : Alloy.CFG.Urls.imagePathURL + args.images[0].path;
        $.lblFeedTitle.text = args.title;
        $.lblFeedDesc.text = args.description;
        $.lblFeedTime.text = args.added;
        $.lblFeedTitle.left = 0;
        __.setNormalFontForTablet($.lblFeedTitle, 16);
        Alloy.isTablet && ($.feedContainer.width = 650);
        var timeIcon = fontIconLoader.getIcon("panacea", "clock-o", 35, {
            color: Alloy.CFG.Colors.ItemIconColor
        });
        $.imgTime.image = timeIcon;
    };
    var openFeedDetail = function() {
        var contentView = Alloy.createController("newsDetail", args).getView();
        psAnimation.in(contentView);
    };
    init();
    __defers["$.__views.feedContainer!click!openFeedDetail"] && $.__views.feedContainer.addEventListener("click", openFeedDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;