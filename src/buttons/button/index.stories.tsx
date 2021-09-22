import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import Button, { ButtonProps } from '.';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { label: 'Default', size: 'medium' };

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { label: 'Primary 😃', size: 'medium' };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, primary: false, label: 'Secondary 😇' };
