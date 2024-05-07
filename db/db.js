import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgresql://dripstore_db_owner:gdtnExSJ7f1q@ep-fancy-snowflake-a5clxf8o.us-east-2.aws.neon.tech/dripstore_bd?sslmode=require') // Example for postgres

export const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

