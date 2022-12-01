import React from 'react';

import { ChooseCountry } from './ChooseCountry';

export default {
  title: 'Global Admin UI/blocks/ChooseCountry',
  component: ChooseCountry,
  argTypes: {},
};

const Template = (props) => <ChooseCountry {...props} />;

export const Default = Template.bind({});
Default.args = {};
