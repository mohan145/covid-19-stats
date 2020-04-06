const https = require("https");
const request = require("request");

const liveByCountry = async (req, res) => {
  country = req.query.country;
  let timestamp = req.query.timestamp;

  let req_date=new Date(timestamp)
  req_date.setDate(req_date.getDate()-1)
  req_date=req_date.toISOString()

  const url1 = `https://api.covid19api.com/live/country/${country}/status/confirmed/date/${req_date}`;
  const url2 = `https://api.covid19api.com/live/country/${country}/status/recovered/date/${req_date}`;
  const url3 = `https://api.covid19api.com/live/country/${country}/status/deaths/date/${req_date}`;

  console.log(url1);
  allData = [];
  try {
    data = await getDatafromURL(url1);
    if (!(JSON.stringify(data) === "{}")) allData.push(...data);

    data = await getDatafromURL(url2);
    if (!(JSON.stringify(data) === "{}")) allData.push(...data);

    data = await getDatafromURL(url3);
    if (!(JSON.stringify(data) === "{}")) allData.push(...data);

    return res.json(allData);
  } catch (error) {
    console.log(error);

    return res.status(500).json("Could not fetch data, Try again");
  }
};

// wrap a request in an promise
function getDatafromURL(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error);
      if (response.statusCode != 200) {
        reject("Invalid status code <" + response.statusCode + ">");
      }

      try {
        var data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject("Invalid status code <" + response.statusCode + ">");
      }
    });
  });
}

module.exports = liveByCountry;
