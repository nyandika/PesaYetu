import { RichTypography } from "@commons-ui/core";
import { ButtonBase, Grid, Typography, Slide } from "@material-ui/core";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Icon from "./Icon";
import useStyles from "./useStyles";

import bg from "@/pesayetu/assets/images/Mask Group 8.png";
import Header from "@/pesayetu/components/Header";

function DataIndicators({ items, title, ...props }) {
  const classes = useStyles(props);

  const [checked, setChecked] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);

  if (!items?.length) {
    return null;
  }

  const handleIconClick = (index) => {
    setCurrentItemIndex(index);
    setChecked(true);
  };

  const handleSlideClick = () => {
    setChecked(false);
    setCurrentItemIndex(null);
  };

  const currentItem = items[currentItemIndex];

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <Image objectFit="cover" src={bg} layout="fill" />
      </div>
      <div className={classes.section}>
        <div
          className={clsx(classes.indicatorsContainer, {
            [classes.slideIn]: checked,
          })}
        >
          <Header className={classes.header}>{title}</Header>
          <Grid container alignItems="center" justifyContent="center">
            {items?.map((item, index) => (
              <Grid
                item
                key={item.title}
                className={clsx(classes.iconContainer, {
                  [classes.slideInIconContainer]: checked,
                })}
              >
                <Icon
                  handleIconClick={() => handleIconClick(index)}
                  item={item}
                  index={index}
                  checked={checked}
                  currentItemIndex={currentItemIndex}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Slide
          in={checked}
          mountOnEnter
          unmountOnExit
          className={classes.slide}
          direction="left"
          timeout={{
            enter: 300,
          }}
        >
          <ButtonBase
            disableRipple
            disableTouchRipple
            onClick={handleSlideClick}
            className={classes.content}
          >
            {currentItem?.title && (
              <Typography
                component="div"
                variant="h3"
                className={classes.title}
              >
                {currentItem.title}
              </Typography>
            )}
            {currentItem?.description && (
              <RichTypography component="div" className={classes.description}>
                {currentItem.description}
              </RichTypography>
            )}
          </ButtonBase>
        </Slide>
      </div>
    </div>
  );
}

DataIndicators.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

DataIndicators.defaultProps = {
  title: undefined,
  items: undefined,
};

export default DataIndicators;
