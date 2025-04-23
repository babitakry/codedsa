import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import { Routes, Route } from "react-router";
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </>
  )
}

export default App
