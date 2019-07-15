var mysql = require('mysql');
var express = require('express');
var app = express();
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "NCKH"
});
/*
app.get('/index.html', function (req, res) {
  var sql = "SELECT * FROM RFID_LOG ORDER BY R_time DESC LIMIT 1";
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
  });
}); */

/*  This is auto initiated event when Client connects to Your Machien.  */
io.on("connection", function(socket)
	{
		socket.on("disconnect", function()
			{
			});
      var results={
        DHT22:[],
        bound:[]
      };
      var sql1 = "SELECT * FROM bound ORDER BY dtime DESC LIMIT 1";
        con.query(sql1, function(err, data){
          if (err) throw err;
            results.bound=data;
          });
			var sql = "SELECT * FROM DHT22 ORDER BY dtime DESC LIMIT 1";
  			con.query(sql, function(err, data){
  				if (err) throw err;
    //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
              results.DHT22=data;
             	socket.emit("Server-sent-data", results);
             	
 			});	

        socket.on("Client-send-data",function(d){
            console.log(d);
        });
        
	});

app.get("/", function(req, res)
	{
		res.render("index");
	});


http.listen(3000,function(){
    console.log("Listening on 3000");
});