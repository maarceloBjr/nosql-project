import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { name, email, password, level } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, level });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user.", error });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to search for users.", error });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to search user.", error });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user.", error });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed." });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove user.", error });
  }
});

export default router;
