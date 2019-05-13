const fetch = require("node-fetch");

const BASE_URI = "https://deckofcardsapi.com/api/";

const cards = [
  {
    image:
      "http://assets.freeprintable.com/images/item/original/4994KingHeartCard24379.png",
    value: "KING",
    suit: "HEARTS",
    code: "KH"
  },
  {
    image:
      "https://assets.freeprintable.com/images/item/thumb/29786HeartCard09331.png",
    value: "6",
    suit: "HEARTS",
    code: "6H"
  },
  {
    image:
      "https://assets.freeprintable.com/images/item/thumb/85318SpadeCard23476.png",
    value: "8",
    suit: "SPADES",
    code: "8S"
  },
  {
    image:
      "https://assets.freeprintable.com/images/item/thumb/96429ClubCard23537.png",
    value: "9",
    suit: "CLUB",
    code: "9C"
  },
  {
    image:
      "https://assets.freeprintable.com/images/item/thumb/3838AceSpadeCard08066.png",
    value: "ACE",
    suit: "SPADES",
    code: "AS"
  }
];

const fetchJson = async path => {
  // const data = await fetch(BASE_URI + path, {
  //   method: "GET"
  // });
  // return await data.json();
  console.log("path", path);
  if (path === "deck/new/shuffle" || path === "deck/3p40paa87x90") {
    return {
      deck_id: "3p40paa87x90",
      remaining: 52,
      shuffled: true,
      success: true
    };
  }
  if (path.includes("draw")) {
    return {
      deck_id: "3p40paa87x90",
      success: true,
      cards: cards,
      remaining: 51
    };
  }
  if (path.includes("add")) {
    return {
      success: true,
      id: "3p40paa87x90",
      remaining: 50,
      piles: {
        discard: {
          remaining: 1
        }
      }
    };
  }
  return {};
};

module.exports = {
  fetchJson
};
