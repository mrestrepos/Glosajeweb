export const setLinkStyles = (url = "", d = document) => {
  const setUrl = url?.replace(/.js$/g, ".css");
  if (
    Array.from(d.querySelectorAll("link[rel='stylesheet']")).some(
      ({ href }) => href === setUrl
    )
  ) {
    return;
  }
  const link = d.createElement("link");

  link.rel = "stylesheet";
  link.href = setUrl;

  d.head.appendChild(link);
};

export const getPath = (extname, url = "") => {
  return url?.replace(/.js$/g, extname);
}