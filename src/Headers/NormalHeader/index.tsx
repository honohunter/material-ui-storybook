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
  withStyles,
  Theme,
  StyleRules,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid, { GridSpacing, GridTypeMap } from '@material-ui/core/Grid';

type WrapperType = {
  children: React.ReactNode;
  className?: string | undefined;
  // component?: React.ElementType;
};

export interface NormalHeaderProps {
  color: PropTypes.Color;
  children: [JSX.Element, JSX.Element, JSX.Element];
  menuPosition: 'left' | 'right';
  logoPosition: 'left' | 'right';
  elevation: number;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  layoutSpacing: GridSpacing;
  className: string;
  displayMenuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  height: number;
  classes?: StyleRules<'positionLeft' | 'position-right' | 'root'> | any;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    // LogoWrapper: (props: NormalHeaderProps) => ({
    //   flex: props.menuPosition === 'left' ? 1 : 'unset',
    // }),

    positionLeft: {
      flexGrow: 1,
    },
    'position-right': {
      flexGrow: 1,
    },
  });

export const LogoWrapper = React.forwardRef(function LogoWrapper(
  { children, className }: WrapperType,
  ref: React.Ref<HTMLDivElement>,
) {
  // if (Component) {
  //   return (
  //     <Component ref={ref} item className={className}>
  //       {children}
  //     </Component>
  //   );
  // }
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
  const {
    color,
    children,
    elevation,
    maxWidth,
    layoutSpacing,
    className,
    displayMenuBreakpoint = 'sm',
    classes,
    menuPosition,
    logoPosition,
  } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(displayMenuBreakpoint));

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth={maxWidth} disableGutters>
        <AppBar position="relative" color={color} elevation={elevation}>
          <Toolbar className={classes.Toolbar}>
            <Grid container spacing={layoutSpacing} alignItems="center" justifyContent="flex-end">
              {React.Children.map(children, child => {
                if (child.type === LogoWrapper) {
                  return React.cloneElement(child, {
                    className: clsx(child.props.className, menuPosition === 'right' && classes.positionLeft),
                  });
                }
                if (child.type === MenuWrapper && !matches) {
                  return React.cloneElement(child, {
                    className: clsx(child.props.className, menuPosition === 'left' && classes.positionLeft),
                  });
                }

                if (child.type === MobileMenuWrapper && matches) {
                  return React.cloneElement(child, {
                    className: clsx(child.props.className),
                  });
                }

                return null;
              })}
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
};

export default withStyles(styles, { name: 'MainboardHeader' })(NormalHeader);
