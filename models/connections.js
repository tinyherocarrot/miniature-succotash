// Connections Model
"use strict";
module.exports = function(sequelize, DataTypes) {
	var Connections = sequelize.define("Connections", {
		connection_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		sender_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		receiver_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		meeting_place: {
			type: DataTypes.STRING,
			allowNull: true
		},
		user_notes: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	});

	Connections.associate = function(db) {
		Connections.belongsTo(db.User, {
			foreignKey: "receiver_id",
			sourceKey: "user_id"
		});
	};

	return Connections;
};

// select a.user_first_name,a.user_last_name,c.user_first_name,c.user_last_name
// from user a inner join connections b on (a.id=b.sender_id)
//              inner join user c on (c.id=b.receiver_id)
