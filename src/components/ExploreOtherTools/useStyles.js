import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    backgroundColor: "#F8F8F8",
    padding: `${typography.pxToRem(80)} 0`,
  },
  section: {},
  title: {
    textAlign: "center",
    marginBottom: typography.pxToRem(40),
  },
  card: {},
  cardContentTitle: {
    marginTop: typography.pxToRem(20),
  },
  cardContentDescription: {},
  cardMedia: {
    "&:after": {
      content: '""',
      display: "block",
      // 356/220 ratio
      paddingTop: "61.80%",
    },
    margin: `
      -${typography.pxToRem((254 - 216.89) / 2)}
      -${typography.pxToRem((390 - 350) / 2)}
      0
      -${typography.pxToRem((390 - 350) / 2)}
    `,
    [breakpoints.up("md")]: {
      margin: `
        -${typography.pxToRem((((254 - 216.89) / 2) * 183.43) / 216.89)}
        -${typography.pxToRem((((390 - 350) / 2) * 296) / 350)}
        0
        -${typography.pxToRem((((390 - 350) / 2) * 296) / 350)}
      `,
      height: typography.pxToRem(
        183.43 + (((254 - 216.89) / 2) * 183.43) / 216.89
      ),
      width: typography.pxToRem(296 + (((390 - 350) / 2) * 296) / 350),
    },
    [breakpoints.up("lg")]: {
      margin: `
        -${typography.pxToRem((((254 - 216.89) / 2) * 220.61) / 216.89)}
        -${typography.pxToRem((((390 - 350) / 2) * 296) / 350)}
        0
        -${typography.pxToRem((((390 - 350) / 2) * 296) / 350)}
      `,
      height: typography.pxToRem(
        220.61 + (((254 - 216.89) / 2) * 220.61) / 216.89
      ),
      width: typography.pxToRem(356 + (((390 - 350) / 2) * 296) / 350),
    },
  },
  dots: {
    margin: `0 ${typography.pxToRem(30)}`,
    paddingTop: `${typography.pxToRem(40)}`,
    position: "unset",
    "& button": {
      borderColor: palette.divider,
      height: typography.pxToRem(16),
      marginRight: typography.pxToRem(12),
      width: typography.pxToRem(16),
    },
    "& .react-multi-carousel-dot--active button": {
      borderColor: "#A0A0A0",
      background: "#000",
    },
  },
}));

export default useStyles;
