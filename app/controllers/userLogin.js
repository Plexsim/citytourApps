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
	psAnimation.out($.userLogin);
};


var openUserLogin = function()
{
	if(validationChecking()){
		if(Titanium.Network.online == true){
			var payloadJSON = {"email": $.txtEmail.value.toLowerCase(), "password":$.txtPassword.value};
			loadingWindow.startLoading();
			var loaderArgs = {
				callbackFunction : loginProcess,
				url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postUserLogin,
				payload: payloadJSON
			};
			loader.post(loaderArgs);
		}else{
			dialogBox.loadCustomDialog("Log In", Alloy.CFG.Languages.offlineMessage);
		}
	}
};


var loginProcess = function(feeds)
{
	console.log("Login Success. Need to store at Local DB.");
	if(feeds.error == null) {
		if(feeds != null) {
			Ti.App.fireEvent('refreshMenu');
			
			if(feeds.profile_photo != "") {
				if(Titanium.Network.online == true) {
					var downloadArgs = {
						callbackFunction : downloadFileSuccess,
						urlDownload : Alloy.CFG.Urls.imagePathURL + feeds.profile_photo,
						fileName : feeds.profile_photo
					};
					
					loader.downloadFileToApp(downloadArgs);
					
				} else {
					console.log(">>> Lacking Connection During Profile Photo Download");	
				}	
				
			}
			
			if(feeds.background_photo != "") {
				if(Titanium.Network.online == true) {
					var downloadArgs = {
						callbackFunction : downloadFileSuccess,
						urlDownload : Alloy.CFG.Urls.imagePathURL + 	feeds.background_photo,
						fileName : feeds.background_photo
					};
					loader.downloadFileToApp(downloadArgs);
				} else {
					console.log(">>> Lacking Connection During Profile Background Download");	
				}	
				
			}
			
			var userModel = Alloy.createModel('users',{
				id:feeds.id,
				username : feeds.username,
				email:feeds.email,
				about_me:feeds.about_me,
				is_banned: feeds.is_banned,
				profile_photo : feeds.profile_photo,
				background_photo: feeds.background_photo
			});
			
			users.add(userModel);
			userModel.save();
			users.fetch();
			
			Ti.App.Properties.setString('userId', feeds.id);
		    closeWindow();
		    
		    if(args.item_id == 0) {
				closeWindow();
			} else {
				var contentView = Alloy.createController("review", args).getView();
		    	psAnimation.in(contentView);
		    }
		    
		    loadingWindow.endLoading();
		}
	}else{
		dialogBox.loadCustomDialog('Log In', feeds.error.message);
	}
};

function downloadFileSuccess(fileName)
{
	console.log(">>> Download Image Successful : " + fileName);
}


var validationChecking = function()
{
	
	if($.txtEmail.value=="") {
		validation.validationFailAction($.txtEmail); 
    	changeFlag = 0;
    	return false;
	} else {
		
		if(!validation.validateEmail($.txtEmail.value)) {
			validation.validationFailAction($.txtEmail); 
    		changeFlag = 0;
    		return false;
		}
	}
	
	if($.txtPassword.value=="") {
		validation.validationFailAction($.txtPassword); 
    	changeFlag = 0;
    	return false;
	}
	return true;
};


var openUserRegister = function()
{
	closeWindow();
	loadingWindow.startLoading();
	var params = {
		item_id : args.item_id,
		loadReview : args.loadReview
	};
	var contentView = Alloy.createController("userRegister",params).getView();
	psAnimation.in(contentView);
};

var openForgotPassword = function()
{
	closeWindow();
	loadingWindow.startLoading();
	var params = {
		item_id : args.item_id
	};
	var contentView = Alloy.createController("userForgot",params).getView();
	psAnimation.in(contentView);
};

$.txtEmail.addEventListener('change',function(e)
{
	if(changeFlag==0) {
		validation.backToNormal($.txtEmail);
		changeFlag=1;
	}
});


$.txtPassword.addEventListener('change',function(e)
{
	if(changeFlag==0) {
		validation.backToNormal($.txtPassword);
		changeFlag=1;
	}
});

var loadIcon = function()
{
	var emailIcon = fontIconLoader.getIcon("panacea","envelope",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgEmailLogin.image = emailIcon;
	
	var passwordIcon = fontIconLoader.getIcon("panacea","lock",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgPasswordLogin.image = passwordIcon;
	
	var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
};

var loadLanguage = function()
{
	$.lblEmail.text = Alloy.CFG.Languages.lblEmail;
	$.lblPassword.text = Alloy.CFG.Languages.lblPassword;
	$.btnLogin.title = Alloy.CFG.Languages.btnLogin;
	$.btnRegister.title = Alloy.CFG.Languages.btnRegister;
	$.btnForgot.title = Alloy.CFG.Languages.btnForgot;
};


var init = function()
{
	loadIcon();
	loadLanguage();
	psAnimation.slowlyAppear($.userLoginView);
};

$.userLogin.addEventListener('open', function(){
	loadingWindow.endLoading();	
	init();
});




