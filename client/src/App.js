
import './App.css';
import Create from './pages/Create/Create';
import Home from './pages/Home/Home';
import { Route,Routes } from 'react-router-dom';
import Play from './pages/Play/Play';
import QuizDetails from './pages/QuizDetails/QuizDetails';
import ScorePage from './pages/Score/Score';
import QuizCreated from './pages/QuizCreated/QuizCreated';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/create' element ={<Create/>}/>
        <Route path='/play' element ={<Play/>}/>
        <Route path="/quiz/:gamePin" element={<QuizDetails/>} />
        <Route path="/score" element={<ScorePage/>} />
        <Route path="/quiz-created" element={<QuizCreated />} />
      </Routes>
    </div>
  );
}

export default App;
