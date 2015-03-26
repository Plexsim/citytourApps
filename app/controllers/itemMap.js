var myAnimation = require('animation');
var __ = require('platformSupport');
var args = arguments[0] || {};
var MapModule = require('ti.map');
var loader = require("loader");
var icomoonlib = require("icomoonlib");
var loadingWindow = require("loadingWindow");

var itemMapView = MapModule.createView({
    mapType: MapModule.NORMAL_TYPE,
    region: {latitude: 16.802924, longitude: 96.183289, latitudeDelta: 0.1, longitudeDelta: 0.1},
});

var init = function()
{
	var pinIcon = icomoonlib.getIcon("panacea","annotation",20,{color:Alloy.CFG.Colors.MainColor_Dark});
	
	if(args.items != null){
		for(var i=0; i<args.items.length; i++) {
			var eachItem = MapModule.createAnnotation({
			    latitude: __.getCoordinate(args.items[i].coordinate,"lat"),
			    longitude: __.getCoordinate(args.items[i].coordinate,"long"),
			    pincolor: MapModule.ANNOTATION_AZURE,
			    title: args.items[i].name,
			    subtitle: args.items[i].description,
			    itemId : args.items[i].id,
			    image: pinIcon,
			    itemArgs : args.items[i]
			});
			if (Ti.Platform.osname != "android") {
				eachItem.rightButton = 	 Ti.UI.iPhone.SystemButton.INFO_DARK;
			}else{
				//shop.rightButton = Ti.UI.createButton({title: 'View'});
			}
			itemMapView.addAnnotation(eachItem);
		}
	} else if(args != null) {
		var eachItem = MapModule.createAnnotation({
		    latitude: __.getCoordinate(args.coordinate,"lat"),
		    longitude: __.getCoordinate(args.coordinate,"long"),
		    pincolor: MapModule.ANNOTATION_AZURE,
		    title: args.name,
		    subtitle: args.description,
		    itemId : args.id,
		    image: pinIcon,
		    itemArgs : args.itemArgs.item
		});
		if (Ti.Platform.osname != "android") {
			eachItem.rightButton = 	 Ti.UI.iPhone.SystemButton.INFO_DARK;
		}else{
			//shop.rightButton = Ti.UI.createButton({title: 'View'});
		}
		itemMapView.addAnnotation(eachItem);
	}
	
	loadIcon();
	
	loadingWindow.endLoading();
	
};

itemMapView.addEventListener('click', function(evt)
{
    var annotation = evt.source; 
    var clicksource = evt.clicksource;
 	
 	if(Ti.Platform.osname != "android") {
 	 	
	    if (clicksource=='rightButton'){  
	        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.itemArgs);
			var params = {
				item : evt.annotation.itemArgs
			};
			console.log(JSON.stringify(params));
			gotoItemDetails(params);
	    }
    
    } else {
    	
	   if(clicksource != "pin" & clicksource != null){	
	        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.itemId);
			var params = {
				item : evt.annotation.itemArgs
			};
			console.log(JSON.stringify(params));
			gotoItemDetails(params);		
	    }
    	
    }
             
});

var gotoItemDetails = function(args)
{
	var contentView = Alloy.createController("itemDetail", args).getView();
	myAnimation.in(contentView);
};

var closeWindow = function()
{
	myAnimation.out($.mapWindow);
};

if (__.isiOS7Plus()) {
	$.AppWrapper.top = 20;
}

var loadIcon = function(){
	var backIcon = icomoonlib.getIcon("panacea","back",35,{color:Alloy.CFG.Colors.IconWhite});
	$.imgBack.image = backIcon;
};

$.mapWindow.addEventListener('open', function(){
	init();
	$.mapView.add(itemMapView);
});



