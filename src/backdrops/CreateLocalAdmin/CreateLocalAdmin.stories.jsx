import React, { useState } from "react";
import { Button } from "@USupport-components-library/src";

import { CreateLocalAdmin } from "./CreateLocalAdmin";

export default {
  title: "Client UI/backdrops/CreateLocalAdmin",
  component: CreateLocalAdmin,
  argTypes: {},
};

const Template = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button label="Toggle CreateLocalAdmin" onClick={handleOpen} />
      <CreateLocalAdmin {...props} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Edit = Template.bind({});
Edit.args = {
  action: "edit",
};
