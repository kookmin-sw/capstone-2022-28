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
            snsId:{
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
            paranoid: false,
            modelName: 'User',
            tableName:'users',
            charser:'utf8',
            collate:'utf8_general_ci',

        });
    }
    static associate(db){
        //나를 팔로워들을 가져올때 
        db.User.belongsToMany(db.User,{
            foreignKey:'followingId',
            as : 'Followers',
            through: 'Follow'
        });
        // 내가 팔로우 하는사람을 가져올때
        db.User.belongsToMany(db.User,{
            foreignKey:'followerId',
            as : 'Followings',
            through: 'Follow'
        })
    }
}