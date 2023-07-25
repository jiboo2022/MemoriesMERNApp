import  jwt  from "jsonwebtoken";

 const auth = async ( req,res, next)=>{
   //console.log(req.headers)
    try {

      //console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
         let decodedData ;

         if ( token && isCustomAuth){
            decodedData = jwt.verify(token, 'secretkey' );



            req.userId = decodedData?.id;

         }else{
            decodedData = jwt.verify(token );
            req.userId = decodedData?.sub;

            
         }
         
                next();
    } catch (error) {
        
    }
   
}

export default auth;