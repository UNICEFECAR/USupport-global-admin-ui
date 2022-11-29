import React, { useState } from "react";
import { Button } from "@USupport-components-library/src";

import { CreateContentAdmin } from "./CreateContentAdmin";

export default {
  title: "Client UI/backdrops/CreateContentAdmin",
  component: CreateContentAdmin,
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
      <Button label="Toggle CreateContentAdmin" onClick={handleOpen} />
      <CreateContentAdmin {...props} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Edit = Template.bind({});
Edit.args = {
  action: "edit",
  adminData: {
    name: "John Doe",
    email: "JohnDoe@abv.bg",
    phone: "0888888888",
    role: "role3",
  },
};
