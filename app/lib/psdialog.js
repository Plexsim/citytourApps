

function loadCustomDialog(title,message){
	var win = Ti.UI.createWindow({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		navBarHidden : true,
		backgroundColor : "transparent",
		opacity : 1
	});
	
	var blurView = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		opacity : 0.4,
		backgroundColor : '#DDD'
	});
	win.add(blurView);
	
	var alertView = Ti.UI.createView({
		backgroundColor : '#FFF',
		borderRadius : 12,
		width : 200,
		height : Ti.UI.SIZE,
		layout : 'vertical'
	});
	win.add(alertView);
	

	var titleLabel = Ti.UI.createLabel({
		color: '#000',
		font: {
			fontSize: 15,
			fontWeight: 'bold',
			fontFamily: "OpenSans-Regular"
		},
		height: 50,
		width : Ti.UI.FILL,
		textAlign : "center",
		left : 10,
		top : 5,
		right:5,
		text: title
	});
	alertView.add(titleLabel);
	
	
	var msglabel = Ti.UI.createLabel({
		color: '#222',
		font: {
			fontSize: 13,
			fontFamily: "OpenSans-Regular"
		},
		height: Ti.UI.SIZE,
		width : Ti.UI.FILL,
		textAlign : 'center',
		top : 5,
		bottom : 10,
		text: message
	});
	alertView.add(msglabel);
	
	var buttonOK = Titanium.UI.createButton({
		
	    backgroundColor : Alloy.CFG.Colors.MainColor,
		backgroundSelectedColor : Alloy.CFG.Colors.MainColor_Dark,
		backgroundImage : "none",
		borderRadius : 0,
		borderWidth : 0,
		borderColor : Alloy.CFG.Colors.MainColor_Dark,
		top : 10,
		height : 42.173,
		width : 220,
		
		color : Alloy.CFG.Colors.TextColor,
		title : "OK",
		font : {
			fontFamily: "Monda-Regular"
		}
	   
	});
	alertView.add(buttonOK);
	buttonOK.addEventListener('click', function(e) {
		win.close();
	});
	
	win.open();
	
	return win;	
}

exports.loadCustomDialog = loadCustomDialog;
