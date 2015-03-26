var images = [];

for (var i = 1; 8 > i; i++) images.push("/images/loading/cloud" + i + ".png");

var startLoading = function() {
    var win = Ti.UI.createWindow({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        navBarHidden: true,
        zIndex: 100,
        backgroundColor: "transparent",
        opacity: 1
    });
    var blurView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        opacity: .7,
        backgroundColor: "#DDD"
    });
    win.add(blurView);
    var ani_image_view = Ti.UI.createImageView({
        images: images,
        width: "200",
        height: "200"
    });
    win.add(ani_image_view);
    win.addEventListener("open", function() {
        ani_image_view.start();
    });
    win.open();
    if (null != Alloy.Globals.loadingWindow) try {
        Alloy.Globals.loadingWindow.close();
    } catch (E) {}
    Alloy.Globals.loadingWindow = win;
};

exports.startLoading = startLoading;

var endLoading = function() {
    var win = Alloy.Globals.loadingWindow;
    setTimeout(function() {
        try {
            win.close();
        } catch (E) {}
    }, 200);
};

exports.endLoading = endLoading;