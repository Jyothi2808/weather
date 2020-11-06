const exp=require("express");
const https=require("https");
const bp=require("body-parser");
app=exp();
app.use(bp.urlencoded({extended:true}));
app.get("/weather",function(request,response){
  response.sendFile(__dirname +"/weather.html");
    });

app.post("/weather",function(request,resposnse){
  console.log(request.body.loc);
  var loc1=request.body.loc;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+loc1+"&appid=8677919cfa7cf19d468a54f10347ad61&units=metric"
  https.get(url,function(res){
    res.on("data",function(data){
    //    console.log(data);
      const wdata=JSON.parse(data);
      console.log(wdata);
      const temp=wdata.main.temp;
      const desc=wdata.weather[0].description;
      resposnse.write("<h1>The weather today is "+desc+"</h1> ");
      resposnse.write("<h2>The temperature of "+loc1+" is "+temp+" celsius</h2>");
      resposnse.send();
    });
  //console.log(response.statusCode);
  });
})
app.listen(process.env.PORT || 3000,function(){
  console.log("server is up and running");
})
