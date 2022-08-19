import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Register from './components/views/auth/Register/Register'
// import Error404 from './components/views/Error404/Error404'
import Login from './components/views/auth/Login/Login'
import Tasks from './components/views/Tasks/Tasks'

const Error404 = lazy(() => import('./components/views/Error404/Error404'))

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem('logged'))
    return <Navigate to="/login" replace={true} />
  return children
}

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

function App() {
  const location = useLocation()
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Tasks />
              </motion.div>
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback={<>...</>}>
                <Error404 />
              </Suspense>
            </motion.div>
          }
        />
        {/* <Register /> */}
      </Routes>
    </AnimatePresence>
  )
}

export default App
