function sourceSelectorWindow() {
    var win = Ti.UI.createWindow({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        navBarHidden: true
    });
    var blurView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        opacity: .7,
        backgroundColor: "#DDD"
    });
    win.add(blurView);
    blurView.addEventListener("click", function() {
        win.close();
    });
    var contentView = Ti.UI.createView({
        backgroundColor: "#FFF",
        borderRadius: 12,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    win.add(contentView);
    var lblTitle = Ti.UI.createLabel({
        top: 30,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "Please choose for image source",
        color: "#000",
        font: {
            fontSize: 15,
            fontFamily: "OpenSans-Regular"
        }
    });
    contentView.add(lblTitle);
    win.btnCamera = Ti.UI.createButton({
        backgroundColor: Alloy.CFG.Colors.MainColor,
        backgroundSelectedColor: Alloy.CFG.Colors.MainColor_Dark,
        backgroundImage: "none",
        borderRadius: 7,
        borderWidth: 2,
        borderColor: Alloy.CFG.Colors.MainColor_Dark,
        top: 20,
        height: 42.173,
        width: 220,
        left: 30,
        right: 30,
        color: Alloy.CFG.Colors.TextColor,
        title: "Camera",
        font: {
            fontFamily: "Monda-Regular"
        }
    });
    contentView.add(win.btnCamera);
    win.btnGallery = Ti.UI.createButton({
        backgroundColor: Alloy.CFG.Colors.MainColor,
        backgroundSelectedColor: Alloy.CFG.Colors.MainColor_Dark,
        backgroundImage: "none",
        borderRadius: 7,
        borderWidth: 2,
        borderColor: Alloy.CFG.Colors.MainColor_Dark,
        top: 10,
        height: 42.173,
        width: 220,
        bottom: 20,
        left: 30,
        right: 30,
        color: Alloy.CFG.Colors.TextColor,
        title: "Photo Gallery",
        font: {
            fontFamily: "Monda-Regular"
        }
    });
    contentView.add(win.btnGallery);
    win.open();
    return win;
}

exports.sourceSelectorWindow = sourceSelectorWindow;