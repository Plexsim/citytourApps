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
    this.__controllerPath = "homeLayoutLeft";
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
    $.__views.homeLayoutLeft = Ti.UI.createView({
        backgroundColor: Alloy.CFG.Colors.BackgroundColor,
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        navBarHidden: true,
        id: "homeLayoutLeft"
    });
    $.__views.homeLayoutLeft && $.addTopLevelView($.__views.homeLayoutLeft);
    $.__views.__alloyId0 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        borderWidth: "1",
        borderColor: "#FFF",
        id: "__alloyId0"
    });
    $.__views.homeLayoutLeft.add($.__views.__alloyId0);
    $.__views.bigImgView = Ti.UI.createView({
        borderColor: "#FFF",
        borderWidth: "1",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "bigImgView"
    });
    $.__views.__alloyId0.add($.__views.bigImgView);
    openDetailOne ? $.__views.bigImgView.addEventListener("click", openDetailOne) : __defers["$.__views.bigImgView!click!openDetailOne"] = true;
    $.__views.imgLeftImg = Ti.UI.createImageView({
        borderWidth: 1,
        borderColor: "#FFF",
        width: 213,
        height: 150,
        id: "imgLeftImg"
    });
    $.__views.bigImgView.add($.__views.imgLeftImg);
    $.__views.shadow = Ti.UI.createImageView({
        backgroundImage: "/images/shadow.png",
        width: 320,
        height: 56,
        opacity: .8,
        bottom: 0,
        id: "shadow"
    });
    $.__views.bigImgView.add($.__views.shadow);
    $.__views.catName = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 10,
        color: "#FFF",
        text: "22",
        id: "catName"
    });
    $.__views.bigImgView.add($.__views.catName);
    $.__views.__alloyId1 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.smallImgView1 = Ti.UI.createView({
        borderColor: "#FFF",
        borderWidth: "1",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "smallImgView1"
    });
    $.__views.__alloyId1.add($.__views.smallImgView1);
    openDetailTwo ? $.__views.smallImgView1.addEventListener("click", openDetailTwo) : __defers["$.__views.smallImgView1!click!openDetailTwo"] = true;
    $.__views.imgLeftImg2 = Ti.UI.createImageView({
        width: 107,
        height: 75,
        borderWidth: "1",
        borderColor: "#FFF",
        id: "imgLeftImg2"
    });
    $.__views.smallImgView1.add($.__views.imgLeftImg2);
    $.__views.smallImgView2 = Ti.UI.createView({
        borderColor: "#FFF",
        borderWidth: "1",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "smallImgView2"
    });
    $.__views.__alloyId1.add($.__views.smallImgView2);
    openDetailThree ? $.__views.smallImgView2.addEventListener("click", openDetailThree) : __defers["$.__views.smallImgView2!click!openDetailThree"] = true;
    $.__views.imgLeftImg3 = Ti.UI.createImageView({
        width: 107,
        height: 75,
        borderWidth: "1",
        borderColor: "#FFF",
        id: "imgLeftImg3"
    });
    $.__views.smallImgView2.add($.__views.imgLeftImg3);
    $.__views.__alloyId2 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "55",
        id: "__alloyId2"
    });
    $.__views.homeLayoutLeft.add($.__views.__alloyId2);
    $.__views.gotoView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        id: "gotoView"
    });
    $.__views.__alloyId2.add($.__views.gotoView);
    $.__views.imgViewOnMap = Ti.UI.createImageView({
        width: 20,
        height: 20,
        left: 5,
        right: 5,
        id: "imgViewOnMap"
    });
    $.__views.gotoView.add($.__views.imgViewOnMap);
    openMap ? $.__views.imgViewOnMap.addEventListener("click", openMap) : __defers["$.__views.imgViewOnMap!click!openMap"] = true;
    $.__views.lblViewOnMap = Ti.UI.createLabel({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "View On Map",
        id: "lblViewOnMap",
        color: "#454545"
    });
    $.__views.gotoView.add($.__views.lblViewOnMap);
    openMap ? $.__views.lblViewOnMap.addEventListener("click", openMap) : __defers["$.__views.lblViewOnMap!click!openMap"] = true;
    $.__views.imgViewOnGrid = Ti.UI.createImageView({
        width: 20,
        height: 20,
        left: "15",
        right: 5,
        id: "imgViewOnGrid"
    });
    $.__views.gotoView.add($.__views.imgViewOnGrid);
    openGrid ? $.__views.imgViewOnGrid.addEventListener("click", openGrid) : __defers["$.__views.imgViewOnGrid!click!openGrid"] = true;
    $.__views.lblViewOnGrid = Ti.UI.createLabel({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "View On Grid",
        id: "lblViewOnGrid",
        color: "#454545"
    });
    $.__views.gotoView.add($.__views.lblViewOnGrid);
    openGrid ? $.__views.lblViewOnGrid.addEventListener("click", openGrid) : __defers["$.__views.lblViewOnGrid!click!openGrid"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var __ = require("platformSupport");
    require("loadingWindow");
    require("strings");
    var fontIconLoader = require("icomoonlib");
    var psAnimation = require("animation");
    var args = arguments[0] || {};
    var openGrid = function() {
        args.openItemGrid(args.itemsData);
    };
    var openMap = function() {
        args.openItemMap(args.itemsData);
    };
    var openDetailOne = function() {
        var params = {
            item: args.itemsData.items[0]
        };
        var contentView = Alloy.createController("itemDetail", params).getView();
        psAnimation.in(contentView);
    };
    var openDetailTwo = function() {
        var params = {
            item: args.itemsData.items[1]
        };
        var contentView = Alloy.createController("itemDetail", params).getView();
        psAnimation.in(contentView);
    };
    var openDetailThree = function() {
        var params = {
            item: args.itemsData.items[2]
        };
        var contentView = Alloy.createController("itemDetail", params).getView();
        psAnimation.in(contentView);
    };
    var init = function() {
        if (null != args && null != args.itemsData.items && args.itemsData.items.length > 0) {
            var scale = {
                width: args.itemsData.items[0].images[0].width,
                height: args.itemsData.items[0].images[0].height
            };
            var viewScale = {
                width: args.ITEM_BIG_WIDTH,
                height: args.ITEM_BIG_HEIGHT
            };
            scale = __.getGridPhotoSize(scale, viewScale);
            $.imgLeftImg.width = scale.width;
            $.imgLeftImg.height = scale.height;
            $.shadow.width = scale.width;
            $.catName.text = args.itemsData.name;
            $.catName.width = scale.width;
            $.imgLeftImg.image = Alloy.CFG.Urls.imagePathURL + args.itemsData.items[0].images[0].path;
            if (args.itemsData.items.length > 1) {
                scale = {
                    width: args.itemsData.items[1].images[0].width,
                    height: args.itemsData.items[1].images[0].height
                };
                viewScale = {
                    width: args.ITEM_SMALL_WIDTH,
                    height: args.ITEM_SMALL_HEIGHT
                };
                scale = __.getGridPhotoSize(scale, viewScale);
                $.imgLeftImg2.width = scale.width;
                $.imgLeftImg2.height = scale.height;
                $.imgLeftImg2.image = Alloy.CFG.Urls.imagePathURL + args.itemsData.items[1].images[0].path;
            }
            if (args.itemsData.items.length > 2) {
                scale = {
                    width: args.itemsData.items[2].images[0].width,
                    height: args.itemsData.items[2].images[0].height
                };
                viewScale = {
                    width: args.ITEM_SMALL_WIDTH,
                    height: args.ITEM_SMALL_HEIGHT
                };
                scale = __.getGridPhotoSize(scale, viewScale);
                $.imgLeftImg3.width = scale.width;
                $.imgLeftImg3.height = scale.height;
                $.imgLeftImg3.image = Alloy.CFG.Urls.imagePathURL + args.itemsData.items[2].images[0].path;
            }
            $.bigImgView.width = args.ITEM_BIG_WIDTH;
            $.bigImgView.height = args.ITEM_BIG_HEIGHT;
            $.smallImgView1.width = args.ITEM_SMALL_WIDTH;
            $.smallImgView1.height = args.ITEM_SMALL_HEIGHT;
            $.smallImgView2.width = args.ITEM_SMALL_WIDTH;
            $.smallImgView2.height = args.ITEM_SMALL_HEIGHT;
            loadIcon();
            loadLanguage();
            psAnimation.slowlyAppear($.bigImgView);
            psAnimation.slowlyAppear($.smallImgView1);
            psAnimation.slowlyAppear($.smallImgView2);
            psAnimation.slowlyAppear($.gotoView);
            if (Alloy.isTablet) {
                __.setNormalFontForTablet($.lblViewOnGrid, 18);
                __.setNormalFontForTablet($.lblViewOnMap, 18);
                __.setNormalFontForTablet($.catName, 25);
                $.imgViewOnMap.width = 25;
                $.imgViewOnMap.height = 25;
                $.imgViewOnGrid.width = 25;
                $.imgViewOnGrid.height = 25;
            }
        }
    };
    var loadIcon = function() {
        var locationIcon = fontIconLoader.getIcon("panacea", "map-marker", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgViewOnMap.image = locationIcon;
        var gridIcon = fontIconLoader.getIcon("panacea", "grid", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgViewOnGrid.image = gridIcon;
    };
    var loadLanguage = function() {
        $.lblViewOnMap.text = Alloy.CFG.Languages.lblViewOnMap;
        $.lblViewOnGrid.text = Alloy.CFG.Languages.lblViewOnGrid;
    };
    init();
    __defers["$.__views.bigImgView!click!openDetailOne"] && $.__views.bigImgView.addEventListener("click", openDetailOne);
    __defers["$.__views.smallImgView1!click!openDetailTwo"] && $.__views.smallImgView1.addEventListener("click", openDetailTwo);
    __defers["$.__views.smallImgView2!click!openDetailThree"] && $.__views.smallImgView2.addEventListener("click", openDetailThree);
    __defers["$.__views.imgViewOnMap!click!openMap"] && $.__views.imgViewOnMap.addEventListener("click", openMap);
    __defers["$.__views.lblViewOnMap!click!openMap"] && $.__views.lblViewOnMap.addEventListener("click", openMap);
    __defers["$.__views.imgViewOnGrid!click!openGrid"] && $.__views.imgViewOnGrid.addEventListener("click", openGrid);
    __defers["$.__views.lblViewOnGrid!click!openGrid"] && $.__views.lblViewOnGrid.addEventListener("click", openGrid);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;