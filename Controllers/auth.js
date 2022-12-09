const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { genJwt } = require("../helpers/jwt");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "un usuario existe con este email",
      });
    }

    user = new User(req.body);

    //* Antes de guardar en la DB vamos encriptar la password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //* Generar el JWT
    const token = await genJwt(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Por favor hablar con un administrador",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    const validPasword = bcrypt.compareSync(password, user.password);
    if (!validPasword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecta",
      });
    }

    //* Generar el JWT
    const token = await genJwt(user.id, user.name);

    //* Si las passwords son correctas entonces ahora debemos de generar nuestro JWT
    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Por favor hablar con un administrador",
    });
  }
};

const revalidateToken = async (req, res) => {
  //* Aqui estoy recibiendo la propiedades que cree en el middleware de validar JWT
  const { uid, name } = req;
  const newToken = await genJwt(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token: newToken,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
