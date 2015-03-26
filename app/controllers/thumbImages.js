var args = arguments[0] || {};
var __ = require("platformSupport");

var loadBigImage = function(e)
{
	Ti.App.Properties.setString('selectedThumbImageIndex', e.source.thumbId);
	Ti.App.fireEvent(args.loadSelctedItemImageFunction);
};

var init = function()
{
	
	$.imCategoryImage.image = args.imagePath;
	$.imCategoryImage.thumbId = args.thumbId;
	
	var size = []; 
	size.height = args.height;
	size.width = args.width;
	
	var viewSize = []; 
	viewSize.height = 50; 
	viewSize.width = 50;
	
	var tmp = __.getThumbPhotoSize(size,viewSize);
	$.imCategoryImage.width = tmp.width;
	$.imCategoryImage.height = tmp.height;
	
	if(args.selected) {
		$.categoryView.borderWidth = 1;
		$.categoryView.borderColor = Alloy.CFG.Colors.MainColor;
	} else {
		$.categoryView.borderWidth = 0;
	}
	
	if(!__.isPortraitImage(size)) {
		//$.imCategoryImage.left = 1;
	} 
	
};

init();
