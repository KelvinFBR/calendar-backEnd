/*
    Rutas usuarios / Auth
    host + /api/auth
*/
const express = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../Controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = express.Router();

router.post(
  "/new",
  [
    //* Middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
