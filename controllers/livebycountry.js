const https = require("https");
const request = require("request");

const liveByCountry = async (req, res) => {
  const currentDateTime = new Date(new Date()).toISOString();
  console.log(currentDateTime);

  var url1 =
    `https://api.covid19api.com/live/country/india/status/confirmed/date/` +
  "2020-04-01T15:15:28.000Z";
  //currentDateTime;
  var url2 =
    `https://api.covid19api.com/live/country/india/status/recovered/date/` +
  "2020-04-01T15:15:28.000Z";
  //currentDateTime;
  var url3 =
    `https://api.covid19api.com/live/country/india/status/deaths/date/` +
  "2020-04-01T15:15:28.000Z";
  //currentDateTime;

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
      data = JSON.parse(body);
      resolve(data);
    });
  });
}

module.exports = liveByCountry;
