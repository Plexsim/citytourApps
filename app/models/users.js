exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		    "username": "text",
		    "email": "text",
		    "about_me": "text",
		    "is_banned":"INTEGER",
		    "profile_photo":"text",
		    "background_photo":"text"
		},
		adapter: {
			type: "sql",
			collection_name: "users",
			"idAttribute": "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
				deleteAll : function() {
	 
			        var collection = this;
			 
			        var sql = "DELETE FROM " + collection.config.adapter.collection_name;
			        db = Ti.Database.open(collection.config.adapter.db_name);
			        db.execute(sql);
			        db.close();
			 
			        collection.trigger('sync');
		 
		      }
		});

		return Collection;
	}
};