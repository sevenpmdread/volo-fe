
import {Route,Routes,Redirect,useParams,Navigate } from 'react-router-dom'
import Home from './Home';
import AddIcon from '@mui/icons-material/Add';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

import './app.css'
function App() {
  let { page } = useParams();
  return (
    <div className="App">
      <div className="Header">
<div className='title-left'>
       <div className='title'>
       Virtual cards
       </div>
       <button className='video-button'>
        <VideocamOutlinedIcon
        sx={{ fontSize: 20,color:'#67a9ff',marginRight:0.5 }}
        />
        Learn more
       </button>
       </div>

       <button className='createcard-button'>
        <AddIcon
        sx={{ fontSize: '1rem',color:'black',marginRight:1 }}
        />      Virtual Card
       </button>
      </div>
      <Routes path="/">
      <Route
        path="*"
        element={<Navigate to="/home/all" replace />}
    />
            <Route  path="/home/:page" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
