import axios from "axios";
import { useRef, useState, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const Login = () => {
  const [toggleState, setToggleState] = useState(0); // toggle login/signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const toggleLogin = (index) => {
    setToggleState(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && setToggleState(0);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try {
      const res = await axios.post("/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
      navigate("/");
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
      });
      setError(true);
    }
  };

  // console.log(user);
  return (
    <div className="login">
      <div
        className={
          toggleState === 1 ? "container right-panel-active" : "container"
        }
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            <span>use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
            {error && <span>Something went wrong!</span>}
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign in</h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            {/* <span>or use your account</span> */}
            <input type="text" placeholder="Username" ref={userRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <a href="#">Forgot your password?</a>
            <button type="submit" disabled={isFetching}>
              Sign In
            </button>
            {error && <span className="error">Invalid username or password</span>} 
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => toggleLogin(0)}
                className="ghost"
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                onClick={() => {
                  toggleLogin(1);
                }}
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <footer>
	<p>
		Created with <i className="fa fa-heart"></i> by
		<a target="_blank" href="https://florin-pop.com">Florin Pop</a>
		- Read how I created this and how you can join the challenge
		<a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
	</p>
</footer> */}
    </div>
  );
};

export default Login;
