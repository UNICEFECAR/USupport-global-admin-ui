import React from 'react';

import { CountryInformation } from './CountryInformation';

export default {
  title: 'Global Admin UI/blocks/CountryInformation',
  component: CountryInformation,
  argTypes: {},
};

const Template = (props) => <CountryInformation {...props} />;

export const Default = Template.bind({});
Default.args = {};
