import React from "react";

import CMSContent from ".";

export default {
  title: "Components/CMSContent",
  argTypes: {
    content: {
      control: {
        type: "string",
      },
    },
  },
};

const Template = (args) => <CMSContent {...args} />;

export const Default = Template.bind({});

Default.args = {
  content: `<div class="wp-block-columns"><div class="wp-block-column" style="flex-basis:100%"><div class="wp-block-columns"><div class="wp-block-column" style="flex-basis:33.33%"><h2>History</h2><h4>The PesaYetu data portal was built as part of the ‘Our County: Our Responsibility’ project, which started back in 2019.</h4><p></p></div><div class="wp-block-column" style="flex-basis:16.67%"></div><div class="wp-block-column" style="flex-basis:50%"><p>The project was focused on helping journalists at Kenyan community-based radio stations adopt data-driven digital journalism tools and techniques to improve their evidence-driven analysis and multimedia reporting on development issues. The data portal was built to help them explore, visualise and interpret development data that impacted their own communities. </p><p>The initial project involved 14 community radio stations in eight Kenyan counties. The selected community radios are all an integral part of their local communities and broadcast not only in English and Kiswahili but also in various local languages (such as Kitaita, Borana, Samburu and Meru). </p><p>Their listeners are mainly marginalised groups in Kenyan society and the poor rural population. The ‘Our County: Our Responsibility’ project was a partnership between Code for Africa, KCOMNET and CAMECO, with support from the German Cooperation.</p></div></div></div></div>`,
};
