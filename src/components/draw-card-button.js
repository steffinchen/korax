import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DRAW_CARD = gql`
  mutation DrawCard($deckId: String!, $count: Int) {
    drawCard(deckId: $deckId, count: $count) {
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

export default ({ setDeck, deckId }) => {
  return (
    <Mutation
      mutation={DRAW_CARD}
      onCompleted={data => {
        console.log("onCompleted", data.drawCard);
        setDeck({
          deckId: data.drawCard.deckId,
          shuffled: data.drawCard.shuffled,
          remaining: data.drawCard.remaining,
          success: data.drawCard.success,
          cards: data.drawCard.cards
        });
      }}
    >
      {executeMutation => (
        <button
          onClick={() =>
            executeMutation({
              variables: { deckId: deckId, count: 5 }
            })
          }
        >
          Draw Cards
        </button>
      )}
    </Mutation>
  );
};
