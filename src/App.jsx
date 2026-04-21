import { useState } from 'react';
import Header from './components/Header';
import AlgorithmInfo from './components/AlgorithmInfo';
import MatrixInput from './components/MatrixInput';
import ResultPanel from './components/ResultPanel';
import { minMin, maxMin } from './algorithms';
import './App.css';

export default function App() {
  const [results, setResults] = useState(null);
  const [inputMeta, setInputMeta] = useState(null);

  function handleRun({ etc, algo }) {
    const numTasks = etc.length;
    const numMachines = etc[0].length;
    const mm = (algo === 'minmin' || algo === 'both') ? minMin(etc) : null;
    const mx = (algo === 'maxmin' || algo === 'both') ? maxMin(etc) : null;
    setResults({ mm, mx, algo });
    setInputMeta({ numTasks, numMachines });
  }

  const mmBetter =
    results?.mm && results?.mx
      ? results.mm.makespan <= results.mx.makespan
      : false;

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="page-title">
          <h1>Min-Min &amp; Max-Min Offline Scheduling</h1>
          <p className="page-subtitle">
            Visualise and compare heuristic task scheduling on heterogeneous machines
          </p>
        </div>

        <AlgorithmInfo />
        <MatrixInput onRun={handleRun} />

        {results && (
          <div className={results.algo === 'both' ? 'results-grid' : ''}>
            {results.mm && (
              <ResultPanel
                result={results.mm}
                label="Min-Min Algorithm"
                numTasks={inputMeta.numTasks}
                numMachines={inputMeta.numMachines}
                highlight={results.algo === 'both' && mmBetter}
              />
            )}
            {results.mx && (
              <ResultPanel
                result={results.mx}
                label="Max-Min Algorithm"
                numTasks={inputMeta.numTasks}
                numMachines={inputMeta.numMachines}
                highlight={results.algo === 'both' && !mmBetter}
              />
            )}
          </div>
        )}

        {results?.algo === 'both' && results.mm && results.mx && (() => {
          const mmUtil = results.mm.schedule.reduce((s, e) => s + (e.end - e.start), 0) /
            (results.mm.makespan * inputMeta.numMachines) * 100;
          const mxUtil = results.mx.schedule.reduce((s, e) => s + (e.end - e.start), 0) /
            (results.mx.makespan * inputMeta.numMachines) * 100;
          const utilBetter = mmUtil >= mxUtil;
          return (
            <section className="card compare-card">
              <h2>Comparison Summary</h2>
              <table className="assign-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Min-Min</th>
                    <th>Max-Min</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Makespan</td>
                    <td className={mmBetter ? 'cell-best' : ''}>{results.mm.makespan.toFixed(2)}</td>
                    <td className={!mmBetter ? 'cell-best' : ''}>{results.mx.makespan.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Avg Resource Utilization</td>
                    <td className={utilBetter ? 'cell-best' : ''}>{mmUtil.toFixed(1)}%</td>
                    <td className={!utilBetter ? 'cell-best' : ''}>{mxUtil.toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>Tasks Scheduled</td>
                    <td>{results.mm.schedule.length}</td>
                    <td>{results.mx.schedule.length}</td>
                  </tr>
                  <tr>
                    <td>Machines Used</td>
                    <td>{new Set(results.mm.schedule.map((s) => s.machine)).size}</td>
                    <td>{new Set(results.mx.schedule.map((s) => s.machine)).size}</td>
                  </tr>
                  <tr>
                    <td>Winner (Makespan)</td>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      <strong>{mmBetter ? 'Min-Min' : 'Max-Min'}</strong> achieves lower makespan
                      by{' '}
                      <strong>
                        {Math.abs(results.mm.makespan - results.mx.makespan).toFixed(2)}
                      </strong>{' '}
                      units
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          );
        })()}
      </main>

      <footer className="footer">
        <p>Min-Min / Max-Min Scheduling Visualiser &mdash; Fog &amp; Edge Computing</p>
      </footer>
    </div>
  );
}
