import React from "react";
import "./App.css";
import Header from "./Header";
import Member from "./pages/Member";
import Paket from "./pages/Paket";
import User from "./pages/User";
import Transaksi from "./pages/Transaksi";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import FormTransaksi from "./pages/FormTransaksi";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";


export default function App(){
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar><Dashboard /></Navbar>} />
          <Route path="/auth" element={<Login />} />
          <Route path="/member"
              element={<Navbar><Member /></Navbar>} />
          <Route path="/paket" 
              element={<Navbar><Paket /></Navbar>} />
          <Route path="/user" 
              element={<Navbar><User /></Navbar>} />
          <Route path="/transaksi" 
              element={<Navbar><Transaksi /></Navbar>} />
          <Route path="/form_transaksi"
              element={<Navbar><FormTransaksi /></Navbar>} />
        </Routes>
        <Footer></Footer>
    </BrowserRouter>
  );
} 

function Home() {
  return <h2>Home</h2>;
}