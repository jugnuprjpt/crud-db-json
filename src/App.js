import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import EmpListing from './Employe/EmpListing';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
       <Route path = "/" element={<EmpListing/>} ></Route>
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
