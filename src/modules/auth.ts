import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

export const comparePswd=(password, hash)=>{
    return bcrypt.compare(password, hash)
}

export const hashPswd = (password)=>{
    return bcrypt.hash(password, 5) //<- salt(5)
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id:user.id,
        username: user.username
    },
        process.env.JWT_KEY
    )

    return token
}


export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer){
        res.status(401)
        res.json({message:"Not authorized"})
        return
    }


    const [,token] = bearer.split(" ")

    if(!token){
        res.status(401)
        res.json({message:"Not valid token"})
        return
    }


    try{
        const user = jwt.verify(token, process.env.JWT_KEY)
        req.user = user
        next()
        
    }

    catch(e){
        console.error(e);
        res.status(401)
        res.json({message:"Not valid token"})
        return
    }
}

