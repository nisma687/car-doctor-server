// steps for token generation
/**
 * install jsonwebtoken
 * require jsonwebtoken
 * jwt.sign(payload,secret,{expiresIn:'2hr'})
 * making the secret in the cmd first run node command then write require('crypto').randomBytes(64).toString('hex')
 * then copy the secret and paste it in the .env file
 * then require dotenv and use it in the index.js file , then use (process.env.ACCESS_TOKEN_SECRET)
 * 
 */


/**
 * how to store token in the client side
 * in the memory, in the local storage, in the session storage
 * localstorage->> ok type(xss)
 * cookies:http only
 */


/**
 * set cookies with http only  for development secure false(when in local host)
 * but when in production means hosted in the https then secure true
 * 
 * install cookie-parser
 * require cookie-parser
 * cors settings
 * app.use(cors(
  {
    origin:['http://localhost:5173'],
    credentials:true,
  }
));
 */