var args = arguments[0] || {};
var fontIconLoader = require("icomoonlib");
var __ = require('platformSupport');
var myAnimation = require('animation');
var loadingWindow = require('loadingWindow');
var scale = __.getGridPhotoSizeCalWidth(args.scale, args.viewWidth);

$.itemImg.image = args.image;
$.itemImg.width = scale.width;
$.itemImg.height = scale.height;

$.itemGridLayout.iHeight = scale.height + 45;
$.itemGridLayout.iWidth = scale.width;

$.itemImgView.width = scale.width;
$.itemImgView.height = scale.height;
$.shadow.width = scale.width;
$.ItemName.text = args.title;

$.likeCount.text = args.item.like_count;
$.unLikeCount.text = args.item.unlike_count;
$.reviewCount.text = args.item.review_count;

args.item.likeCount = $.likeCount;
args.item.unLikeCount= $.unLikeCount;
args.item.reviewCount= $.reviewCount;

var openItemDetail = function(e)
{
	loadingWindow.startLoading();
	var contentView = Alloy.createController("itemDetail", args).getView();
	myAnimation.in(contentView);
};

var loadIcon = function()
{
	var likeIcon = fontIconLoader.getIcon("panacea","thumbs-up",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgLike.image = likeIcon;
	
	var commentIcon = fontIconLoader.getIcon("panacea","comment",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgReview.image = commentIcon;
	
	var unlikeIcon = fontIconLoader.getIcon("panacea","thumbs-down",35,{color:Alloy.CFG.Colors.IconColor});
	$.imgUnLike.image = unlikeIcon;
};

loadIcon();


