import express from "express";
import {
  createShorturl,
  createCustomShorturl,
} from "../controllers/shorturl.controller.js";

const router = express.Router();

router.post("/", createShorturl);
router.post("/custom", createCustomShorturl);

export default router;
