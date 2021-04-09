import React from "react";
import { Button, Modal } from "semantic-ui-react";


const PopupModal = ({ size, open, onClose,  content }) => {
  return (
    <>
      <Modal size={size} open={open} onClose={onClose}>
        <Modal.Header>Report(s) with the following ID(s) have been Updated</Modal.Header>
        <Modal.Content>
          {content && content.map((c, i) => {
            return <p key={i}>{c.id}</p>
          })}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onClose}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default PopupModal;
