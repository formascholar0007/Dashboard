export const authorizeAdmin = async (req, res, next) => {
    try{
        const role = req.user.role;
        if(role==='admin'){
          next();
        }else{
          res.status(403).json({ message: 'Forbidden' });
        }
    }catch(err){
        console.error('Authorization error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};
