import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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

export default () => (
  <Query query={GET_DECK}>
    {({ loading, data }) => {
      return (
        !loading && (
          <div>
            Deck id: {data.deck.deck_id} <br />
            Remaining: {data.deck.remaining} <br />
            Success: {data.deck.success.toString()} <br />
            Shuffled: {data.deck.shuffled.toString()} <br />
          </div>
        )
      );
    }}
  </Query>
);
