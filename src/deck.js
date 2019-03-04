import React from "react";

export default function deck({ deck, executeMutation, data, loading }) {
  if (!deck) return null;
  return (
    <div>
      <div>
        Deck id: {deck.deck_id} <br />
        Remaining: {deck.remaining} <br />
        Success: {deck.success.toString()} <br />
        Shuffled: {deck.shuffled.toString()} <br />
      </div>

      <div>
        <button
          onClick={() =>
            executeMutation({
              variables: { input: deck.deck_id }
            })
          }
        >
          Draw a Card
        </button>
        {data && !loading && (
          <div>
            {data.drawCard.remaining}
            {data.drawCard.cards.map(card => (
              <div key={card.code}>
                {card.value} of {card.suit}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
