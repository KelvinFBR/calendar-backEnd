const jwt = require("jsonwebtoken");

const genJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    //* creacion del payload
    const payload = { uid, name };

    //* generar el token
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  genJwt,
};
