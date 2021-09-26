import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  root: {},
  formControl: {
    "& .MuiFilledInput-underline": {
      "&::before": {
        display: "none",
      },
    },
  },
  select: {
    height: "100%",
    width: typography.pxToRem(135),
    background: palette.background.paper,
    borderStyle: "none",
    borderRadius: 2,
    paddingLeft: typography.pxToRem(24),
    paddingBottom: typography.pxToRem(15),
    paddingTop: typography.pxToRem(15),
    fontSize: typography.caption.fontSize,
    "&:focus": {
      borderRadius: 2,
      background: palette.background.paper,
      borderColor: "none",
    },
    "&::before": {
      display: "none",
    },
    [breakpoints.up("lg")]: {
      width: typography.pxToRem(165),
    },
  },
  paper: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 12,
      paddingBottom: 12,
    },
    "& li.Mui-selected": {
      fontWeight: "bold",
    },
  },
}));

export default useStyles;
