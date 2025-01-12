import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "./Pages/Main";
// import UploadPage from "./Components/UploadPage";
// import SignUp from "./Components/SignUp";
// import Login from "./Components/Login";
// import Dashboard from "./Components/UserDashboard";

import { wsConnect } from "./Network/webSocket";

const App = () => {
  const [webSocket, setWebSocket] = useState(null);
  // Loads on initial render, opens websocket to hardware server
  useEffect(() => {
    setWebSocket(wsConnect());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main webSocket={webSocket}/>}></Route>
        {/* <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/user/dashboard" element={<Dashboard></Dashboard>}></Route> */}
      </Routes>
    </Router>
  );
};

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// const App = () => {
//   const [count, setCount] = useState(0)
//   var input = document.querySelector('input[type="file"]')

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App;
