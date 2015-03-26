var __ = require('platformSupport');
var myAnimation = require('animation');
var loadingWindow = require("loadingWindow");
var loader = require("loader");
var args = arguments[0] || {};
var ITEM_WIDTH = 160;
var NUM_OF_COL = 0;
var SCREEN_WIDTH = 0;
var SCREEN_HEIGHT = 0;
var EXTRA_PADDING = 0;
var ITEMS_HEIGHT = [];
var ACTUAL_TOTAL_WIDTH = 0;
var loader = require("loader");
var fontIconLoader = require("icomoonlib");
var top = 30;
var psScrollView = require('psScrollView'); 
var contentView;
var _psScrollView = new psScrollView();

var calculateCol = function()
{
	NUM_OF_COL = parseInt(SCREEN_WIDTH / ITEM_WIDTH);	
	EXTRA_PADDING = SCREEN_WIDTH - (NUM_OF_COL * ITEM_WIDTH);
	
	ITEM_WIDTH += (EXTRA_PADDING / NUM_OF_COL);
	EXTRA_PADDING %= NUM_OF_COL;
		
	if(NUM_OF_COL != null) {
		for(var i=0; i<NUM_OF_COL; i++)
		{
			ITEMS_HEIGHT.push(0);
		}
	}
	ACTUAL_TOTAL_WIDTH = SCREEN_WIDTH - EXTRA_PADDING;	
};

var closeWindow = function()
{
	Ti.App.Properties.setString('isWinOpen', 'no');
	myAnimation.out($.itemGrid);
};

var getColNum = function()
{
	var col = 0;
	for(var i=1; i<NUM_OF_COL; i++)
	{
		if(ITEMS_HEIGHT[col] > ITEMS_HEIGHT[i]) {
			col = i;
		}
	}
	
	return col;
}; 


var itemGridLayout = function(params) 
{
	var layout = Alloy.createController('itemGridLayout', params).getView();
	return layout;
};

var addView = function(view)
{
	var col = getColNum();
	var leftPadding = (col) * ITEM_WIDTH;
	
	view.left = leftPadding;
	view.top = ITEMS_HEIGHT[col];
	ITEMS_HEIGHT[col] += view.iHeight;
	_psScrollView.addView(view);
};

var updateFromVal = function()
{
	var limit = Alloy.CFG.LimitOfPosts;
	var from = Ti.App.Properties.getInt("From");
	Ti.App.Properties.setInt("From", (limit+from));
};

var callBackInfiniteScrolling = function(data) 
{
	
	for(var i=0; i<data.items.length; i++){
		var scale = {
				width : data.items[i].images[0].width,
				height :  data.items[i].images[0].height
		};
		Ti.API.info(Alloy.CFG.Urls.imagePathURL + data.items[i].images[0].path);
		var params = {
			image : Alloy.CFG.Urls.imagePathURL + data.items[i].images[0].path,
			title : data.items[i].name,
			like : i * 21,
			msg : i * 13,
			scale : scale,
			viewWidth : ITEM_WIDTH,
			item : data.items[i]
		};
		
		addView(itemGridLayout(params));
		
	}
	 updateFromVal();
	_psScrollView.infiniteScrollingCompleted();	
};

_psScrollView.addEventListener("InfiniteScrolling", function(e)
{
	Ti.API.info("InfiniteScrolling event -> start loading data");
	var limit = Alloy.CFG.LimitOfPosts;
	var from = Ti.App.Properties.getInt("From");
	
	if($.txtSearch.value == "") {
		var loaderArgs = {
			callbackFunction : callBackInfiniteScrolling,
			url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/"+limit+"/from/" + from
		};
	} else {
		var loaderArgs = {
			callbackFunction : callBackInfiniteScrolling,
			url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/"+limit+"/from/" + from + '/keyword/' + $.txtSearch.value
		};
	}
	loader.get(loaderArgs);
});

