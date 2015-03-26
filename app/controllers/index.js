var __ = require('platformSupport');
var myAnimation = require('animation');
var fontIconLoader = require("icomoonlib");
var loader = require("loader");
var loadingWindow = require('loadingWindow');
var dialogBox = require("psdialog");


var profileIcon = fontIconLoader.getIcon("panacea","profile",35,{color:Alloy.CFG.Colors.SideMenuIconColor});
var homeIcon = fontIconLoader.getIcon("panacea","home",35,{color:Alloy.CFG.Colors.SideMenuIconColor});
var sideMenuIcon = fontIconLoader.getIcon("panacea","navicon",35,{color:Alloy.CFG.Colors.IconWhite});
var favouriteIcon = fontIconLoader.getIcon("panacea","star",35,{color:Alloy.CFG.Colors.SideMenuIconColor});
var feedIcon = fontIconLoader.getIcon("panacea","rss",35,{color:Alloy.CFG.Colors.SideMenuIconColor});
var signOutIcon = fontIconLoader.getIcon("panacea","sign-out",35,{color:Alloy.CFG.Colors.SideMenuIconColor});
var popularIcon = fontIconLoader.getIcon("panacea","tag",35,{color:Alloy.CFG.Colors.SideMenuIconColor});


var appWrapper = null; 
var isSliderOpen = false;
var homeData = null;
var newsData;
var popData;
var users = Alloy.Collections.users;

$.imgSideMenu.image = sideMenuIcon;

if(Alloy.isTablet) {
	$.imgSideMenu.width = 25;
	$.imgSideMenu.height = 25;
}

if (__.isiOS7Plus()) {
	$.AppWrapper.top = 20;
}

var beforeNodes = [
	{
		menuHeader : Alloy.CFG.Languages.appName,
		id : 0,
		title : Alloy.CFG.Languages.lblHome,
		image : homeIcon
	}, 
	{
		id : 1,
		title : Alloy.CFG.Languages.lblNewsFeed,
		image : feedIcon
	}, 
	{
		id : 2,
		title : Alloy.CFG.Languages.lblPopular,
		image : popularIcon
	},
	{
		id : 3,
		title : Alloy.CFG.Languages.lblFavourite,
		image : favouriteIcon
	}, 
	{
		id : 4,
		title : Alloy.CFG.Languages.lblProfile,
		image : profileIcon
	} 
];

var afterNodes = [
	{
		menuHeader : Alloy.CFG.Languages.appName,
		id : 0,
		title : Alloy.CFG.Languages.lblHome,
		image : homeIcon
	}, 
	{
		id : 1,
		title : Alloy.CFG.Languages.lblNewsFeed,
		image : feedIcon
	}, 
	{
		id : 2,
		title : Alloy.CFG.Languages.lblPopular,
		image : popularIcon
	},
	{
		id : 3,
		title : Alloy.CFG.Languages.lblFavourite,
		image : favouriteIcon
	}, 
	{
		id : 4,
		title : Alloy.CFG.Languages.lblProfile,
		image : profileIcon
	},
	{
		id : 5,
		title : Alloy.CFG.Languages.lbllogout,
		image : signOutIcon
	}  
];

function handleMenuClick(_event) 
{
	if ( typeof _event.row.id !== "undefined") {
		openScreen(_event.row.id);
	}
}

function openScreen(rowID) 
{
	if (rowID == 0) {
		if(homeData != "null"){
			loadContentView("home", homeData);
		}else{
			loadContentView("home", "My Account");
		}
	} else if (rowID == 1) {
		loadAllFeeds();
	} else if (rowID == 2) {
		var params = {
			name : Alloy.CFG.Languages.lblPopular
		};
		loadContentView("popularList", params);
	} else if (rowID == 3) {
		if(Ti.App.Properties.getString("userId") != null) {
			var params = {
				name : Alloy.CFG.Languages.lblFavourite
			};
			loadContentView("favouriteList", params);
		} else {
			var params = {
				name : Alloy.CFG.Languages.lblProfile
			};
			loadContentView("userProfile", params);
			$.SlideMenu.setIndex(4);
			dialogBox.loadCustomDialog("My Favourite", Alloy.CFG.Languages.needForFavouriteListMesssage);
		}
	} else if (rowID == 4) {
		var params = {
			name : Alloy.CFG.Languages.lblProfile
		};
		loadContentView("userProfile", params);
	}  else if (rowID == 5) {
		var user = users.get(Ti.App.Properties.getString("userId"));
		if (user != null) {
			user.destroy();
		}
		users.fetch();
		Ti.App.Properties.setString('userId', null);
		
		
		if(homeData != "null"){
			loadContentView("home", homeData);
		}else{
			loadContentView("home", "My Account");
		}
		
		$.SlideMenu.clear();
		$.SlideMenu.Nodes.removeEventListener("click", handleMenuClick);
		initSlideMenu(beforeNodes);
	}

	closeMenu();
}

