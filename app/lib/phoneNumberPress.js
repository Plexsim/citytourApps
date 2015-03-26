var fontIconLoader = require("icomoonlib");

function phoneNumberPressWindow(){
	var win = Ti.UI.createWindow({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		navBarHidden : true
	});
	
	var blurView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		opacity : 0.7,
		backgroundColor : Alloy.CFG.Colors.MainColor
	});
	
	if(OS_IOS) {
		blurView.backgroundColor = "#DDD";	
	}
	
	win.add(blurView);
	blurView.addEventListener('click', function(){
		win.close();
	});
	
	var contentView = Ti.UI.createView({
		backgroundColor : '#FFF',
		borderRadius : 3,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'horizontal'
	});
	win.add(contentView);
	
	win.phoneCallView = Ti.UI.createView({
		backgroundColor : Alloy.CFG.Colors.MainColor,
		borderRadius : 5,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		left : 15,
		top : 20,
		bottom : 20
	});
	contentView.add(win.phoneCallView);
	
	var callIcon = Ti.UI.createImageView({
		image : fontIconLoader.getIcon("panacea","phone-square",35,{color:Alloy.CFG.Colors.IconRed}),
		width : 20, 
		height : 20,
		left : 4
	});
	win.phoneCallView.add(callIcon);
	
	var callText = Ti.UI.createLabel({
		left : 5,
		text : "Call  ",
		font : {
			fontFamily : "Monda-Regular"
		},
		color : "#FFF"
	});
	win.phoneCallView.add(callText);
	
	
	win.smsView = Ti.UI.createView({
		backgroundColor : Alloy.CFG.Colors.MainColor,
		borderRadius : 5,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		left : 10,
		top : 20,	
		bottom : 20,
		right : 15,
	});
	contentView.add(win.smsView);
	
	var smsIcon = Ti.UI.createImageView({
		image : fontIconLoader.getIcon("panacea","comment",35,{color:Alloy.CFG.Colors.IconRed}),
		width : 20, 
		height : 20,
		left : 4
	});
	win.smsView.add(smsIcon);
	
	var smsText = Ti.UI.createLabel({
		left : 5,
		text : "SMS  ",
		font : {
			fontFamily : "Monda-Regular"
		},
		color : "#FFF"
	});
	win.smsView.add(smsText);
	
	
	win.open();
	return win;
}
exports.phoneNumberPressWindow = phoneNumberPressWindow;
