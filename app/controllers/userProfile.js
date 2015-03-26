var args = arguments[0] || {};
var psAnimation = require('animation');
var __ = require('platformSupport');
var users = Alloy.Collections.users;
var fontIconLoader = require("icomoonlib");
var imageSourceSelector = require('imagePickupSourceSelector');
var userId =  Ti.App.Properties.getString("userId");
var loader = require("loader");
var validation = require("validationRules");
var dialogBox = require("psdialog");
var changeFlag = 0;
var media = null;
var imageSourceWindow = null;
var iPath = "";

var init = function()
{
	userId =  Ti.App.Properties.getString("userId");

	if(!userId){
		$.userProfileView.height=0;
		$.userProfileView.opacity =0;
		
		//for register view
		$.userRegisterView.height=0;
		$.userRegisterView.opacity=0;
		
		$.forgotPasswordView.height = 0;
		$.forgotPasswordView.opacity = 0;
		//loading icon
		loadIcon();
		loadLanguage();
		if(Alloy.isTablet) {
			
			__.setNormalFontForTablet($.lblEmailLogin,18);
			$.lblEmailLogin.top = 16;
			
			__.setNormalFontForTablet($.lblPasswordLogin,18);
			$.lblPasswordLogin.top = 16;
			
			__.setNormalFontForTablet($.lblLoginTitle,18);
			
			__.setNormalFontForTablet($.btnLogin,18);
			__.setNormalFontForTablet($.btnRegisterLogin,18);
			__.setNormalFontForTablet($.btnForgot,18);
			
			
			$.imgEmailLogin.width = 25;
			$.imgEmailLogin.height = 25;
			
			$.imgPasswordLogin.width = 25;
			$.imgPasswordLogin.height = 25;
		}
		
	} else {
		
		users.fetch();
		console.log(">>>>> When Click Profile Menu <<<<<");
		console.log(users.toJSON());
		
		
		$.userLoginView.height=0;
		$.userLoginView.opacity=0;
		
		//for register view
		$.userRegisterView.height=0;
		$.userRegisterView.opacity=0;
		
		
		$.forgotPasswordView.height=0;
		$.forgotPasswordView.opacity=0;
		//need to load profile photo from localpath
		var path = null;
		
		users.fetch();
		var user = users.get(userId);
		
		if(OS_IOS) {
			path = Titanium.Filesystem.applicationDataDirectory;	
		} else {
			path = Titanium.Filesystem.externalStorageDirectory;
		}
		
		var profileImage;
		var localPath = "/images/defaultProfile.png";
		
		if(user.get("profile_photo")!="") {
			profileImage = Titanium.Filesystem.getFile(path,user.get("profile_photo"));
			if(profileImage.exists()) {
				localPath = profileImage.nativePath;
				
			}
		}
		$.userProfilePhoto.image = localPath;
		
		var backgroundImage;
		var backgroundImagePath = "/images/defaultBackground.jpg";
		if(user.get("background_photo")!="") {
			backgroundImage = Titanium.Filesystem.getFile(path,user.get("background_photo"));
			if(backgroundImage.exists()){
				backgroundImagePath = backgroundImage.nativePath;
				
			}
		}
		
		$.userBackgroundPhoto.image = backgroundImagePath;
		
		alignmentUI(backgroundImagePath);
		
		bindingDataWithUI(user);
	
		if(Alloy.isTablet){
			
			__.setNormalFontForTablet($.lblProfilePhoto,18);
			$.lblProfilePhoto.top = 20;
			__.setNormalFontForTablet($.lblBGPhoto,18);
			$.lblBGPhoto.top = 20;
			
			__.setNormalFontForTablet($.btnInfoEdit,18);
			__.setNormalFontForTablet($.btnPasswordEdit,18);
			
			$.imgNameProfile.width = 25;
			$.imgNameProfile.height = 25;
			
			$.imgEmailProfile.width = 25;
			$.imgEmailProfile.height = 25;
			
			$.imgAboutMeProfile.width = 25;
			$.imgAboutMeProfile.height = 25;
			
			
			__.setNormalFontForTablet($.lblNameProfile,18);
			__.setNormalFontForTablet($.lblEmailProfile,18);
			__.setNormalFontForTablet($.lblAboutProfile,18);
			__.setNormalFontForTablet($.btnUpdateProfile,18);
			
			__.setNormalFontForTablet($.lblNewPassword,18);
			$.lblNewPassword.top = 16;
			
			__.setNormalFontForTablet($.lblConfirmPassword,18);
			$.lblConfirmPassword.top = 16;
			
			$.imgNewPassword.width = 25;
			$.imgNewPassword.height = 25;
			
			$.imgConfirmPassword.width = 25;
			$.imgConfirmPassword.height = 25;
			
			__.setNormalFontForTablet($.btnUpdatePassword,18);
			
		}
		
	}
	
	psAnimation.slowlyAppear($.userProfileView);
	psAnimation.slowlyAppear($.userLoginView);
	
};


