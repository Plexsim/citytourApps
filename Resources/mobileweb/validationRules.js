var animation = require("alloy/animation");

exports.validateEmail = function(txtEmail) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (false == reg.test(txtEmail)) return false;
    return true;
};

exports.validationFailAction = function(ui) {
    ui.borderColor = Alloy.CFG.Colors.validationFailColor;
    ui.borderWidth = 2;
    animation.shake(ui, 200, null);
    Ti.Media.vibrate([ 0, 500 ]);
};

exports.backToNormal = function(ui) {
    ui.borderColor = Alloy.CFG.Colors.MainColor;
    ui.borderWidth = 1;
};