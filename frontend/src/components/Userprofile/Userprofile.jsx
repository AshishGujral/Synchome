import React, { useState } from "react";
import "./Userprofile.css";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useContext} from "react";
import {Context} from "../../context/Context"
const Userprofile= () => {
    const { user,dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [editMode, setEditMode] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);

    

  const handleEditClick = () => {
    setEditMode(!editMode);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
        type: "UPDATE_START",
      });
    try {
      const res = await axios.put("/api/users/"+user._id, {
        username,
        email,
        password,
      });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setEditMode(false);
    } catch (error) {
        dispatch({
            type: "UPDATE_FAILURE",
          });
          setError(true);
          console.log("hello"+error);
    }
  };


  return (
    <section className="main">
      <div className="container ">
        <div className="row">
          <div className="col1 gradient-custom">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="Avatar" className="img-fluid my-5" />
            <h5>{username}</h5>
            <IconButton onClick={handleEditClick}>
              <EditOutlinedIcon/>
            </IconButton>
          </div>
          
          <div className="col2">
            <div className="card-body">
              {editMode ? (
                <div>
                  <div className="child">
                    <h6>UserName</h6>
                    <input className="edit" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <hr className="mt-0 mb-4"/>
                  <div className="child">
                    <h6>Email</h6>
                    <input className="edit" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <hr className="mt-0 mb-4"/>
                  <div className="child-password">
                    <h6>Password</h6>
                    <div className="edit-password">
                      <input  className="edit" type={passwordVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}  >
                      </input>
                    </div>
                  </div>
                  <hr className="mt-0 mb-4"/>
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              ) : (
                <div>
                  <div className="child">
                    <h6>UserName</h6>
                    <p className="text-muted">{username}</p>
                  </div>
                  <hr className="mt-0 mb-4"/>
                  <div className="child">
                    <h6>Email</h6>
                    <p className="text-muted">{email}</p>
                  </div>
                  <hr className="mt-0 mb-4"/>
                  <div className="child">
                    <h6>Password</h6>
                    <input type="password" style={{ border: 'none', outline: 'none', background: 'none', boxShadow: 'none' }} 
                    value={password} disabled={true} />
                  </div>
                  <hr className="mt-0 mb-4"/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
 

  );
};

export default Userprofile;
