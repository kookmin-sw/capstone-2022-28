const Sequelize = require('sequelize');

class Video extends Sequelize.Model {
    static init(sequelize) {
        return super.init({


            duration: {
                type: Sequelize.STRING(100),
                allowNull: false, 
            },
            url: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            title:{
                type: Sequelize.STRING(100),
                allowNull: false, 
            },
            description:{
                type: Sequelize.STRING(1000),
                allowNull: false, 
            },
            tokenId:{
                type: Sequelize.STRING(100),
                allowNull: true, 
            },
            userNick:{
                type: Sequelize.STRING(10),
                allowNull: false, 
            },
            isBuy:{
                type: Sequelize.STRING(1),
                allowNull: false, 
            }

        }, {
            sequelize,
            timestamps: true,
            modelName: 'Video', 
            tableName: 'videos',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        // belongsTo 모델에 컬럼이 생김 -> 생성되는 컬럼은 hasOne에 있는 sourceKey
        db.Video.hasOne(db.Token, { foreignKey: "video_id", sourceKey: "id" });
         
        //1:N에서 N쪽이 hasMany, 1쪽이 belongsTo ->참조하는 belongsTo가 targetKey
        db.Video.belongsTo(db.Exhibition, { foreignKey: "exhibition_id", targetKey: "id" });

        db.Video.belongsTo(db.User,{foreignKey:"writer",sourceKey:'id'});
    };
};

module.exports = Video;