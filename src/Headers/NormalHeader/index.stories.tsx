/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ButtonBase, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import NormalHeader, { NormalHeaderProps, LogoWrapper, MenuWrapper } from '.';

import { Primary as Button } from '../../buttons/button/index.stories';

const selectIcons: any = { AddAPhotoIcon, MenuIcon };

export default {
  title: 'Components/Headers/NormalHeader',
  component: NormalHeader,
  // subcomponents: { Button },
  argTypes: {
    mobileMenuIcon: {
      options: ['AddAPhotoIcon', 'MenuIcon'],
      control: { type: 'select' },
    },
    renderMobileMenu: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<NormalHeaderProps> = args => (
  <NormalHeader
    {...args}
    mobileMenuIcon={selectIcons[args.mobileMenuIcon]}
    renderMobileMenu={({ mobileMenuIcon: MobileMenuIcon }) => (
      <ButtonBase>
        <MobileMenuIcon />
      </ButtonBase>
    )}
  >
    <LogoWrapper>
      <img style={{ display: 'block' }} src="/images/logoIpsum.svg" alt="logo" />
    </LogoWrapper>
    <MenuWrapper>
      <a href="/">test1</a>
      <Button {...Button.args} />
    </MenuWrapper>
  </NormalHeader>
);

export const Default = Template.bind({});
Default.args = {
  color: 'default',
  menuPosition: 'left',
  position: 'relative',
  displayMenuBreakpoint: 'sm',
  mobileMenuIcon: 'AddAPhotoIcon',
};
