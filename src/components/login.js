import { GoogleLogin } from "react-google-login";

const client_id =
  "808665823142-af24qudscmqice38qgpda2mde8qplo20.apps.googleusercontent.com";

function Login(props) {
  const onSuccess = (res) => {
    console.log("SUCCESS", res);
    let email = res.profileObj.email;
    console.log("EMAIL", email);
    props.setEmail(email);
    props.setName(res.profileObj.givenName.charAt(0).toUpperCase() + res.profileObj.givenName.slice(1).toLowerCase() + ' ' + res.profileObj.familyName.charAt(0).toUpperCase() + res.profileObj.familyName.slice(1).toLowerCase());
  };

  const onFailure = (err) => {
    console.log("ERROR", err);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        client_id={client_id}
        buttonText={"Login"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
