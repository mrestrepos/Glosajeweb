
const Memo = (component, componentName = '') => {
  let wrapper = {};

  const memoBy = componentName || component

  if (!(component in wrapper)) {
    wrapper[memoBy] = component
  }

  return wrapper[memoBy]
};

export default Memo;
