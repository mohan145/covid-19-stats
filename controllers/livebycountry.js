const https = require("https");
const request = require("request");

const liveByCountry = async (req, res) => {
  const currentDateTime = new Date(new Date()).toISOString();
  country = req.query.country;
  timestamp = req.query.timestamp;

  const url1 = `https://api.covid19api.com/live/country/${country}/status/confirmed/date/${timestamp}`;
  const url2 = `https://api.covid19api.com/live/country/${country}/status/recovered/date/${timestamp}`;
  const url3 = `https://api.covid19api.com/live/country/${country}/status/deaths/date/${timestamp}`;

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
