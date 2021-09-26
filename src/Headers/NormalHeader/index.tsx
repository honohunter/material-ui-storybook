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
import Grid, { GridSpacing,GridTypeMap } from '@material-ui/core/Grid';

type WrapperType = {
  children: React.ReactNode;
  className?: string | undefined;
};

export interface NormalHeaderProps {
  color: PropTypes.Color;
  children: [JSX.Element, JSX.Element];
  menuPosition: 'left' | 'right';
  elevation: number;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  layoutSpacing: GridSpacing;
  className: string;
  displayMenuBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  renderMobileMenu: React.FC<Partial<NormalHeaderProps>>;
  mobileMenuIcon: SvgIconProps | any;
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
      MenuWrapper: {
        display: 'flex',
        alignItems: 'center',
      },
      fullWidth: {
        maxWidth: '100%',
      },
    }),
  {},
);

export const LogoWrapper = ({ children, className }: WrapperType) => (
  <Grid item className={className}>
    {children}
  </Grid>
);
export const MenuWrapper = React.forwardRef(function MenuWrapper(
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
    renderMobileMenu,
    mobileMenuIcon,
  } = props;
  const classes = useStyles(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(displayMenuBreakpoint));

  return (
    <Container
      maxWidth={maxWidth}
      disableGutters
      className={clsx(classes.root, !maxWidth && classes.fullWidth, className)}
    >
      <AppBar position="relative" color={color} elevation={elevation}>
        <Toolbar>
          <Grid container spacing={layoutSpacing} alignItems="center">
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

              if (matches) {
                return renderMobileMenu({ mobileMenuIcon });
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
