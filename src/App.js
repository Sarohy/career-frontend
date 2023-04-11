import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import {
  Login,
  Signup,
  EmailVerification,
  ForgetPassword,
  NewPasword,
} from "./components/authComponents";
import CareerDashboard from "./components/Careerdashboard";
import PublicRoute from "./routes/PublicRouting";
import PrivateRoute from './routes/PrivateRouting'
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute restricted>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute restricted>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forget-password"
          element={
            <PublicRoute restricted>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/email-verification"
          element={
            <PublicRoute restricted>
              <EmailVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/new-password"
          element={
            <PublicRoute restricted>
              <NewPasword />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PublicRoute >
              <CareerDashboard/>
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
