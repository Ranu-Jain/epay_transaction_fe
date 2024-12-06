import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import '@/utils/i18n'
// import Home from '@/views/home/index'
import Index from './views';
import NotFound from './views/404'
import Failure from './views/failure'
import Success from './views/success';

import { GlobalStateProvider } from '@/context/globalStateProvider'
import "./index.css";

export const baseURL = import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById('root')!).render(
  <GlobalStateProvider>
    <BrowserRouter basename={baseURL}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Failure />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </GlobalStateProvider>
)
