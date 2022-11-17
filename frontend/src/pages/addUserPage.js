import AddUserForm from "../components/CRUD/AddUserForm";

const AddUserPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Add users page</h1>
      <AddUserForm/>
    </div>
  );
};

export default AddUserPage;
