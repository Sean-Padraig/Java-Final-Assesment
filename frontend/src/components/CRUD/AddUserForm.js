import React, { useState, setState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";
//import './style.css'
function AddUserForm() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = () => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    console.log(user);
    axios.post(`http://localhost:8080/employees`, user).then((response) => {
      console.log(response.data);
    });
    //Router.push("/flights");
    return;
    //axios.post
  };

  return (
      <div className="form">
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="firstName">
              First Name{" "}
            </label>
            <input
              className="form__input"
              type="text"
              value={firstName}
              onChange={(e) => handleInputChange(e)}
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="lastname">
            <label className="form__label" for="lastName">
              Last Name{" "}
            </label>
            <input
              type="text"
              name=""
              id="lastName"
              value={lastName}
              className="form__input"
              onChange={(e) => handleInputChange(e)}
              placeholder="LastName"
            />
          </div>
          <div className="email">
            <label className="form__label" for="email">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              value={email}
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
            />
          </div>
          <div className="phoneNumber">
            <label className="form__label" for="phoneNumber">
              Phone Number{" "}
            </label>
            <input
              className="form__input"
              type="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => handleInputChange(e)}
              placeholder="phoneNumber"
            />
          </div>
        </div>
        <div class="footer">
          <button onClick={() => handleSubmit()} type="submit" class="btn">
            Post
          </button>
        </div>
      </div>
  );
}

export default AddUserForm;
