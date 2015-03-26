var args = arguments[0] || {};
var __ = require('platformSupport');
var psAnimation = require('animation');
var strings = require('strings');
var fontIconLoader = require("icomoonlib");
var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
$.imgBack.image = backIcon;

if (__.isiOS7Plus()) {
	$.AppWrapper.top = 20;
}

// close current slider window
var closeWindow = function(){
	psAnimation.out($.slider);
};

var init = function()
{

	if(args.fromWhere == "itemDetail"){
		var images = args.item.images;
	} else if(args.fromWhere == "dishDetail") {
		var images = args.dish_images;
	} else {
		var images = args.images;
	}
	
	var cnt=1;
	for(var i=0; i<images.length; i++){
		var productImageView = Ti.UI.createView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL
		});
		
		var productImage = Ti.UI.createImageView({
			image : Alloy.CFG.Urls.imagePathURL +  images[i].path
		});
		
		productImageView.add(productImage);
		
		var scrollView = Titanium.UI.createScrollView({
			contentWidth:'auto',
			contentHeight:'auto',
			top:0,
			bottom:50,
			showVerticalScrollIndicator:true,
			showHorizontalScrollIndicator:true,
			maxZoomScale:100,
			minZoomScale:0.1
		});
		productImageView.add(scrollView);
		
		var indicatorLabel = Ti.UI.createLabel({
			backgroundColor : Alloy.CFG.Colors.SliderIndexBGColor,
			color : '#000000',
			right : "10",
			top : "10",
			width : Ti.UI.SIZE,
			height : "30",
			text :" "+ cnt + "  of  " + images.length+" "
		});
		cnt++;
		
		scrollView.add(productImage);
		
		productImageView.add(indicatorLabel);
		$.scroller.addView(productImageView);
	}
	
	var backIcon = fontIconLoader.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
	
};

$.slider.addEventListener('open', function()
{
	init();
});

