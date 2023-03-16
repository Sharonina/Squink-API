import mongoose from "mongoose";

/* Command to run db mac: brew services start mongodb-community@4.2*/

const { DB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(DB_URL || "")
    .then(() => {
      console.log("Conexión exitosa");
    })
    .catch((error) => {
      console.log("Error de conexión con la base de datos");
      console.log(error);
      process.exit(1);
    });
};
