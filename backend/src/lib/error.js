
export const serverError = (res,err)=>{
    return res.status(500).json({error:err,message:"Internal serve error"});
}

export const badRequest = (res,msg)=>{
    return res.status(400).json({message:msg});
}

export const notFound = (res,msg)=>{
    return res.status(404).json({message:msg})
}