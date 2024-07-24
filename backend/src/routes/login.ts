import express, { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

require('dotenv').config()
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY_JWT;

if (!SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY_JWT não está definida");
}

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email ou senha incorretos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Email ou senha incorretos" });
    }

    const token = jwt.sign({ id: user._id, level: user.level }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: "Login bem-sucedido", token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error });
  }
});

export default router;
