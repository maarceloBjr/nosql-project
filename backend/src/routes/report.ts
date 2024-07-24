import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import PDFDocument from "pdfkit";
import fs from "fs";
import "dotenv/config";
import User from "../models/user";

require("dotenv").config();
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY_JWT;

if (!SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY_JWT não está definida");
}

interface IUser extends JwtPayload {
  id: string;
  level: 1 | 2 | 3 | 4 | 5;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Token não fornecido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    const authenticatedUser = user as IUser;
    if (authenticatedUser.level < 4) {
      return res.status(403).json({ message: "Nível de usuário insuficiente" });
    }

    req.user = authenticatedUser;
    next();
  });
};

router.get(
  "/report-pdf",
  authenticateToken,
  async (req: Request, res: Response) => {
    
    try {
      const users = await User.find();
      const doc = new PDFDocument();

      const headers = ["ID", "Name", "Email", "Level"];

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=report_users.pdf");

      doc.pipe(res);

      doc.font("Helvetica-Bold").fontSize(18).text("Users Report", {
        align: "center"
      })

      const tableTop = 110;
      const rowHeight = 20;
      const pageHeight = doc.page.height - doc.page.margins.bottom;

      let yPosition = tableTop;

      const drawTableRow = (y: number, row: string[]) => {
        let x = 30;

        row.forEach((text) => {
          doc.fontSize(8).text(text, x, y, { align: "left", width: 150 });
          x += 150;
        });

        doc.moveTo(30, y + rowHeight).lineTo(580, y + rowHeight).stroke();
      };

      drawTableRow(yPosition, headers);
      yPosition += rowHeight + 10;

      drawTableRow(tableTop, headers);
      doc.font("Helvetica");

      users.forEach((user, index) => {
        if (yPosition + rowHeight > pageHeight) {
          doc.addPage();
          yPosition = tableTop;
          drawTableRow(yPosition, headers);
          yPosition += rowHeight + 10;
        }
        const row = [user.id.toString(), user.name, user.email, user.level];
        drawTableRow(yPosition, row);
        yPosition += rowHeight + 10;
      });

      doc.end();
    } catch (error) {
      res.status(500).json({ message: "Erro ao imprimir relatório", error });
    }
  }
);

export default router;
