const jwt = require('jsonwebtoken')

exports.protect = async (req,res, next)=>{
    const auth = req.headers.authorization
    if(!auth || !auth.startsWith("Bearer "))
        return res.status(401).json({message:"Token required"})

    const token = auth.split(" ")[1]
    try {
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        return res.json({message: "Invalid Token"})
    }

}

exports.authorize = (roles)=>{
    //admins and developers only
    return(req, res, next)=>{
        // if you're neither of them, leave
        if(!roles.includes(req.user.role)){
            return res.send("Access Denied")
        }
        //
        next()
    }
}