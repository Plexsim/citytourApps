function loadAd(publisherID, isTesting) {
    var ad = Admob.createView({
        bottom: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: 50,
        publisherId: publisherID,
        testing: isTesting,
        adBackgroundColor: "#00b79d"
    });
    ad.addEventListener("didReceiveAd", function() {});
    ad.addEventListener("didFailToReceiveAd", function() {});
    ad.addEventListener("willPresentScreen", function() {});
    ad.addEventListener("willDismissScreen", function() {});
    ad.addEventListener("didDismissScreen", function() {});
    ad.addEventListener("willLeaveApplication", function() {});
    return ad;
}

var Admob = require("ti.admob");

exports.loadAd = loadAd;