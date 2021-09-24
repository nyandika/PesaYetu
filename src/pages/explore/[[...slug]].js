import { Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import ExplorePage from "@/pesayetu/components/ExplorePage";
import Panel from "@/pesayetu/components/HURUmap/Panel";
import Tutorial from "@/pesayetu/components/HURUmap/Tutorial";
import Page from "@/pesayetu/components/Page";
import { panelArgs } from "@/pesayetu/config";
import formatBlocksForSections from "@/pesayetu/functions/formatBlocksForSections";
import getPostTypeStaticProps from "@/pesayetu/functions/postTypes/getPostTypeStaticProps";
import fetchProfile from "@/pesayetu/utils/fetchProfile";

export default function Explore(props) {
  const {
    blocks: { tutorial },
  } = props;
  return (
    <Tutorial {...tutorial}>
      <Page {...props}>
        <Hidden smDown>
          <Panel {...panelArgs} />
        </Hidden>
        <ExplorePage {...props} />
      </Page>
    </Tutorial>
  );
}
Explore.propTypes = {
  blocks: PropTypes.shape({
    tutorial: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

Explore.defaultProps = {
  blocks: undefined,
};

const postType = "page";

function extractLocationCodes(props) {
  return (
    formatBlocksForSections(props?.post?.blocks)
      ?.featuredCounties?.counties?.split(",")
      ?.map((s) => s.trim().toLowerCase())
      ?.filter((l) => l) ?? []
  );
}

export async function getStaticPaths() {
  const { props } = await getPostTypeStaticProps({ slug: "explore" }, postType);
  const paths = extractLocationCodes(props).map((locationCode) => ({
    params: { slug: [locationCode] },
  }));

  return {
    paths,
    // since we'll only do redirect for new paths, blocking seem appropriate
    fallback: "blocking",
  };
}

export async function getStaticProps({ preview, previewData, params }) {
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    { slug: "explore" },
    postType,
    preview,
    previewData
  );
  if (notFound) {
    return {
      notFound,
    };
  }

  const blocks = formatBlocksForSections(props?.post?.blocks);
  const locationCodes = extractLocationCodes(props);
  const [originalCode] = params?.slug || ["ke"];
  const code = originalCode.toLowerCase();
  if (!locationCodes.includes(code)) {
    return {
      notFound: true,
    };
  }

  // Allow for case-insensitive code orhuman-reaable location names
  // appended to code e.g. ke/kenya,  47/nairobi
  if (code !== originalCode || params?.slug?.length > 1) {
    return {
      redirect: {
        destination: `/explore/${code}`,
        permanent: true,
      },
    };
  }

  const apiUri = process.env.HURUMAP_API_URL;
  const profile = await fetchProfile(apiUri, code);

  return {
    props: {
      ...props,
      apiUri,
      blocks,
      locationCodes,
      profile,
      variant: "explore",
    },
    revalidate,
  };
}
