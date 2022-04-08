const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email:{
                type:Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
            snsId: {
                type:Sequelize.STRING(30),
                allowNull:true
            },
            provider:{
                type: Sequelize.STRING(10),
                allowNull:false
            }
        },{
            sequelize,
            timestamps: true,
            underscored: true,
            paranoid: true,
            modelName: 'User',
            tableName:'users',
            charser:'utf8',
            collate:'utf8_general_ci',

        });
    }
    static associate(db){
        
    }
}