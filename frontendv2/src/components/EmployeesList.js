import React, { useState, useEffect, useMemo, useRef } from "react";
import EmployeeDataService from "../services/EmployeeService";
import { useTable } from "react-table";

const EmployeesList = (props) => {
  const [employees, setEmployees] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const employeesRef = useRef();

  employeesRef.current = employees;

  useEffect(() => {
    retrieveEmployees();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchEmail(searchTitle);
  };

  const retrieveEmployees = () => {
    EmployeeDataService.getAll()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveEmployees();
  };

  const removeAllEmployees = () => {
    EmployeeDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByEmail = () => {
    EmployeeDataService.findByEmail(searchEmail)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openEmployee = (rowIndex) => {
    const id = employeesRef.current[rowIndex].id;

    props.history.push("/tutorials/" + id);
  };

  const deleteEmployee = (rowIndex) => {
    const id = employeesRef.current[rowIndex].id;

    EmployeeDataService.remove(id)
      .then((response) => {
        props.history.push("/tutorials");

        let newTutorials = [...employeesRef.current];
        newTutorials.splice(rowIndex, 1);

        setEmployees(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "First name",
        accessor: "fname",
      },
      {
        Header: "Last name",
        accessor: "lname",
      },
      {
        Header: "Phone number",
        accessor: "pnumber",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openEmployee(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteEmployee(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: employees,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchEmail}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEmail}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllEmployees}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default EmployeesList;