var init = function()
{
	contentView = Ti.UI.createView({
			width:Ti.UI.FILL,
			height: Ti.UI.FILL,
			top:0
	});
	contentView.add(_psScrollView);
	$.itemGrid.add(contentView);

	if (__.isiOS7Plus()) {
		$.AppWrapper.top = 20;
	}
	
	if(Alloy.isTablet) {
		ITEM_WIDTH = 200;
	}
	
	SCREEN_WIDTH = __.getScreenWidth();
	SCREEN_HEIGHT = __.getScreenHeight();
	
	calculateCol();
	
	$.mainTitle.text = args.name;
	
	for(var i=0; i<args.items.length; i++){
		var scale = {
				width : args.items[i].images[0].width,
				height :  args.items[i].images[0].height
		};
		Ti.API.info(Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path);
		var params = {
			image : Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path,
			title : args.items[i].name,
			like : i * 21,
			msg : i * 13,
			scale : scale,
			viewWidth : ITEM_WIDTH,
			item : args.items[i]
		};
		
		addView(itemGridLayout(params));
		
	}
	
	loadIcon();
	
	if(!OS_IOS) {
		$.txtSearch.blur();
	} else {
		/*
		var flexSpace = Titanium.UI.createButton({
		    systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		var imgSearch = Titanium.UI.createImageView({
			image : fontIconLoader.getIcon("panacea","check",22,{color:Alloy.CFG.Colors.IconColor}),
			width : 22,
			height : 22,
			borderWidth : 0
		});	
		
		var btnSearch = Titanium.UI.createButton({    
		    title : Alloy.CFG.Languages.lblSearch,
		    width : Ti.UI.SIZE,
		    height : 32,
		    
		});
		
		btnSearch.addEventListener('click',function(e)
		{
		    doSearch();
		});
		
		imgSearch.addEventListener('click',function(e)
		{
		    doSearch();
		});
		 
		var btnCancle = Titanium.UI.createButton({
		    title : Alloy.CFG.Languages.lblCancel,
		    width : Ti.UI.SIZE,
		    height : 32,
		    
		});
		
		var imgCancel = Titanium.UI.createImageView({
			image : fontIconLoader.getIcon("panacea","times",22,{color:Alloy.CFG.Colors.IconColor}),
			width : 22,
			height : 22,
			borderWidth : 0
		});	
		
		btnCancle.addEventListener('click',function(e){
		    $.txtSearch.blur();
		});
		
		imgCancel.addEventListener('click',function(e){
		    $.txtSearch.blur();
		});
		
		$.txtSearch.keyboardToolbar = [imgCancel, btnCancle, flexSpace, flexSpace, flexSpace, imgSearch, btnSearch];
		$.txtSearch.keyboardToolbarColor = Alloy.CFG.Colors.keyboardToolbarBG;
		$.txtSearch.keyboardType = Ti.UI.KEYBOARD_DEFAULT;
		*/
	}
	
};

$.txtSearch.addEventListener('return', function(e) {
	doSearch();
});

var doSearch = function()
{
	$.txtSearch.blur();
    console.log("Search Keyword : " + $.txtSearch.value);
    if($.txtSearch.value != "") {
		var limit = Alloy.CFG.LimitOfPosts;
		var from = 0;
		var loaderArgs = {
			callbackFunction : callBackDoSearch,
			url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/"+limit+"/from/" + from + '/keyword/' + $.txtSearch.value
		};
		console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getItemsByCategoryId + args.id + "/item/all/count/"+limit+"/from/" + from + '/keyword/' + $.txtSearch.value);
		loader.get(loaderArgs);
    } 
};

var callBackDoSearch = function(respData)
{
	console.log("<<<<< Total Search Results >>>> : " + respData.items.length);
	//console.log(respData);
	args = respData;
	resetGridControls();
	_psScrollView.removeAllView();
	
	for(var i=0; i<args.items.length; i++) 
	{
		var scale = {
				width : args.items[i].images[0].width,
				height :  args.items[i].images[0].height
		};
		Ti.API.info(Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path);
		var params = {
			image : Alloy.CFG.Urls.imagePathURL + args.items[i].images[0].path,
			title : args.items[i].name,
			like : i * 21,
			msg : i * 13,
			scale : scale,
			viewWidth : ITEM_WIDTH,
			item : args.items[i]
		};
		
		addView(itemGridLayout(params));
		
	}
	
};

var resetGridControls = function(){
	ITEM_WIDTH = 160;
	NUM_OF_COL = 0;
	SCREEN_WIDTH = 0;
	SCREEN_HEIGHT = 0;
	EXTRA_PADDING = 0;
	ITEMS_HEIGHT = [];
	ACTUAL_TOTAL_WIDTH = 0;
	
	if (__.isiOS7Plus()) {
		$.AppWrapper.top = 20;
	}
	
	if(Alloy.isTablet) {
		ITEM_WIDTH = 200;
	}
	
	SCREEN_WIDTH = __.getScreenWidth();
	SCREEN_HEIGHT = __.getScreenHeight();
	
	calculateCol();
};


var loadIcon = function()
{
	var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
};

$.itemGrid.addEventListener('open', function()
{
	init();
	loadingWindow.endLoading();
});
