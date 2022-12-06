
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Store } from "../pages/client/store";
import { AccountMe } from "../hooks/accountMe"

const ClientRoutes = () => (
  <Routes>
    <Route path="/" element={<Store />} />
  </Routes>
);

export const LoggedInRouter = () => {
  const {data, loading, error} = AccountMe()
  // console.log("LoggedInRouter -> me - role: " + data.me.role)

  if (!data || loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide">Loading ...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" h-screen flex justify-start items-start">
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route {data.me.role === 'Client' && <ClientRoutes/>} /> */}
        <Route path="/" element={<ClientRoutes />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
