import { useState, useRef } from 'react';

const DEFAULT_TASKS = 4;
const DEFAULT_MACHINES = 3;

function buildMatrix(rows, cols, fill = '') {
  return Array.from({ length: rows }, () => Array(cols).fill(fill));
}

export default function MatrixInput({ onRun }) {
  const [numTasks, setNumTasks] = useState(DEFAULT_TASKS);
  const [numMachines, setNumMachines] = useState(DEFAULT_MACHINES);
  const [matrix, setMatrix] = useState(() => buildMatrix(DEFAULT_TASKS, DEFAULT_MACHINES, ''));
  const [algo, setAlgo] = useState('both');
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const fileRef = useRef();

  function resizeMatrix(newTasks, newMachines) {
    setMatrix((prev) =>
      Array.from({ length: newTasks }, (_, i) =>
        Array.from({ length: newMachines }, (_, j) => (prev[i]?.[j] ?? ''))
      )
    );
  }

  function handleTaskChange(e) {
    const v = Math.max(1, Math.min(20, Number(e.target.value)));
    setNumTasks(v);
    resizeMatrix(v, numMachines);
  }

  function handleMachineChange(e) {
    const v = Math.max(1, Math.min(20, Number(e.target.value)));
    setNumMachines(v);
    resizeMatrix(numTasks, v);
  }

  function handleCell(row, col, val) {
    setMatrix((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = val;
      return next;
    });
  }

  function parseCSV(text) {
    const lines = text.trim().split('\n').filter(Boolean);
    // skip header row if first cell is non-numeric (e.g. "Task", "Machine1" …)
    const startRow = isNaN(parseFloat(lines[0]?.split(',')[0])) ? 1 : 0;
    const rows = lines.slice(startRow).map((line) =>
      line.split(',').map((c) => c.trim())
    );
    // skip first column if it contains non-numeric labels (e.g. "T1", "T2" …)
    const firstColIsLabel = rows.every((r) => isNaN(parseFloat(r[0])));
    return firstColIsLabel ? rows.map((r) => r.slice(1)) : rows;
  }

  function handleCSV(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const rows = parseCSV(ev.target.result);
        const tasks = rows.length;
        const machines = Math.max(...rows.map((r) => r.length));
        setNumTasks(tasks);
        setNumMachines(machines);
        setMatrix(
          rows.map((r) =>
            Array.from({ length: machines }, (_, j) => r[j] ?? '')
          )
        );
        setError('');
      } catch {
        setError('Failed to parse CSV. Ensure it is a plain numeric matrix.');
      }
    };
    reader.readAsText(file);
  }

  function validate() {
    for (let i = 0; i < numTasks; i++) {
      for (let j = 0; j < numMachines; j++) {
        const v = parseFloat(matrix[i][j]);
        if (isNaN(v) || v < 0) {
          return `Cell [Task ${i + 1}, Machine ${j + 1}] has an invalid value.`;
        }
      }
    }
    return '';
  }

  function handleRun() {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setRunning(true);
    setTimeout(() => {
      const etc = matrix.map((row) => row.map((c) => parseFloat(c)));
      onRun({ etc, algo });
      setRunning(false);
    }, 320);
  }

  function loadExample() {
    const ex = [
      ['7', '3', '5'],
      ['5', '6', '4'],
      ['3', '8', '2'],
      ['6', '4', '7'],
    ];
    setNumTasks(4);
    setNumMachines(3);
    setMatrix(ex);
    setError('');
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Input — ETC Matrix</h2>
        <div className="card-header-actions">
          <button className="btn-outline" onClick={loadExample}>Load Example</button>
          <button className="btn-outline" onClick={() => fileRef.current.click()}>
            Upload CSV
          </button>
          <a className="btn-outline" href="/sample.csv" download style={{ textDecoration: 'none' }}>
            Sample CSV
          </a>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleCSV}
          />
        </div>
      </div>

      <div className="dim-row">
        <label>
          Tasks
          <input
            type="number" min="1" max="20" value={numTasks}
            onChange={handleTaskChange} className="dim-input"
          />
        </label>
        <label>
          Machines
          <input
            type="number" min="1" max="20" value={numMachines}
            onChange={handleMachineChange} className="dim-input"
          />
        </label>
      </div>

      <div className="matrix-scroll">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="matrix-corner">Task \ Machine</th>
              {Array.from({ length: numMachines }, (_, j) => (
                <th key={j}>M{j + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numTasks }, (_, i) => (
              <tr key={i}>
                <td className="matrix-row-label">T{i + 1}</td>
                {Array.from({ length: numMachines }, (_, j) => (
                  <td key={j}>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={matrix[i]?.[j] ?? ''}
                      onChange={(e) => handleCell(i, j, e.target.value)}
                      className="matrix-cell"
                      placeholder="0"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="algo-selector">
        <span className="algo-label">Algorithm:</span>
        {['minmin', 'maxmin', 'both'].map((a) => (
          <label key={a} className="radio-label">
            <input
              type="radio" name="algo" value={a}
              checked={algo === a} onChange={() => setAlgo(a)}
            />
            {a === 'minmin' ? 'Min-Min' : a === 'maxmin' ? 'Max-Min' : 'Both'}
          </label>
        ))}
      </div>

      {error && <p className="error-msg">{error}</p>}

      <button className="btn-primary" onClick={handleRun} disabled={running}>
        {running ? (
          <span className="btn-spinner-row">
            <span className="btn-spinner" />
            Computing…
          </span>
        ) : 'Run Scheduling'}
      </button>
    </section>
  );
}
