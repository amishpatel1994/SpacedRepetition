/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NextIntervalModal = (props) => {
  const {
    modalOpen,
    handleToggle,
    className
  } = props;

  return (
    <Modal isOpen={modalOpen} toggle={handleToggle} className={className}>
      <ModalHeader toggle={handleToggle}>Modal title</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleToggle}>Do Something</Button>{' '}
        <Button color="secondary" onClick={handleToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default NextIntervalModal;