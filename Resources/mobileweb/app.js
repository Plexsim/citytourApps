var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Collections.users = Alloy.createCollection("users");

Alloy.Globals.data = null;

Alloy.createController("index");