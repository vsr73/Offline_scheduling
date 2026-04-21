import { useState } from 'react';

export default function StepTable({ steps, numMachines }) {
  const [expanded, setExpanded] = useState(false);

  if (!steps || steps.length === 0) return null;

  const shown = expanded ? steps : steps.slice(0, 3);

  return (
    <div className="step-section">
      <h3 className="step-heading">Step-by-Step Execution</h3>
      {shown.map((step) => (
        <div key={step.iteration} className="step-card">
          <div className="step-iter">Iteration {step.iteration}</div>
          <div className="step-avail">
            Machine availability before:{' '}
            {step.machineAvailBefore.map((v, i) => (
              <span key={i} className="avail-chip">M{i + 1}: {v}</span>
            ))}
          </div>
          <div className="step-mct-scroll">
            <table className="step-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Best Machine</th>
                  <th>MCT</th>
                </tr>
              </thead>
              <tbody>
                {step.mctTable.map((row) => (
                  <tr
                    key={row.task}
                    className={row.task === step.selected.task ? 'selected-row' : ''}
                  >
                    <td>T{row.task + 1}</td>
                    <td>M{row.machine + 1}</td>
                    <td>{row.ct.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="step-decision">
            Selected: <strong>T{step.selected.task + 1}</strong> → M{step.selected.machine + 1}{' '}
            (CT = {step.selected.ct.toFixed(2)})
          </div>
        </div>
      ))}
      {steps.length > 3 && (
        <button className="btn-outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : `Show all ${steps.length} iterations`}
        </button>
      )}
    </div>
  );
}
