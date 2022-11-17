import React, { useState } from "react";
import TutorialDataService from "../services/EmployeeService";

const AddEmployee = () => {
  const initialEmployeeEntry = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };
  const [employeeEntry, setEmployeeEntry] = useState(initialEmployeeEntry);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployeeEntry({ ...employeeEntry, [name]: value });
  };

  const saveEmployeeEntry = () => {
    var data = {
      title: employeeEntry.firstName,
      description: employeeEntry.lastName
    };

    TutorialDataService.create(data)
      .then(response => {
        setEmployeeEntry({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEmployeeEntry = () => {
    setEmployeeEntry(initialEmployeeEntry);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEmployeeEntry}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">First Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={employeeEntry.firstName}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={employeeEntry.lastName}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Email</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={employeeEntry.email}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={employeeEntry.phoneNumber}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveEmployeeEntry} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
