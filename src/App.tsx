import React from 'react';
import './App.css';
import './form.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from './components/Container/Container';
import { Layout } from './components/Layout';
import { Step1, Step2, Step3 } from './pages/index';

function App() {
  return (
    <div className="App">
      <Container>
        <div className="form">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Step1 />} />
              <Route path="step2" element={<Step2 />} />
              <Route path="step3" element={<Step3 />} />
            </Route>
          </Routes>
        </div>
      </Container>
    </div>
  );
}

export default App;
