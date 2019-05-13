const { root } = require("./schema");
const helper = require("./helper");

jest.mock("./helper");

describe("schema", () => {
  const response = {
    success: true,
    deck_id: "3p40paa87x90",
    shuffled: true,
    remaining: 52
  };

  const deck = {
    success: true,
    id: "3p40paa87x90",
    shuffled: true,
    remaining: 52,
    cards: []
  };

  describe("when getting a deck", () => {
    beforeEach(() => {
      helper.fetchJson.mockReturnValueOnce(response);
    });

    it("returns a new deck", async () => {
      expect.assertions(2);
      const result = await root.deck();
      expect(result.shuffled).toBe(true);
      expect(result).toEqual(deck);
    });
  });

  describe("when drawing a card", () => {
    const drawResponse = {
      success: true,
      cards: [
        {
          image: "https://deckofcardsapi.com/static/img/KH.png",
          value: "KING",
          suit: "HEARTS",
          code: "KH"
        }
      ],
      id: "3p40paa87x90",
      remaining: 51
    };
    beforeEach(() => {
      helper.fetchJson.mockReturnValueOnce(drawResponse);
      helper.fetchJson.mockReturnValueOnce(deck);
    });

    it("returns a the card", async () => {
      expect.assertions(2);
      const result = await root.drawCard({ id: "3p40paa87x90" });
      expect(result.shuffled).toBe(true);
      expect(result.cards[0]).toBe(drawResponse.cards[0]);
    });
  });

  describe("when adding a card to a pile", () => {
    const addToPileResponse = {
      success: true,
      id: "3p40paa87x90",
      remaining: 50,
      piles: {
        discard: {
          remaining: 1
        }
      }
    };

    beforeEach(() => {
      helper.fetchJson.mockReturnValueOnce(addToPileResponse);
    });

    it("returns the pile", async () => {
      expect.assertions(3);
      const result = await root.addToPile({
        id: "3p40paa87x90",
        pile_name: "discard",
        cards: ["5H", "KH"]
      });
      expect(helper.fetchJson).toHaveBeenCalledWith(
        "deck/3p40paa87x90/pile/discard/add/?cards=5H,KH"
      );
      expect(result.piles[0].name).toBe("discard");
      expect(result.piles[0].remaining).toBe(1);
    });
  });
});
