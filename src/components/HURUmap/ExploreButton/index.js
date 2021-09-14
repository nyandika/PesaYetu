import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState } from "react";

import useStyles from "./useStyles";

const TreeView = ({ items, ...props }) => {
  const [selected, setSelected] = useState();
  const classes = useStyles(props);
  if (!items || !items.length) {
    return null;
  }
  const handleChange = (event, href) => {
    setSelected(href);
  };
  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        orientation="vertical"
        value={selected}
        exclusive
        onChange={handleChange}
      >
        {items.map(({ href, icon }) => (
          <ToggleButton
            className={classes.button}
            classes={{ selected: classes.selected }}
            value={href}
            href={href}
          >
            <Image src={icon} width={27} height={27} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

TreeView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

TreeView.defaultProps = {
  items: undefined,
};

export default TreeView;
