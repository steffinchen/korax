import React, { useState } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Deck from "./deck";

export const GET_DECK = gql`
  query {
    deck {
      deck_id
      remaining
      success
      shuffled
    }
  }
`;

const DRAW_CARD = gql`
  mutation DrawCard($deck_id: String!, $count: Int) {
    drawCard(deck_id: $deck_id, count: $count) {
      deck_id
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
    deck_id: "",
    shuffled: false,
    remaining: 0,
    success: false
  });
  return (
    <Query query={GET_DECK}>
      {({ loading, data }) => {
        if (loading) return null;
        setDeck(data.deck);
        return (
          <Mutation
            mutation={DRAW_CARD}
            onCompleted={data => {
              //TODO deck is not properly updated in Deck component
              setDeck({
                deck_id: data.drawCard.deck_id,
                shuffled: data.drawCard.shuffled,
                remaining: data.drawCard.remaining,
                success: data.drawCard.success
              });
            }}
          >
            {(executeMutation, { data: mutationData, loading }) => (
              <Deck
                deck={deck}
                executeMutation={executeMutation}
                data={mutationData}
                loading={loading}
              />
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
