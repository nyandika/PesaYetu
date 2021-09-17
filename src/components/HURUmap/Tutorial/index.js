import { makeStyles } from "@material-ui/core/styles";
import { TourProvider } from "@reactour/tour";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Connector from "@/pesayetu/components/HURUmap/Tutorial/Connector";
import TutorialStep from "@/pesayetu/components/HURUmap/Tutorial/TutorialStep";

const useStyles = makeStyles(({ typography, palette }) => ({
  tour: {
    width: typography.pxToRem(1000),
    maxWidth: "100vw  !important",
    top: `${typography.pxToRem(200)} !important`,
    left: "50% !important",
    transform: "translateX(-50%) !important",
    paddingBottom: `${typography.pxToRem(48.62)} !important`,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    border: `1px solid ${palette.primary.main}`,
    borderRadius: typography.pxToRem(10),
    "--reactour-accent": "#1C2030",
  },
  mask: {
    color: "#666666 !important",
    opacity: "0.5 !important",
  },
}));

export default function Tutorial({ children, items }) {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);

  const setTourOpened = () => {
    setIsOpened(true);
  };
  const setTourClosed = () => {
    setIsOpened(false);
  };

  return (
    <TourProvider
      padding={{ mask: 0 }}
      position="center"
      className={classes.tour}
      showPrevNextButtons={false}
      showBagde={false}
      afterOpen={setTourOpened}
      beforeClose={setTourClosed}
      showCloseButton={false}
      accentColor="#fff"
      maskClassName={classes.mask}
      highlightedMaskClassName={classes.highlightedMask}
      steps={items.map((item, index) => ({
        selector: item.selector,
        content: <TutorialStep activeStep={index} {...item} />,
      }))}
    >
      {children}
      {isOpened && <Connector />}
    </TourProvider>
  );
}
Tutorial.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  children: PropTypes.node,
};

Tutorial.defaultProps = {
  items: undefined,
  children: undefined,
};
