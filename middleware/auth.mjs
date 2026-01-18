import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Authentication failed",
      })
    }
    req.userData = decoded
    next()
  })
}

export default auth