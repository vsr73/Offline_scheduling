/**
 * Min-Min Scheduling Algorithm
 * Assigns the task with minimum completion time first, to the resource
 * that gives it minimum completion time.
 *
 * @param {number[][]} etc - Expected Time to Compute matrix (tasks x machines)
 * @returns {object} - schedule, makespan, steps
 */
export function minMin(etc) {
  const numTasks = etc.length;
  const numMachines = etc[0].length;
  const machineAvail = new Array(numMachines).fill(0);
  const schedule = [];
  const steps = [];
  const unscheduled = Array.from({ length: numTasks }, (_, i) => i);

  while (unscheduled.length > 0) {
    // Compute MCT for each unscheduled task
    const mct = unscheduled.map((task) => {
      let minTime = Infinity;
      let minMachine = -1;
      for (let m = 0; m < numMachines; m++) {
        const ct = machineAvail[m] + etc[task][m];
        if (ct < minTime) {
          minTime = ct;
          minMachine = m;
        }
      }
      return { task, machine: minMachine, ct: minTime };
    });

    // Find the task with minimum MCT
    const selected = mct.reduce((best, curr) => (curr.ct < best.ct ? curr : best));

    schedule.push({
      task: selected.task,
      machine: selected.machine,
      start: machineAvail[selected.machine],
      end: selected.ct,
    });

    steps.push({
      iteration: schedule.length,
      mctTable: mct.map((m) => ({ ...m })),
      selected: { ...selected },
      machineAvailBefore: [...machineAvail],
    });

    machineAvail[selected.machine] = selected.ct;
    unscheduled.splice(unscheduled.indexOf(selected.task), 1);
  }

  return {
    schedule,
    makespan: Math.max(...machineAvail),
    steps,
    machineAvail: [...machineAvail],
  };
}

/**
 * Max-Min Scheduling Algorithm
 * Assigns the task with maximum completion time first, to the resource
 * that gives it minimum completion time.
 *
 * @param {number[][]} etc - Expected Time to Compute matrix (tasks x machines)
 * @returns {object} - schedule, makespan, steps
 */
export function maxMin(etc) {
  const numTasks = etc.length;
  const numMachines = etc[0].length;
  const machineAvail = new Array(numMachines).fill(0);
  const schedule = [];
  const steps = [];
  const unscheduled = Array.from({ length: numTasks }, (_, i) => i);

  while (unscheduled.length > 0) {
    // Compute MCT for each unscheduled task
    const mct = unscheduled.map((task) => {
      let minTime = Infinity;
      let minMachine = -1;
      for (let m = 0; m < numMachines; m++) {
        const ct = machineAvail[m] + etc[task][m];
        if (ct < minTime) {
          minTime = ct;
          minMachine = m;
        }
      }
      return { task, machine: minMachine, ct: minTime };
    });

    // Find the task with MAXIMUM MCT
    const selected = mct.reduce((best, curr) => (curr.ct > best.ct ? curr : best));

    schedule.push({
      task: selected.task,
      machine: selected.machine,
      start: machineAvail[selected.machine],
      end: selected.ct,
    });

    steps.push({
      iteration: schedule.length,
      mctTable: mct.map((m) => ({ ...m })),
      selected: { ...selected },
      machineAvailBefore: [...machineAvail],
    });

    machineAvail[selected.machine] = selected.ct;
    unscheduled.splice(unscheduled.indexOf(selected.task), 1);
  }

  return {
    schedule,
    makespan: Math.max(...machineAvail),
    steps,
    machineAvail: [...machineAvail],
  };
}
