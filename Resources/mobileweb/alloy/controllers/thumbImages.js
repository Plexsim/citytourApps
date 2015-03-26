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
    this.__controllerPath = "thumbImages";
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
    $.__views.categoryView = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: "50",
        height: "50",
        layout: "vertical",
        navBarHidden: true,
        top: 0,
        id: "categoryView",
        borderWidth: "0",
        left: "5"
    });
    $.__views.categoryView && $.addTopLevelView($.__views.categoryView);
    loadBigImage ? $.__views.categoryView.addEventListener("click", loadBigImage) : __defers["$.__views.categoryView!click!loadBigImage"] = true;
    $.__views.imCategoryImage = Ti.UI.createImageView({
        top: 0,
        width: 50,
        height: 50,
        id: "imCategoryImage",
        thumbId: "0"
    });
    $.__views.categoryView.add($.__views.imCategoryImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var loadBigImage = function(e) {
        Ti.App.Properties.setString("selectedThumbImageIndex", e.source.thumbId);
        Ti.App.fireEvent(args.loadSelctedItemImageFunction);
    };
    var init = function() {
        $.imCategoryImage.image = args.imagePath;
        $.imCategoryImage.thumbId = args.thumbId;
        var size = [];
        size.height = args.height;
        size.width = args.width;
        var viewSize = [];
        viewSize.height = 50;
        viewSize.width = 50;
        var tmp = __.getThumbPhotoSize(size, viewSize);
        $.imCategoryImage.width = tmp.width;
        $.imCategoryImage.height = tmp.height;
        if (args.selected) {
            $.categoryView.borderWidth = 1;
            $.categoryView.borderColor = Alloy.CFG.Colors.MainColor;
        } else $.categoryView.borderWidth = 0;
        !__.isPortraitImage(size);
    };
    init();
    __defers["$.__views.categoryView!click!loadBigImage"] && $.__views.categoryView.addEventListener("click", loadBigImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;