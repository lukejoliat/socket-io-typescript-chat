const dialogIsOpen = (state = false, { type }) => {
  switch (type) {
    case 'OPEN_DIALOG':
      return true;
    case 'CLOSE_DIALOG':
      return false;
    default:
      return state;
  }
};
export default dialogIsOpen;
