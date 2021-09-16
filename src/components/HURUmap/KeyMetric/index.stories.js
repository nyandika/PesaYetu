import React from "react";

import ProfileKeyMetric from "@/pesayetu/components/HURUmap/KeyMetric";

export default {
  title: "Components/HURUmap/KeyMetric",
  argTypes: {},
};

const Template = ({ ...args }) => <ProfileKeyMetric {...args} />;

export const Default = Template.bind({});

Default.args = {
  color: "Primary",
  formattedValue: "11%",
  title: "Voter registration %",
  description: "10.1% National Average",
};
