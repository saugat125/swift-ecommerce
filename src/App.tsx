import { Provider } from 'react-redux';
import Navbar from './components/organisms/Navbar';
import AppRoutes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster richColors position="top-right" duration={1500} />
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
