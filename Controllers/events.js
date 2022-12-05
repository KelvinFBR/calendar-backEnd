const { response } = require("express");
const { populate } = require("../models/Event");
const Event = require("../models/Event");
const { trace } = require("../routes/events");

const getevents = async (req, res = response) => {
  try {
    const events = await Event.find({ user: req.uid }).populate("user", "name");

    return res.json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;

    const eventSaved = await event.save();

    return res.status(201).json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No Existe Evento con ese id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No estas autorizado para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.status(201).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const removeEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    //* validar si existe el evento
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No Existe Evento con ese id",
      });
    }

    //* Validar si es el mismo que creo el evento
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No estas autorizado para eliminar este evento",
      });
    }

    //* Si pasa las validaciones entonces eliminamos el evento
    await Event.findByIdAndDelete(eventId);

    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { getevents, createEvent, updateEvent, removeEvent };
