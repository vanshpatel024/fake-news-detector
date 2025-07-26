import Home from './Pages/Home';
import Notification from './Components/Notification';
import Header from './Components/Header';
import Footer from './Components/Footer';

import './index.css';
import './StyleSheets/App.css';

function App() {
  return (
    <>
      <Notification />
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Home />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
