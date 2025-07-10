import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true, // Always use true for HTTPS/Vercel
      sameSite: "None", // Required for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
    .status(200)
    .json({ success: true, message, user });
};