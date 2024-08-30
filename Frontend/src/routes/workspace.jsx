import { Route, Routes } from "react-router-dom";
import WorkSpace from "../components/WorkSpace";
import PrincipalBoardPage from "../components/workspace/Principal";
import YourBoards from "../components/YourBoards";
import Members from "../components/Members";

const WorkspaceRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkSpace />}>
        <Route path="/" element={<PrincipalBoardPage />} />
        <Route path="/boards" element={<YourBoards />} />
        <Route path="/members" element={<Members />} />
      </Route>
    </Routes>
  );
};

export default WorkspaceRouter;
