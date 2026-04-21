import GanttChart from './GanttChart';
import StepTable from './StepTable';

function computeUtilization(schedule, numMachines, makespan) {
  const busyTime = new Array(numMachines).fill(0);
  schedule.forEach((s) => {
    busyTime[s.machine] += s.end - s.start;
  });
  const perMachine = busyTime.map((t) => (makespan > 0 ? (t / makespan) * 100 : 0));
  const overall = perMachine.reduce((a, b) => a + b, 0) / numMachines;
  return { perMachine, overall };
}

export default function ResultPanel({ result, label, numTasks, numMachines, highlight }) {
  if (!result) return null;

  const { perMachine, overall } = computeUtilization(
    result.schedule, numMachines, result.makespan
  );

  return (
    <section className={`card result-card ${highlight ? 'result-highlight' : ''}`}>
      <div className="result-header">
        <h2>{label}</h2>
        {highlight && <span className="badge-best">Best Makespan</span>}
        <div className="makespan-badge">
          Makespan: <strong>{result.makespan.toFixed(2)}</strong>
        </div>
        <div className="makespan-badge util-badge">
          Avg Resource Utilization: <strong>{overall.toFixed(1)}%</strong>
        </div>
      </div>

      {/* Resource Utilization */}
      <h3 className="section-label">Resource Utilization</h3>
      <div className="util-grid">
        {perMachine.map((u, i) => (
          <div key={i} className="util-item">
            <div className="util-machine-label">M{i + 1}</div>
            <div className="util-bar-track">
              <div
                className="util-bar-fill"
                style={{ width: `${u.toFixed(1)}%` }}
              />
            </div>
            <div className="util-pct">{u.toFixed(1)}%</div>
          </div>
        ))}
        <div className="util-item util-overall">
          <div className="util-machine-label">Overall</div>
          <div className="util-bar-track">
            <div
              className="util-bar-fill util-bar-overall"
              style={{ width: `${overall.toFixed(1)}%` }}
            />
          </div>
          <div className="util-pct util-pct-overall">{overall.toFixed(1)}%</div>
        </div>
      </div>

      {/* Schedule table */}
      <h3 className="section-label">Schedule Assignment</h3>
      <div className="assign-scroll">
        <table className="assign-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Machine</th>
              <th>Start</th>
              <th>End (CT)</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {result.schedule.map((s) => (
              <tr key={s.task}>
                <td>T{s.task + 1}</td>
                <td>M{s.machine + 1}</td>
                <td>{s.start.toFixed(2)}</td>
                <td>{s.end.toFixed(2)}</td>
                <td>{(s.end - s.start).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="section-label">Gantt Chart</h3>
      <GanttChart
        schedule={result.schedule}
        numMachines={numMachines}
        numTasks={numTasks}
      />

      <StepTable steps={result.steps} numMachines={numMachines} />
    </section>
  );
}
