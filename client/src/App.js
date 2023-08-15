import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Public from './components/public/Public'
import RoutesConfig from './routes/routes'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
const App = () => {
    return (
        <>
            <RoutesConfig></RoutesConfig>
            <ToastContainer />
        </>
    )
};

export default App;
