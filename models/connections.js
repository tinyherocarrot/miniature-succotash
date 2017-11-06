// Connections Model
"use strict";
module.exports = function(sequelize, DataTypes) {
	var Connections = sequelize.define(
		"Connections",
		{
			connection_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			sender_id: {
				type: DataTypes.INTEGER
				// allowNull: false
			},
			receiver_id: {
				type: DataTypes.INTEGER
				// allowNull: false
			}
		},
		{
			timestamps: false
		}
	);

	Connections.associate = function(db) {
		// Connections.belongsTo(db.User);
		Connections.belongsTo(db.User, {
			foreignKey: "connection_id",
			sourceKey: "user_id"
		});
	};

	return Connections;
};

// select a.user_first_name,a.user_last_name,c.user_first_name,c.user_last_name
// from user a inner join connections b on (a.id=b.sender_id)
//              inner join user c on (c.id=b.receiver_id)