var loadContentView = function(viewName, args)
{
	var contentView = Alloy.createController(viewName, args).getView();
	$.midContainer.removeAllChildren();
	$.midContainer.add(contentView);
	if(null != args) {
		$.mainTitle.text = args.name;
	} else {
		$.mainTitle.text = Alloy.CFG.Languages.appName;
	}
};

function initProcess()
{
	appWrapper = $.AppWrapper;
	
	if(OS_IOS) {
		$.AppWrapper.addEventListener("swipe", function(_event) {
			if (_event.direction == "right") {
				openMenu();
				
			} else if (_event.direction == "left") {
				closeMenu();
			}
		});
	}
	
}

function openMenu() 
{
	appWrapper.animate({
		left : "200dp",
		right : "-200dp",
		duration : 250,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

	$.SlideMenu.Wrapper.animate({
		left : "0dp",
		right : "0dp",
		duration : 250,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	
	isSliderOpen = true;
}

function closeMenu() 
{
	appWrapper.animate({
		left : "0dp",
		right : "0dp",
		duration : 250,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

	$.SlideMenu.Wrapper.animate({
		left : "-200dp",
		duration : 250,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

	isSliderOpen = false;
}

function openLeftMenu() 
{
	if (isSliderOpen) {
		closeMenu();
	} else {
		openMenu();
	}
}

function initSlideMenu(nodes)
{
	
	$.SlideMenu.init({
		nodes : nodes,
		color : {
			headingBackground : "#000",
			headingText : "#FFF"
		}
	});

	$.SlideMenu.setIndex(0);
	$.SlideMenu.Nodes.addEventListener("click", handleMenuClick);

}

var callBackLoadAllCategories = function(args)
{
	if(args.length != 0) {
		homeData = args;
		args.name = Alloy.CFG.Languages.appName;
		loadContentView('home', args);
	} else {
		dialogBox.loadCustomDialog("CityTour", Alloy.CFG.Languages.dataNotFound);
		loadingWindow.endLoading();
	}
};

var loadAllCategories = function()
{
	var loaderArgs = {
		callbackFunction : callBackLoadAllCategories,
		url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getCategoriesWithThreeItems
	};
	loader.get(loaderArgs);
};

var updateFromVal = function()
{
	var limit = Alloy.CFG.LimitOfPosts;
	var from = Ti.App.Properties.getInt("From");
	Ti.App.Properties.setInt("From", (limit+from));
};

var loadAllFeeds = function()
{
	
	var limit = Alloy.CFG.LimitOfPosts;
	Ti.App.Properties.setInt("From", 0);
	
	var loaderArgs = {
		callbackFunction : callBackLoadAllFeeds,
		url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getFeeds + limit + '/from/0'
	};
	loader.get(loaderArgs);
};

var callBackLoadAllFeeds = function(argsFeeds)
{
	if(argsFeeds != null) {
		if(argsFeeds.length > 0) {
			newsData = argsFeeds;
			updateFromVal();
			
			newsData.name = Alloy.CFG.Languages.lblNewsFeed;
			loadContentView("newsList", newsData);
		}
	}
};

$.index.addEventListener('open', function()
{
	loadingWindow.startLoading();
	loadAllCategories();
	
	initProcess();
	
	if(Ti.App.Properties.getString("userId") != null) {
		initSlideMenu(afterNodes);
	} else {
		initSlideMenu(beforeNodes);
	}
	
});

Ti.App.addEventListener('refreshMenu',function(e)
{
	$.SlideMenu.clear();
	$.SlideMenu.Nodes.removeEventListener("click", handleMenuClick);
	initSlideMenu(afterNodes);
});

$.index.open();
