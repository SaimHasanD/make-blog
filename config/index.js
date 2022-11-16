require('dotenv').config();

module.exports={
    Name:process.env.APP_NAME,
    Port:process.env.APP_PORT,
    DB_URL:process.env.APP_DB
}