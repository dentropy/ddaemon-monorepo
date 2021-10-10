import logo from './logo.svg';
import './App.css';
//import { ElasticConnect } from './components/ElasticConnect';
function App() {
  //ElasticConnect()
  async function testBackend(){
    let response = await fetch('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "index": "dentropydaemon-keybase",
        "query": {
          "query": {
          "bool": {
              "must": [{
                  "exists": {
                      "field": "msg.content.type"
                  }
              }]
            }
          },
        "aggs": {
          "keys": {
            "terms": {
              "field": "msg.content.type"
            }
          }
        },
        "size": 0
          
        }
      } 
      )
    });
    console.log("Response")
    console.log( (await response.json()));
  }
  testBackend()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
