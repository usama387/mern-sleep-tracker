import { generateToken } from "../utils/generateToken.js";
import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";

// controller to register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate and assign role
    const allowedRoles = ["ADMIN", "DOCTOR", "PATIENT"];
    const validatedRole = allowedRoles.includes(role) ? role : "PATIENT";

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: validatedRole,
      },
    });

    // 5. Return success response (excluding password)
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error in register user controller",
    });
  }
};

// controller for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter account details first" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive", // Case-insensitive comparison
        },
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    return generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error in login user controller",
    });
  }
};
