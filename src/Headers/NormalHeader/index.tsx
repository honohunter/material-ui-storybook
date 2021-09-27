/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/require-default-props */
import React from 'react';
import clsx from 'clsx';
import {
  PropTypes,
  makeStyles,
  createStyles,
  Container,
  useMediaQuery,
  useTheme,
  SvgIconProps,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid, { GridSpacing, GridTypeMap } from '@material-ui/core/Grid';

type WrapperType = {
  children: React.ReactNode;
  className?: string | undefined;
};

export interface NormalHeaderProps {
  color: PropTypes.Color;
  children: [JSX.Element, JSX.Element, JSX.Element];
  menuPosition: 'left' | 'right';
  elevation: number;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  layoutSpacing: GridSpacing;
  className: string;
  displayMenuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  height: number;
}

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: (props: NormalHeaderProps) => ({
        // overflow: 'hidden',
        position: props.position,
        left: 0,
        right: 0,
      }),
      LogoWrapper: (props: NormalHeaderProps) => ({
        flex: props.menuPosition === 'left' ? 1 : 'unset',
      }),
      MenuWrapper: (props: NormalHeaderProps) => ({
        flex: props.menuPosition === 'right' ? 1 : 'unset',
        display: 'flex',
        alignItems: 'center',
      }),

      MobileMenuWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
      },

      fullWidth: {
        maxWidth: '100%',
      },
      AppBar: ({ height }) => ({ height: height || theme.mixins.toolbar.height }),
    }),
  {},
);

export const LogoWrapper = React.forwardRef(function LogoWrapper(
  { children, className }: WrapperType,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Grid ref={ref} item className={className}>
      {children}
    </Grid>
  );
});

export const MenuWrapper = React.forwardRef(function MenuWrapper(
  { children, className }: WrapperType,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Grid ref={ref} item className={className}>
      <Grid container spacing={2} alignItems="center">
        {React.Children.map(children, child => (
          <Grid item>{child}</Grid>
        ))}
      </Grid>
    </Grid>
  );
});

export const MobileMenuWrapper = React.forwardRef(function MobileMenuWrapper(
  { children, className }: WrapperType,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Grid ref={ref} item className={className}>
      {children}
    </Grid>
  );
});

const NormalHeader = (props: NormalHeaderProps): JSX.Element => {
  const { color, children, elevation, maxWidth, layoutSpacing, className, displayMenuBreakpoint = 'sm' } = props;
  const classes = useStyles(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(displayMenuBreakpoint));

  return (
    <Container
      maxWidth={maxWidth}
      disableGutters
      className={clsx(classes.root, !maxWidth && classes.fullWidth, className)}
    >
      <AppBar position="relative" color={color} elevation={elevation} className={classes.AppBar}>
        <Toolbar>
          <Grid container spacing={layoutSpacing} alignItems="center" justifyContent="flex-end">
            {React.Children.map(children, child => {
              if (child.type === LogoWrapper) {
                return React.cloneElement(child, {
                  className: clsx(child.props.className, classes.LogoWrapper),
                });
              }
              if (child.type === MenuWrapper && !matches) {
                return React.cloneElement(child, {
                  className: clsx(child.props.className, classes.MenuWrapper),
                });
              }

              if (child.type === MobileMenuWrapper && matches) {
                return React.cloneElement(child, {
                  className: clsx(child.props.className, classes.MobileMenuWrapper),
                });
              }

              return null;
            })}
          </Grid>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default NormalHeader;
