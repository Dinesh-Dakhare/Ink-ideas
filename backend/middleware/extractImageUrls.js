// utils/extractImageUrls.js

export const extractImageUrls = (contentJSON) => {
  const urls = [];

  const traverse = (node) => {
    if (!node) return;

    // If it's an image node — TipTap stores it as type 'image'
    if (node.type === "image" && node.attrs?.src) {
      urls.push(node.attrs.src);
    }

    // TipTap nodes can have nested content arrays
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach((child) => traverse(child));
    }
  };

  // Handle top-level content
  if (Array.isArray(contentJSON)) {
    contentJSON.forEach((node) => traverse(node));
  } else if (typeof contentJSON === "object") {
    traverse(contentJSON);
  }

  return urls;
};
