import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import Problems from './pages/Problems';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/problems" element={<Problems/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
