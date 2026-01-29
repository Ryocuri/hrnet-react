import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/Layout';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import './App.css';

/**
 * Main App component
 * Sets up routing and Redux store provider
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/create-employee" replace />} />
            <Route path="create-employee" element={<CreateEmployee />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route path="*" element={<Navigate to="/create-employee" replace />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
