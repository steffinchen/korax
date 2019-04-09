import React from "react";
import styled from "styled-components";

export default ({ card }) => {
  return <Image src={card.image} alt={card.value + " of " + card.suit} />;
};

const Image = styled.img`
  height: 200px;
`;
