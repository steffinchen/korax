import React from "react";
import styled from "styled-components";

export default ({ card, className }) => {
  return (
    <Image
      src={card.image}
      alt={card.value + " of " + card.suit}
      className={className}
    />
  );
};

const Image = styled.img`
  height: 200px;
`;
