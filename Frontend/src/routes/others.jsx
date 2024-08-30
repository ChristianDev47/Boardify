import { Route, Routes } from "react-router-dom";
import Board from "../components/Board";
import Invite from "../components/Invite";
import VerifyLink from "../components/VerifyLink";
import Table from "../components/Table";
import CalendarComponent from "../components/Calendar";

const Others = () => {
  return (
    <>
      <Routes>
        <Route path="/board/:id" element={<Board />} />
        <Route path="/board/:id/table" element={<Table />} />
        <Route path="/board/:id/calendar" element={<CalendarComponent />} />
        <Route path="/invite/accept-invitation/:id" element={<Invite />} />
        <Route path={"/invite/:linkId"} element={<VerifyLink />} />
      </Routes>
    </>
  );
};
export default Others;
