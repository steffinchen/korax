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
    piles: [Pile]
  }

  type Card {
    image: String
    value: String
    suit: String
    code: String
  }

  type Pile {
    name: String
    remaining: String
  }

  type Mutation {
    drawCard(deck_id: String!): Deck!
    addToPile(deck_id: String!, pile_name: String!, cards: [String]!): Deck!
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
  },
  addToPile: async ({ deck_id, pile_name, cards }) => {
    const json = await fetch(
      BASE_URI +
        `deck/${deck_id}/pile/${pile_name}/add/?cards=${cards.join(",")}`,
      {
        method: "GET"
      }
    );
    const data = await json.json();

    data.piles = Object.keys(data.piles).map(key => {
      return { name: key, remaining: data.piles[key].remaining };
    });

    return data;
  }
};

module.exports = {
  schema,
  root
};
