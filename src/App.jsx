import { Routes, Route, useLocation } from "react-router";
import { AuthProvider } from "@/context/AuthContext";

// Layout & Global Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Problems from "@/pages/Problems";
import ProblemWorkspace from "@/pages/ProblemWorkspace";
import Profile from "@/pages/Profile";
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";

function App() {
  const location = useLocation();

  const isProblemsWorkspace = location.pathname.startsWith("/problems/") && location.pathname !== "/problems";
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showNavAndFooter = !isAdminRoute && !isProblemsWorkspace;

  return (
    <AuthProvider>
      {showNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/problems">
          <Route index element={<Problems />} />
          <Route path=":name" element={<ProblemWorkspace />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
      {showNavAndFooter && <Footer />}
    </AuthProvider>
  );
}

export default App;
