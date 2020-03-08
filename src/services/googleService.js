export default class googleService {
  googleInit = () =>
    window.gapi.load("auth2", function() {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
        })
        .then(
          () => console.log("Inin OK"),
          () => console.log("Init ERR")
        );
    });

  signIn = () => {
    // let resUser = "";
    const isAuthOk = googleUser => {
      console.log("googleUser:", googleUser.getBasicProfile().getName());
      return googleUser.getBasicProfile();
    };

    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    return GoogleAuth.signIn({ scope: "profile email" }).then(isAuthOk, () =>
      console.log("Auth ERR")
    );
  };

  signOut = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    return GoogleAuth.signOut().then(
      () => console.log("Sign Out is OK"),
      () => console.log("Sign Out: Error")
    );
  };
}
