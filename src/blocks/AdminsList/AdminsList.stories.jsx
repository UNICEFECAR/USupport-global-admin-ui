import React from 'react';

import { AdminsList } from './AdminsList';

export default {
  title: 'Global Admin UI/blocks/AdminsList',
  component: AdminsList,
  argTypes: {},
};

const Template = (props) => <AdminsList {...props} />;

export const Default = Template.bind({});
Default.args = {};
