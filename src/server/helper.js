const fetch = require("node-fetch");

const BASE_URI = "https://deckofcardsapi.com/api/";

const fetchJson = async path => {
  const data = await fetch(BASE_URI + path, {
    method: "GET"
  });
  return await data.json();
};

module.exports = {
  fetchJson
};
