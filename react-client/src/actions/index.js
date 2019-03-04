export function sendMessage(message) {
  return {
    type: 'SEND_MESSAGE',
    message
  };
}
export function createUser(user) {
  return {
    type: 'CREATE_USER',
    user
  };
}
export function openDialog() {
  return {
    type: 'OPEN_DIALOG'
  };
}
export function closeDialog() {
  return {
    type: 'CLOSE_DIALOG'
  };
}
export function openDrawer() {
  return {
    type: 'OPEN_DRAWER',
    open: true
  };
}
export function closeDrawer() {
  return {
    type: 'CLOSE_DRAWER',
    open: false
  };
}
