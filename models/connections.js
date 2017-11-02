// User Model
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Connections = sequelize.define('Connections', {
	initiator_id: {
		type: DataTypes.INT,
		allowNull: false,
	},
	receiver_id: {
		       type: DataTypes.INT, 
		allowNull: false,
	},
	{
		timestamps: true
	}
  }), 
  return Connections;
};