var alignmentUI = function(backgroundImagePath)
{
	if(Alloy.isTablet) {
		$.userProfilePhoto.width = 150;
		$.userProfilePhoto.height = 150;
		
		//need to adjust for about me and upload buttons
		$.lblAboutMe.opacity = 1;
		$.lblAboutMe.height = Ti.UI.SIZE;
		$.uploadContainer.layout = "horizontal";
		
	} else {
		$.userProfilePhoto.width = 75;
		$.userProfilePhoto.height = 75;
		
		//need to adjust for about me and upload buttons
		$.lblAboutMe.opacity = 0;
		$.lblAboutMe.height = 0;
	}
	
	$.aboutmeView.left = $.userProfilePhoto.width + 20;
	
	var screenWidth = __.getScreenWidth();
	$.userBackgroundPhoto.width = screenWidth;
	
	
	var bgImageSize = __.getImageSize(backgroundImagePath);
	$.userBackgroundPhoto.height = (screenWidth/bgImageSize.width) * bgImageSize.height;
	
};

var bindingDataWithUI = function(user)
{
	console.log(">>> username >>>> " + user.get("username"));
	$.lblUserName.text = user.get("username");
	$.txtUserName.value = user.get("username");
	$.txtAboutMe.value = user.get("about_me");
	$.lblAboutMe.text = user.get("about_me");
	$.txtEmailProfile.value = user.get("email");
	
	loadIcon();
	loadLanguage();
};


