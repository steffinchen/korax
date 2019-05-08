import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

import Deck from "./deck";
import Pile from "./pile";
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
      <div>
        {data.deck.cards.map((card, i) => (
          <StyledPile topCard={card} key={i} />
        ))}
      </div>
      <DrawCardButton deckId={data.deck.id} />
      <Deck deck={data.deck} />
    </div>
  );
};

const StyledPile = styled(Pile)`
  & + & {
    padding-left: 5px;
  }
`;
