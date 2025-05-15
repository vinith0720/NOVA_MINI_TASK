import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const secret = process.env.JWT_SECRET_TOKEN;

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    const user = await verifyToken(token, secret);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', err });
  }
};

// export const authorizecheck = async (req, res, next) => {
//   try {
//     if (req.user.id === req.param.id) {
//       next();
//     } else {
//       res.status(401).json({ msg: "you are not authorized to get or changes the details" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export default authorization;
