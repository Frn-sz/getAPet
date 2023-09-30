const express = require('express');
const cors = require('cors');


const UserRoutes = require('./routes/userRoutes');

const app = express();

//Config JSON response

app.use(express.json());


//Config CORS

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


//Image Folder

app.use(express.static('public'));


//Routes
app.use('/user', UserRoutes);


app.listen(5000)