import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChooseCountry } from './ChooseCountry';

export default {
    title: 'Global Admin UI/pages/ChooseCountry',
    component: ChooseCountry,
    argTypes: {},
};

const Template = (props) => <Router><ChooseCountry {...props} /></Router>;

export const Default = Template.bind({});
Default.args = {}; 
