import { Route, Routes } from "react-router-dom";
import Account from "../components/User/Account";
import Profile from "../components/User/Profile";
import Configuration from "../components/User/Configuration";

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<Account />}>
        <Route path="account" element={<Profile />} />
        <Route path="account/configuration" element={<Configuration />} />
      </Route>
    </Routes>
  );
};

export default Users;
