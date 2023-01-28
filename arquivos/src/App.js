import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import Newproject from './components/pages/Newproject'
import Project from './components/pages/Project'

import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'


function App() {
  return (
    <div className="App">

      <Router>
        <Navbar/>
        <Container customClass="min-height">
          <Routes>         
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/projects" element={<Projects/>}></Route>
            <Route path="/company" element={<Company/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/newproject" element={<Newproject/>}></Route>
            <Route path="/project/:id" element={<Project/>}></Route>
          </Routes>
        </Container>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
