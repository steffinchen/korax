import React from "react";
import styled from "styled-components";
import { DragSource } from "react-dnd";

const Card = ({ card, className, isDragging, dragSource }) => {
  return dragSource(
    <div className={className}>
      <Image
        src={card.image}
        alt={card.value + " of " + card.suit}
        isDragging={isDragging}
      />
    </div>
  );
};

const cardSource = {
  beginDrag: props => {
    //these properties are then seen in the target's monitor.getItem
    return props.card;
  }
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
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;

export default DragSource("CARD", cardSource, collect)(Card);
