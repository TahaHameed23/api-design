import { validationResult } from 'express-validator'
export const handleInputErr  = (req, res,next) => {
    const errors = validationResult(req)
    
    
    if(!errors.isEmpty()){
        res.status(400)//bad req, u dont send ryt things
        res.json({errors: errors.array()})
    }
    else{
        next();
    }
}