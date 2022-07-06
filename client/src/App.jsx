import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import "antd/dist/antd.min.css";

import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </>
  )
};
