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
      <Container>
        {cards.map((card, i) => (
          <StyledCard card={card} key={card.code} index={i} />
        ))}
        {(!cards || cards.length === 0) && <Placeholder />}
      </Container>
    </div>
  );
};

const Placeholder = styled.div`
  border: 1px black;
`;

const Container = styled.div`
  position: relative;
`;

const StyledCard = styled(Card)`
  & + * {
    /*transform: translateY(-180px);*/
    position: absolute;
    top: ${props => (props.index + 1) * 20 + "px"};
    border: 2px solid red;
  }
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
