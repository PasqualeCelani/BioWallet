import { createBrowserRouter } from 'react-router-dom';
import CameraPage from './CameraPage';
import App from '../App';
import KeyPage from './KeyPage';

const router = createBrowserRouter([
  { path: '/', element:  <App/>},
  { path: '/camera', element: <CameraPage />},
  { path: '/keypage', element: <KeyPage />},
]);

export default router;