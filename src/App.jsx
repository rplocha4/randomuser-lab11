import './App.css';
import RandomPeople from './components/RandomPeople';

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-800 flex-col gap-2">
      <RandomPeople />
    </div>
  );
}

export default App;
