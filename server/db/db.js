const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://piwuhvcmdjddqb:8b2e94bac74a2e17ebd4880933c5c155f7d016b9c98374d9e1f59a778e596be0@ec2-54-225-234-165.compute-1.amazonaws.com:5432/dfugqks0e9upr6`, config)
module.exports = db
