import React, { useState } from "react";
import "./Userprofile.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Userprofile = () => {
  const { user, dispatch } = useContext(Context); // limitations of useContext
  const PF = "http://localhost:3000/images/";



  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("api/users/" + user._id, updatedUser);
      setSuccess(true);
      setEditMode(false);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <section className="main">
      <div className="container ">
        <form className="settingForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingPP">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic
                  ? PF + user.profilePic
                  : PF + "default-img.jpeg"
              }
              alt="profile pic"
            />
          </div>

          {editMode && (
            <>
              <label htmlFor="fileInput">
                Upload pic
                <i className="settingPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}
          <label>Username</label>
          {editMode ? (
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <h4>{user.username}</h4>
          )}

          <label>Email</label>
          {editMode ? (
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <h4>{user.email}</h4>
          )}

          {editMode && (
            <>
              <label>Password</label>

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className="settingSubmit" type="reset"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
          {editMode && (
            <button className="settingSubmit" type="submit">
              Update
            </button>
          )}
          {success && (
            <span
              style={{ color: "green", textAlign: "center", margin: "20px" }}
            >
              Profile is updated{" "}
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

export default Userprofile;
