import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

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
      cards {
        image
        value
        suit
        code
      }
    }
  }
`;

export default () => (
  <Query query={GET_DECK}>
    {({ loading, data: result }) => {
      return (
        !loading && (
          <div>
            <div>
              Deck id: {result.deck.deck_id} <br />
              Remaining: {result.deck.remaining} <br />
              Success: {result.deck.success.toString()} <br />
              Shuffled: {result.deck.shuffled.toString()} <br />
            </div>
            <Mutation mutation={DRAW_CARD}>
              {(executeMutation, { data, loading }) => (
                <div>
                  <button
                    onClick={() =>
                      executeMutation({
                        variables: { input: result.deck.deck_id }
                      })
                    }
                  >
                    Draw a Card
                  </button>
                  {data && !loading && (
                    <div>
                      {data.drawCard.cards.map(card => (
                        <div key={card.code}>
                          {card.value} of {card.suit}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Mutation>
          </div>
        )
      );
    }}
  </Query>
);
