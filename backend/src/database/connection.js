import Sequelize from "sequelize";

const sequelize = new Sequelize("hotel", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


export { sequelize };