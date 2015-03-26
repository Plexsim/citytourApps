var __ = require('platformSupport');
var loadingWindow = require('loadingWindow');
var myAnimation = require('animation');
var loader = require("loader");
var strings = require("strings");
var args = arguments[0] || {};

var FIXED_ITEM_BIG_WIDTH = 213;
var FIXED_ITEM_BIG_HEIGHT = 150;
var FIXED_ITEM_SMALL_WIDTH = 107;
var FIXED_ITEM_SMALL_HEIGHT = 75;
var FIXED_SCREEN_WIDTH = 320; 
var ITEM_BIG_HEIGHT = 0;
var ITEM_BIG_WIDTH = 0;
var ITEM_SMALL_HEIGHT = 0;
var ITEM_SMALL_WIDTH = 0;
var SCREEN_WIDTH = 0;
var SCREEN_HEIGHT = 0;

var updateFromVal = function(){
	
	// get the limit toload posts
	var limit = Alloy.CFG.LimitOfPosts;
	
	// get Global limit controller
	var from = Ti.App.Properties.getInt("From");
	
	// set Global limit controller
	Ti.App.Properties.setInt("From", (limit+from));
	
};
var openItemGrid = function(args)
{
	// update the from value 
	updateFromVal();
		
	Alloy.Globals.data = args;
	var itemGrid = Alloy.createController("itemGrid", args).getView();
	myAnimation.in(itemGrid);
};


var startItemGrid = function(args)
{
	loadingWindow.startLoading();
	
	// get the limit toload posts
	var limit = Alloy.CFG.LimitOfPosts;
	
	// Reset Global limit controller
	Ti.App.Properties.setInt("From", 0);
	
	var loaderArgs = {
		callbackFunction : openItemGrid,
		url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/"+limit+"/from/0"
	};
	console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/"+limit+"/from/0");
	loader.get(loaderArgs);
};

var openItemMap = function(args)
{
	var itemMap = Alloy.createController("itemMap", args).getView();
	myAnimation.in(itemMap);
};


var startItemMap = function(args)
{
	loadingWindow.startLoading();
	var loaderArgs = {
		callbackFunction : openItemMap,
		url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all"
	};
	loader.get(loaderArgs);
};

var homeLayoutLeft = function(itemsData)
{
	var params = {
		ITEM_BIG_WIDTH : ITEM_BIG_WIDTH,
		ITEM_BIG_HEIGHT : ITEM_BIG_HEIGHT,
		ITEM_SMALL_WIDTH : ITEM_SMALL_WIDTH,
		ITEM_SMALL_HEIGHT : ITEM_SMALL_HEIGHT,
		openItemGrid : startItemGrid,
		openItemMap : startItemMap,
		itemsData : itemsData
	};
	var layout = Alloy.createController('homeLayoutLeft', params).getView();
			
	return layout;
};

var homeLayoutRight = function(itemsData) 
{
	var params = {
		ITEM_BIG_WIDTH : ITEM_BIG_WIDTH,
		ITEM_BIG_HEIGHT : ITEM_BIG_HEIGHT,
		ITEM_SMALL_WIDTH : ITEM_SMALL_WIDTH,
		ITEM_SMALL_HEIGHT : ITEM_SMALL_HEIGHT,
		openItemGrid : startItemGrid,
		openItemMap : startItemMap,
		itemsData : itemsData
	};
	var layout = Alloy.createController('homeLayoutRight', params).getView();
			
	return layout;
};

var calculateSize = function() 
{
	SCREEN_WIDTH =  __.getScreenWidth();
	SCREEN_HEIGHT = __.getScreenHeight();
	ITEM_BIG_WIDTH = ((SCREEN_WIDTH / FIXED_SCREEN_WIDTH) * FIXED_ITEM_BIG_WIDTH) - 1;
	ITEM_SMALL_WIDTH = ((SCREEN_WIDTH / FIXED_SCREEN_WIDTH) * FIXED_ITEM_SMALL_WIDTH)-1;
	ITEM_BIG_HEIGHT = ((ITEM_BIG_WIDTH / FIXED_ITEM_BIG_WIDTH ) * FIXED_ITEM_BIG_HEIGHT)-1;
	ITEM_SMALL_HEIGHT = ((ITEM_SMALL_WIDTH / FIXED_ITEM_SMALL_WIDTH) * FIXED_ITEM_SMALL_HEIGHT)-1;
};

var init = function()
{
	
	if(args != null){
		calculateSize();
	
		$.homeScrollView.contentWidth = SCREEN_WIDTH;
		$.homeScrollView.width = SCREEN_WIDTH;
		$.homeScrollView.height = Ti.UI.FILL;
		for(var i=0;i<args.length; i++){
			if(i==0 | (i%2==0)){
				$.homeScrollView.add(homeLayoutLeft(args[i]));
			}else{
				$.homeScrollView.add(homeLayoutRight(args[i]));
			}
			
		}
		
	}
	loadingWindow.endLoading();
};

init();
