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
    this.__controllerPath = "reviewRow";
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
    $.__views.reviewContainer = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 15,
        id: "reviewContainer"
    });
    $.__views.reviewContainer && $.addTopLevelView($.__views.reviewContainer);
    $.__views.imReviewer = Ti.UI.createImageView({
        left: 5,
        top: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
        id: "imReviewer"
    });
    $.__views.reviewContainer.add($.__views.imReviewer);
    $.__views.reviewView = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: 0,
        left: "60",
        id: "reviewView"
    });
    $.__views.reviewContainer.add($.__views.reviewView);
    $.__views.lblReviewer = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        text: "Review User",
        id: "lblReviewer",
        color: "#464646"
    });
    $.__views.reviewView.add($.__views.lblReviewer);
    $.__views.lblReview = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        text: "Review Message",
        id: "lblReview",
        color: "#464646"
    });
    $.__views.reviewView.add($.__views.lblReview);
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
    $.__views.lblReviewTime = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.SIZE,
        top: 0,
        text: "Review Date & Time",
        id: "lblReviewTime",
        color: "#464646"
    });
    $.__views.gotoView.add($.__views.lblReviewTime);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    require("platformSupport");
    var icomoonlib = require("icomoonlib");
    var init = function() {
        $.imReviewer.image = "" == args.profile_photo ? "/images/reviewUser.png" : Alloy.CFG.Urls.imagePathURL + args.profile_photo;
        $.lblReviewer.text = args.appuser_name;
        $.lblReview.text = args.review;
        $.lblReviewTime.text = args.added;
        args.appuser_id == Ti.App.Properties.getString("userId") && ($.reviewContainer.backgroundColor = Alloy.CFG.Colors.ReviewBackgroundColor);
        Alloy.isTablet;
        var timeIcon = icomoonlib.getIcon("panacea", "clock-o", 35, {
            color: Alloy.CFG.Colors.ItemIconColor
        });
        $.imgTime.image = timeIcon;
    };
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;