import logo from './logo.svg';
import './App.css';
import '@shopify/polaris/build/esm/styles.css'
import ApiDataFetcher from "./components/ApiDataFetcher";

function App() {
  return (
    <ApiDataFetcher />
  );
}

export default App;
