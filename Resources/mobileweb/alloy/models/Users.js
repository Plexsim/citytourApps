var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY",
            username: "text",
            email: "text",
            about_me: "text",
            is_banned: "INTEGER",
            profile_photo: "text",
            background_photo: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "users",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            deleteAll: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("users", exports.definition, []);

collection = Alloy.C("users", exports.definition, model);

exports.Model = model;

exports.Collection = collection;