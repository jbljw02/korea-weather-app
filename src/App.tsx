import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainPage } from './pages/main/ui/MainPage';
import { WeatherDetailPage } from './pages/detail/ui/WeatherDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<WeatherDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
