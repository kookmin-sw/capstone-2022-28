const Sequelize = require('sequelize');

class Exhibition extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            poster_url:{
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
 
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Exhibition',
            tableName: 'exhibitions',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        //하나의 source모델을 여러개의 target모델 -> 참조 당하는 hasMany가 sourcekey
        db.Exhibition.hasMany(db.Video, {
            foreignKey: "exhibition_id", 
            // sourceKey: "video_id"
        });
    };
};

module.exports = Exhibition;