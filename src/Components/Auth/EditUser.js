import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { TextField } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";

import "./User.scss";

function EditUser() {
  const userAuth = useContext(AuthContext);

  useEffect(() => {
    userAuth.getUser();
  }, []);

  const [email, setEmail] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setPic] = useState("");

  useEffect(() => {
    setEmail(userAuth.user.email);
    setFirst(userAuth.user.firstName);
    setLast(userAuth.user.lastName);
    setPassword(userAuth.user.password);
    setPic(userAuth.user.profilePic);
  }, []);

  const handleInputChange = (e) => {};

  const updateUser = (e) => {
    userAuth.updateUser(
      email,
      firstName,
      lastName,
      password,
      profilePic,
      userAuth.user.id
    );
  };

  return (
    <div id='edit-page'>
      <div className='user-info'>
        <h1>You can edit your user info here</h1>
        <h3>Account Name</h3>
        <Tooltip title='Cannot edit username at this time!'>
          <TextField
            disabled
            className='edit-input'
            placeholder={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Tooltip>
        <br />
        <h3 className='edit-title'>First Name</h3>
        <TextField
          className='edit-input'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirst(e.target.value)}
        />
        <br />
        <h3 className='edit-title'>Last Name</h3>
        <TextField
          className='edit-input'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLast(e.target.value)}
        />
        <br />
        <h3 className='edit-title'>Password</h3>
        <TextField
          className='edit-input'
          type='password'
          autoComplete='new-password'
          placeholder='Password: '
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <h3 className='edit-title'>Profile Picture</h3>
        <TextField
          className='edit-input'
          placeholder='Profile Pic'
          value={profilePic}
          onChange={(e) => setPic(e.target.value)}
        />
        <br />

        <button className='update-user' onClick={() => updateUser()}>
          Update User
        </button>
      </div>
    </div>
  );
}

export default EditUser;
