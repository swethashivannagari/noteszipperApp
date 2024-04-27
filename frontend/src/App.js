import {BrowserRouter, Routes,Route} from "react-router-dom"
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './screens/Landing/Landing';
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote"
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
import Profile from "./screens/Profile/Profile";

function App() {
const [search,setSearch]=useState("");
console.log(search);

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main style={{ minHeight: "93vh" }}>
        <Routes>
       <Route path='/' element={<Landing/>}/>
       <Route path='/mynotes' element={<MyNotes search={search}/>} exact/>
       <Route path='/login' element={<LoginScreen/>} />
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/register' element={<RegisterScreen/>}/>
       <Route path='/createnote' element={<CreateNote />}/>
       <Route path='/note/:id' element={<SingleNote/>}/>

       
       </Routes>
      </main>
      <Footer />

      </BrowserRouter>
  );
}

export default App;
