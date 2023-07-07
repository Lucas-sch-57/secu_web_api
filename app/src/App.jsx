import { Outlet } from 'react-router-dom';
import { userContext } from './stores/UserStore';
import { useContext } from 'react';
import { Nav } from './components/Nav';

const App = () => {
  const userStore = useContext(userContext);
  return (
    <>
      <userContext.Provider value={userStore}>
        <Nav />
        <Outlet />
      </userContext.Provider>
    </>
  )
}

export default App
