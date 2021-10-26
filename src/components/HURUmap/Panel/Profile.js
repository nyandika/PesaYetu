import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { forwardRef, useState, Fragment } from "react";

import Print from "@/pesayetu/assets/icons/print.svg";
import CategoryHeader from "@/pesayetu/components/HURUmap/CategoryHeader";
import LocationHeader from "@/pesayetu/components/HURUmap/LocationHeader";
import PinAndCompare from "@/pesayetu/components/HURUmap/PinAndCompare";
import SubcategoryHeader from "@/pesayetu/components/HURUmap/SubcategoryHeader";
import { hurumapArgs } from "@/pesayetu/config";
import slugify from "@/pesayetu/utils/slugify";

const Chart = dynamic(() => import("@/pesayetu/components/HURUmap/Chart"), {
  ssr: false,
});

const useStyles = makeStyles(({ typography, breakpoints, zIndex }) => ({
  profile: {
    marginLeft: typography.pxToRem(20),
    marginRight: typography.pxToRem(20),
    marginTop: typography.pxToRem(21),
    [breakpoints.up("md")]: {
      paddingLeft: typography.pxToRem(80),
      marginRight: typography.pxToRem(80),
    },
    [breakpoints.up("lg")]: {
      marginLeft: `max(calc((100vw - 1160px)/2 + 79px), 300px)`,
      marginTop: typography.pxToRem(0),
      marginRight: 0,
      width: typography.pxToRem(800),
      minHeight: "100%",
      paddingTop: typography.pxToRem(67.7),
      paddingLeft: typography.pxToRem(17),
      paddingRight: typography.pxToRem(17),
      zIndex: zIndex.drawer,
    },
  },
}));

const Profile = forwardRef(function Profile(
  {
    categories,
    dataNotAvailable,
    isPinning,
    locationCodes,
    onClickPin,
    onClickUnpin,
    onSelectLocation,
    primaryProfile,
    secondaryProfile,
    ...props
  },
  ref
) {
  const classes = useStyles(props);
  const [options] = useState(() => {
    const defaultOption = {
      disabled: true,
      label: "Select location",
      value: null,
    };
    const { geography, geometries } = primaryProfile;
    // siblings will be on the last element of the parents array.
    const siblings = geometries?.parents?.slice(-1)?.[0];
    const availableOptions =
      siblings?.features
        ?.filter(
          ({ properties: { code } }) =>
            code !== geography.code && locationCodes.includes(code)
        )
        ?.map(({ properties: { name: label, code: value } }) => ({
          label,
          value,
        })) || [];
    return [defaultOption, ...availableOptions];
  });
  const { pinAndCompare } = hurumapArgs;

  const handleClickPin = (e) => {
    if (onClickPin) {
      onClickPin(e);
    }
  };

  const handleClose = (e) => {
    // TODO(kilemensi): For some reason, e.target.value doesn't seem to work.
    const code = e.nativeEvent?.target?.dataset?.value;
    if (code) {
      if (onSelectLocation) {
        onSelectLocation({ code });
      }
    } else if (onClickUnpin) {
      onClickUnpin();
    }
  };

  const handleClick = (profile) => {
    if (primaryProfile && secondaryProfile) {
      return () => {
        if (onClickUnpin) {
          onClickUnpin(profile?.geography?.code);
        }
      };
    }
    return undefined;
  };

  const getSecondaryIndicator = (
    categoryIndex,
    subcategoryIndex,
    indicatorIndex
  ) => {
    const category = secondaryProfile?.items?.[categoryIndex];
    const subCategory = category?.children?.[subcategoryIndex];
    const indicator = subCategory?.children?.[indicatorIndex];
    return indicator;
  };
  return (
    <div className={classes.profile} ref={ref}>
      <LocationHeader
        variant="primary"
        icon={Print}
        title={primaryProfile.geography.name}
        onClick={handleClick(primaryProfile)}
        {...primaryProfile.geography}
      />
      <Hidden smDown implementation="css">
        {secondaryProfile ? (
          <LocationHeader
            variant="secondary"
            icon={Print}
            onClick={handleClick(secondaryProfile)}
            title={secondaryProfile.geography?.name}
            {...secondaryProfile.geography}
          />
        ) : (
          <PinAndCompare
            {...pinAndCompare}
            isPinning={isPinning}
            onClose={handleClose}
            onClickPin={handleClickPin}
            options={options}
          />
        )}
      </Hidden>
      {categories.map((category, categoryIndex) => (
        <Fragment key={category.tite}>
          <CategoryHeader
            description={category?.description}
            icon={category.icon}
            id={slugify(category.title)}
            title={category.title}
          />
          {category.children.map((child, subcategoryIndex) => (
            <Fragment key={child.title}>
              <SubcategoryHeader
                description={child?.description}
                id={slugify(child.title)}
                title={child.title}
              />
              {child.children.map(({ index, ...indicator }, indicatorIndex) => (
                <Chart
                  key={index}
                  variant="primary"
                  {...indicator}
                  geoCode={secondaryProfile?.geography?.code}
                  secondaryIndicator={getSecondaryIndicator(
                    categoryIndex,
                    subcategoryIndex,
                    indicatorIndex
                  )}
                  profileNames={{
                    primary:
                      indicator.indicator?.data?.length > 0
                        ? primaryProfile.geography.name
                        : `${primaryProfile.geography.name} ${dataNotAvailable}`,
                    secondary:
                      getSecondaryIndicator(
                        categoryIndex,
                        subcategoryIndex,
                        indicatorIndex
                      )?.indicator?.data?.length > 0
                        ? secondaryProfile?.geography?.name
                        : `${secondaryProfile?.geography?.name} ${dataNotAvailable}`,
                  }}
                />
              ))}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </div>
  );
});

Profile.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
      description: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  dataNotAvailable: PropTypes.string,
  isPinning: PropTypes.bool,
  locationCodes: PropTypes.arrayOf(PropTypes.string),
  onClickPin: PropTypes.func,
  onClickUnpin: PropTypes.func,
  onSelectLocation: PropTypes.func,
  primaryProfile: PropTypes.shape({
    geography: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
    geometries: PropTypes.shape({
      parents: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.arrayOf(
          PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.shape({})),
          })
        ),
      })
    ),
  }),
  secondaryProfile: PropTypes.shape({
    geography: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.arrayOf(
          PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.shape({})),
          })
        ),
      })
    ),
  }),
};

Profile.defaultProps = {
  categories: undefined,
  dataNotAvailable: undefined,
  isPinning: undefined,
  locationCodes: undefined,
  onClickPin: undefined,
  onClickUnpin: undefined,
  onSelectLocation: undefined,
  primaryProfile: undefined,
  secondaryProfile: undefined,
};

export default Profile;
