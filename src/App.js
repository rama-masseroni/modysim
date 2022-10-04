import "./App.css";
import Header from "./Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <div style={{backgroundColor: "gray", flex: 1}}>
          <h2>test inputs</h2>
        </div>
        <div style={{backgroundColor: "turquoise", flex: 3}}>
          <h2>test display</h2>
        </div>
      </div>
    </div>
  );
}
