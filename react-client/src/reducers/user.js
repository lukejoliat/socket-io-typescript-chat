const user = (state = {}, { user, type }) => {
  switch (type) {
    case 'CREATE_USER':
      return user;
    default:
      return state;
  }
};
export default user;
