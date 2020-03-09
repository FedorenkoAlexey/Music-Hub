import { SET_GOOGLE_NAME } from "../actions/googleAuth";
import { IS_GOOGLE_AUTH } from "../actions/googleAuth";

const initState = {
  googleName: null,
  token: null,
  isAuth: false
};

export const googleReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_GOOGLE_NAME:
      return {
        ...state,
        googleName: action.payload
      };
    case IS_GOOGLE_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };
  }
  return state;
};
