import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import { Routes, Route, useLocation } from "react-router";
import Home from './pages/Home';
import Problems from './pages/Problems';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import QuestionDescription from './pages/QuestionDescription';
import Profile from './pages/Profile';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AdminProblems from './components/admin/AdminProblems';
import AdminUsers from './components/admin/AdminUsers';
import AdminAddProblem from './components/admin/AdminAddProblem';
import About from './pages/About';
import { Header } from './components/problem-description/Header';


// Admin layout with sidebar
const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="w-full flex">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger/>
          <Routes>
            <Route path="users" element={<AdminUsers/>} />
            <Route path="problems" element={<AdminProblems />} />
            <Route path="problems/add" element={<AdminAddProblem/>}/>
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

function App() {
  const location = useLocation();
  // console.log("location", location);
  return (
    <>
      {
        location?.pathname!=="/admin" && !location.pathname.startsWith("/problems/") && <Navbar />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/problems">
          <Route index element={<Problems />} />
          <Route path=":name" element={<QuestionDescription />} />
          <Route path=":slug" element={<Header/>} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
      {
        location?.pathname!=="/admin" && !location.pathname.startsWith("/problems/") && <Footer />
      }
    </>
  )
}

export default App
