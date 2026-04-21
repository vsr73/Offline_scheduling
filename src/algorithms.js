// ── Offline Algorithms ────────────────────────────────────────────────────────

export function minMin(etc) {
  const numMachines = etc[0].length;
  const machineAvail = new Array(numMachines).fill(0);
  const schedule = [];
  const steps = [];
  const unscheduled = Array.from({ length: etc.length }, (_, i) => i);

  while (unscheduled.length > 0) {
    const mct = unscheduled.map((task) => {
      let minTime = Infinity, minMachine = -1;
      for (let m = 0; m < numMachines; m++) {
        const ct = machineAvail[m] + etc[task][m];
        if (ct < minTime) { minTime = ct; minMachine = m; }
      }
      return { task, machine: minMachine, ct: minTime };
    });

    const selected = mct.reduce((best, curr) => (curr.ct < best.ct ? curr : best));
    schedule.push({ task: selected.task, machine: selected.machine, start: machineAvail[selected.machine], end: selected.ct });
    steps.push({ iteration: schedule.length, mctTable: mct.map((m) => ({ ...m })), selected: { ...selected }, machineAvailBefore: [...machineAvail] });
    machineAvail[selected.machine] = selected.ct;
    unscheduled.splice(unscheduled.indexOf(selected.task), 1);
  }

  return { schedule, makespan: Math.max(...machineAvail), steps, machineAvail: [...machineAvail] };
}

export function maxMin(etc) {
  const numMachines = etc[0].length;
  const machineAvail = new Array(numMachines).fill(0);
  const schedule = [];
  const steps = [];
  const unscheduled = Array.from({ length: etc.length }, (_, i) => i);

  while (unscheduled.length > 0) {
    const mct = unscheduled.map((task) => {
      let minTime = Infinity, minMachine = -1;
      for (let m = 0; m < numMachines; m++) {
        const ct = machineAvail[m] + etc[task][m];
        if (ct < minTime) { minTime = ct; minMachine = m; }
      }
      return { task, machine: minMachine, ct: minTime };
    });

    const selected = mct.reduce((best, curr) => (curr.ct > best.ct ? curr : best));
    schedule.push({ task: selected.task, machine: selected.machine, start: machineAvail[selected.machine], end: selected.ct });
    steps.push({ iteration: schedule.length, mctTable: mct.map((m) => ({ ...m })), selected: { ...selected }, machineAvailBefore: [...machineAvail] });
    machineAvail[selected.machine] = selected.ct;
    unscheduled.splice(unscheduled.indexOf(selected.task), 1);
  }

  return { schedule, makespan: Math.max(...machineAvail), steps, machineAvail: [...machineAvail] };
}

// ── Online Algorithms ─────────────────────────────────────────────────────────

/**
 * MCT — Minimum Completion Time (Online)
 * Each arriving task is immediately assigned to the machine with the
 * smallest completion time (availability + ETC).
 */
export function mct(etc) {
  const numTasks = etc.length;
  const numMachines = etc[0].length;
  const machineAvail = new Array(numMachines).fill(0);
  const schedule = [];
  const steps = [];

  for (let task = 0; task < numTasks; task++) {
    const ctList = Array.from({ length: numMachines }, (_, m) => ({
      machine: m,
      avail: machineAvail[m],
      execTime: etc[task][m],
      ct: machineAvail[m] + etc[task][m],
    }));

    const selected = ctList.reduce((best, curr) => (curr.ct < best.ct ? curr : best));

    schedule.push({ task, machine: selected.machine, start: machineAvail[selected.machine], end: selected.ct });
    steps.push({ iteration: task + 1, task, ctList: ctList.map((c) => ({ ...c })), selected: { ...selected }, machineAvailBefore: [...machineAvail] });
    machineAvail[selected.machine] = selected.ct;
  }

  return { schedule, makespan: Math.max(...machineAvail), steps, machineAvail: [...machineAvail] };
}

/**
 * MET — Minimum Execution Time (Online)
 * Each arriving task is immediately assigned to the machine with the
 * smallest ETC value, ignoring current machine availability.
 */
export function met(etc) {
  const numTasks = etc.length;
  const numMachines = etc[0].length;
  const machineAvail = new Array(numMachines).fill(0);
  const schedule = [];
  const steps = [];

  for (let task = 0; task < numTasks; task++) {
    const etcList = Array.from({ length: numMachines }, (_, m) => ({
      machine: m,
      avail: machineAvail[m],
      execTime: etc[task][m],
      ct: machineAvail[m] + etc[task][m],
    }));

    const selected = etcList.reduce((best, curr) => (curr.execTime < best.execTime ? curr : best));

    schedule.push({ task, machine: selected.machine, start: machineAvail[selected.machine], end: selected.ct });
    steps.push({ iteration: task + 1, task, ctList: etcList.map((c) => ({ ...c })), selected: { ...selected }, machineAvailBefore: [...machineAvail] });
    machineAvail[selected.machine] = selected.ct;
  }

  return { schedule, makespan: Math.max(...machineAvail), steps, machineAvail: [...machineAvail] };
}
