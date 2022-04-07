# Express keretrendszer 
**npm i express - express install**  

- webserver  
- routing  
- controller
- model
- view  

Middleware, függvény ami hozzáfér a request és response objektumokhoz.  

    function mw(req, res, next) {  
      return next();  
    }  

kell hívni nextet mert hanem végtelenségig vár a browser  
**npm i body-parser**  
app.use(bodyParser.urlencoded());  
app.use(bodyParser.json());  
GET adatok lekérdezése  

    req.query.search  

res.status(404).end(); böngészőknek  
res.redirect('/login');  
res.json();  
res.send('Lorem Ipsum'); content type res.set  
res.render()  
**npm i ejs**  
express-session // főleg belépéshez kell  

**Masodik hazi feladathoz:**  
npm init -> enterek  
npm i express stb  
index.js  
const express = require('express')  
const app = express();  
app.use(express.static('static'));  
app.listen(3000, () => {
  console.log('Hello: 3000');
});
versionok es package-lock.json nem kell feltolteni