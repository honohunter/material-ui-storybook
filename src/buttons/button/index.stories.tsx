import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import Button, { ButtonProps } from '@material-ui/core/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['text', 'outlined', 'contained'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'secondary', 'default', 'inherit'],
      control: { type: 'radio' },
    },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { variant: 'text', children: 'Button', color: 'inherit' };

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { variant: 'contained', children: 'Button', color: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, children: 'Secondary 😇' };
