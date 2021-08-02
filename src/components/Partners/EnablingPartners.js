import { A } from "@commons-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    paddingTop: typography.pxToRem(56.69),
  },
  title: {
    fontWeight: 900,
    color: palette.grey.dark,
    marginBottom: typography.pxToRem(49.38),
  },
  link: {
    display: "block",
  },
  logo: {
    mixBlendMode: "luminosity",
    filter: "grayscale(1)",
  },
}));
function Enablingpartners({ title, partners, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container xs={12}>
        <Grid xs={12}>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        {partners?.map(({ link, logo, name }) => (
          <Grid item xs={12} md={6}>
            <A className={classes.link} href={link}>
              <Image
                className={classes.logo}
                objectFit="contain"
                width={310}
                height={224}
                src={logo.url}
                alt={name}
              />
            </A>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Enablingpartners.propTypes = {
  title: PropTypes.string,
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

Enablingpartners.defaultProps = {
  title: undefined,
  partners: undefined,
};
export default Enablingpartners;
