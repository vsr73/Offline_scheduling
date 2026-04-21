const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#f97316', '#ec4899', '#14b8a6', '#6366f1',
  '#84cc16', '#e11d48', '#0ea5e9', '#a855f7', '#22c55e',
  '#fb923c', '#38bdf8', '#c084fc', '#4ade80', '#fb7185',
];

export default function GanttChart({ schedule, numMachines, numTasks }) {
  if (!schedule || schedule.length === 0) return null;

  const makespan = Math.max(...schedule.map((s) => s.end));
  const BAR_H = 36;
  const ROW_H = BAR_H + 12;
  const LABEL_W = 72;
  const CHART_W = 600;
  const TICK_STEP = makespan <= 20 ? 1 : makespan <= 60 ? 5 : 10;

  const scale = (v) => (v / makespan) * CHART_W;

  return (
    <div className="gantt-wrapper">
      <div className="gantt-scroll">
        <svg
          viewBox={`0 0 ${LABEL_W + CHART_W + 20} ${numMachines * ROW_H + 40}`}
          width="100%"
          style={{ display: 'block', minWidth: 280 }}
        >
          {/* axis ticks */}
          {Array.from(
            { length: Math.floor(makespan / TICK_STEP) + 1 },
            (_, i) => i * TICK_STEP
          ).map((t) => (
            <g key={t}>
              <line
                x1={LABEL_W + scale(t)} y1={0}
                x2={LABEL_W + scale(t)} y2={numMachines * ROW_H}
                stroke="#e5e7eb" strokeWidth="1"
              />
              <text
                x={LABEL_W + scale(t)} y={numMachines * ROW_H + 14}
                textAnchor="middle" fontSize="10" fill="#6b7280"
              >
                {t}
              </text>
            </g>
          ))}

          {/* rows */}
          {Array.from({ length: numMachines }, (_, m) => (
            <g key={m}>
              <rect
                x={0} y={m * ROW_H}
                width="100%" height={ROW_H}
                fill={m % 2 === 0 ? '#f9fafb' : '#ffffff'}
              />
              <text
                x={LABEL_W - 8} y={m * ROW_H + ROW_H / 2 + 4}
                textAnchor="end" fontSize="12" fontWeight="600" fill="#374151"
              >
                M{m + 1}
              </text>
              {schedule
                .filter((s) => s.machine === m)
                .map((s) => (
                  <g key={s.task}>
                    <rect
                      x={LABEL_W + scale(s.start)}
                      y={m * ROW_H + 6}
                      width={Math.max(scale(s.end - s.start), 2)}
                      height={BAR_H}
                      fill={COLORS[s.task % COLORS.length]}
                      rx="4"
                    />
                    {scale(s.end - s.start) > 22 && (
                      <text
                        x={LABEL_W + scale(s.start) + scale(s.end - s.start) / 2}
                        y={m * ROW_H + 6 + BAR_H / 2 + 4}
                        textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff"
                      >
                        T{s.task + 1}
                      </text>
                    )}
                  </g>
                ))}
            </g>
          ))}

          {/* makespan line */}
          <line
            x1={LABEL_W + CHART_W} y1={0}
            x2={LABEL_W + CHART_W} y2={numMachines * ROW_H}
            stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3"
          />
        </svg>
      </div>

      {/* legend */}
      <div className="gantt-legend">
        {Array.from({ length: numTasks }, (_, i) => (
          <span key={i} className="legend-item">
            <span
              className="legend-dot"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            T{i + 1}
          </span>
        ))}
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#ef4444', borderRadius: 2 }} />
          Makespan
        </span>
      </div>
    </div>
  );
}
