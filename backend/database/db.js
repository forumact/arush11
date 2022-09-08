const chalk = require("chalk");
const mongoose = require("mongoose");
const log = console.log;
const logger = require('../utlis/logger');

module.exports = async () => {
    try {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        log(chalk.cyan("Connected to the database !!!!"));
        logger.info(`Connected to the database !!!!`);
        // logger.error(`Connected to the database !!!!`);
    } catch (error) {
        console.log("Error ============");
        console.log(error);
        logger.error(`Database Connectivity Error ${error}`);
        process.exit(1);
    }
};

