import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY_JWT;

if (!SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY_JWT não está definida");
}

// Middleware para verificar o token JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: "Token não fornecido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = user as JwtPayload;
    next();
  });
};

router.get("/report", authenticateToken, async (req: Request, res: Response) => {
  try {
    res.json({ message: "Relatório impresso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao imprimir relatório", error });
  }
});

export default router;
