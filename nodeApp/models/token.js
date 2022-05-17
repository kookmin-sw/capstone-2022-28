const Sequelize = require('sequelize');

class Token extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            hash: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Token',
            tableName: 'tokens',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    
    static associate(db) {
        db.Token.belongsTo(db.Video, { foreignKey: "video_id", targetKey: "id" });
    };
};

module.exports = Token;