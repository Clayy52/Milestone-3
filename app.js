const express = require('express');
const app = express();
const port = 3000;
const users = [];
var fs = require('fs');
app.use(express.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html'); //send HTML file on GET request
});

app.post('/submit-form',(req,res) => {
    const username = req.body.username; // access form data for the user
    const password = req.body.password;
    const phoneumber = req.body.phonenumber;
    const birthday = req.body.birthday;
    const address = req.body.address;
    //store into an array to be stored in a json file
    var user = []
    user.push(username);
    user.push(password);
    user.push(phoneumber);
    user.push(birthday);
    user.push(address);
    //this is using the file module in node.js to write to the users files
    fs.appendFile('user.json',user.toString()+"\n",function(err){

        if(err) throw err;


    });
    //sending the provided data to the user communicating between back and front end
    //additonally allow for multiple submissions in one continuous 
    res.send('Username is '+username+'<br> Password is '+password+' <br>Phonenumber is'+phoneumber+"<br>Address is "+address+"<br>Birthday is "+birthday+'<br>They have been stored in a json file <br><a href= "http://localhost:3000/"><button>Submit Another</button></a>');
    
});

app.listen(port, () =>{
 console.log('server is running on http://localhost:'+`${port}`);
});