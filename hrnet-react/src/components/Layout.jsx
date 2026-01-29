import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/Layout.css';

/**
 * Layout component with header and navigation
 * Wraps all pages with common UI elements
 */
function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>HRnet</h1>
          </Link>
          <nav className="nav">
            <Link 
              to="/create-employee" 
              className={`nav-link ${location.pathname === '/create-employee' || location.pathname === '/' ? 'active' : ''}`}
            >
              Create Employee
            </Link>
            <Link 
              to="/employee-list" 
              className={`nav-link ${location.pathname === '/employee-list' ? 'active' : ''}`}
            >
              Employee List
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2024 HRnet - Wealth Health</p>
      </footer>
    </div>
  );
}

export default Layout;