import "./App.css";
import Header from "./Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <div className="inputs" >
          <h2>test inputs</h2>
        </div>
        <div className="display">
          <h2>test display</h2>
        </div>
      </div>
    </div>
  );
}
