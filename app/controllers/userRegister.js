var args = arguments[0] || {};
var __ = require('platformSupport');
var psAnimation = require('animation');
var fontIconLoader = require("icomoonlib");
var loader = require("loader");
var validation = require("validationRules");
var dialogBox = require("psdialog");
var users = Alloy.Collections.users;
var changeFlag = 0;
var loadingWindow = require('loadingWindow');

loadingWindow.endLoading();

if (__.isiOS7Plus()) {
	$.AppWrapper.top = 20;
}


var closeWindow = function()
{
	psAnimation.out($.userRegister);
};

var doUserRegister = function()
{
	if(validationChecking()){
		if(Titanium.Network.online == true){
			var payloadJSON = {"username":$.txtUserName.value, "email": $.txtEmail.value, "password":$.txtPassword.value};
			
			loadingWindow.startLoading();
			
			var apiArgs = {
				callbackFunction : callBackDoUserRegister,
				payload : payloadJSON,
				url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postUserRegister
			};
			
			loader.post(apiArgs);
		}
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
	
	if($.txtPassword.value==""){
		validation.validationFailAction($.txtPassword); 
    	changeFlag = 0;
    	return false;
	}


	if($.txtUserName.value==""){
		validation.validationFailAction($.txtUserName); 
    	changeFlag = 0;
    	return false;
	}
	
	return true;
	
};

var callBackDoUserRegister = function(feeds)
{
	if(feeds.user_id != ""){
		Ti.App.fireEvent('refreshMenu');
		var userModel = Alloy.createModel('users',{
			id:feeds.user_id,
			username : $.txtUserName.value,
			email:$.txtEmail.value,
			about_me:"",
			is_banned: 0,
			profile_photo : "",
			background_photo: ""
		});
		
		users.add(userModel);
		userModel.save();
		users.fetch();
		
		Ti.App.Properties.setString('userId', feeds.user_id);
		
		closeWindow();
		
		if(args.item_id == 0) {
				closeWindow();
		} else {
			var params = {
				item_id : args.item_id,
				loadReview : args.loadReview
			};
				
			var contentView = Alloy.createController("review",params).getView();
			psAnimation.in(contentView);
	    }
		
		
		loadingWindow.endLoading();
	}
};


$.txtEmail.addEventListener('change',function(e)
{
	if(changeFlag==0){
		validation.backToNormal($.txtEmail);
		changeFlag=1;
	}
});


$.txtPassword.addEventListener('change',function(e)
{
	if(changeFlag==0){
		validation.backToNormal($.txtPassword);
		changeFlag=1;
	}
});

$.txtUserName.addEventListener('change',function(e)
{
	if(changeFlag==0){
		validation.backToNormal($.txtUserName);
		changeFlag=1;
	}
});

var loadIcon = function()
{
	var emailIcon = fontIconLoader.getIcon("panacea","envelope",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgEmailRegister.image = emailIcon;
	
	var passwordIcon = fontIconLoader.getIcon("panacea","lock",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgPasswordRegister.image = passwordIcon;
	
	var userIcon = fontIconLoader.getIcon("panacea","user",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgUserNameRegister.image = userIcon;
	
	var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
};

var loadLanguage = function()
{
	$.lblUserName.text = Alloy.CFG.Languages.lblUserName;
	$.lblEmail.text = Alloy.CFG.Languages.lblEmail;
	$.lblPassword.text = Alloy.CFG.Languages.lblPassword;
	$.btnRegister.title = Alloy.CFG.Languages.btnRegister;
};

var init = function()
{
	loadIcon();
	loadLanguage();
	psAnimation.slowlyAppear($.registerView);
};

$.userRegister.addEventListener('open', function(){
	loadingWindow.endLoading();	
	init();
});


