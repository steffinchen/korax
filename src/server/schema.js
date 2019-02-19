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
    cards: [Card]
  }

  type Card {
    image: String
    value: String
    suit: String
    code: String
  }

  type Mutation {
    drawCard(deck_id: String!): Deck!
  }
`);

const root = {
  deck: async () => {
    const data = await fetch(BASE_URI + "deck/new/shuffle", {
      method: "GET"
    });
    return await data.json();
  },
  drawCard: async ({ deck_id }) => {
    const data = await fetch(BASE_URI + `deck/${deck_id}/draw/?count=2`, {
      method: "GET"
    });
    return await data.json();
  }
};

module.exports = {
  schema,
  root
};
