var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
           isEmail: true 
        }
        
    }
});

var route =  db.define('route', {
    //firstname: '/wiki/',
    urlTitle: Sequelize.STRING,
}, {
    getterMethods: {
        route() {
            return '/wiki/' + this.urlTitle;
        }
    }
}
)

module.exports = {
  Page: Page,
  User: User,
  db: db
};
