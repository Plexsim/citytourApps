var args = arguments[0] || {};
var __ = require('platformSupport');
var myAnimation = require('animation');
var loader = require("loader");
var validation = require("validationRules");
var dialogBox = require("psdialog");
var changeFlag = 0;
var fontIconLoader = require("icomoonlib");
var changeFlag = 0;
var loadingWindow = require('loadingWindow');
loadingWindow.endLoading();

if (__.isiOS7Plus()) {
	$.AppWrapper.top = 20;
}	

var closeWindow = function()
{
	myAnimation.out($.userForgot);
};

var forgotProcess = function()
{
	if(validationForgotChecking()) {
		if(Titanium.Network.online == true) {
			loadingWindow.startLoading();
			var loaderArgs = {
				callbackFunction : forgotPasswordSent,
				url : Alloy.CFG.Urls.BaseURL+ ALloy.CFG.Urls.getForgotPassword + $.txtEmailForgot.value.toLowerCase()
			};
			loader.get(loaderArgs);
		} else {
			dialogBox.loadCustomDialog("Forgot Password", Alloy.CFG.Languages.offlineMessage);
		}
	}
};

var forgotPasswordSent = function(feeds)
{
	loadingWindow.endLoading();
	if(feeds.success){
		dialogBox.loadCustomDialog("Forgot Password", Alloy.CFG.Languages.forgotPasswordMessage);
		closeWindow();
	}
};

var validationForgotChecking=function()
{
	if($.txtEmailForgot.value=="") {
		validation.validationFailAction($.txtEmailForgot); 
    	changeFlag = 0;
    	return false;
	} else {
		if(!validation.validateEmail($.txtEmailForgot.value)){
			validation.validationFailAction($.txtEmailForgot); 
    		changeFlag = 0;
    		return false;
		}
	}
	return true;
};

$.txtEmailForgot.addEventListener('change',function(e)
{
	if(changeFlag==0) {
		validation.backToNormal($.txtEmailForgot);
		changeFlag=1;
	}
});

var loadIcon = function()
{
	var emailIcon = fontIconLoader.getIcon("panacea","envelope",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgEmailForgot.image = emailIcon;
	
	var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
};

var loadLanguage = function()
{
	$.lblEmail.text = Alloy.CFG.Languages.lblEmail;
	$.btnRequest.title = Alloy.CFG.Languages.btnRequest;
};

var init = function()
{
	loadIcon();
	loadLanguage();
	myAnimation.slowlyAppear($.forgotPasswordView);
};

$.userForgot.addEventListener('open', function(){
	loadingWindow.endLoading();	
	init();
});


