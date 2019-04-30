import React from "react";

export default function deck({ deck }) {
  if (!deck) return null;

  return (
    <div>
      <div>
        Deck id: {deck.id} <br />
        Remaining: {deck.remaining} <br />
        Success: {deck.success.toString()} <br />
        Shuffled: {deck.shuffled.toString()} <br />
      </div>
    </div>
  );
}
