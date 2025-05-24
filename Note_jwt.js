/**
 * 1.install jwt (jsonwebtoken) server side 
 *2. (require) korta hoba
 * 3. client side ( cteate a post method for sent token in server side)  after successfully login
 * 4. client side a post method create korar pore server side a post method create korta hoba.
 * 5. create a secret token server side  
 * 6. way to create secret token (first run (node) after (require('crypto').randomBytes(64).toString('hex')))
 * 7. secret token create korar pora email and secret token dia  (jwt.sign) method  use kora jwttoken create korta hoba
 * 8. ai jwt token ta create korar pora  cookies a set korta hoba , 
 *   cookie('token', token,{
        httpOnly: true,
        secure: false,  //http://localhost:5001/
    })
     server side thaka cookies permission method 
     app.use(cors({
         origin: ['http://localhost:5173'],
         credentials: true
     }));
     *  cloent sode thaka cookies permisson method  inside baseurl
     baseURL:'http://localhost:5001/', ar pora 
     withCredentials:true, kora dita hoba (globally dila ar kono method  a url ar pora ar  add korta hoba na )
     * 
    
     * 9. cookie taka token nawar jonno middlewere hisaba kaj korarar jonno cookie-parser ta install korta hoba(cookie-parser)
     * 10. tarpor cors ar moto kora cookie-parser ar variable ta call kora dita hoba
     * 
     * 11. token ta k varify korar jonno akta function create korta hoba kjakhana 3 ta parameter thakba (req,res, next)
     * 12. ar modda token ta access nita hobe (const token = req?.cookies?.token)
     * 13.jodi token na thaka tahola  akta massage show korba 
     * (if (!token) {
         return  res.status(401).send({massage : 'unauthorises token'});

    })h
     * 14 . ar jodi token thaka tahola nichar  (jwt.varify) ta chola jaba (
     *   jwt.verify(token,process.env.TOKEN_DATA,(err,decoded)=>{
             if (err) {
                 return res.status(404).send({massage :'unauthorises access'})
             }
             req.user = decoded;
            //  next ta ka call kora hoisa 
             next()
         }))
     * *
     * 
     * 15. server side a ja sob data gula token dia varyfy korta chai sai sob method a varyfy add korta hoba
     * (app.get('/myworks/:email',  varifyedToken, async (req, res) =>)
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 










 */