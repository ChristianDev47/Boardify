import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { Toaster } from 'react-hot-toast';
import { BoardProvider } from './context/board';
import { RecentsBoardsProvider } from './context/recentesBoards';
import Others from './routes/others';
import Users from './routes/user';
import WorkspaceRouter from './routes/workspace';
import BoardRouter from './routes/board';
import { ListProvider } from './context/list';
import { CardProvider } from './context/card';
import Principal from './components/PrincipalPage';
import Register from './components/Register';
import Login from './components/Login';
import WelcomePage from './components/WelcomePage';
import ProtectedRoute from './utils/protectedRoutes';
import Characteristics from './components/Characteristics';
import HowWorks from './components/HowWorks';
import About from './components/About';
import { ModalProvider } from './context/modal';

function App() {
  return (
    <AuthProvider>
      <BoardProvider>
        <ListProvider>
          <CardProvider>
            <RecentsBoardsProvider>
            <ModalProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Principal/>}/>
                  <Route path='/features' element={<Characteristics/>}/>
                  <Route path='/how_works' element={<HowWorks/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/inicio' element={<WelcomePage/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path="/" element={<ProtectedRoute />}>
                    <Route path={'/*'} element={<Others />} />
                    <Route path={'/user/*'} element={<Users />} />
                    <Route path={'/miespaciodetrabajo/*'} element={<WorkspaceRouter />} />
                    <Route path={'/board/:id/*'} element={<BoardRouter />} />
                  </Route>
                </Routes>
              </BrowserRouter>
              <Toaster position="bottom-right"/>
            </ModalProvider>
            </RecentsBoardsProvider>
          </CardProvider>
        </ListProvider>
      </BoardProvider>
    </AuthProvider>
  )
}

export default App