import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    background: palette.grey.dark,
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: typography.pxToRem(4),
    opacity: 0.8,
    color: palette.text.secondary,
    padding: typography.pxToRem(12.5),
    paddingRight: 0,
    display: "inline-block",
    width: "fit-content",
  },
  text: {
    marginRight: typography.pxToRem(12.5),
    maxWidth: typography.pxToRem(148),
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  circle: (props) => {
    return {
      width: typography.pxToRem(10),
      height: typography.pxToRem(10),
      border: `1px solid ${palette.background.default}`,
      background: props.groupColor,
      borderRadius: "100%",
      marginRight: typography.pxToRem(7),
    };
  },
}));

function ChartTooltip({ title, value, formattedValue, group, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid container className={classes.root}>
      {group && (
        <Grid item className={classes.content}>
          <div className={classes.circle} />
          <Typography>{group}</Typography>
        </Grid>
      )}
      <Grid item className={classes.content}>
        <Typography variant="body2" component="div" className={classes.text}>
          {title}
        </Typography>
        {formattedValue && (
          <Typography variant="body2" component="div" className={classes.text}>
            {formattedValue}
          </Typography>
        )}
        <Typography variant="body2" component="div" className={classes.text}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
}

ChartTooltip.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  formattedValue: PropTypes.string,
  group: PropTypes.string,
  groupColor: PropTypes.string,
};

ChartTooltip.defaultProps = {
  title: undefined,
  value: undefined,
  formattedValue: undefined,
  group: undefined,
  groupColor: undefined,
};

export default ChartTooltip;
