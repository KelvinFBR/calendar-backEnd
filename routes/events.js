/*
    Rutas calendar / events
    host + /api/calendar
*/

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  getevents,
  createEvent,
  updateEvent,
  removeEvent,
} = require("../Controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/validate-jwt");

router.use(validateJWT);

//* obtener los eventos
router.get("/", getevents);

//* Crear el evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha inicial es obligatorio").custom(isDate),
    check("end", "Fecha final es obligatorio").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

//* actualizar el evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha inicial es obligatorio").custom(isDate),
    check("end", "Fecha final es obligatorio").custom(isDate),
    fieldValidator,
  ],
  updateEvent
);

//* eliminar un evento
router.delete("/:id", removeEvent);

module.exports = router;
