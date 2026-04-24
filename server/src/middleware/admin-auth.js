import jwt from "jsonwebtoken";

export const adminauthMiddleware = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Missing Token",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Payload", payload);

    if (payload.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in auth middleware",
    });
  }
};
