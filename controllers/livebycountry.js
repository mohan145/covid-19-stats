const https = require("https");

const liveByCountry = (req, res) => {

var url1 = "https://api.covid19api.com/live/country/spain/status/confirmed/date/2020-03-31T11:30:30Z";
var url2 = "https://api.covid19api.com/live/country/spain/status/recovered/date/2020-03-31T11:30:30Z";
var url3 = "https://api.covid19api.com/live/country/spain/status/deaths/date/2020-03-31T11:30:30Z";

data=[];

const promisedata=getDataFromUrl(url);

  //passing a call back to get data from API
  getLiveData((url1) => {
    if (error){
      return res.status(500).send(
        {"message":"Could not fetch data. Please Try again"}
      );
    }
    data.push(...data)
  });
};



const getDataFromUrl = url => {
  
    const promiseTocken =new Promise((resolve,reject)=>{
        https.get(url, function(res) {
            var body = "";
            res.on("data", function(chunk) {
              body += chunk;
            });
      
            res.on("end", function() {
              data.push(...JSON.parse(body));
              return resolve(data);
            });
          })
          .on("error", function(error) {
            console.log("Got an error: ", error);
            return reject(error);
          });
        
    })
    
};


module.exports = liveByCountry;
