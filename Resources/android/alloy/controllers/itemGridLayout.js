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
    this.__controllerPath = "itemGridLayout";
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
    $.__views.itemGridLayout = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "itemGridLayout"
    });
    $.__views.itemGridLayout && $.addTopLevelView($.__views.itemGridLayout);
    openItemDetail ? $.__views.itemGridLayout.addEventListener("click", openItemDetail) : __defers["$.__views.itemGridLayout!click!openItemDetail"] = true;
    $.__views.itemImgView = Ti.UI.createView({
        id: "itemImgView",
        zIndex: "1"
    });
    $.__views.itemGridLayout.add($.__views.itemImgView);
    $.__views.itemImg = Ti.UI.createImageView({
        width: 160,
        height: 160,
        borderWidth: "1",
        borderColor: "#FFF",
        id: "itemImg"
    });
    $.__views.itemImgView.add($.__views.itemImg);
    $.__views.shadow = Ti.UI.createImageView({
        backgroundImage: "/images/shadow.png",
        width: 320,
        height: 56,
        opacity: .8,
        bottom: 0,
        id: "shadow"
    });
    $.__views.itemImgView.add($.__views.shadow);
    $.__views.ItemName = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        left: 5,
        bottom: 5,
        color: "#FFF",
        text: "22",
        id: "ItemName"
    });
    $.__views.itemImgView.add($.__views.ItemName);
    $.__views.socialView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: 45,
        left: 0,
        top: 5,
        bottom: 0,
        id: "socialView"
    });
    $.__views.itemGridLayout.add($.__views.socialView);
    $.__views.imgLike = Ti.UI.createImageView({
        width: 18,
        height: 18,
        left: 5,
        right: 5,
        top: 0,
        bottom: 0,
        id: "imgLike"
    });
    $.__views.socialView.add($.__views.imgLike);
    $.__views.likeCount = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        text: "0",
        id: "likeCount",
        color: "#454545"
    });
    $.__views.socialView.add($.__views.likeCount);
    $.__views.imgUnLike = Ti.UI.createImageView({
        width: 18,
        height: 18,
        left: 15,
        right: 5,
        top: 0,
        bottom: 0,
        id: "imgUnLike",
        text: "0"
    });
    $.__views.socialView.add($.__views.imgUnLike);
    $.__views.unLikeCount = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        text: "0",
        id: "unLikeCount",
        color: "#454545"
    });
    $.__views.socialView.add($.__views.unLikeCount);
    $.__views.imgReview = Ti.UI.createImageView({
        width: 18,
        height: 18,
        left: 15,
        right: 5,
        top: 0,
        bottom: 0,
        id: "imgReview"
    });
    $.__views.socialView.add($.__views.imgReview);
    $.__views.reviewCount = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        text: "0",
        id: "reviewCount",
        color: "#454545"
    });
    $.__views.socialView.add($.__views.reviewCount);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var fontIconLoader = require("icomoonlib");
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    var loadingWindow = require("loadingWindow");
    var scale = __.getGridPhotoSizeCalWidth(args.scale, args.viewWidth);
    $.itemImg.image = args.image;
    $.itemImg.width = scale.width;
    $.itemImg.height = scale.height;
    $.itemGridLayout.iHeight = scale.height + 45;
    $.itemGridLayout.iWidth = scale.width;
    $.itemImgView.width = scale.width;
    $.itemImgView.height = scale.height;
    $.shadow.width = scale.width;
    $.ItemName.text = args.title;
    $.likeCount.text = args.item.like_count;
    $.unLikeCount.text = args.item.unlike_count;
    $.reviewCount.text = args.item.review_count;
    args.item.likeCount = $.likeCount;
    args.item.unLikeCount = $.unLikeCount;
    args.item.reviewCount = $.reviewCount;
    var openItemDetail = function() {
        loadingWindow.startLoading();
        var contentView = Alloy.createController("itemDetail", args).getView();
        myAnimation.in(contentView);
    };
    var loadIcon = function() {
        var likeIcon = fontIconLoader.getIcon("panacea", "thumbs-up", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgLike.image = likeIcon;
        var commentIcon = fontIconLoader.getIcon("panacea", "comment", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgReview.image = commentIcon;
        var unlikeIcon = fontIconLoader.getIcon("panacea", "thumbs-down", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgUnLike.image = unlikeIcon;
    };
    loadIcon();
    __defers["$.__views.itemGridLayout!click!openItemDetail"] && $.__views.itemGridLayout.addEventListener("click", openItemDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;