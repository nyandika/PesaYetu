import { RichTypography } from "@commons-ui/core";
import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import DataFilter from "@/pesayetu/components/DataFilter";
import Link from "@/pesayetu/components/Link";
import Section from "@/pesayetu/components/Section";

function Sources({ items, className, datasetTypes, filterProps, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (!items?.length) {
    return null;
  }
  return (
    <Section classes={{ root: classes.root }}>
      {!isMobile && <DataFilter {...filterProps} />}
      <div className={classes.grid}>
        {items.map((item) => (
          <div className={classes.sources} key={item.title}>
            <Grid
              item
              xs={12}
              lg={7}
              className={clsx(classes.textContent, className)}
            >
              <RichTypography
                variant="body1"
                className={clsx(classes.text, classes.title, className)}
              >
                {item.title}
              </RichTypography>
              <RichTypography
                variant="body1"
                className={clsx(classes.text, classes.description, className)}
              >
                {item.description}
              </RichTypography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={5}
              className={clsx(classes.linkContent, className)}
            >
              {datasetTypes && (
                <Grid
                  item
                  xs={12}
                  lg={6}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  className={classes.dataTypes}
                >
                  {item.types.map((data) => (
                    <RichTypography className={classes.typeContent}>
                      {data.name}
                    </RichTypography>
                  ))}
                </Grid>
              )}
              <Link
                className={classes.link}
                href={item.href}
                underline="always"
                variant="body2"
              >
                Read More
              </Link>
            </Grid>
          </div>
        ))}
      </div>
    </Section>
  );
}

Sources.propTypes = {
  datasetTypes: PropTypes.bool,
  className: PropTypes.string,
  filterProps: PropTypes.shape({}),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      href: PropTypes.string,
      link: PropTypes.string,
      types: PropTypes.arrayOf({}),
    })
  ),
};

Sources.defaultProps = {
  datasetTypes: undefined,
  className: undefined,
  items: undefined,
  filterProps: undefined,
};

export default Sources;
