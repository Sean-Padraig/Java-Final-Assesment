import React, { useState, useEffect } from "react";
import EmployeeDataService from "../services/EmployeeService";

const Employee = props => {
  const initialEmployeeState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };
  
  

  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
  const [message, setMessage] = useState("");

  const getEmployee = id => {
    EmployeeDataService.get(id)
      .then(response => {
        setCurrentEmployee(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmployee(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const updateEmployee = () => {
    EmployeeDataService.update(currentEmployee.id, currentEmployee)
      .then(response => {
        console.log(response.data);
        setMessage("The Employee was updated successfully");
        props.history.push("/employees");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteEmployee = () => {
    EmployeeDataService.remove(currentEmployee.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/employees");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmployee ? (
        <div className="edit-form">
          <h4>Employee</h4>
          <form>
          <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                defaultValue={currentEmployee.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">First name</label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                name="firstName"
                defaultValue={currentEmployee.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Last name</label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                name="lastName"
                defaultValue={currentEmployee.lastName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phone-number"
                name="phoneNumber"
                defaultValue={currentEmployee.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteEmployee}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateEmployee}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Employee...</p>
        </div>
      )}
    </div>
  );
};

export default Employee;
