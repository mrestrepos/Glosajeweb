export const setLinkStyles = (url = "", d = document) => {
  const setUrl = url?.replace(/.js$/g, ".css");
  if (
    Array.from(d.querySelectorAll("link[rel='stylesheet']")).some(
      ({
        href
      }) => href === setUrl
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

export const currentFileName = () => {
  const splitPath = document.location.pathname.split(/\//g)

  const criteria = new RegExp(/(\.php|\.html)/g)
  const viewName = splitPath.find(val => criteria.test(val))
  return viewName.replace(criteria, "")
}