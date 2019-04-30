import React from "react";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

const DRAW_CARD = gql`
  mutation DrawCard($id: String!, $count: Int) {
    drawCard(id: $id, count: $count) {
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

export default ({ deckId }) => {
  const drawCards = useMutation(DRAW_CARD, {
    variables: { id: deckId, count: 5 }
  });
  return <button onClick={() => drawCards()}>Draw Cards</button>;
};
