import React from "react";
import Pile from "./pile";

export default function deck({ deck, executeMutation, data, loading }) {
  if (!deck) return null;

  return (
    <div>
      <div>
        <button
          onClick={() =>
            executeMutation({
              variables: { deck_id: deck.deck_id, count: 5 }
            })
          }
        >
          Start game
        </button>
        <div>
          {data &&
            !loading &&
            data.drawCard.cards.map((card, i) => (
              <Pile topCard={card} key={i} />
            ))}
        </div>
      </div>
      <div>
        Deck id: {deck.deck_id} <br />
        Remaining: {deck.remaining} <br />
        Success: {deck.success.toString()} <br />
        Shuffled: {deck.shuffled.toString()} <br />
      </div>
    </div>
  );
}
