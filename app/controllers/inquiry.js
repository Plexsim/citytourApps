var args = arguments[0] || {};
var __ = require('platformSupport');
var myAnimation = require('animation');
var fontIconLoader = require("icomoonlib");
var loader = require("loader");
var validation = require("validationRules");
var dialogBox = require("psdialog");
var loadingWindow = require('loadingWindow');

loadingWindow.endLoading();

var changeFlag = 0;
if (__.isiOS7Plus()) {
	$.AppWrapper.top = 20;
}

var closeWindow = function()
{
	myAnimation.out($.inquiry);
};

var doInquiry = function()
{
	if(validationChecking()){
		if(Titanium.Network.online == true) {
			loadingWindow.startLoading();
			
			var payloadJSON = {"name":$.txtName.value, "email": $.txtEmail.value, "message":$.txtMessage.value};
			
			var loaderArgs = {
				callbackFunction : callBackDoInquiry,
				url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postInquiry + args.item_id,
				payload : payloadJSON,
			};
			loader.post(loaderArgs);
			
		} else {
			dialogBox.loadCustomDialog("Inquiry", Alloy.CFG.Languages.offlineMessage);
		}
	}
};


var callBackDoInquiry=function(feeds)
{
	loadingWindow.endLoading();
	if(feeds.success) {
		dialogBox.loadCustomDialog("Inquiry", Alloy.CFG.Languages.inquirySuccessMessage);
		closeWindow();
	}
};

var validationChecking = function()
{
	
	if($.txtEmail.value=="") {
		validation.validationFailAction($.txtEmail); 
    	changeFlag = 0;
    	return false;
	} else {
		
		if(!validation.validateEmail($.txtEmail.value)){
			validation.validationFailAction($.txtEmail); 
    		changeFlag = 0;
    		return false;
		}
	}
	
	if($.txtName.value==""){
		validation.validationFailAction($.txtName); 
    	changeFlag = 0;
    	return false;
	}
	
	if($.txtMessage.value==""){
		validation.validationFailAction($.txtMessage); 
    	changeFlag = 0;
    	return false;
	}
	
	return true;
	
};


$.txtEmail.addEventListener('change',function(e)
{
	if(changeFlag==0) {
		validation.backToNormal($.txtEmail);
		changeFlag=1;
	}
});

$.txtName.addEventListener('change',function(e)
{
	if(changeFlag==0) {
		validation.backToNormal($.txtName);
		changeFlag=1;
	}
});

$.txtMessage.addEventListener('change',function(e)
{
	if(changeFlag==0) {
		validation.backToNormal($.txtMessage);
		changeFlag=1;
	}
});


var loadIcon = function()
{
	var emailIcon = fontIconLoader.getIcon("panacea","envelope",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgInquiryEmail.image = emailIcon;
	
	var nameIcon = fontIconLoader.getIcon("panacea","user",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgInquiryName.image = nameIcon;
	
	var messageIcon = fontIconLoader.getIcon("panacea","comment",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgInquiryMessage.image = messageIcon;
	
	var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
};

var loadLanguage = function()
{
	$.lblInquiryMessage.text = Alloy.CFG.Languages.lblInquiryMessage;
	$.lblYourName.text = Alloy.CFG.Languages.lblYourName;
	$.lblEmail.text = Alloy.CFG.Languages.lblEmail;
	$.btnSend.title = Alloy.CFG.Languages.btnSendInquiry;
};

var init = function()
{
	loadIcon();
	loadLanguage();
	myAnimation.slowlyAppear($.reviewEntryView);
};

$.inquiry.addEventListener('open', function(){
	init();
});




