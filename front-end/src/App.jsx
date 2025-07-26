import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router"

const Home = lazy(() => import('./components/Home.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const Signup = lazy(() => import('./components/Signup.jsx'));
const Add = lazy(() => import('./components/Add.jsx'))

const App = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/add" element={<Add/>} />
      </Routes>
    </Suspense>
  )
}

export default App;
