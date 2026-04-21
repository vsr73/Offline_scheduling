import { useState } from 'react';

export default function AlgorithmInfo() {
  const [open, setOpen] = useState(false);

  return (
    <section className="info-card">
      <button className="info-toggle" onClick={() => setOpen(!open)}>
        <span>About These Algorithms</span>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <path d="M4 6L9 12L14 6" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="info-body">
          <div className="info-grid">
            <div className="info-block">
              <h3>Min-Min Algorithm</h3>
              <p>
                At each iteration, computes the <strong>Minimum Completion Time (MCT)</strong> for
                every unscheduled task. Then selects the task with the{' '}
                <strong>smallest MCT</strong> and assigns it to the machine that achieves that
                minimum. Best for environments with many short tasks — maximises resource
                utilisation but may starve long tasks.
              </p>
              <ol>
                <li>For every unscheduled task, find its minimum CT across all machines.</li>
                <li>Pick the task whose minimum CT is the smallest of all.</li>
                <li>Assign it to the machine that gives that minimum CT.</li>
                <li>Update machine availability and repeat.</li>
              </ol>
            </div>
            <div className="info-block">
              <h3>Max-Min Algorithm</h3>
              <p>
                Identical to Min-Min, except in step 2 it picks the task whose minimum CT is the{' '}
                <strong>largest</strong>. This prioritises longer tasks first, giving them better
                machines, and schedules shorter tasks in the gaps — often yielding a lower makespan
                when task lengths vary widely.
              </p>
              <ol>
                <li>For every unscheduled task, find its minimum CT across all machines.</li>
                <li>Pick the task whose minimum CT is the <em>largest</em> of all.</li>
                <li>Assign it to the machine that gives that minimum CT.</li>
                <li>Update machine availability and repeat.</li>
              </ol>
            </div>
          </div>
          <div className="info-note">
            <strong>ETC Matrix:</strong> Each cell <em>ETC[i][j]</em> is the expected time for
            Task <em>i</em> to run on Machine <em>j</em>. Completion Time ={' '}
            <em>Machine Availability + ETC[i][j]</em>.
          </div>
        </div>
      )}
    </section>
  );
}
