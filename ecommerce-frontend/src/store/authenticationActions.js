// This will support async
import { authenticationActions } from "./authenticationSlice";
export const doLogin = () => {
  return async (dispatch) => {
    dispatch(authenticationActions.authenticate("DanhCute"));
  };
};
