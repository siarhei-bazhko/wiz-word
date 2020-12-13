import authConstants from "../contants/authenticationConstants"

const initState = { user: { pendingAuth: false, authMessage: "", userToken: null }};

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case authConstants.SIGN_UP_REQUEST:
      return { ...state, user: {
        pendingAuth: action.pendingAuth }}

    case authConstants.SIGN_UP_SUCCESS:
      return { ...state,
        user: {
          userToken: action.userToken,
          authMessage: action.msg,
          pendingAuth: action.pendingAuth,
        },
        }

    case authConstants.SIGN_UP_FAILURE:
      return { ...state,
        user: {
          pendingAuth: action.pendingAuth,
          authMessage: action.err,
      } }

    case authConstants.SIGN_IN_REQUEST:
      return {
        ...state,
        user: {
          authMessage: action.msg,
          pendingAuth: action.pendingAuth,
        }
      }

    case authConstants.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: { authMessage: action.msg,
        pendingAuth: action.pendingAuth,
        userToken: action.userToken
        }
      }

    case authConstants.SIGN_IN_FAILURE:
      return {
        ...state,
        user: {
        authMessage: action.err,
        pendingAuth: action.pendingAuth,
        }
    }

    case authConstants.SIGN_OUT_REQUEST:
      return {
        ...state,
        user: {
          authMessage: action.msg,
          pendingAuth: action.pendingAuth,
        }
      }

    case authConstants.SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: {
          authMessage: action.msg,
          userToken: action.userToken,
          pendingAuth: action.pendingAuth,
        }
      }

    case authConstants.SIGN_OUT_FAILURE:
      return {
        ...state,
        user: {
          authMessage: action.err,
          pendingAuth: action.pendingAuth,
        }
    }

    default:
      return state;
  }
}

export default authReducer
