import '@fontsource-variable/montserrat';

import './App.css';
import Header from "./components/header/Header";
import LastUpdateSection from "./components/lastUpdateSection/LastUpdateSection";
import UpdateSection from "./components/updateSection/UpdateSection";

function App() {
  return (
    <div className="App">
        <div className="container">
            <Header />
            <LastUpdateSection />
            <UpdateSection />
        </div>
    </div>
  );
}

export default App;
