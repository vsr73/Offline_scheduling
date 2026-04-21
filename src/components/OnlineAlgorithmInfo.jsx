import { useState } from 'react';

export default function OnlineAlgorithmInfo() {
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
              <h3>MCT — Minimum Completion Time</h3>
              <p>
                An <strong>online</strong> algorithm — tasks arrive one at a time and are assigned
                immediately. For each arriving task, MCT computes the{' '}
                <strong>Completion Time</strong> on every machine (availability + ETC) and assigns
                it to the machine with the <strong>minimum CT</strong>.
              </p>
              <ol>
                <li>Task T<sub>i</sub> arrives.</li>
                <li>For each machine j: CT[j] = avail[j] + ETC[i][j].</li>
                <li>Assign to machine j* = argmin CT[j].</li>
                <li>Update avail[j*] = CT[j*].</li>
              </ol>
            </div>
            <div className="info-block">
              <h3>MET — Minimum Execution Time</h3>
              <p>
                Also <strong>online</strong>. Identical flow to MCT except the selection criterion
                ignores machine availability — it only looks at{' '}
                <strong>ETC[i][j]</strong> (raw execution time). This can leave fast machines
                overloaded while ignoring slower but currently idle ones.
              </p>
              <ol>
                <li>Task T<sub>i</sub> arrives.</li>
                <li>For each machine j: consider ETC[i][j] only.</li>
                <li>Assign to machine j* = argmin ETC[i][j].</li>
                <li>Update avail[j*] += ETC[i][j*].</li>
              </ol>
            </div>
          </div>
          <div className="info-note">
            <strong>Key difference:</strong> MCT considers machine load (availability); MET ignores
            it. MCT generally produces a lower makespan because it accounts for queue wait time.
          </div>
        </div>
      )}
    </section>
  );
}
