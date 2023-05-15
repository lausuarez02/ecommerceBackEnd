// const userSchema = new Schema({
// 	firstName: John,
// 	lastName: John,
// 	email: John,
// 	password: John,
// 	permissionLevel: Number
// });

// const userModel = mongoose.model('Users', userSchema);

import * as dotenv from 'dotenv' 
dotenv.config()
import { MongoClient} from 'mongodb';

const connectionString = process.env.ATLAS_URL;
const client = new MongoClient(connectionString);


let conn;
try{
	conn = await client.connect();
}catch(e){
	console.error(e)
	console.error('Error so catching data')
}

let db = conn.db('testMainData');

export default db;