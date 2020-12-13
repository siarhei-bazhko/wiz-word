import authConstants from "../contants/authenticationConstants"

/** Sign Up */
const signUpRequest = () => ({ type: authConstants.SIGN_UP_REQUEST, pendingAuth: true })

const signUpSuccess = (uid: string) =>
({ type: authConstants.SIGN_UP_SUCCESS, userToken: uid, pendingAuth: false, msg: "SignUp success!" })

const signUpFailure = (err) =>
({ type: authConstants.SIGN_UP_FAILURE, pendingAuth: false, err })


/* Sign In */
const signInRequest = () => ({ type: authConstants.SIGN_IN_REQUEST, pendingAuth: true })

const signInSuccess = (uid: string) =>
({ type: authConstants.SIGN_IN_SUCCESS, userToken: uid, pendingAuth: false, msg: "SignIn success!" })

const signInFailure = (err) =>
({ type: authConstants.SIGN_IN_FAILURE, pendingAuth: false, err })

/* Sign OUT */
const signOutRequest = () => ({ type: authConstants.SIGN_OUT_REQUEST, pendingAuth: true })

const signOutSuccess = () =>
({ type: authConstants.SIGN_OUT_SUCCESS, userToken: null, pendingAuth: false, msg: "SignOut success!" })

const signOutFailure = (err) =>
({ type: authConstants.SIGN_OUT_FAILURE, pendingAuth: false, err })


export {
  signUpFailure,
  signUpSuccess,
  signUpRequest,

  signInFailure,
  signInSuccess,
  signInRequest,

  signOutFailure,
  signOutSuccess,
  signOutRequest
}
