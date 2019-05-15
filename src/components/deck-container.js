import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import DeckInfo from "./deck-info";
import Deck from "./deck";

import DrawCardButton from "./draw-card-button";

export const GET_DECK = gql`
  query {
    deck {
      id
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
  const { data, error, loading } = useQuery(GET_DECK);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      <Deck cards={data.deck.cards} />
      <DrawCardButton deckId={data.deck.id} />
      <DeckInfo deck={data.deck} />{" "}
    </div>
  );
};
