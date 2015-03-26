function initializeFont(fontname) {
    "undefined" == typeof fontMaps[fontname] && (fontMaps[fontname] = {});
    try {
        var obj = JSON.parse(Titanium.Filesystem.getFile("fontmaps/" + fontname + ".json").read().text);
        var fontmap = obj.icons;
        for (var i = 0; i < fontmap.length; i++) {
            var font = fontmap[i].properties.name;
            var code = fontmap[i].properties.code;
            fontMaps[fontname][font] = String.fromCharCode(code);
        }
    } catch (fontParseError) {
        console.log("*** There was a font parsing error.  Did you copy your font's selection.json file into the assets folder of your application and name it " + fontname + ".json?");
        console.log("*** fontParseError: " + fontParseError);
    }
}

var fontMaps = {};

var getFontList = function(fontname, size, options) {
    function showCode(e) {
        e.source.text;
    }
    "undefined" == typeof fontMaps[fontname] && initializeFont(fontname);
    "undefined" == typeof size && (size = 32);
    var scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        top: size + "dp"
    });
    for (var iconname in fontMaps[fontname]) {
        var label = Ti.UI.createLabel({
            left: "10dp",
            height: size + "dp",
            width: size + "dp",
            font: {
                fontFamily: fontname,
                fontSize: size + "dp"
            },
            text: fontMaps[fontname][iconname],
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            color: "black"
        });
        if ("object" == typeof options) for (var attr in options) label[attr] = options[attr];
        var title = Ti.UI.createLabel({
            text: iconname,
            size: parseInt(size / 2, 10).toString() + "dp",
            left: "10dp"
        });
        var fontRow = Ti.UI.createView({
            layout: "horizontal",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        fontRow.addEventListener("click", showCode);
        fontRow.add(label);
        fontRow.add(title);
        scrollView.add(fontRow);
    }
    var displayWin = Ti.UI.createWindow({
        backgroundColor: "white"
    });
    parseInt(Titanium.Platform.version.split(".")[0], 10);
    var btnClose = Titanium.UI.createButton({
        title: "Close",
        left: "10dp"
    });
    btnClose.addEventListener("click", function() {
        displayWin.close();
    });
    var fontTitle = Ti.UI.createLabel({
        text: "font: " + fontname,
        size: parseInt(size / 2, 10).toString() + "dp",
        left: "10dp"
    });
    var header = Ti.UI.createView({
        layout: "horizontal",
        top: 0,
        height: size + "dp",
        width: Ti.UI.FILL,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1
    });
    header.add(btnClose);
    header.add(fontTitle);
    displayWin.add(header);
    displayWin.add(scrollView);
    displayWin.open();
};

var getIconAsLabel = function(fontname, iconname, size, options) {
    "undefined" == typeof fontMaps[fontname] && initializeFont(fontname);
    var label = Ti.UI.createLabel({
        height: size + "dp",
        width: size + "dp",
        font: {
            fontFamily: fontname,
            fontSize: size + "dp"
        },
        text: "string" == typeof iconname ? fontMaps[fontname][iconname] : String.fromCharCode(iconname),
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black"
    });
    if ("object" == typeof options) for (var attr in options) label[attr] = options[attr];
    return label;
};

var getIconAsBlob = function(fontname, iconname, size, options) {
    var view = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    view.add(getIconAsLabel(fontname, iconname, size, options));
    return view.toImage(null, true);
};

var getIconAsImageView = function(fontname, iconname, size, options) {
    var view = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    view.add(getIconAsLabel(fontname, iconname, size, options));
    var imageView = Ti.UI.createImageView({
        image: getIcon(fontname, iconname, size, options)
    });
    return imageView;
};

var getIcon = function(fontname, iconname, size, options) {
    var filename = Ti.Utils.md5HexDigest(fontname + "." + iconname + "." + size + ("object" == typeof options ? JSON.stringify(options) : "")) + ".png";
    var path = null;
    path = Ti.Android ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, filename) : Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, filename);
    if (path.exists()) return path.nativePath;
    var blob = getIconAsBlob(fontname, iconname, size, options);
    console.log(blob.apiName);
    path.write(Ti.Android ? blob.media : blob);
    console.log("hello path : " + path.nativePath);
    return path.nativePath;
};

exports.getIcon = getIcon;

exports.getIconAsLabel = getIconAsLabel;

exports.getIconAsBlob = getIconAsBlob;

exports.getIconAsImageView = getIconAsImageView;

exports.getFontList = getFontList;