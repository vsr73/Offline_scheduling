import { useState } from 'react';
import OnlineAlgorithmInfo from './OnlineAlgorithmInfo';
import MatrixInput from './MatrixInput';
import OnlineResultPanel from './OnlineResultPanel';
import { mct, met } from '../algorithms';

export default function OnlinePage({ onBack }) {
  const [results, setResults] = useState(null);
  const [inputMeta, setInputMeta] = useState(null);

  function handleRun({ etc, algo }) {
    const numTasks = etc.length;
    const numMachines = etc[0].length;
    const mctRes = (algo === 'minmin' || algo === 'both') ? mct(etc) : null;
    const metRes = (algo === 'maxmin' || algo === 'both') ? met(etc) : null;
    setResults({ mctRes, metRes, algo });
    setInputMeta({ numTasks, numMachines });
  }

  const mctBetter =
    results?.mctRes && results?.metRes
      ? results.mctRes.makespan <= results.metRes.makespan
      : false;

  return (
    <main className="main">
      <div className="page-title page-title-row">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h1>MCT &amp; MET Online Scheduling</h1>
      </div>

      <OnlineAlgorithmInfo />

      <MatrixInput
        onRun={handleRun}
        algoLabels={{ minmin: 'MCT', maxmin: 'MET', both: 'Both' }}
      />

      {results && (
        <div className={results.algo === 'both' ? 'results-grid' : ''}>
          {results.mctRes && (
            <OnlineResultPanel
              result={results.mctRes}
              label="MCT — Minimum Completion Time"
              mode="mct"
              numTasks={inputMeta.numTasks}
              numMachines={inputMeta.numMachines}
              highlight={results.algo === 'both' && mctBetter}
            />
          )}
          {results.metRes && (
            <OnlineResultPanel
              result={results.metRes}
              label="MET — Minimum Execution Time"
              mode="met"
              numTasks={inputMeta.numTasks}
              numMachines={inputMeta.numMachines}
              highlight={results.algo === 'both' && !mctBetter}
            />
          )}
        </div>
      )}

      {results?.algo === 'both' && results.mctRes && results.metRes && (() => {
        const mctUtil = results.mctRes.schedule.reduce((s, e) => s + (e.end - e.start), 0) /
          (results.mctRes.makespan * inputMeta.numMachines) * 100;
        const metUtil = results.metRes.schedule.reduce((s, e) => s + (e.end - e.start), 0) /
          (results.metRes.makespan * inputMeta.numMachines) * 100;
        const utilBetter = mctUtil >= metUtil;
        return (
          <section className="card compare-card">
            <h2>Comparison Summary</h2>
            <table className="assign-table">
              <thead>
                <tr><th>Metric</th><th>MCT</th><th>MET</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Makespan</td>
                  <td className={mctBetter ? 'cell-best' : ''}>{results.mctRes.makespan.toFixed(2)}</td>
                  <td className={!mctBetter ? 'cell-best' : ''}>{results.metRes.makespan.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Avg Resource Utilization</td>
                  <td className={utilBetter ? 'cell-best' : ''}>{mctUtil.toFixed(1)}%</td>
                  <td className={!utilBetter ? 'cell-best' : ''}>{metUtil.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>Tasks Scheduled</td>
                  <td>{results.mctRes.schedule.length}</td>
                  <td>{results.metRes.schedule.length}</td>
                </tr>
                <tr>
                  <td>Machines Used</td>
                  <td>{new Set(results.mctRes.schedule.map((s) => s.machine)).size}</td>
                  <td>{new Set(results.metRes.schedule.map((s) => s.machine)).size}</td>
                </tr>
                <tr>
                  <td>Winner (Makespan)</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>
                    <strong>{mctBetter ? 'MCT' : 'MET'}</strong> achieves lower makespan by{' '}
                    <strong>{Math.abs(results.mctRes.makespan - results.metRes.makespan).toFixed(2)}</strong> units
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        );
      })()}
    </main>
  );
}
