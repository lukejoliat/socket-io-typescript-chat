const messages = (state = [], { message, type }) => {
  switch (type) {
    case 'SEND_MESSAGE':
      return [...state, message];
    default:
      return state;
  }
};
export default messages;
