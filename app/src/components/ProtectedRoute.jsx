import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../stores/UserStore';
import { observer } from 'mobx-react';
const ProtectedRoute = observer(({ children }) => {
    const userStore = useContext(userContext);
    if (!userStore.isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
});

export default ProtectedRoute;