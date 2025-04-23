import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import UsersPage from './pages/UsersPage';
import AuditPage from './pages/AuditPage';
import LoginForm from './components/forms/LoginForm';
import useStore from './store';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                isAuthenticated ? (
                  <Navigate to="/users" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="users"
              element={
                isAuthenticated ? (
                  <UsersPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="audit"
              element={
                isAuthenticated ? (
                  <AuditPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
