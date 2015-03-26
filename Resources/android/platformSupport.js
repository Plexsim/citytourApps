var dpi = 0;

var getScreenDpi = function() {
    0 == dpi | null == dpi && (dpi = Ti.Platform.displayCaps.dpi);
    return dpi;
};

exports.getScreenDpi = getScreenDpi;

var width = 0;

var getScreenWidth = function() {
    width = Ti.Platform.displayCaps.platformWidth;
    width = convertPxtoDp(width);
    return width;
};

exports.getScreenWidth = getScreenWidth;

var height = 0;

var getScreenHeight = function() {
    height = Ti.Platform.displayCaps.platformHeight;
    height = convertPxtoDp(height);
    return height;
};

exports.getScreenHeight = getScreenHeight;

var convertDptoPx = function(dp) {
    return dp * (getScreenDpi() / 160);
};

exports.convertDptoPx = convertDptoPx;

var convertPxtoDp = function(px) {
    return px / (getScreenDpi() / 160);
};

exports.convertPxtoDp = convertPxtoDp;

var osVersion = Ti.Platform.version;

var isiOS7Plus = function() {
    var osName = osVersion;
    var version = 0;
    null != osName && (version = osVersion.split("."));
    var major = parseInt(version[0], 10);
    return major >= 7 ? true : false;
};

exports.isiOS7Plus = isiOS7Plus;

var isPortrait = function() {
    var isPortrait = false;
    (1 == Titanium.UI.orientation || 2 == Titanium.UI.orientation) && (isPortrait = true);
    return isPortrait;
};

exports.isPortrait = isPortrait;

exports.getImageSize = function(imagePath) {
    var size = [];
    var tmpImgView = Ti.UI.createImageView({
        image: imagePath,
        width: "auto",
        height: "auto"
    });
    img = tmpImgView.toBlob();
    if (null == img) {
        size.width = 100;
        size.height = 100;
    } else {
        size.width = img.width;
        size.height = img.height;
    }
    tmpImgView = null;
    return size;
};

var getGridPhotoSize = function(size, viewSize) {
    var MSize = [];
    if (size.height < size.width) {
        MSize.height = viewSize.height;
        MSize.width = size.width / size.height * MSize.height;
        if (MSize.width < viewSize.width) {
            var space = viewSize.width - MSize.width;
            var spaceForH = MSize.width / MSize.height * space;
            MSize.height += spaceForH;
            MSize.width += space;
        }
    } else {
        MSize.width = viewSize.width;
        MSize.height = size.height / size.width * MSize.width;
        if (MSize.height < viewSize.height) {
            var space = viewSize.height - MSize.height;
            var spaceForW = MSize.height / MSize.width * space;
            MSize.height += space;
            MSize.width += spaceForW;
        }
    }
    return MSize;
};

exports.getGridPhotoSize = getGridPhotoSize;

var getGridPhotoSizeCalWidth = function(size, viewSize) {
    var MSize = [];
    MSize.width = viewSize;
    MSize.height = size.height / size.width * MSize.width;
    return MSize;
};

exports.getGridPhotoSizeCalWidth = getGridPhotoSizeCalWidth;

exports.setNormalFontForTablet = function(obj, fs) {
    obj.font = {
        fontSize: fs,
        fontFamily: "Monda-Regular"
    };
};

exports.setBoldFontForTablet = function(obj, fs) {
    obj.font = {
        fontSize: fs,
        fontFamily: "Monda-Regular",
        fontWeight: "bold"
    };
};

var getThumbPhotoSize = function(size, viewSize) {
    var MSize = [];
    if (isPortraitImage(size)) {
        MSize.width = viewSize.width;
        MSize.height = size.height / size.width * MSize.width;
    } else {
        MSize.height = viewSize.height;
        MSize.width = size.width / size.height * MSize.height;
    }
    return MSize;
};

exports.getThumbPhotoSize = getThumbPhotoSize;

var isPortraitImage = function(size) {
    return size.height > size.width ? true : false;
};

exports.isPortraitImage = isPortraitImage;

exports.hideActionBar = function(win) {
    win.activity.actionBar.hide();
};

exports.getCoordinate = function(point, type) {
    var splitsPoint = point.split(",");
    return "lat" == type ? splitsPoint[0] : splitsPoint[1];
};