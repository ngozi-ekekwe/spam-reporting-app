import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

const EmptyState = () => {
  return (
    <div className="">
      <Segment placeholder>
        <Header icon>
          <Icon name="check" />
          All caught up
        </Header>
      </Segment>
    </div>
  );
};

export default EmptyState;
