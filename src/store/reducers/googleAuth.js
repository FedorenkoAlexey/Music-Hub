import { GOOGLE_AUTH_IN } from "../actions/googleAuth";

const initState = {
  googleName: null,
  token: null,
  isAuth: false
};

export const googleReducer = (state = initState, action) => {
  switch (action.type) {
    case GOOGLE_AUTH_IN:
      return {
        ...state,
        googleName: action.payload
      };
  }
  return state;
};
