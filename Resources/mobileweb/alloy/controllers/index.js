function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function handleMenuClick(_event) {
        "undefined" != typeof _event.row.id && openScreen(_event.row.id);
    }
    function openScreen(rowID) {
        if (0 == rowID) "null" != homeData ? loadContentView("home", homeData) : loadContentView("home", "My Account"); else if (1 == rowID) loadAllFeeds(); else if (2 == rowID) {
            var params = {
                name: Alloy.CFG.Languages.lblPopular
            };
            loadContentView("popularList", params);
        } else if (3 == rowID) if (null != Ti.App.Properties.getString("userId")) {
            var params = {
                name: Alloy.CFG.Languages.lblFavourite
            };
            loadContentView("favouriteList", params);
        } else {
            var params = {
                name: Alloy.CFG.Languages.lblProfile
            };
            loadContentView("userProfile", params);
            $.SlideMenu.setIndex(4);
            dialogBox.loadCustomDialog("My Favourite", Alloy.CFG.Languages.needForFavouriteListMesssage);
        } else if (4 == rowID) {
            var params = {
                name: Alloy.CFG.Languages.lblProfile
            };
            loadContentView("userProfile", params);
        } else if (5 == rowID) {
            var user = users.get(Ti.App.Properties.getString("userId"));
            null != user && user.destroy();
            users.fetch();
            Ti.App.Properties.setString("userId", null);
            "null" != homeData ? loadContentView("home", homeData) : loadContentView("home", "My Account");
            $.SlideMenu.clear();
            $.SlideMenu.Nodes.removeEventListener("click", handleMenuClick);
            initSlideMenu(beforeNodes);
        }
        closeMenu();
    }
    function initProcess() {
        appWrapper = $.AppWrapper;
    }
    function openMenu() {
        appWrapper.animate({
            left: "200dp",
            right: "-200dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "0dp",
            right: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        isSliderOpen = true;
    }
    function closeMenu() {
        appWrapper.animate({
            left: "0dp",
            right: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "-200dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        isSliderOpen = false;
    }
    function openLeftMenu() {
        isSliderOpen ? closeMenu() : openMenu();
    }
    function initSlideMenu(nodes) {
        $.SlideMenu.init({
            nodes: nodes,
            color: {
                headingBackground: "#000",
                headingText: "#FFF"
            }
        });
        $.SlideMenu.setIndex(0);
        $.SlideMenu.Nodes.addEventListener("click", handleMenuClick);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.Colors.MainColor,
        navBarHidden: true,
        exitOnClose: true,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.SlideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "SlideMenu",
        __parentSymbol: $.__views.index
    });
    $.__views.SlideMenu.setParent($.__views.index);
    $.__views.AppWrapper = Ti.UI.createView({
        layout: "vertical",
        id: "AppWrapper"
    });
    $.__views.index.add($.__views.AppWrapper);
    $.__views.__alloyId6 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.Colors.MainColor,
        top: 0,
        id: "__alloyId6"
    });
    $.__views.AppWrapper.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "30",
        id: "mainTitle",
        text: "CityTour"
    });
    $.__views.__alloyId7.add($.__views.mainTitle);
    openLeftMenu ? $.__views.mainTitle.addEventListener("click", openLeftMenu) : __defers["$.__views.mainTitle!click!openLeftMenu"] = true;
    $.__views.imgSideMenu = Ti.UI.createImageView({
        width: 20,
        height: 20,
        left: 5,
        right: 5,
        id: "imgSideMenu"
    });
    $.__views.__alloyId7.add($.__views.imgSideMenu);
    openLeftMenu ? $.__views.imgSideMenu.addEventListener("click", openLeftMenu) : __defers["$.__views.imgSideMenu!click!openLeftMenu"] = true;
    $.__views.midContainer = Ti.UI.createView({
        id: "midContainer",
        bottom: "0"
    });
    $.__views.AppWrapper.add($.__views.midContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var __ = require("platformSupport");
    require("animation");
    var fontIconLoader = require("icomoonlib");
    var loader = require("loader");
    var loadingWindow = require("loadingWindow");
    var dialogBox = require("psdialog");
    var profileIcon = fontIconLoader.getIcon("panacea", "profile", 35, {
        color: Alloy.CFG.Colors.SideMenuIconColor
    });
    var homeIcon = fontIconLoader.getIcon("panacea", "home", 35, {
        color: Alloy.CFG.Colors.SideMenuIconColor
    });
    var sideMenuIcon = fontIconLoader.getIcon("panacea", "navicon", 35, {
        color: Alloy.CFG.Colors.IconWhite
    });
    var favouriteIcon = fontIconLoader.getIcon("panacea", "star", 35, {
        color: Alloy.CFG.Colors.SideMenuIconColor
    });
    var feedIcon = fontIconLoader.getIcon("panacea", "rss", 35, {
        color: Alloy.CFG.Colors.SideMenuIconColor
    });
    var signOutIcon = fontIconLoader.getIcon("panacea", "sign-out", 35, {
        color: Alloy.CFG.Colors.SideMenuIconColor
    });
    var popularIcon = fontIconLoader.getIcon("panacea", "tag", 35, {
        color: Alloy.CFG.Colors.SideMenuIconColor
    });
    var appWrapper = null;
    var isSliderOpen = false;
    var homeData = null;
    var newsData;
    var users = Alloy.Collections.users;
    $.imgSideMenu.image = sideMenuIcon;
    if (Alloy.isTablet) {
        $.imgSideMenu.width = 25;
        $.imgSideMenu.height = 25;
    }
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var beforeNodes = [ {
        menuHeader: Alloy.CFG.Languages.appName,
        id: 0,
        title: Alloy.CFG.Languages.lblHome,
        image: homeIcon
    }, {
        id: 1,
        title: Alloy.CFG.Languages.lblNewsFeed,
        image: feedIcon
    }, {
        id: 2,
        title: Alloy.CFG.Languages.lblPopular,
        image: popularIcon
    }, {
        id: 3,
        title: Alloy.CFG.Languages.lblFavourite,
        image: favouriteIcon
    }, {
        id: 4,
        title: Alloy.CFG.Languages.lblProfile,
        image: profileIcon
    } ];
    var afterNodes = [ {
        menuHeader: Alloy.CFG.Languages.appName,
        id: 0,
        title: Alloy.CFG.Languages.lblHome,
        image: homeIcon
    }, {
        id: 1,
        title: Alloy.CFG.Languages.lblNewsFeed,
        image: feedIcon
    }, {
        id: 2,
        title: Alloy.CFG.Languages.lblPopular,
        image: popularIcon
    }, {
        id: 3,
        title: Alloy.CFG.Languages.lblFavourite,
        image: favouriteIcon
    }, {
        id: 4,
        title: Alloy.CFG.Languages.lblProfile,
        image: profileIcon
    }, {
        id: 5,
        title: Alloy.CFG.Languages.lbllogout,
        image: signOutIcon
    } ];
    var loadContentView = function(viewName, args) {
        var contentView = Alloy.createController(viewName, args).getView();
        $.midContainer.removeAllChildren();
        $.midContainer.add(contentView);
        $.mainTitle.text = null != args ? args.name : Alloy.CFG.Languages.appName;
    };
    var callBackLoadAllCategories = function(args) {
        if (0 != args.length) {
            homeData = args;
            args.name = Alloy.CFG.Languages.appName;
            loadContentView("home", args);
        } else {
            dialogBox.loadCustomDialog("CityTour", Alloy.CFG.Languages.dataNotFound);
            loadingWindow.endLoading();
        }
    };
    var loadAllCategories = function() {
        var loaderArgs = {
            callbackFunction: callBackLoadAllCategories,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getCategoriesWithThreeItems
        };
        loader.get(loaderArgs);
    };
    var updateFromVal = function() {
        var limit = Alloy.CFG.LimitOfPosts;
        var from = Ti.App.Properties.getInt("From");
        Ti.App.Properties.setInt("From", limit + from);
    };
    var loadAllFeeds = function() {
        var limit = Alloy.CFG.LimitOfPosts;
        Ti.App.Properties.setInt("From", 0);
        var loaderArgs = {
            callbackFunction: callBackLoadAllFeeds,
            url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getFeeds + limit + "/from/0"
        };
        loader.get(loaderArgs);
    };
    var callBackLoadAllFeeds = function(argsFeeds) {
        if (null != argsFeeds && argsFeeds.length > 0) {
            newsData = argsFeeds;
            updateFromVal();
            newsData.name = Alloy.CFG.Languages.lblNewsFeed;
            loadContentView("newsList", newsData);
        }
    };
    $.index.addEventListener("open", function() {
        loadingWindow.startLoading();
        loadAllCategories();
        initProcess();
        initSlideMenu(null != Ti.App.Properties.getString("userId") ? afterNodes : beforeNodes);
    });
    Ti.App.addEventListener("refreshMenu", function() {
        $.SlideMenu.clear();
        $.SlideMenu.Nodes.removeEventListener("click", handleMenuClick);
        initSlideMenu(afterNodes);
    });
    $.index.open();
    __defers["$.__views.mainTitle!click!openLeftMenu"] && $.__views.mainTitle.addEventListener("click", openLeftMenu);
    __defers["$.__views.imgSideMenu!click!openLeftMenu"] && $.__views.imgSideMenu.addEventListener("click", openLeftMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;