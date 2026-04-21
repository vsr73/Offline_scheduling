import { useState } from 'react';

export default function OnlineStepTable({ steps, mode }) {
  const [expanded, setExpanded] = useState(false);
  if (!steps || steps.length === 0) return null;

  const shown = expanded ? steps : steps.slice(0, 3);
  const valueLabel = mode === 'met' ? 'ETC (basis)' : 'CT';

  return (
    <div className="step-section">
      <h3 className="step-heading">Step-by-Step Execution</h3>
      {shown.map((step) => (
        <div key={step.iteration} className="step-card">
          <div className="step-iter">Iteration {step.iteration} — Assigning T{step.task + 1}</div>
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
                  <th>Machine</th>
                  <th>Avail</th>
                  <th>ETC</th>
                  <th>{valueLabel}</th>
                </tr>
              </thead>
              <tbody>
                {step.ctList.map((row) => (
                  <tr
                    key={row.machine}
                    className={row.machine === step.selected.machine ? 'selected-row' : ''}
                  >
                    <td>M{row.machine + 1}</td>
                    <td>{row.avail.toFixed(2)}</td>
                    <td>{row.execTime.toFixed(2)}</td>
                    <td>{(mode === 'met' ? row.execTime : row.ct).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="step-decision">
            Selected: <strong>M{step.selected.machine + 1}</strong>
            {mode === 'met'
              ? ` (min ETC = ${step.selected.execTime.toFixed(2)}, CT = ${step.selected.ct.toFixed(2)})`
              : ` (min CT = ${step.selected.ct.toFixed(2)})`}
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
