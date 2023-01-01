import logo from './logo.svg';
import './App.css';
import WorldInput from './Components/WordInput';
import ViewWords from './Components/ViewWords';
import SideBar from './Components/SideBar';

function App() {
  return (
    <div className="App">
      <SideBar />
      <div id='main'>
        <WorldInput />
        <ViewWords />
      </div>
    </div>
  );
}

export default App;
