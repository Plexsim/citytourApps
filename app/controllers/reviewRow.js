var args = arguments[0] || {};
var __ = require('platformSupport');
var icomoonlib = require("icomoonlib");
var init = function()
{
	
	if(args.profile_photo == "") {
		$.imReviewer.image = "/images/reviewUser.png";
	} else {
		$.imReviewer.image = Alloy.CFG.Urls.imagePathURL + args.profile_photo;
	}
	
	$.lblReviewer.text = args.appuser_name;
	$.lblReview.text = args.review;
	$.lblReviewTime.text = args.added;
	
	
	if(args.appuser_id == Ti.App.Properties.getString("userId")){
		$.reviewContainer.backgroundColor = Alloy.CFG.Colors.ReviewBackgroundColor;
	}
	
	if(Alloy.isTablet) {
		//__.setNormalFontForTablet($.lblReviewer,18);
		//__.setNormalFontForTablet($.lblReview,18);
		//__.setNormalFontForTablet($.lblReviewTime,16);
	}
	
	var timeIcon = icomoonlib.getIcon("panacea","clock-o",35,{color:Alloy.CFG.Colors.ItemIconColor});
	$.imgTime.image = timeIcon;
};

init();
