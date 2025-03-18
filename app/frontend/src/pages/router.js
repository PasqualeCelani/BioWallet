import { createBrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';
import CameraPage from './CameraPage';

const router = createBrowserRouter([
  { path: '/', element:  <Homepage/>},
  { path: '/camera', element: <CameraPage />},
]);

export default router;