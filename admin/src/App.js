import '@fontsource-variable/montserrat';

import './App.css';
import Header from "./components/header/Header";
import LastUpdateSection from "./components/lastUpdateSection/LastUpdateSection";

function App() {
  return (
    <div className="App">
        <div className="container">
            <Header />
            <LastUpdateSection />
        </div>
    </div>
  );
}

export default App;
