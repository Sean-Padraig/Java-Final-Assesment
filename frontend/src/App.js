import './App.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from './pages/homePage';
import AddUserPage from './pages/addUserPage';
import UpdateUserPage from './pages/updateUserPage';
import BrowseUsersPage from './pages/browseUsersPage';
import DeleteUserPage from './pages/deleteUserPage';
//import AddUser from "./pages/AddUser"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/api/add-user" element={<AddUserPage />} />
        <Route path="/api/update-user" element={<UpdateUserPage />} />
        <Route path="/api/delete-user" element={<DeleteUserPage />} />
        <Route path="/api/browse/repository-users" element={<BrowseUsersPage />} />
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   <header className="App-header">
    //     <AddUser></AddUser>
    //   </header>
    // </div>
  );
}

export default App;
