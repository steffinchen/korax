import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Pile from "./pile";

export default function Deck({ cards }) {
  const [piles, setPiles] = useState([]);

  useEffect(() => {
    const initialP = cards.map((card, i) => {
      return { cards: [card], id: i };
    });
    setPiles(initialP);
  }, [cards]);

  const moveCardToPile = (card, pileId) => {
    const updated = piles.map(pile => {
      return {
        cards: pile.cards.filter(c => c.code !== card.code),
        id: pile.id
      };
    });
    updated[pileId].cards.push(card);
    setPiles(updated);
  };

  return (
    <div>
      <FlexContainer>
        {piles.map(pile => (
          <Pile
            id={pile.id}
            cards={pile.cards}
            moveCardToPile={moveCardToPile}
            key={pile.id}
          />
        ))}
      </FlexContainer>
    </div>
  );
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
