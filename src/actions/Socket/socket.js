import { openUtilsSocket, closeUtilsSocket } from './UtilsSocket';
import { openChatSocket, closeChatSocket } from './ChatSocket';
export function utils() {
  return (dispatch, getState) => {
    dispatch(openUtilsSocket());
    dispatch(openChatSocket());
  };
}

export function closeSocket() {
  return (dispatch, getState) => {
    dispatch(closeUtilsSocket());
    dispatch(closeChatSocket());
  };
}
