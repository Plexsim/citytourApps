var __ = require('platformSupport');
var loadingWindow = require('loadingWindow');
var strings = require("strings");
var fontIconLoader = require("icomoonlib");
var psAnimation = require('animation');
var args = arguments[0] || {};

var openGrid = function()
{
	args.openItemGrid(args.itemsData);
};

var openMap = function()
{
	args.openItemMap(args.itemsData);
};

var openDetailOne = function(e)
{
	var params = {
		item : args.itemsData.items[0]
	};
	
	var contentView = Alloy.createController("itemDetail", params).getView();
	psAnimation.in(contentView);
};

var openDetailTwo = function(e)
{
	var params = {
		item : args.itemsData.items[1]
	};
	var contentView = Alloy.createController("itemDetail", params).getView();
	psAnimation.in(contentView);
};

var openDetailThree = function(e)
{
	var params = {
		item : args.itemsData.items[2]
	};
	
	var contentView = Alloy.createController("itemDetail", params).getView();
	psAnimation.in(contentView);
};



var init = function()
{
	
	if(args!=null){
		if(args.itemsData.items != null){
			
			if(args.itemsData.items.length > 0){
				var scale = {
					width : args.itemsData.items[0].images[0].width,
					height : args.itemsData.items[0].images[0].height
				};
				
				var viewScale = {
					width : args.ITEM_BIG_WIDTH,
					height : args.ITEM_BIG_HEIGHT
				};
				scale = __.getGridPhotoSize(scale, viewScale);
				
				Ti.API.info("0 = width "+args.itemsData.items[0].images[0].width + " height "+args.itemsData.items[0].images[0].height);
				Ti.API.info("0 = "+ scale.width + " "+scale.height);
				
				$.imgLeftImg.width = scale.width;
				$.imgLeftImg.height = scale.height;
				$.shadow.width = scale.width;
				$.catName.text = args.itemsData.name;
				$.catName.width = scale.width;
				$.imgLeftImg.image = Alloy.CFG.Urls.imagePathURL + args.itemsData.items[0].images[0].path;
				Ti.API.info("***"+ Alloy.CFG.Urls.imagePathURL + args.itemsData.items[0].images[0].path);
				
				if(args.itemsData.items.length > 1){
					scale = {
						width : args.itemsData.items[1].images[0].width ,
						height : args.itemsData.items[1].images[0].height 
					};
					
					viewScale = {
						width : args.ITEM_SMALL_WIDTH,
						height : args.ITEM_SMALL_HEIGHT
					};
					scale = __.getGridPhotoSize(scale, viewScale);
					$.imgLeftImg2.width = scale.width;
					$.imgLeftImg2.height = scale.height;
					$.imgLeftImg2.image = Alloy.CFG.Urls.imagePathURL + args.itemsData.items[1].images[0].path;
					
					Ti.API.info("1 = width "+args.itemsData.items[1].images[0].width + " height "+args.itemsData.items[1].images[0].height);
					Ti.API.info("1 = "+ scale.width + " "+scale.height);
				}
				
				if(args.itemsData.items.length > 2){
					scale = {
						width :  args.itemsData.items[2].images[0].width,
						height :  args.itemsData.items[2].images[0].height
					};
					viewScale = {
						width : args.ITEM_SMALL_WIDTH,
						height : args.ITEM_SMALL_HEIGHT
					};
					scale = __.getGridPhotoSize(scale, viewScale);
					$.imgLeftImg3.width = scale.width;
					$.imgLeftImg3.height = scale.height;
					$.imgLeftImg3.image = Alloy.CFG.Urls.imagePathURL + args.itemsData.items[2].images[0].path;
					
					Ti.API.info("2 = width "+args.itemsData.items[2].images[0].width + " height "+args.itemsData.items[2].images[0].height);
					Ti.API.info("2 = "+ scale.width + " "+scale.height);
				}
				
				$.bigImgView.width = args.ITEM_BIG_WIDTH;
				$.bigImgView.height = args.ITEM_BIG_HEIGHT;
				
				$.smallImgView1.width = args.ITEM_SMALL_WIDTH;
				$.smallImgView1.height = args.ITEM_SMALL_HEIGHT;
				
				$.smallImgView2.width = args.ITEM_SMALL_WIDTH;
				$.smallImgView2.height = args.ITEM_SMALL_HEIGHT;
				
				loadIcon();
				loadLanguage();
				
				psAnimation.slowlyAppear($.bigImgView);
				psAnimation.slowlyAppear($.smallImgView1);
				psAnimation.slowlyAppear($.smallImgView2);
				psAnimation.slowlyAppear($.gotoView);
				
				if(Alloy.isTablet){
					__.setNormalFontForTablet($.lblViewOnMap,18);
					__.setNormalFontForTablet($.lblViewOnGrid,18);
					__.setNormalFontForTablet($.catName,30);
					
					$.imgViewOnMap.width = 25;
					$.imgViewOnMap.height = 25; 
					
					$.imgViewOnGrid.width = 25;
					$.imgViewOnGrid.height = 25;
				}
				
				
			}
			
		}
		
	}	

};

var loadIcon = function()
{
	var localtionIcon = fontIconLoader.getIcon("panacea","map-marker",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgViewOnMap.image = localtionIcon;
	

	var gridIcon = fontIconLoader.getIcon("panacea","grid",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgViewOnGrid.image = gridIcon;
};

var loadLanguage = function()
{
	$.lblViewOnMap.text = Alloy.CFG.Languages.lblViewOnMap;
	$.lblViewOnGrid.text = Alloy.CFG.Languages.lblViewOnGrid;
};



init();
