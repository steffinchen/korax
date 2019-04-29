import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Deck from "./deck";
import Pile from "./pile";
import DrawCardButton from "./draw-card-button";

export const GET_DECK = gql`
  query {
    deck {
      deckId
      remaining
      success
      shuffled
      cards {
        image
        value
        suit
        code
      }
    }
  }
`;

export default () => {
  const [deck, setDeck] = useState({
    deckId: "",
    remaining: 0,
    shuffled: true,
    success: true,
    cards: []
  });
  return (
    <Query query={GET_DECK}>
      {({ loading, data }) => {
        if (loading) return null;
        //TODO ugly workaround below
        if (deck.deckId === "") {
          setDeck(data.deck);
        }
        console.log("deck", deck);
        return (
          <div>
            <DrawCardButton deckId={deck.deckId} setDeck={setDeck} />
            <div>
              {deck.cards.map((card, i) => (
                <Pile topCard={card} key={i} />
              ))}
            </div>
            <Deck deck={deck} />
          </div>
        );
      }}
    </Query>
  );
};
