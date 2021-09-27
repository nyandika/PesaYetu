import { Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Vega } from "react-vega";

import configureScope from "./configureScope";
import { calculateTooltipPosition } from "./utils";

import ChartTooltip from "@/pesayetu/components/HURUmap/ChartTooltip";
import IndicatorTitle from "@/pesayetu/components/HURUmap/IndicatorTitle";
import Link from "@/pesayetu/components/Link";
import theme from "@/pesayetu/theme";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {
    position: "relative",
  },
  source: {
    margin: `${typography.pxToRem(20)} 0`,
  },
  sourceTitle: {
    fontSize: typography.pxToRem(13),
    lineHeight: 20 / 13,
    color: "#666666",
    display: "inline-flex",
  },
  sourceLink: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
    lineHeight: 20 / 13,
    fontFamily: typography.body1.fontFamily,
  },
}));

function Chart({ indicator, title, ...props }) {
  const classes = useStyles(props);
  const [view, setView] = useState(null);
  const [updateView, setUpdateView] = useState(false);

  const handleNewView = (v) => {
    if (!updateView) {
      setView(v);
      setUpdateView(true);
    }
  };

  const {
    id,
    description,
    metadata: { source, url },
    chart_configuration: { disableToggle, defaultType },
  } = indicator;

  const spec = configureScope(indicator);

  const handler = (_, event, item, value) => {
    let el = document.getElementsByClassName(`${id}-charttooltip`)[0];
    if (!el) {
      el = document.createElement("div");
      el.classList.add(`${id}-charttooltip`);
      document.body.appendChild(el);
    }

    const tooltipContainer = document.fullscreenElement || document.body;
    tooltipContainer.appendChild(el);
    // hide tooltip for null objects, undefined
    if (!value) {
      el.remove();
      return;
    }
    el.innerHTML = ReactDOMServer.renderToString(
      <ThemeProvider theme={theme}>
        <ChartTooltip
          title={value.group}
          value={value.count}
          formattedValue={
            defaultType.toLowerCase() === "percentage" || !disableToggle
              ? value.percentage
              : undefined
          }
          item={value?.stack}
          itemColor={item?.fill}
        />
      </ThemeProvider>
    );

    el.classList.add("visible");
    const { x, y } = calculateTooltipPosition(
      event,
      el.getBoundingClientRect(),
      0,
      10
    );
    el.setAttribute(
      "style",
      `top: ${y}px; left: ${x}px; z-index: 999; position: absolute`
    );
  };

  return (
    <div className={classes.root} id={`${id}-chart`}>
      <IndicatorTitle
        title={title}
        description={description}
        view={view}
        spec={spec}
      />
      <Vega
        spec={spec}
        actions={false}
        tooltip={handler}
        onNewView={handleNewView}
      />
      {url && source && (
        <div className={classes.source}>
          <Typography className={classes.sourceTitle}>Source:&nbsp;</Typography>
          <Link underline="always" href={url} className={classes.sourceLink}>
            {source}
          </Link>
        </div>
      )}
    </div>
  );
}

Chart.propTypes = {
  indicator: PropTypes.shape({
    id: PropTypes.number,
    chart_configuration: PropTypes.shape({
      disableToggle: PropTypes.bool,
      defaultType: PropTypes.string,
    }),
    description: PropTypes.string,
    metadata: PropTypes.shape({
      source: PropTypes.string,
      url: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
};

Chart.defaultProps = {
  indicator: undefined,
  title: undefined,
};

export default Chart;
