import React, { useState } from 'react';
import MathView from 'react-math-view';
import './App.css';

function App() {
  const [powerSqrt, setPowerSqrt] = useState(null);
  const [valueSqrt, setValueSqrt] = useState(null);
  const [solutions, setSolutions] = useState([]);

  const [show, setShow] = useState(false);

  const executa = () => {
    setShow(true);
    getAllx();
  }

  const getAllx = () => {
    let newSolutions = [
      {
        i: 0,
        value: Math.floor(Math.pow(5, 1 / powerSqrt)),
        label: null,
      },
      {
        i: 1,
        value: Math.floor(Math.pow(5, 1 / powerSqrt)) - (Math.pow(Math.floor(Math.pow(5, 1 / powerSqrt)), powerSqrt) - valueSqrt) / (powerSqrt * Math.pow(Math.floor(Math.pow(5, 1 / powerSqrt)), powerSqrt - 1)),
        label: `x0 - (x0^${powerSqrt} - ${valueSqrt}) / (${powerSqrt} * x0^${powerSqrt - 1})`
      }
    ]

    let i = 1;

    while (Math.floor(newSolutions[i - 1].value * 100) != Math.floor(newSolutions[i].value * 100)) {
      newSolutions.push({
        i: i + 1,
        value: newSolutions[i].value - (Math.pow(newSolutions[i].value, powerSqrt) - valueSqrt) / (powerSqrt * Math.pow(newSolutions[i].value, powerSqrt - 1)),
        label: `x${i} - (x${i}^${powerSqrt} - ${valueSqrt}) / (${powerSqrt} * x${i}^${powerSqrt - 1})`
      })
      i = i + 1;
    }

    setSolutions([...newSolutions]);
  }


  return (
    <div className="App">
      <div>
        <div>
          Introdu puterea radicalului:
        </div>
        <input
          type="text"
          name="power"
          value={powerSqrt}
          onChange={(e) => setPowerSqrt(e.target.value)}
        />
        <br />
        <div>
          Introdu valoarea radicalului:
        </div>
        <input
          type="text"
          name="value"
          value={valueSqrt}
          onChange={(e) => setValueSqrt(e.target.value)}
        />
        <br />
        <button onClick={executa}>
          Calculeaza
        </button>
      </div>
      <br /><br />
      {
        powerSqrt && valueSqrt && show ? (
          <>
            <div>
              Scriem radicalul sub forma de functie:
            </div>
            <MathView
              value={`x^${powerSqrt} - ${valueSqrt} = 0`}
            />
            <div>
              Aflam derivata:
            </div>
            <MathView
              value={`${powerSqrt} * x^${powerSqrt - 1}`}
            />
            <div>
              Inlocuim in formula:
            </div>
            <MathView
              value={`xk+1 = xk - (xk^${powerSqrt} - ${valueSqrt}) / (${powerSqrt} * xk^${powerSqrt - 1})`}
            />
            <div>
              Calculam valoarea:
            </div>
            {
              solutions.map((item, index) => {
                return (
                  <div key={index}>
                    {
                      item.label && (
                        <MathView
                          value={`x${item.i} = ${item.label}`}
                        />
                      )
                    }
                    <MathView
                      value={`x${item.i} = ${item.value}`}
                    />
                    <br/>
                  </div>
                )
              })
            }
          </>
        ) : <></>
      }
    </div>
  );
}

export default App;
