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

        // belongsTo 모델에 컬럼이 생김 -> 생성되는 컬럼은 hasOne에 있는 sourceKey

    };
};

module.exports = Token;