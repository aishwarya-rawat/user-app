import { Suspense, lazy } from 'react'
import './App.css'
import { UserList } from './components/UserList';
import { Routes, Route } from "react-router-dom";
import { NotFound } from './pages/NotFound';
const UserDetails = lazy(() => import("./components/UserDetails"));

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path=":userId" element={
            <Suspense fallback={<>...</>}>
              <UserDetails />
            </Suspense>
          } />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
