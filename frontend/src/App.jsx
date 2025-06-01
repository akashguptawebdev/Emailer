
import './App.css'
import CreateNewTemplate from './component/CreateNewTemplate';
import NavBar from './component/NavBar';
import SendEmail from './component/SendEmail';
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
function App() {
  const Layout = () => {
  return (
    <>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
};

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="send-email" element={<SendEmail />} />
          <Route path="create-template" element={<CreateNewTemplate />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
