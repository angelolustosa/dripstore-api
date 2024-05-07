import { Sequelize } from "sequelize";
//https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import
import 'dotenv/config.js' 

const HOST = process.env.PGHOST
const DATABASE = process.env.PGDATABASE
const USER = process.env.PGUSER
const PASS = process.env.PGPASSWORD

const STRING_CONNECTION = 
    `postgresql://${USER}:${PASS}@${HOST}/${DATABASE}?sslmode=require`

console.log(`[STRING_CONNECTION]: ${STRING_CONNECTION}`);

export const sequelize = new Sequelize(STRING_CONNECTION) // Example for postgres
