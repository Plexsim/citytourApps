var Admob = require('ti.admob');
function loadAd(publisherID,isTesting){
	var ad = Admob.createView({
		    bottom: 0, left: 0,
		    width: Ti.UI.FILL, height: 50,
		    publisherId: publisherID, 
		    testing: isTesting,
		    adBackgroundColor: '#00b79d',
	});
	
	ad.addEventListener('didReceiveAd', function() {
   		 //alert('Did receive ad!');
	});
	ad.addEventListener('didFailToReceiveAd', function() {
	    //alert('Failed to receive ad!');
	});
	ad.addEventListener('willPresentScreen', function() {
	    //alert('Presenting screen!');
	});
	ad.addEventListener('willDismissScreen', function() {
	    //alert('Dismissing screen!');
	});
	ad.addEventListener('didDismissScreen', function() {
	    //alert('Dismissed screen!');
	});
	ad.addEventListener('willLeaveApplication', function() {
	    //alert('Leaving the app!');
	});
	
	return ad;
}



exports.loadAd = loadAd;