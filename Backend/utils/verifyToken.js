import jwt from 'jsonwebtoken'

export const verifyAdmin = (req, res, next) => {
    // add 
    const auth = req.headers.authorization || req.cookies.accessToken;
    if (!auth) {
        console.log("Access token not found")
        return res.status(401).json({ success: false, message: "You are not authorize1!" })
    }

    const token = auth.split(' ')[1]
    // if token is exist then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" })
        }

        req.user = user
        // console.log(req.user.role === 'admin')
        if (req.user.role === 'admin') {
            next()
        } else {
            console.log("Access token not found")
            return res.status(401).json({ success: false, message: "You are not authorize2" })
        }
    })
}

export const verifyUser = (req, res, next) => {
    // add 
    const auth = req.headers.authorization || req.cookies.accessToken;
    if (!auth) {
        console.log("Access token not found")
        return res.status(401).json({ success: false, message: "You are not authorize1!" })
    }

    const token = auth.split(' ')[1]
    // if token is exist then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" })
        }

        req.user = user
        if (req.user.role === 'user' || req.user.role === 'admin') {
            next()
        } else {
            console.log("Access token not found")
            return res.status(401).json({ success: false, message: "You are not authorize2" })
        }
    })
}
// export const verifyUser = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         if (req.user.id === req.params.id || req.user.role === 'admin') {
//             next()
//         } else {
//             return res.status(401).json({ success: false, message: "You are not authenticated" })
//         }
//     })
// }


// export const verifyAdmin = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         console.log(req.user)
//         if (req.user.role === 'admin') {
//             next()
//         } else {
//             console.log("Access token not found")
//             return res.status(401).json({ success: false, message: "You are not authorize2" })
//         }
//     })
// } 