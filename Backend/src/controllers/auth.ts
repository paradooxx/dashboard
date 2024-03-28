import { Request, Response } from "express";
import db from "../db/config";
import bcrypt from "bcrypt";
import { FieldPacket } from "mysql2";
import { generateToken, setSecureCookie } from "../utils/auth";

const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || "5m";
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || "1d";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required credentials",
      });
    }

    const finalMail = email.toLocaleLowerCase().trim();

    const [users]: [any[], FieldPacket[]] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [finalMail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateToken(
      {
        id: user.id,
        role_id: user.role_id,
      },
      ACCESS_TOKEN_LIFE
    );

    const refreshToken = generateToken(
      {
        id: user.id,
      },
      REFRESH_TOKEN_LIFE
    );

    setSecureCookie(res, "access", accessToken, 5 / 60);

    setSecureCookie(res, "refresh", refreshToken, 24);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Try again later.",
    });
  }
};

export const Signup = async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name } = req.body as {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    };

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }

    const finalMail = email.toLocaleLowerCase().trim();

    const [user]: [any[], FieldPacket[]] = await db.query(
      `SELECT * FROM users WHERE email = ?`,
      [finalMail]
    );

    if (user.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result: any = await db.query(
      `INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)`,
      [finalMail, hashedPassword, first_name, last_name]
    );

    if (result[0].affectedRows && result[0].affectedRows > 0) {
      const accessToken = generateToken(
        {
          id: result[0].insertId,
          role_id: null,
        },
        ACCESS_TOKEN_LIFE
      );

      const refreshToken = generateToken(
        {
          id: result[0].insertId,
        },
        REFRESH_TOKEN_LIFE
      );

      setSecureCookie(res, "access", accessToken, 5 / 60);

      setSecureCookie(res, "refresh", refreshToken, 24);

      return res.status(201).json({
        success: true,
        message: "Signed Up Successfully",
        user: {
          id: result[0].insertId,
          email: finalMail,
          first_name,
          last_name,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong. Try Again later",
      });
    }
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Try again later.",
    });
  }
};
