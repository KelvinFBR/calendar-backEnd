const mongoose = require("mongoose");

//* nuevas caracteristica de strictQuery para nuevas versiones de mongoose
mongoose.set("strictQuery", true);

const dbConnetion = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar DB");
  }
};

module.exports = {
  dbConnetion,
};
