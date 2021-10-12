import { Grid, TextField, Typography } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function Share({ title, geoCode, indicatorId, ...props }) {
  const classes = useStyles(props);

  const code = `<div>
  <style>
    .frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
      z-index: 10;
    }
    .wrapper {
        position: relative;
        overflow: hidden;
        padding-top: 75%;
    }
    @media (max-width: 1280px) {
        .wrapper {
          padding-top: 90%;
        }
    @media (max-width: 768px) {
      .wrapper {
        padding-top: 100%;
      }
    @media (max-width: 620px) {
      .wrapper {
        padding-top: 120%;
      }
      @media (max-width: 500px) {
        .wrapper {
          padding-top: 160%;
        }
}
</style> 
<div class="wrapper"><iframe class="frame" 
  src="${
    process.env.NEXT_PUBLIC_APP_URL
  }/embed/${geoCode.toLowerCase()}/${indicatorId}"></iframe></div></div>
  `;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={clsx(classes.row, classes.layout)}>
        <Typography className={classes.text}>Embed on your website:</Typography>
      </Grid>
      <Grid item xs={12} className={clsx(classes.row, classes.layout)}>
        <TextField
          value={code}
          InputProps={{ classes: { input: clsx(classes.code, classes.text) } }}
        />
      </Grid>
    </Grid>
  );
}

Share.propTypes = {
  title: PropTypes.string,
  geoCode: PropTypes.string,
  indicatorId: PropTypes.number,
};

Share.defaultProps = {
  title: undefined,
  geoCode: undefined,
  indicatorId: undefined,
};

export default Share;
