const express=require('express')
const mysql=require('mysql')
const router=express.Router()

router.get('/messages',(req,res)=>{
	console.log("Show some messages")
	res.end()
})

router.get("/users",(req,res)=>{
	const connection=getConnection()
	const queryString="SELECT * FROM users"

	connection.query(queryString,(err,rows,fields)=>{
		if(err){
			console.log("Failed"+err);
			res.sendStatus(500);
			return
			//throw err
		}
	
	res.json(rows);
	//res.send("nodemon will restart");
});

})

function getConnection(){
	return mysql.createConnection({
		host:'localhost',
		user:'root',
		database:'users'
	});
}

router.get("/users/:id",(req,res)=>{
	console.log("Fetching user with id:"+req.params.id);

	const connection=getConnection();

	const userId=req.params.id;
	const queryString="SELECT * FROM users WHERE id=?";
	connection.query(queryString,[userId],(err,rows,fields)=>{
		if(err){
			console.log("Failed"+err);
			res.sendStatus(500);
			return
			//throw err
		}
		console.log("i think we fethed successfully");

		const users=rows.map((row)=>{
			return {firstName:row.firstName,lastName:row.lastName }
		})
		res.json(users);
	})
});

module.exports=router;