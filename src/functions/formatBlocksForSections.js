import { camelCase } from "lodash";

function formatName(name) {
  return camelCase(name.split("/")[1]?.trim()); // converts blocks with other naming conversion to camel case, eg media-text to mediaText
}

function formatLazyBlockImage(image) {
  const data = JSON.parse(decodeURIComponent(image)) || null;
  return data?.url;
}

function formatLazyBlockIteratorContentWithImage(
  { items: itemsProps, ...rest },
  imgField
) {
  const items =
    JSON.parse(decodeURIComponent(itemsProps)).map((item) => {
      return {
        ...item,
        [imgField]: item[imgField]?.url,
      };
    }) || null;
  return { ...rest, items };
}

function format(block) {
  const { attributes, name } = block;
  switch (name) {
    case "lazyblock/explore-other-tools":
    case "lazyblock/data-visuals":
    case "lazyblock/data-insights":
      return formatLazyBlockIteratorContentWithImage(attributes, "image");
    case "lazyblock/other-hero":
      return {
        ...attributes,
        image: formatLazyBlockImage(attributes?.image),
        accentImage: formatLazyBlockImage(attributes?.accentImage),
      };
    case "lazyblock/hero":
    case "lazyblock/how-it-works":
    default:
      return attributes;
  }
}

export default function formatBlocksForSections(blocks) {
  const texts = blocks?.filter(
    ({ name }) => name === "core/heading" || name === "core/paragraph"
  );
  blocks?.push({ name: "core/texts", attributes: texts });

  return blocks.reduce((acc, cur) => {
    acc[formatName(cur.name)] = format(cur);
    return acc;
  }, {});
}
