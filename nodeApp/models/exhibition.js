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
            poster_url: {
                type: Sequelize.STRING(100),
                allowNull: false
            }

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
        db.Exhibition.hasMany(db.Video, { foreignKey: "exhibition_id", sourceKey: "id" });
    };
};

module.exports = Exhibition;