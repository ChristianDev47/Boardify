import { Route, Routes } from "react-router-dom";
import NavBoard from "../components/NavBoard";
import Board from "../components/Board";
import Table from "../components/Table";
import CalendarComponent from "../components/Calendar";

const BoardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBoard />}>
        <Route path="/" element={<Board />} />
        <Route path="/table" element={<Table />} />
        <Route path="/calendar" element={<CalendarComponent />} />
      </Route>
    </Routes>
  );
};

export default BoardRouter;
