const { validationResult } = require('express-validator');


exports.validationMiddleware = (req,res,next) => {
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }
    next()
}

// exports.checkAdminRole = async (req, res, next) => {
//     try {
//         const decoded = verify(req.cookies.token, SECRETKEY);
//         const user_id = decoded.id;
    
//         const response = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        
//         const isAdmin = response.rows[0].is_admin;
//         if (isAdmin) {
//             next();
//         } else {
//             return res.status(403).json({
//                 message: "You are not authorized to access this resource"
//             });
//         }
//     } catch (err) {
//         return res.status(500).json({
//             error: err.message
//         });
//     }
// };