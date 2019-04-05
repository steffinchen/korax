import React from "react";
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
  return (
    <Query query={GET_DECK}>
      {({ loading, data }) => {
        if (loading) return null;

        return (
          <Mutation mutation={DRAW_CARD}>
            {(executeMutation, { data: mutationData, loading }) => (
              <Deck
                deck={data.deck}
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
