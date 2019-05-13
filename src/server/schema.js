const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const { fetchJson } = require("./helper");

const schema = buildASTSchema(gql`
  type Query {
    deck: Deck!
  }

  type Deck {
    id: String!
    remaining: Int!
    success: Boolean!
    shuffled: Boolean!
    cards: [Card]!
    piles: [Pile]!
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
    drawCard(id: String!, count: Int): Deck!
    addToPile(id: String!, pile_name: String!, cards: [String]!): Deck!
  }
`);

const root = {
  deck: async () => {
    console.log("getting deck");
    const data = await fetchJson("deck/new/shuffle");
    data.id = data.deck_id;
    delete data.deck_id;
    data.cards = [];
    return data;
  },
  drawCard: async ({ id, count }) => {
    console.log("drawing card");
    const data = await fetchJson(`deck/${id}/draw/?count=${count || 1}`);
    const deck = await fetchJson(`deck/${id}`);
    data.shuffled = deck.shuffled;
    data.id = data.deck_id;
    delete data.deck_id;
    return data;
  },
  addToPile: async ({ id, pile_name, cards }) => {
    console.log("adding to pile");
    const data = await fetchJson(
      `deck/${id}/pile/${pile_name}/add/?cards=${cards.join(",")}`
    );

    data.piles = Object.keys(data.piles).map(key => {
      return { name: key, remaining: data.piles[key].remaining };
    });

    data.id = data.deck_id;
    delete data.deck_id;

    return data;
  }
};

module.exports = {
  schema,
  root
};
