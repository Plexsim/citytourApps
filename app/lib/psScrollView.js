var __ = require('platformSupport');

function psScrollView(args){
	
	var args = args || {};
	var needToLoad = false;
	var isLoading = false;
	var _screenHeight = __.getScreenHeight();//Titanium.Platform.displayCaps.platformHeight;
	
	var loadingView = Ti.UI.createView({
		height:60,
		width: Ti.UI.SIZE,
		backgroundColor:"transparent",
		visible:false
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color: '#000',
		font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
		message: ' Loading...',
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE
	});
	activityIndicator.show();
	loadingView.add(activityIndicator);
 
	var psScrollView = Ti.UI.createScrollView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		contentWidth: Ti.UI.SIZE,
		contentHeight: Ti.UI.SIZE,
  		showVerticalScrollIndicator: true,
  		showHorizontalScrollIndicator: false,
		backgroundColor:"transparent",
		layout:"vertical"
	});
	var contentView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		//layout: 'vertical',
		top:0,
		left:0,
		backgroundColor:'transparent'
	});
 
	psScrollView.add(contentView);
	psScrollView.add(loadingView);
 
 
 	var extraView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: _screenHeight,
		layout: 'vertical',
		top:0,
		left:0,
		backgroundColor:'transparent'
	});
	psScrollView.add(extraView);
 
	psScrollView.addEventListener('scroll',function(e){
		
		if(extraView.height != 0 && contentView.getRect().height > _screenHeight ){
			extraView.height = 0;
		}
		
		var tolerance = 80;
		
		if (Ti.Platform.osname == "android") {
			tolerance = __.convertDptoPx(tolerance+30);
			needToLoad = (((contentView.getRect().height) - e.y) <= tolerance);
		} else {
    		needToLoad = (((contentView.getRect().height) - e.y) <= ((psScrollView.getRect().height) + tolerance));
    	}
    	
    	
    	Ti.API.info("content height " +contentView.getRect().height+ " e.y : "+e.y+" scroll height : "+ psScrollView.getRect().height + " Tolerance : " + tolerance);
    	if(! isLoading) {
	    	if(needToLoad) {
	    		
	    		isLoading = true;
				needToLoad = false;
				
				loadingView.setVisible(true);
				
				psScrollView.fireEvent('InfiniteScrolling');
			}
		}
		
	});
 
	psScrollView.infiniteScrollingCompleted = function(e){
		isLoading = false;
		loadingView.setVisible(false);
	};
 
	psScrollView.addView = function(view){
		contentView.add(view);
		
		if(extraView.height != 0 && contentView.getRect().height < _screenHeight ){
			extraView.height = (_screenHeight - contentView.getRect().height )+100;
		}
	};
	
	psScrollView.removeAllView = function(){
		contentView.removeAllChildren();
	};
	
	psScrollView.setViewLayout = function(layout) {
		
		contentView.layout = "vertical";
	};
 
	return psScrollView;
}
module.exports = psScrollView;
 