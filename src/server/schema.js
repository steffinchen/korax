const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const { fetchJson } = require("./helper");

const schema = buildASTSchema(gql`
  type Query {
    deck: Deck!
  }

  type Deck {
    deckId: String!
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
    drawCard(deckId: String!, count: Int): Deck!
    addToPile(deckId: String!, pile_name: String!, cards: [String]!): Deck!
  }
`);

const root = {
  deck: async () => {
    console.log("getting deck");
    const data = await fetchJson("deck/new/shuffle");
    data.deckId = data.deck_id;
    delete data.deck_id;
    data.cards = [];
    return data;
  },
  drawCard: async ({ deckId, count }) => {
    console.log("drawing card");
    const data = await fetchJson(`deck/${deckId}/draw/?count=${count || 1}`);
    const deck = await fetchJson(`deck/${deckId}`);
    data.shuffled = deck.shuffled;
    return data;
  },
  addToPile: async ({ deckId, pile_name, cards }) => {
    console.log("adding to pile");
    const data = await fetchJson(
      `deck/${deckId}/pile/${pile_name}/add/?cards=${cards.join(",")}`
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
