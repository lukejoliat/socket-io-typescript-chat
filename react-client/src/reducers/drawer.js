const drawerIsOpen = (state = false, { open, type }) => {
  switch (type) {
    case 'OPEN_DRAWER':
      return open;
    case 'CLOSE_DRAWER':
      return open;
    default:
      return state;
  }
};
export default drawerIsOpen;
