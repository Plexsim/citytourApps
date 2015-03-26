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
    this.__controllerPath = "userForgot";
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
    $.__views.userForgot = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "userForgot"
    });
    $.__views.userForgot && $.addTopLevelView($.__views.userForgot);
    $.__views.__alloyId32 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.Colors.MainColor,
        top: 0,
        id: "__alloyId32"
    });
    $.__views.userForgot.add($.__views.__alloyId32);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId32.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "30",
        id: "mainTitle",
        text: "Forgot Password"
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
    $.__views.forgotPasswordView = Ti.UI.createScrollView({
        layout: "vertical",
        left: 15,
        right: 15,
        top: 5,
        id: "forgotPasswordView"
    });
    $.__views.userForgot.add($.__views.forgotPasswordView);
    $.__views.__alloyId33 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        left: "0",
        id: "__alloyId33"
    });
    $.__views.forgotPasswordView.add($.__views.__alloyId33);
    $.__views.imgEmailForgot = Ti.UI.createImageView({
        top: 15,
        width: 15,
        height: 15,
        left: 5,
        right: 5,
        id: "imgEmailForgot"
    });
    $.__views.__alloyId33.add($.__views.imgEmailForgot);
    $.__views.lblEmail = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        text: "Email",
        top: "9",
        color: "#464646",
        id: "lblEmail"
    });
    $.__views.__alloyId33.add($.__views.lblEmail);
    $.__views.txtEmailForgot = Ti.UI.createTextField({
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        borderWidth: 1,
        borderColor: Alloy.CFG.Colors.MainColor,
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        borderRadius: 7,
        id: "txtEmailForgot",
        hintText: "Email"
    });
    $.__views.forgotPasswordView.add($.__views.txtEmailForgot);
    $.__views.btnRequest = Ti.UI.createButton({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        top: 20,
        bottom: 10,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: Alloy.CFG.Colors.MainColor,
        backgroundSelectedColor: Alloy.CFG.Colors.MainColor_Dark,
        borderColor: Alloy.CFG.Colors.MainPressedColor,
        color: Alloy.CFG.Colors.TextColor,
        backgroundImage: "null",
        selectedColor: "#AAA",
        id: "btnRequest",
        title: " Request "
    });
    $.__views.forgotPasswordView.add($.__views.btnRequest);
    forgotProcess ? $.__views.btnRequest.addEventListener("click", forgotProcess) : __defers["$.__views.btnRequest!click!forgotProcess"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    var loader = require("loader");
    var validation = require("validationRules");
    var dialogBox = require("psdialog");
    var changeFlag = 0;
    var fontIconLoader = require("icomoonlib");
    var changeFlag = 0;
    var loadingWindow = require("loadingWindow");
    loadingWindow.endLoading();
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var closeWindow = function() {
        myAnimation.out($.userForgot);
    };
    var forgotProcess = function() {
        if (validationForgotChecking()) if (true == Titanium.Network.online) {
            loadingWindow.startLoading();
            var loaderArgs = {
                callbackFunction: forgotPasswordSent,
                url: Alloy.CFG.Urls.BaseURL + ALloy.CFG.Urls.getForgotPassword + $.txtEmailForgot.value.toLowerCase()
            };
            loader.get(loaderArgs);
        } else dialogBox.loadCustomDialog("Forgot Password", Alloy.CFG.Languages.offlineMessage);
    };
    var forgotPasswordSent = function(feeds) {
        loadingWindow.endLoading();
        if (feeds.success) {
            dialogBox.loadCustomDialog("Forgot Password", Alloy.CFG.Languages.forgotPasswordMessage);
            closeWindow();
        }
    };
    var validationForgotChecking = function() {
        if ("" == $.txtEmailForgot.value) {
            validation.validationFailAction($.txtEmailForgot);
            changeFlag = 0;
            return false;
        }
        if (!validation.validateEmail($.txtEmailForgot.value)) {
            validation.validationFailAction($.txtEmailForgot);
            changeFlag = 0;
            return false;
        }
        return true;
    };
    $.txtEmailForgot.addEventListener("change", function() {
        if (0 == changeFlag) {
            validation.backToNormal($.txtEmailForgot);
            changeFlag = 1;
        }
    });
    var loadIcon = function() {
        var emailIcon = fontIconLoader.getIcon("panacea", "envelope", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgEmailForgot.image = emailIcon;
        var backIcon = fontIconLoader.getIcon("panacea", "back", 35, {
            color: Alloy.CFG.Colors.IconWhite
        });
        $.imgBack.image = backIcon;
    };
    var loadLanguage = function() {
        $.lblEmail.text = Alloy.CFG.Languages.lblEmail;
        $.btnRequest.title = Alloy.CFG.Languages.btnRequest;
    };
    var init = function() {
        loadIcon();
        loadLanguage();
        myAnimation.slowlyAppear($.forgotPasswordView);
    };
    $.userForgot.addEventListener("open", function() {
        loadingWindow.endLoading();
        init();
    });
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.imgBack!click!closeWindow"] && $.__views.imgBack.addEventListener("click", closeWindow);
    __defers["$.__views.btnRequest!click!forgotProcess"] && $.__views.btnRequest.addEventListener("click", forgotProcess);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;