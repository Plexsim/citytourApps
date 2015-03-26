function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function downloadFileSuccess(fileName) {
        console.log(">>> Download Image Successful : " + fileName);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "userLogin";
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
    $.__views.userLogin = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.Colors.BackgroundColor,
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "userLogin"
    });
    $.__views.userLogin && $.addTopLevelView($.__views.userLogin);
    $.__views.__alloyId34 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.Colors.MainColor,
        top: 0,
        id: "__alloyId34"
    });
    $.__views.userLogin.add($.__views.__alloyId34);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId34.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "30",
        id: "mainTitle",
        text: "Login"
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
    $.__views.__alloyId35 = Ti.UI.createScrollView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId35"
    });
    $.__views.userLogin.add($.__views.__alloyId35);
    $.__views.userLoginView = Ti.UI.createView({
        layout: "vertical",
        left: 15,
        right: 15,
        top: 5,
        id: "userLoginView"
    });
    $.__views.__alloyId35.add($.__views.userLoginView);
    $.__views.__alloyId36 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        left: "0",
        id: "__alloyId36"
    });
    $.__views.userLoginView.add($.__views.__alloyId36);
    $.__views.imgEmailLogin = Ti.UI.createImageView({
        top: 15,
        width: 15,
        height: 15,
        left: 5,
        right: 5,
        id: "imgEmailLogin"
    });
    $.__views.__alloyId36.add($.__views.imgEmailLogin);
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
    $.__views.__alloyId36.add($.__views.lblEmail);
    $.__views.txtEmail = Ti.UI.createTextField({
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
        id: "txtEmail",
        hintText: "Email"
    });
    $.__views.userLoginView.add($.__views.txtEmail);
    $.__views.__alloyId37 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        left: "0",
        id: "__alloyId37"
    });
    $.__views.userLoginView.add($.__views.__alloyId37);
    $.__views.imgPasswordLogin = Ti.UI.createImageView({
        top: 15,
        width: 20,
        height: 20,
        left: 5,
        right: 5,
        id: "imgPasswordLogin"
    });
    $.__views.__alloyId37.add($.__views.imgPasswordLogin);
    $.__views.lblPassword = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        text: "Password",
        top: "13",
        color: "#464646",
        id: "lblPassword"
    });
    $.__views.__alloyId37.add($.__views.lblPassword);
    $.__views.txtPassword = Ti.UI.createTextField({
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
        id: "txtPassword",
        hintText: "Password",
        passwordMask: "true"
    });
    $.__views.userLoginView.add($.__views.txtPassword);
    $.__views.btnLogin = Ti.UI.createButton({
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
        id: "btnLogin",
        title: " Login "
    });
    $.__views.userLoginView.add($.__views.btnLogin);
    openUserLogin ? $.__views.btnLogin.addEventListener("click", openUserLogin) : __defers["$.__views.btnLogin!click!openUserLogin"] = true;
    $.__views.btnRegister = Ti.UI.createButton({
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
        id: "btnRegister",
        title: " Register "
    });
    $.__views.userLoginView.add($.__views.btnRegister);
    openUserRegister ? $.__views.btnRegister.addEventListener("click", openUserRegister) : __defers["$.__views.btnRegister!click!openUserRegister"] = true;
    $.__views.btnForgot = Ti.UI.createButton({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        top: 10,
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
        id: "btnForgot",
        title: " Forgot Password "
    });
    $.__views.userLoginView.add($.__views.btnForgot);
    openForgotPassword ? $.__views.btnForgot.addEventListener("click", openForgotPassword) : __defers["$.__views.btnForgot!click!openForgotPassword"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var psAnimation = require("animation");
    var fontIconLoader = require("icomoonlib");
    var loader = require("loader");
    var validation = require("validationRules");
    var dialogBox = require("psdialog");
    var users = Alloy.Collections.users;
    var changeFlag = 0;
    var loadingWindow = require("loadingWindow");
    loadingWindow.endLoading();
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var closeWindow = function() {
        psAnimation.out($.userLogin);
    };
    var openUserLogin = function() {
        if (validationChecking()) if (true == Titanium.Network.online) {
            var payloadJSON = {
                email: $.txtEmail.value.toLowerCase(),
                password: $.txtPassword.value
            };
            loadingWindow.startLoading();
            var loaderArgs = {
                callbackFunction: loginProcess,
                url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postUserLogin,
                payload: payloadJSON
            };
            loader.post(loaderArgs);
        } else dialogBox.loadCustomDialog("Log In", Alloy.CFG.Languages.offlineMessage);
    };
    var loginProcess = function(feeds) {
        console.log("Login Success. Need to store at Local DB.");
        if (null == feeds.error) {
            if (null != feeds) {
                Ti.App.fireEvent("refreshMenu");
                if ("" != feeds.profile_photo) if (true == Titanium.Network.online) {
                    var downloadArgs = {
                        callbackFunction: downloadFileSuccess,
                        urlDownload: Alloy.CFG.Urls.imagePathURL + feeds.profile_photo,
                        fileName: feeds.profile_photo
                    };
                    loader.downloadFileToApp(downloadArgs);
                } else console.log(">>> Lacking Connection During Profile Photo Download");
                if ("" != feeds.background_photo) if (true == Titanium.Network.online) {
                    var downloadArgs = {
                        callbackFunction: downloadFileSuccess,
                        urlDownload: Alloy.CFG.Urls.imagePathURL + feeds.background_photo,
                        fileName: feeds.background_photo
                    };
                    loader.downloadFileToApp(downloadArgs);
                } else console.log(">>> Lacking Connection During Profile Background Download");
                var userModel = Alloy.createModel("users", {
                    id: feeds.id,
                    username: feeds.username,
                    email: feeds.email,
                    about_me: feeds.about_me,
                    is_banned: feeds.is_banned,
                    profile_photo: feeds.profile_photo,
                    background_photo: feeds.background_photo
                });
                users.add(userModel);
                userModel.save();
                users.fetch();
                Ti.App.Properties.setString("userId", feeds.id);
                closeWindow();
                if (0 == args.item_id) closeWindow(); else {
                    var contentView = Alloy.createController("review", args).getView();
                    psAnimation.in(contentView);
                }
                loadingWindow.endLoading();
            }
        } else dialogBox.loadCustomDialog("Log In", feeds.error.message);
    };
    var validationChecking = function() {
        if ("" == $.txtEmail.value) {
            validation.validationFailAction($.txtEmail);
            changeFlag = 0;
            return false;
        }
        if (!validation.validateEmail($.txtEmail.value)) {
            validation.validationFailAction($.txtEmail);
            changeFlag = 0;
            return false;
        }
        if ("" == $.txtPassword.value) {
            validation.validationFailAction($.txtPassword);
            changeFlag = 0;
            return false;
        }
        return true;
    };
    var openUserRegister = function() {
        closeWindow();
        loadingWindow.startLoading();
        var params = {
            item_id: args.item_id,
            loadReview: args.loadReview
        };
        var contentView = Alloy.createController("userRegister", params).getView();
        psAnimation.in(contentView);
    };
    var openForgotPassword = function() {
        closeWindow();
        loadingWindow.startLoading();
        var params = {
            item_id: args.item_id
        };
        var contentView = Alloy.createController("userForgot", params).getView();
        psAnimation.in(contentView);
    };
    $.txtEmail.addEventListener("change", function() {
        if (0 == changeFlag) {
            validation.backToNormal($.txtEmail);
            changeFlag = 1;
        }
    });
    $.txtPassword.addEventListener("change", function() {
        if (0 == changeFlag) {
            validation.backToNormal($.txtPassword);
            changeFlag = 1;
        }
    });
    var loadIcon = function() {
        var emailIcon = fontIconLoader.getIcon("panacea", "envelope", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgEmailLogin.image = emailIcon;
        var passwordIcon = fontIconLoader.getIcon("panacea", "lock", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgPasswordLogin.image = passwordIcon;
        var backIcon = fontIconLoader.getIcon("panacea", "back", 35, {
            color: Alloy.CFG.Colors.IconWhite
        });
        $.imgBack.image = backIcon;
    };
    var loadLanguage = function() {
        $.lblEmail.text = Alloy.CFG.Languages.lblEmail;
        $.lblPassword.text = Alloy.CFG.Languages.lblPassword;
        $.btnLogin.title = Alloy.CFG.Languages.btnLogin;
        $.btnRegister.title = Alloy.CFG.Languages.btnRegister;
        $.btnForgot.title = Alloy.CFG.Languages.btnForgot;
    };
    var init = function() {
        loadIcon();
        loadLanguage();
        psAnimation.slowlyAppear($.userLoginView);
    };
    $.userLogin.addEventListener("open", function() {
        loadingWindow.endLoading();
        init();
    });
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.imgBack!click!closeWindow"] && $.__views.imgBack.addEventListener("click", closeWindow);
    __defers["$.__views.btnLogin!click!openUserLogin"] && $.__views.btnLogin.addEventListener("click", openUserLogin);
    __defers["$.__views.btnRegister!click!openUserRegister"] && $.__views.btnRegister.addEventListener("click", openUserRegister);
    __defers["$.__views.btnForgot!click!openForgotPassword"] && $.__views.btnForgot.addEventListener("click", openForgotPassword);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;