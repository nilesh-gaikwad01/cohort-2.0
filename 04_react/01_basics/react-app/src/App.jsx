import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import Footer from './components/Footer';
import Button from "./components/Button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Button/>
    <Footer/>
    </>
  );
}

export default App
