const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const fetch = require("node-fetch");

const BASE_URI = "https://deckofcardsapi.com/api/";

const schema = buildASTSchema(gql`
  type Query {
    deck: Deck!
  }

  type Deck {
    deck_id: String!
    remaining: Int!
    success: Boolean!
    shuffled: Boolean!
  }
`);

const root = {
  deck: async () => {
    const data = await fetch(BASE_URI + "deck/new/shuffle", {
      method: "GET"
    });
    return await data.json();
  }
};

module.exports = {
  schema,
  root
};
