const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
//   try {
//       console.log("COOKIES:", req.cookies); 
//     const { accessToken } = req.cookies;
//     const decoded = jwt.verify(accessToken, process.env.JWT_SEC);
//     if (decoded) {
//         req.user = decoded;
//         next()
//     } else {
//         res.status(401).send({ message: "Unauthorized request" })
//     }
//     console.log(req.cookies);
//   } catch (error) {
//     console.log("AUTH ERROR:", error);
//   }
};

module.exports = { authMiddleware };
 

// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     console.log("COOKIES:", req.cookies);

//     const { accessToken } = req.cookies;

//     // ✅ token check
//     if (!accessToken) {
//       return res.status(401).send({ message: "No token provided" });
//     }

//     // ✅ verify
//     const decoded = jwt.verify(accessToken, process.env.JWT_SEC);

//     req.user = decoded;
//     next();

//   } catch (error) {
//     console.log("AUTH ERROR:", error.message);
//     return res.status(401).send({ message: "Invalid or expired token" });
//   }
// };

// module.exports = { authMiddleware };