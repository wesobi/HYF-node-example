const chalk = require("chalk");

const red = string => {
  console.log(chalk.red(string));
};

const blue = string => {
  console.log(chalk.blue(string));
};

const green = string => {
  console.log(chalk.green(string));
};

module.exports = { red, blue, green };
