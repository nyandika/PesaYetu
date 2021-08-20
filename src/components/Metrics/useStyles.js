import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    padding: `${typography.pxToRem(40)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(80)} 0`,
    },
  },
  metrics: {
    padding: `${typography.pxToRem(10)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(80)} 0`,
    },
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(480),
    },
  },
  dataVisualCard: {
    height: "100%",
    width: "100%",
  },
  cardMedia: {
    position: "relative",
    height: typography.pxToRem(189),
    width: typography.pxToRem(350),
    [breakpoints.up("md")]: {
      height: typography.pxToRem(189),
      width: typography.pxToRem(350),
    },
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(415),
      width: typography.pxToRem(768),
    },
  },
  title: {
    paddingTop: typography.pxToRem(16),
  },
  image: {},
  description: {
    paddingTop: typography.pxToRem(40),
    [breakpoints.up("md")]: {
      width: "auto",
    },
  },
}));

export default useStyles;
