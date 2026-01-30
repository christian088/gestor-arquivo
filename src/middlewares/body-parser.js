const express = require("express");

const JSON_LIMIT = process.env.JSON_LIMIT || "1mb";
const URLENC_LIMIT = process.env.URLENC_LIMIT || "1mb";

const parsers = [
  // Necessário para req.ip, proxy etc.
  // (se usar proxy reverso: app.set('trust proxy', 1))
  express.urlencoded
    ? express.urlencoded({ extended: true, limit: URLENC_LIMIT })
    : (req, _res, next) => next(),

  express.json({ limit: JSON_LIMIT }),
];

module.exports = parsers;
