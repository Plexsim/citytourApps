var args = arguments[0] || {};
var __ = require('platformSupport');
var psAnimation = require('animation');
var fontIconLoader = require("icomoonlib");
var loader = require("loader");
var validation = require("validationRules");
var dialogBox = require("psdialog");
var loadingWindow = require('loadingWindow');
var changeFlag = 0;
var FIXED_PORTRAIT_WIDTH = 400;
var FIXED_PORTRAIT_MULTIPLY = 241;
var FIXED_LANDSCAPE_WIDTH = 600;
var FIXED_LANDSCAPE_MULTIPLY = 441;

if (__.isiOS7Plus()) {
	$.AppWrapper.top = 20;
}

var closeWindow = function()
{
	psAnimation.out($.newsDetail);
};

var openSlider = function()
{
	args.fromWhere = "newsDetail";
	var contentView = Alloy.createController("slider", args).getView();
	psAnimation.in(contentView);
};



var loadFeedDetail = function()
{
	
	if(args != null) {
		
		var screenWidth = __.getScreenWidth();
		var padding = "";
		
		$.itemImagesView.image = Alloy.CFG.Urls.imagePathURL + args.images[0].path;
		
		var screenWidth = __.getScreenWidth();
		var screenHeight = __.getScreenHeight();
		
		var size = []; 
		size.width = args.images[0].width;
		size.height = args.images[0].height;
		
		var tmp = __.getGridPhotoSizeCalWidth(size,screenWidth);
		$.itemImagesView.width = tmp.width;
		$.itemImagesView.height = tmp.height;
		
		$.itemImagesViewContainer.height = screenHeight / 2.2;
		
		$.lblTitle.text = args.title;
		$.lblDescription.text = args.description;
		
		
		for(var i=0; i< args.images.length; i++) 
		{
			if(i==0) {
				var params = {
					imagePath : Alloy.CFG.Urls.imagePathURL +  args.images[i].path,
					thumbId : i,
					width : args.images[i].width,
					height : args.images[i].height,
					selected : true,
					loadSelctedItemImageFunction : 'loadSlectedFeedImage'
				};
			} else {
				var params = {
					imagePath : Alloy.CFG.Urls.imagePathURL +  args.images[i].path,
					thumbId : i,
					width : args.images[i].width,
					height : args.images[i].height,
					selected : false,
					loadSelctedItemImageFunction : 'loadSlectedFeedImage'
				};
			}
			
			contentView = Alloy.createController("thumbImages", params).getView();
			$.thumbImagesScrollView.add(contentView);
		}
		
		if(!OS_IOS) {
			$.thumbImagesScrollView.contentWidth = parseInt(args.images.length * 70) + 700;
		} else {
			$.thumbImagesScrollView.contentWidth = parseInt(args.images.length * 70) + 150;
		}
		
		$.thumbImagesScrollView.width = __.getScreenWidth() - 70;
		
		if(Alloy.isTablet) {
			
			$.thumbImagesScrollView.width = 400;
			$.thumbContainerView.left = parseInt((parseInt(__.getScreenWidth()) - $.thumbContainerView.width))/2;

			
			padding = 50;
			$.lblTitle.top=10;
			__.setNormalFontForTablet($.lblDescription,16);
		} else {
			padding = 20;
		}
		
			
		$.midContainer.applyProperties({
			width : screenWidth,
			contentWidth : screenWidth
		});
		
		$.infoContainer.applyProperties({
			left : padding,
			right : padding
		});
		
	} else {
		console.log("There is no shop data yet. Please fill from admin panel.");
	}
};

Ti.App.addEventListener('loadSlectedFeedImage',function()
{
	psAnimation.slowlyAppear($.itemImagesView);
	
	var index = Ti.App.Properties.getString("selectedThumbImageIndex");
	$.itemImagesView.image = Alloy.CFG.Urls.imagePathURL + args.images[index].path;
	
	var screenWidth = __.getScreenWidth();
	
	
	var size = []; 
	size.width = args.images[index].width;
	size.height = args.images[index].height;
	
	var tmp = __.getGridPhotoSizeCalWidth(size,screenWidth);
	$.itemImagesView.width = tmp.width;
	$.itemImagesView.height = tmp.height;
	
	
	$.thumbImagesScrollView.removeAllChildren();
	for(var i=0; i< args.images.length; i++) 
	{
		
		if(i == index){
			var params = {
				imagePath : Alloy.CFG.Urls.imagePathURL +  args.images[i].path,
				thumbId : i,
				width : args.images[i].width,
				height : args.images[i].height,
				selected : true,
				loadSelctedItemImageFunction : 'loadSlectedFeedImage'
			};
		} else {
			var params = {
				imagePath : Alloy.CFG.Urls.imagePathURL +  args.images[i].path,
				thumbId : i,
				width : args.images[i].width,
				height : args.images[i].height,
				selected : false,
				loadSelctedItemImageFunction : 'loadSlectedFeedImage'
			};
		}
		
		contentView = Alloy.createController("thumbImages", params).getView();
		$.thumbImagesScrollView.add(contentView);	
	}

});


function loadBigImage(e)
{
	$.itemImagesView.image = Alloy.CFG.Urls.imagePathURL + args.images[e.source.thumbId].path;
}

var gotoRightMost = function()
{
	$.thumbImagesScrollView.scrollToBottom();
};

var gotoLeftMost = function()
{
	$.thumbImagesScrollView.scrollTo(0,0);
};

var loadIcon = function(){
	var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
};


var init = function()
{
	loadingWindow.endLoading();
	loadFeedDetail();
	loadIcon();
};


init();
	
