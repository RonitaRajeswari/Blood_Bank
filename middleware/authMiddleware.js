const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Check if the Authorization header exists
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header is missing",
            });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token is missing from Authorization header",
            });
        }

        // Verify the token
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid or expired token",
                });
            }
            
            // Attach userId to the request body
            req.body.userId = decoded.userId;
            next();
        });
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).send({
            success: false,
            message: "Authentication failed",
            error: error.message,
        });
    }
};
