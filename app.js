const express=require ('express');
const morgan=require('morgan');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const router=require('./routes/users.js')
const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./public'));
app.use(morgan('short'));
app.use(router);


app.post('/user_create',(req,res)=>{
	console.log("trying to create a new user");

	//console.log("First Name:"+ req.body.create_first_name)
	const firstName=req.body.create_first_name
	const lastName=req.body.create_last_name

	const queryString="INSERT INTO users (firstName,lastName) VALUES(?,?)";
	getConnection().query(queryString,[firstName,lastName],(err,results,fields)=>{
		if(err){
			console.log("Failed to insert"+err)
			res.sendStatus(500)
			return
		}
		console.log("Inserted Id:",results.insertedId);
		res.end()
	})

});

function getConnection(){
	return mysql.createConnection({
		host:'localhost',
		user:'root',
		database:'users'
	});
}


app.get("/", (req,res)=>{
	console.log("responding to route");
	res.send("Hello World");
});


app.listen(3000,()=>{
	console.log("server is running and listening at 3000");	
});