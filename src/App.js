import './App.css';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import BodyHeading from './components/BodyHeading';
import Pdf from './components/Pdf';
function App() {
  return (
    <>
      <Header />
      <BodyHeading />
      <Pdf />
    </>
  );
}

export default App;
