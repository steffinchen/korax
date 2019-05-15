import React from "react";
import styled from "styled-components";
import { DragSource } from "react-dnd";

const Card = ({ card, className, isDragging, dragSource }) => {
  const opacity = isDragging ? 0.5 : 1;
  return dragSource(
    <Image
      src={card.image}
      alt={card.value + " of " + card.suit}
      className={className}
      style={{ opacity }}
    />
  );
};
const Image = styled.img`
  height: 200px;
`;
/**
 * Implement the drag source contract.
 */
const cardSource = {
  beginDrag: props => ({ text: props.text })
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Image = styled.img`
  height: 200px;
`;

// Export the wrapped component:
export default DragSource("CARD", cardSource, collect)(Image);
