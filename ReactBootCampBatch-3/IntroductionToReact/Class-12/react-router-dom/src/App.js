import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Header from './layouts/Header';
import Company from './components/Company';
import Founder from './components/Founder';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="container">
       <BrowserRouter>
          <Header />
          <div className='container text-center'>
            <Routes>
              <Route index element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About  company='webdeveloper.bd' />}>
                  <Route  path='company/:name' element={<Company />} />
                  <Route  path='founder' element={<Founder />} />
              </Route>
              <Route path='/contact' element={<Contact />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
       </BrowserRouter>
    </div>
  );
}

export default App;
