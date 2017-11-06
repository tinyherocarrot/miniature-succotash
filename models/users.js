// User Model
"use strict";
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define(
		"User",
		{
			user_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			qlink_code: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			user_password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			city: {
				type: DataTypes.STRING,
				allowNull: true
			},
			organization: {
				type: DataTypes.STRING,
				allowNull: true
			},
			role: {
				type: DataTypes.STRING,
				allowNull: true
			},
			bio: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			user_photo: {
				type: DataTypes.STRING,
				allowNull: true
				// require an upload?
			},
			skills: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			linkedin: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isUrl: true
				}
			},
			twitter: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isUrl: true
				}
			},
			other_website: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isUrl: true
				}
			},
			hire_me: {
				type: DataTypes.BOOLEAN,
				allowNull: true
			}
		},
		{ timestamps: false }
	);

	User.associate = function(db) {
		// User.hasMany(db.Connections);
		User.hasMany(db.Connections, {
			foreignKey: "connection_id",
			targetKey: "user_id"
		});
	};

	return User;
};
