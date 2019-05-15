import React from "react";
import { DropTarget } from "react-dnd";

import Card from "./card";
import styled from "styled-components";

const Pile = function({
  id,
  cards,
  className,
  connectDropTarget,
  isOver,
  moveCardToPile
}) {
  return connectDropTarget(
    <div>
      {cards.map(card => (
        <Card card={card} key={card.code} />
      ))}
      {(!cards || cards.length === 0) && <Placeholder />}
    </div>
  );
};

const Placeholder = styled.div`
  border: 1px black;
`;

const squareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.moveCardToPile(item, props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget("CARD", squareTarget, collect)(Pile);