var loadIcon = function()
{
	var uploadIcon = fontIconLoader.getIcon("panacea","upload",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgProfilePhotoUpload.image = uploadIcon;
	$.imgBackgroundPhotoUpload.image = uploadIcon;
	
	var nameIcon = fontIconLoader.getIcon("panacea","user",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgNameProfile.image = nameIcon;
	
	var aboutIcon = fontIconLoader.getIcon("panacea","pencil",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgAboutMeProfile.image = aboutIcon;
	
	var emailIcon = fontIconLoader.getIcon("panacea","envelope",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgEmailProfile.image = emailIcon;
	
	var passwordIcon = fontIconLoader.getIcon("panacea","lock",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgNewPassword.image = passwordIcon;
	$.imgConfirmPassword.image = passwordIcon;
	
	$.imgEmailLogin.image = emailIcon;
	$.imgPasswordLogin.image = passwordIcon;

	$.imgNameRegister.image = nameIcon;
	$.imgEmailRegister.image = emailIcon;
	$.imgPasswordRegister.image = passwordIcon;
	
	$.imgEmailForgot.image = emailIcon;
};

var loadLanguage = function()
{
	$.lblProfilePhoto.text = Alloy.CFG.Languages.lblProfilePhoto;
	$.lblBGPhoto.text = Alloy.CFG.Languages.lblBGPhoto;
	$.btnInfoEdit.title = Alloy.CFG.Languages.EditInfo;
	$.btnPasswordEdit.title = Alloy.CFG.Languages.ChangePassword;
	$.lblNameProfile.text = Alloy.CFG.Languages.Name;
	$.lblEmailProfile.text = Alloy.CFG.Languages.lblEmail;
	$.lblAboutProfile.text = Alloy.CFG.Languages.AboutMe;
	$.btnUpdateProfile.title = Alloy.CFG.Languages.UpdateProfile;
	
	$.lblNewPassword.text = Alloy.CFG.Languages.NewPassword;
	$.lblConfirmPassword.text = Alloy.CFG.Languages.ConfirmPassword;
	$.btnUpdatePassword.title = Alloy.CFG.Languages.UpdatePassword;
	
	$.lblLoginTitle.text = Alloy.CFG.Languages.LoginTitle;
	$.lblEmailLogin.text = Alloy.CFG.Languages.lblEmail;
	$.lblPasswordLogin.text = Alloy.CFG.Languages.lblPassword;
	$.btnLogin.title = Alloy.CFG.Languages.btnLogin;
	$.btnRegisterLogin.title = Alloy.CFG.Languages.btnRegister;
	$.btnForgot.title = Alloy.CFG.Languages.btnForgot;
	
	$.lblRegisterTitle.text = Alloy.CFG.Languages.RegisterTitle;
	$.lblNameRegister.text = Alloy.CFG.Languages.Name;
	$.lblEmailRegister.text = Alloy.CFG.Languages.EmailRegister;
	$.lblPasswordRegister.text = Alloy.CFG.Languages.lblPassword;
	$.btnRegister.title = Alloy.CFG.Languages.btnRegister;
	
	$.lblForgotTitle.text = Alloy.CFG.Languages.ForgotTitle;
	$.lblEmailForgot.text = Alloy.CFG.Languages.lblEmail;
	$.btnRequest.title = Alloy.CFG.Languages.btnRequest;
};

var openForgotPassword = function()
{
	$.userLoginView.height = 0;
	$.userLoginView.opacity = 0;
	
	$.userRegisterView.height = 0;
	$.userRegisterView.opacity = 0;
	
	$.forgotPasswordView.height = Ti.UI.SIZE;
	$.forgotPasswordView.opacity = 1;
	
	
	psAnimation.slowlyAppear($.forgotPasswordView);
		
};

var doForgot = function()
{
	if(validationForgotChecking()){
		if(Titanium.Network.online == true) {
			var loaderArgs = {
				callbackFunction : callbackDoForgot,
				url : Alloy.CFG.Urls.BaseURL+ ALloy.CFG.Urls.getForgotPassword + $.txtEmailForgot.value.toLowerCase()
			};
			loader.get(loaderArgs);
		} else {
			dialogBox.loadCustomDialog("Forgot Password", Alloy.CFG.Languages.offlineMessage);
		}
	}
};

var callbackDoForgot = function(feeds)
{
	if(feeds.success){
		dialogBox.loadCustomDialog("Forgot Password", Alloy.CFG.Languages.forgotPasswordMessage);
		
		$.userLoginView.height=Ti.UI.SIZE;
		$.userLoginView.opacity=1;
		
		$.userRegisterView.height=0;
		$.userRegisterView.opacity=0;
		
		$.forgotPasswordView.height=0;
		$.forgotPasswordView.opacity=0;
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

var showInfoEdit = function()
{
	$.btnInfoEdit.backgroundColor = Alloy.CFG.Colors.BackgroundColor;
	$.btnPasswordEdit.backgroundColor = Alloy.CFG.Colors.ProfileTabColor;
	
	$.passwordEdit.visible = 'false';
	$.passwordEdit.height = 0;
	
	$.infoEdit.visible = 'true';
	$.infoEdit.height = Ti.UI.SIZE;
};

var showPasswordEdit = function()
{
	$.btnPasswordEdit.backgroundColor = Alloy.CFG.Colors.BackgroundColor;
	$.btnInfoEdit.backgroundColor = Alloy.CFG.Colors.ProfileTabColor;
	
	$.infoEdit.visible = 'false';
	$.infoEdit.height = 0;
	
	$.passwordEdit.visible = 'true';
	$.passwordEdit.height = Ti.UI.SIZE;
};


var uploadPhoto = function(imgType)
{
		imageSourceWindow = imageSourceSelector.sourceSelectorWindow();
		
		imageSourceWindow.btnCamera.addEventListener('click', function() {
			imageSourceWindow.close();
			imageSourceWindow = null;
			Titanium.Media.showCamera({
				success : function(event) {
					media = event.media;
					if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
						
						saveAndUploadUserPhoto(imgType);
					}
				},
				cancel : function() {
					//do somehting if user cancels operation
				},
				error : function(error) {
					if (error.code == Titanium.Media.NO_CAMERA) {
						dialogBox.loadCustomDialog("Photo Upload",Alloy.CFG.Languages.cameraNotFound);
					}
				},
				allowImageEditing : true,
				saveToPhotoGallery : true
			});
			
		});
		
		imageSourceWindow.btnGallery.addEventListener('click', function() {
			var gallery = Titanium.Media.openPhotoGallery({
				allowEditing : false,
				success : function(event) {
					var image = event.media;
						if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
						Ti.App.Properties.setString("image", image.nativePath);
						media = event.media;
						saveAndUploadUserPhoto(imgType);
					}else{
						dialogBox.loadCustomDialog("Photo",Alloy.CFG.Languages.chooseImageOnly);
					}
				},
				cancel : function() {
				}
			});
		});
};

var saveAndUploadUserPhoto = function(imgType) 
{
	var userId = Ti.App.Properties.getString('userId');
	users.fetch();
	var user = users.get(userId);
	var fileName;
	
	if(imgType == "profile") fileName = user.get("profile_photo");
	else fileName = user.get("background_photo");
	
	
	if(fileName == ""){
		fileName = userId + '-' + imgType + ".jpg";
	}
	var path = null;

	if (OS_IOS)
		path = Titanium.Filesystem.applicationDataDirectory;
	else
		path = Titanium.Filesystem.externalStorageDirectory;

	var f = Titanium.Filesystem.getFile(path, fileName);
	f.write(media);
	
	iPath = f.nativePath;
	setTimeout(function(){
		
		if(imgType == "profile") $.userProfilePhoto.image = media;
		else $.userBackgroundPhoto.image = media;
	}, 100);
	
	//Return full path of file
	var xhr = Titanium.Network.createHTTPClient();

	xhr.onerror = function(e) {
		Ti.API.info('IN FILE Upload ERROR' + JSON.stringify(e.error) + this.responseText);
	};

	xhr.onload = function() {
		Ti.API.info('success upload');
		
		
		setTimeout(function(){
			
			if(imgType == "profile") $.userProfilePhoto.image = iPath;
			else $.userBackgroundPhoto.image = iPath;
			
			
			updateDatabase(fileName,imgType);
			
		}, 100);
		
		
		imageSourceWindow.close();
		
		
	};

	xhr.onsendstream = function(e) {
		Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);

	};

	xhr.open('POST', Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postImage + userId + "/fileType/" + imgType);
	console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postImage + userId + "/fileType/" + imgType);
	
	xhr.send({
		image : f.read()
	});
	Ti.API.info("Saved Image");
};

var profilePhotoUpload = function()
{
	uploadPhoto("profile");
};

var backgroundPhotoUpload = function()
{
	uploadPhoto("background");
};

var updateDatabase = function(fileName,fileType)
{
	users.fetch();
	userId = Ti.App.Properties.getString('userId');
	
	if(fileType == "profile"){
		users.get(userId).set({
			id : userId || "",
			username : $.txtUserName.value || "",
			email : $.txtEmail.value || $.txtEmailProfile.value,
			about_me : $.txtAboutMe.value || "",
			is_banned : 0,
			profile_photo : fileName || ""	
		}).save();
	}else{
		users.get(userId).set({
			id : userId || "",
			username : $.txtUserName.value || "",
			email : $.txtEmail.value || $.txtEmailProfile.value,
			about_me : $.txtAboutMe.value || "",
			is_banned : 0,
			background_photo: fileName || ""	
		}).save();
	}
	
	users.fetch();
	console.log(users.toJSON());
};
 
 
var doLogin = function()
{
	if(validationChecking()){
		if(Titanium.Network.online == true){
			
			var payloadJSON = {"email": $.txtEmail.value.toLowerCase(), "password":$.txtPassword.value};
			
			var loaderArgs = {
				callbackFunction : callBackDoLogin,
				url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postUserLogin,
				payload: payloadJSON
			};
			loader.post(loaderArgs);
			
		}else{
			dialogBox.loadCustomDialog("Log In", Alloy.CFG.Languages.offlineMessage);
		}
	}
};

var callBackDoLogin = function(feeds)
{
	if(feeds.error == null) {
		if(feeds != null) {
			Ti.App.fireEvent('refreshMenu');
			//Download Profile Photo
			if(feeds.profile_photo != ""){
				//need to download user profile photo
				if(Titanium.Network.online == true){
					var downloadArgs = {
						callbackFunction : downloadFileSuccess,
						urlDownload : Alloy.CFG.Urls.imagePathURL + feeds.profile_photo,
						fileName : feeds.profile_photo,
						fileType : 'profile'
					};
					
					loader.downloadFileToApp(downloadArgs);
					
				} else {
					console.log(">>> Lacking Connection During Profile Photo Download");	
				}	
				
			} else {
				//user don't have profile photo like first time
				$.userProfilePhoto.image = "/images/defaultProfile.png";
			}
			
			//need to download profile background 
			if(feeds.background_photo != "") {
				//need to download user profile photo
				if(Titanium.Network.online == true){
					var downloadArgs = {
						callbackFunction : downloadFileSuccess,
						urlDownload : Alloy.CFG.Urls.imagePathURL + 	feeds.background_photo,
						fileName : feeds.background_photo,
						fileType : 'background'
					};
					
					loader.downloadFileToApp(downloadArgs);
					
				} else {
					console.log(">>> Lacking Connection During Profile Background Download");	
				}	
				
			} else {
				//user don't have background photo like first time
				$.userBackgroundPhoto.image= "/images/defaultBackground.jpg";		
				alignmentUI("/images/defaultBackground.jpg");
			}
			
			//Start For Inserting Into Local DB			
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
			
			console.log(">>>> User Info successfully save into local DB");
			console.log(users.toJSON());
			
			//Store UserID at global Property 
			Ti.App.Properties.setString('userId', feeds.id);
		    
		    
			$.userProfileView.height=Ti.UI.SIZE;
			$.userProfileView.opacity =1;
			
			$.userLoginView.height=0;
			$.userLoginView.opacity=0;
			
			//For forgot password view
			$.forgotPasswordView.height=0;
			$.forgotPasswordView.opacity=0;
			
			var user = users.get(feeds.id);
			bindingDataWithUI(user);
			
			
			$.profileScrollView.scrollTo(0,0);
			//$.profileScrollView.height = Ti.UI.SIZE;
			console.log(">>>>> after login, come here <<<<<");
		}
	} else {
		dialogBox.loadCustomDialog('Log In', feeds.error.message);
	}
	
};


var validationChecking = function()
{
	if($.txtEmail.value == ""){
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
	
	if($.txtPassword.value == ""){
		validation.validationFailAction($.txtPassword); 
    	changeFlag = 0;
    	return false;
	}

	return true;
};

function downloadFileSuccess(fileName,fileType)
{
	console.log(">>> Download Image Successful : " + fileName);
	
	if(OS_IOS){
		path = Titanium.Filesystem.applicationDataDirectory;	
	} else {
		path = Titanium.Filesystem.externalStorageDirectory;
	}
	
	if(fileType == "profile") {
		
		var localPath = "/images/profile.png";
		if(fileName!=""){
			var profileImage = Titanium.Filesystem.getFile(path,fileName);
			if(profileImage.exists()){
				localPath = profileImage.nativePath;		
			}
		}
	
		$.userProfilePhoto.image = localPath;
		
	} else {
		var backgroundImagePath = "/images/defaultBackground.jpg";
		if(fileName!=""){
			var backgroundImage = Titanium.Filesystem.getFile(path,fileName);
			if(backgroundImage.exists()){
				backgroundImagePath = backgroundImage.nativePath;		
			}
		}
		
		$.userBackgroundPhoto.image = backgroundImagePath;
	}
	
	alignmentUI(backgroundImagePath);
	
};

var doUpdateProfile = function()
{
	if(Ti.App.Properties.getString("userId") != null) {
		if(profileValidationChecking()) {
			if(Titanium.Network.online == true){
				var payloadJSON = {"username":$.txtUserName.value, "about_me": $.txtAboutMe.value, "email":$.txtEmailProfile.value};
				profileUpdateFireAPI(payloadJSON,true);
			} else {
				dialogBox.loadCustomDialog("Profile", Alloy.CFG.Languages.offlineMessage);
			}
		}
	} else {
		init();
	}
};

var updateInLocal = function(feeds,needUpdate)
{
	if(feeds.success) {
		if(needUpdate) {
			users.get(Ti.App.Properties.getString('userId')).set({
				id : Ti.App.Properties.getString('userId') || "",
				username : $.txtUserName.value || "",
				email : $.txtEmailProfile.value || "",
				about_me : $.txtAboutMe.value || "",
				is_banned : 0
			}).save();
			
			users.fetch();
			console.log(">>>>> After Updated <<<<<");
			console.log(users.toJSON());
			
			var user = users.get(Ti.App.Properties.getString('userId'));
			bindingDataWithUI(user);
			
			dialogBox.loadCustomDialog("Profile", Alloy.CFG.Languages.profileUpdateSuccessMessage);
		} else {
			dialogBox.loadCustomDialog("Profile", Alloy.CFG.Languages.passwordUpdateSuccessMessage);
	
		}
	}
	
		
};

var profileValidationChecking = function()
{
	if($.txtEmailProfile.value == ""){
		validation.validationFailAction($.txtEmailProfile); 
    	changeFlag = 0;
    	return false;
	} else {
		if(!validation.validateEmail($.txtEmailProfile.value)){
			validation.validationFailAction($.txtEmailProfile); 
    		changeFlag = 0;
    		return false;
		}
	}
	
	if($.txtUserName.value==""){
		validation.validationFailAction($.txtUserName); 
    	changeFlag = 0;
    	return false;
	}
	
	return true;
};


var doChangePassword = function()
{
	if(passwordValidationChecking()) {
		if(Titanium.Network.online==true) {
			
			var payloadJSON = {"password":$.txtNewPassword.value};
			profileUpdateFireAPI(payloadJSON,false);
		}
	}
};

var passwordValidationChecking = function()
{
	
	if($.txtNewPassword.value=="") {
		validation.validationFailAction($.txtNewPassword); 
    	changeFlag = 0;
    	return false;
	}
	
	if($.txtConfirmPassword.value=="") {
		validation.validationFailAction($.txtConfirmPassword); 
    	changeFlag = 0;
    	return false;
	}
	
	if($.txtConfirmPassword.value!="" && $.txtNewPassword.value!="") {
		if($.txtConfirmPassword.value != $.txtNewPassword.value){
			validation.validationFailAction($.txtConfirmPassword); 
			validation.validationFailAction($.txtNewPassword); 
	    	changeFlag = 0;
	    	return false;
		}
	}
	
	return true;
};

var profileUpdateFireAPI = function(payloadJSON,needLocalUpdate) 
{
	var loaderArgs = {
		callbackFunction : updateInLocal,
		url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.putProfile + Ti.App.Properties.getString('userId'),
		payload : payloadJSON,
		needUpdate : needLocalUpdate 
	};
	loader.put(loaderArgs);
};


var openRegister = function()
{
	//register view show
	$.userRegisterView.height=Ti.UI.SIZE;
	$.userRegisterView.opacity=1;
	
	//login view hide
	$.userLoginView.height = 0;
	$.userLoginView.opacity = 0;
	
	//forgot password view
	$.forgotPasswordView.height =0;
	$.forgotPasswordView.opacity=0;
	
	psAnimation.slowlyAppear($.userRegisterView);
};

var doRegister = function()
{
	if(registerValidationChecking()) {
		if(Titanium.Network.online) {
			var payloadJSON = {"username":$.txtUserNameRegister.value, "email": $.txtEmailRegister.value, "password":$.txtPasswordRegister.value};
			var apiArgs = {
				callbackFunction : callBackDoRegister,
				payload : payloadJSON,
				url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.postUserRegister
			};
			loader.post(apiArgs);
		}
	}
};

var callBackDoRegister = function(feeds)
{
	if(feeds.error == null){
		if(feeds.user_id != "") {
			console.log(">>> User registration successfully.");
			//need to store at local DB
			//Start For Inserting Into Local DB			
			var userModel = Alloy.createModel('users',{
				id:feeds.user_id,
				username : $.txtUserNameRegister.value,
				email:$.txtEmailRegister.value,
				about_me:"",
				is_banned: 0,
				profile_photo : "",
				background_photo: ""
			});
			
			users.add(userModel);
			userModel.save();
			users.fetch();
			
			console.log(">>>> User Info successfully save into local DB");
			console.log(users.toJSON());
			
			//Store UserID at global Property 
			Ti.App.Properties.setString('userId', feeds.user_id);
			
			dialogBox.loadCustomDialog("Register", Alloy.CFG.Languages.registerSuccessMessage);
			
			//Need to load profile page
			$.userProfilePhoto.image = "/images/defaultProfile.png";
			$.userBackgroundPhoto.image = "/images/defaultBackground.jpg";
			alignmentUI("/images/defaultBackground.jpg");
			
			var user = users.get(feeds.user_id);
			bindingDataWithUI(user);
			
			$.userProfileView.height = Ti.UI.SIZE;
			$.userProfileView.opacity = 1;
			
			//for register view
			$.userRegisterView.height = 0;
			$.userRegisterView.opacity = 0;
			
			//for login view
			$.userLoginView.height = 0;
			$.userLoginView.opacity = 0;
			
			Ti.App.fireEvent('refreshMenu');
			
		}
	} else {
		dialogBox.loadCustomDialog("Register", Alloy.CFG.Languages.userAlreadyExist);
	}
};


var registerValidationChecking = function()
{
	
	if($.txtUserNameRegister.value == "") {
		validation.validationFailAction($.txtUserNameRegister);
		changeFlag = 0;
		return false;
	}
	
	if($.txtEmailRegister.value == "") {
		validation.validationFailAction($.txtEmailRegister); 
    	changeFlag = 0;
    	return false;
	} else {
		
		if(!validation.validateEmail($.txtEmailRegister.value)){
			validation.validationFailAction($.txtEmailRegister); 
    		changeFlag = 0;
    		return false;
		}
	}
	
	if($.txtPasswordRegister.value == "") {
		validation.validationFailAction($.txtPasswordRegister);
		changeFlag = 0;
		return false;
	}
	
	return true;
};

$.txtNewPassword.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtNewPassword);
		changeFlag = 1;
	}
});

$.txtConfirmPassword.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtConfirmPassword);
		changeFlag = 1;
	}
});

$.txtUserName.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtUserName);
		changeFlag=1;
	}
});

$.txtAboutMe.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtAboutMe);
		changeFlag = 1;
	}
});

$.txtEmailProfile.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtEmailProfile);
		changeFlag = 1;
	}
});

$.txtEmail.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtEmail);
		changeFlag = 1;
	}
});

$.txtPassword.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtPassword);
		changeFlag = 1;
	}
	
});

$.txtUserNameRegister.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtUserNameRegister);
		changeFlag = 1;
	}
});

$.txtEmailRegister.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtEmailRegister);
		changeFlag = 1;
	}
});

$.txtPasswordRegister.addEventListener('change',function(e)
{
	if(changeFlag == 0){
		validation.backToNormal($.txtPasswordRegister);
		changeFlag = 1;
	}
});


init();