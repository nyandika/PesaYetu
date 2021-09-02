import RichTypography from "@commons-ui/core/RichTypography";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";

import useStyles from "./useStyles";

import Content from "@/pesayetu/components/Card/Content";
import Header from "@/pesayetu/components/Header";
import Section from "@/pesayetu/components/Section";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1280,
    },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1280, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

function StoriesInsights({ overline, title, stories, ...props }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const classes = useStyles({ currentItemIndex, ...props });

  if (!stories?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Header overline={overline} className={classes.header}>
          {title}
        </Header>
        <Grid container>
          <Grid item lg={8} md={12} container direction="row" wrap="nowrap">
            <div className={classes.fullWidth}>
              {stories.map(({ chart, slug }, index) => (
                <Grid
                  item
                  key={slug}
                  className={clsx(classes.chartContainer, {
                    [classes.currentChart]: index === currentItemIndex,
                  })}
                >
                  <RichTypography className={classes.chart}>
                    {chart}
                  </RichTypography>
                </Grid>
              ))}
            </div>
          </Grid>
          <Grid item lg={1} />
          <Grid item lg={3} md={12} container direction="column">
            <Carousel
              swipeable
              responsive={responsive}
              arrows={false}
              renderDotsOutside
              showDots
              containerClass={classes.carouselList}
              dotListClass={classes.dots}
              beforeChange={(nextSlide) => {
                setCurrentItemIndex(nextSlide);
              }}
            >
              {stories?.map((story) => (
                <Content key={story.slug} {...story} />
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

StoriesInsights.propTypes = {
  overline: PropTypes.string,
  title: PropTypes.string,
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      chart: PropTypes.string,
    })
  ),
};

StoriesInsights.defaultProps = {
  overline: undefined,
  title: undefined,
  stories: undefined,
};

export default StoriesInsights;
