import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivityPage from './Component/Pages/ActivityPage';
import ItemListPage from './Component/Pages/ItemListPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ActivityPage />} />
      <Route path="/detail/:idActivity" element={<ItemListPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
