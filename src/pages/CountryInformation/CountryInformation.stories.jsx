import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CountryInformation } from './CountryInformation';

export default {
    title: 'Global Admin UI/pages/CountryInformation',
    component: CountryInformation,
    argTypes: {},
};

const Template = (props) => <Router><CountryInformation {...props} /></Router>;

export const Default = Template.bind({});
Default.args = {}; 
