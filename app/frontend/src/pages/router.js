import { createBrowserRouter } from 'react-router-dom';
import CameraPage from './CameraPage';
import App from '../App';

const router = createBrowserRouter([
  { path: '/', element:  <App/>},
  { path: '/camera', element: <CameraPage />},
]);

export default router;