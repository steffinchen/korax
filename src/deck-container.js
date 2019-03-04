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
  mutation DrawCard($input: String!) {
    drawCard(deck_id: $input) {
      deck_id
      remaining
      success
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
  const [deck, setDeck] = useState(null);

  return (
    <Query query={GET_DECK}>
      {({ loading, data: result }) => {
        if (loading) return null;

        setDeck(result.deck);

        return (
          <Mutation
            mutation={DRAW_CARD}
            update={(cache, { data: { drawCard } }) => {
              // this is a workaround because the endpoint to draw
              // a card does not return the 'shuffled' property
              cache.writeQuery({
                query: GET_DECK,
                data: { deck: drawCard }
              });
              const updatedDeck = cache.readQuery({ query: GET_DECK });
              setDeck(updatedDeck.deck);
            }}
          >
            {(executeMutation, { data, loading }) => (
              <Deck
                deck={deck}
                executeMutation={executeMutation}
                data={data}
                loading={loading}
              />
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
