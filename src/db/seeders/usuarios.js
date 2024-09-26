const { QueryInterface, Sequelize } = require("sequelize");
const { User } = require('../../models/User');
const bcript = require('bcrypt');

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await User.bulkCreate([
            {
                nome:"admin",
                email:"admin@email.com",
                senha: bcript.hashSync("admin", 10)
            },
        ])
    },

   down: async (QueryInterface, Sequelize) => {
    await User.destroy({email:[
        "admin@email.com",
        ]
    })
   }
    
}