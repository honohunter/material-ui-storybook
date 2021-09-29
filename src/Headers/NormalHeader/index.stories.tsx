/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { IconButton, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import NormalHeader, { NormalHeaderProps, LogoWrapper, MenuWrapper, MobileMenuWrapper } from '.';

import { Primary as Button } from '../../buttons/button/index.stories';

interface StoryArgs extends NormalHeaderProps {
  mobileMenuIcon: string;
}

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
    logoPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    menuPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    renderMobileMenu: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} as Meta;

const iconSector = (iconName: string) => {
  const Icon = selectIcons[iconName];
  return <Icon />;
};

// Create a master template for mapping args to render the Button component
const Template: Story<StoryArgs> = args => (
  <NormalHeader {...args}>
    <LogoWrapper>
      <img style={{ display: 'block' }} src="/images/logoIpsum.svg" alt="logo" />
    </LogoWrapper>
    <MenuWrapper>
      <Link underline="none" color="inherit" href="/">
        test1
      </Link>
      <Link underline="none" color="inherit" href="/">
        test2
      </Link>
      <Link underline="none" color="inherit" href="/">
        test2
      </Link>
      <Button {...Button.args} />
    </MenuWrapper>
    <MobileMenuWrapper>
      <IconButton color="inherit">{iconSector(args.mobileMenuIcon)}</IconButton>
    </MobileMenuWrapper>
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
