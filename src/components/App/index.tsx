import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MultisigGenerator from '../MultisigGenerator';
import SegWitGenerator from '../SegWitGenerator';
import NavBar from './NavBar';

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/multisig" element={<MultisigGenerator />} />
          <Route path="/" element={<SegWitGenerator />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
