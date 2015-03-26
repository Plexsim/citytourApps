var args = arguments[0] || {};
var psAnimation = require('animation');
var __ = require('platformSupport');
var loader = require("loader");
var psScrollView = require('psScrollView'); //point to ScrollView.js
_psScrollView = new psScrollView();

_psScrollView.addEventListener("InfiniteScrolling", function(e)
{
	Ti.API.info("InfiniteScrolling event -> start loading data");
	
	// get the limit toload posts
	var limit = Alloy.CFG.LimitOfPosts;
	
	// get Global limit controller
	var from = Ti.App.Properties.getInt("From");
	
	var loaderArgs = {
		callbackFunction : callBackInfiniteScrolling,
		url : Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getFeeds + limit + '/from/' + from
	};
	console.log(Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getFeeds + limit + '/from/' + from);
	loader.get(loaderArgs);
	
	
});

// update the from value 
var updateFromVal = function(){
	
	// get the limit toload posts
	var limit = Alloy.CFG.LimitOfPosts;
	
	// get Global limit controller
	var from = Ti.App.Properties.getInt("From");
	
	// set Global limit controller
	Ti.App.Properties.setInt("From", (limit+from));
	
};

// set items to scroll view
var callBackInfiniteScrolling = function(data) {
	
	// get items from server
	for(var i=0; i<data.length; i++) {
	
		oneFeed = Alloy.createController('newsRow', data[i]).getView();
		_psScrollView.addView(oneFeed);	
		
	}
	 // update the from value
	 updateFromVal();
	 
	//call infiniteScrollingCompleted when your update is done
	_psScrollView.infiniteScrollingCompleted();	
};


var init = function()
{
	if(args != null) {
		var length = args.length;
		var feed = null;

		// get the limit toload posts
		var limit = Alloy.CFG.LimitOfPosts;
		
		// Reset Global limit controller
		Ti.App.Properties.setInt("From", limit);
	
		// set layout for scrollview
		_psScrollView.setViewLayout("vertical");
		
		// scrollView must be inside a View Container
		$.feedListView.add(_psScrollView);
		
		for(var i=0; i<args.length; i++)
		{
			oneFeed = Alloy.createController('newsRow', args[i]).getView();
			_psScrollView.addView(oneFeed);		
		}
		
	}
};

init();
