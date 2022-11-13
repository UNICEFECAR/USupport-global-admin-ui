import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Page } from "./Page";

export default {
  title: "Global Admin UI/blocks/Page",
  component: Page,
  argTypes: {},
};

// Create a react-query client
const queryClient = new QueryClient();

const Template = (props) => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Page {...props} />;
    </Router>
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {};
