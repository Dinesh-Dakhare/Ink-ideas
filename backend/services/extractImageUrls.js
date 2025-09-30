export const extractImageUrls = (node) => {
  let urls = [];

  if (node.type === "image" && node.attrs?.src) {
    urls.push(node.attrs.src);
  }

  if (node.content) {
    node.content.forEach((child) => {
      urls = urls.concat(extractImageUrls(child));
    });
  }

  return urls;
};
