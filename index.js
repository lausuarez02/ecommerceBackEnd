
import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';
import router from '../src/routes/data.js'
import * as dotenv from 'dotenv' 
dotenv.config()

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const PORT = process.env.PORT || 5050;

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
// app.get('/', (req, res) => {
//     res.send('Welcome to main page')
// })

app.use('/v1', router)
app.use((err, _req, res, next) => {
    res.status(500).send('An unexpected error occured.')
})


// Main code for the momment being commented for testing bigger server
// app.get('/data', (req, res) => {
//     fs.readFile('./src/data/data.json', (err, data) => {
//         if(err){
//             throw(err)
//         }
//         let obj = JSON.parse(data)
//         res.json(obj)

//     })
// })

// finally, launch our server on port 3001.
const server = app.listen(PORT, () => {
  console.log('listening on port %s...', server.address().port);
});
