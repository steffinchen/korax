const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const { fetchJson } = require("./helper");

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
    return await fetchJson("deck/new/shuffle");
  },
  drawCard: async ({ deck_id }) => {
    const data = await fetchJson(`deck/${deck_id}/draw/?count=1`);
    const deck = await fetchJson(`deck/${deck_id}`);
    data.shuffled = deck.shuffled;
    return data;
  },
  addToPile: async ({ deck_id, pile_name, cards }) => {
    const data = await fetchJson(
      `deck/${deck_id}/pile/${pile_name}/add/?cards=${cards.join(",")}`
    );

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
