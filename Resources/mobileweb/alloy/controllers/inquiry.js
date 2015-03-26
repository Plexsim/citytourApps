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
    this.__controllerPath = "inquiry";
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
    $.__views.inquiry = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.Colors.BackgroundColor,
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "inquiry"
    });
    $.__views.inquiry && $.addTopLevelView($.__views.inquiry);
    $.__views.__alloyId8 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.Colors.MainColor,
        top: 0,
        id: "__alloyId8"
    });
    $.__views.inquiry.add($.__views.__alloyId8);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId8.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Send Inquiry"
    });
    $.__views.AppWrapper.add($.__views.mainTitle);
    closeWindow ? $.__views.mainTitle.addEventListener("click", closeWindow) : __defers["$.__views.mainTitle!click!closeWindow"] = true;
    $.__views.imgBack = Ti.UI.createImageView({
        width: 30,
        height: 30,
        left: 0,
        right: 5,
        id: "imgBack"
    });
    $.__views.AppWrapper.add($.__views.imgBack);
    closeWindow ? $.__views.imgBack.addEventListener("click", closeWindow) : __defers["$.__views.imgBack!click!closeWindow"] = true;
    $.__views.__alloyId9 = Ti.UI.createScrollView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId9"
    });
    $.__views.inquiry.add($.__views.__alloyId9);
    $.__views.reviewEntryView = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 15,
        right: 15,
        top: 5,
        id: "reviewEntryView"
    });
    $.__views.__alloyId9.add($.__views.reviewEntryView);
    $.__views.__alloyId10 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        left: "0",
        id: "__alloyId10"
    });
    $.__views.reviewEntryView.add($.__views.__alloyId10);
    $.__views.imgInquiryMessage = Ti.UI.createImageView({
        width: 20,
        height: 20,
        left: 5,
        right: 5,
        top: 15,
        id: "imgInquiryMessage"
    });
    $.__views.__alloyId10.add($.__views.imgInquiryMessage);
    $.__views.lblInquiryMessage = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        text: "Your Inquiry Message",
        top: "11",
        color: "#464646",
        id: "lblInquiryMessage"
    });
    $.__views.__alloyId10.add($.__views.lblInquiryMessage);
    $.__views.txtMessage = Ti.UI.createTextArea({
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
        id: "txtMessage",
        hintText: "Inquiry Message"
    });
    $.__views.reviewEntryView.add($.__views.txtMessage);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        left: "0",
        id: "__alloyId11"
    });
    $.__views.reviewEntryView.add($.__views.__alloyId11);
    $.__views.imgInquiryName = Ti.UI.createImageView({
        width: 20,
        height: 20,
        left: 5,
        right: 5,
        top: 15,
        id: "imgInquiryName"
    });
    $.__views.__alloyId11.add($.__views.imgInquiryName);
    $.__views.lblYourName = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        text: "Your Name",
        top: "13",
        color: "#464646",
        id: "lblYourName"
    });
    $.__views.__alloyId11.add($.__views.lblYourName);
    $.__views.txtName = Ti.UI.createTextField({
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
        id: "txtName",
        hintText: "User Name"
    });
    $.__views.reviewEntryView.add($.__views.txtName);
    $.__views.__alloyId12 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        left: "0",
        id: "__alloyId12"
    });
    $.__views.reviewEntryView.add($.__views.__alloyId12);
    $.__views.imgInquiryEmail = Ti.UI.createImageView({
        width: 15,
        height: 15,
        left: 5,
        right: 5,
        top: 15,
        id: "imgInquiryEmail"
    });
    $.__views.__alloyId12.add($.__views.imgInquiryEmail);
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
    $.__views.__alloyId12.add($.__views.lblEmail);
    $.__views.txtEmail = Ti.UI.createTextField({
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
        id: "txtEmail",
        hintText: "Email"
    });
    $.__views.reviewEntryView.add($.__views.txtEmail);
    $.__views.btnSend = Ti.UI.createButton({
        font: {
            fontSize: 13,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        backgroundColor: Alloy.CFG.Colors.MainColor,
        backgroundSelectedColor: Alloy.CFG.Colors.MainColor_Dark,
        borderColor: Alloy.CFG.Colors.MainPressedColor,
        color: Alloy.CFG.Colors.TextColor,
        backgroundImage: "null",
        selectedColor: "#AAA",
        top: 20,
        bottom: 10,
        width: "98%",
        left: "1%",
        right: "1%",
        id: "btnSend",
        title: " Send Inquiry "
    });
    $.__views.reviewEntryView.add($.__views.btnSend);
    doInquiry ? $.__views.btnSend.addEventListener("click", doInquiry) : __defers["$.__views.btnSend!click!doInquiry"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    var fontIconLoader = require("icomoonlib");
    var loader = require("loader");
    var validation = require("validationRules");
    var dialogBox = require("psdialog");
    var loadingWindow = require("loadingWindow");
    loadingWindow.endLoading();
    var changeFlag = 0;
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var closeWindow = function() {
        myAnimation.out($.inquiry);
    };
    var doInquiry = function() {
        if (validationChecking()) if (true == Titanium.Network.online) {
            loadingWindow.startLoading();
            var payloadJSON = {
                name: $.txtName.value,
                email: $.txtEmail.value,
                message: $.txtMessage.value
            };
            var loaderArgs = {
                callbackFunction: callBackDoInquiry,
                url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postInquiry + args.item_id,
                payload: payloadJSON
            };
            loader.post(loaderArgs);
        } else dialogBox.loadCustomDialog("Inquiry", Alloy.CFG.Languages.offlineMessage);
    };
    var callBackDoInquiry = function(feeds) {
        loadingWindow.endLoading();
        if (feeds.success) {
            dialogBox.loadCustomDialog("Inquiry", Alloy.CFG.Languages.inquirySuccessMessage);
            closeWindow();
        }
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
        if ("" == $.txtName.value) {
            validation.validationFailAction($.txtName);
            changeFlag = 0;
            return false;
        }
        if ("" == $.txtMessage.value) {
            validation.validationFailAction($.txtMessage);
            changeFlag = 0;
            return false;
        }
        return true;
    };
    $.txtEmail.addEventListener("change", function() {
        if (0 == changeFlag) {
            validation.backToNormal($.txtEmail);
            changeFlag = 1;
        }
    });
    $.txtName.addEventListener("change", function() {
        if (0 == changeFlag) {
            validation.backToNormal($.txtName);
            changeFlag = 1;
        }
    });
    $.txtMessage.addEventListener("change", function() {
        if (0 == changeFlag) {
            validation.backToNormal($.txtMessage);
            changeFlag = 1;
        }
    });
    var loadIcon = function() {
        var emailIcon = fontIconLoader.getIcon("panacea", "envelope", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgInquiryEmail.image = emailIcon;
        var nameIcon = fontIconLoader.getIcon("panacea", "user", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgInquiryName.image = nameIcon;
        var messageIcon = fontIconLoader.getIcon("panacea", "comment", 35, {
            color: Alloy.CFG.Colors.IconColor
        });
        $.imgInquiryMessage.image = messageIcon;
        var backIcon = fontIconLoader.getIcon("panacea", "back", 35, {
            color: Alloy.CFG.Colors.IconWhite
        });
        $.imgBack.image = backIcon;
    };
    var loadLanguage = function() {
        $.lblInquiryMessage.text = Alloy.CFG.Languages.lblInquiryMessage;
        $.lblYourName.text = Alloy.CFG.Languages.lblYourName;
        $.lblEmail.text = Alloy.CFG.Languages.lblEmail;
        $.btnSend.title = Alloy.CFG.Languages.btnSendInquiry;
    };
    var init = function() {
        loadIcon();
        loadLanguage();
        myAnimation.slowlyAppear($.reviewEntryView);
    };
    $.inquiry.addEventListener("open", function() {
        init();
    });
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.imgBack!click!closeWindow"] && $.__views.imgBack.addEventListener("click", closeWindow);
    __defers["$.__views.btnSend!click!doInquiry"] && $.__views.btnSend.addEventListener("click", doInquiry);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;