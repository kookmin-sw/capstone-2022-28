const Sequelize = require('sequelize');

class Video extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            writer: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            duration: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

        }, {
            sequelize,
            timestamps: false,
            modelName: 'Video',
            tableName: 'videos',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Video.hasOne(db.Token, {foreignKey: "video_id", sourceKey: "token"});

        db.Video.belongsTo(db.Exhibition, {foreignKey: "exhibition_id", sourceKey: "video_id"});
    };
};

module.exports = Video;