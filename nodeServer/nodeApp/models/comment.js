const Sequelize = require('sequelize');
const { User } = require('.');

class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            writer: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {}
};

module.exports = Comment;