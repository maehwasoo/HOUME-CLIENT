import { describe, expect, it } from 'vitest';

import { runSerializedInferenceTask } from './inferenceTaskScheduler';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

describe('runSerializedInferenceTask', () => {
  it('submitted tasks run in order without overlap', async () => {
    const timeline: string[] = [];
    let activeCount = 0;
    let peakConcurrency = 0;

    const makeTask = (name: string, delayMs: number) => async () => {
      timeline.push(`${name}:start`);
      activeCount += 1;
      peakConcurrency = Math.max(peakConcurrency, activeCount);
      await sleep(delayMs);
      activeCount -= 1;
      timeline.push(`${name}:end`);
      return name;
    };

    const [first, second, third] = await Promise.all([
      runSerializedInferenceTask(makeTask('first', 20)),
      runSerializedInferenceTask(makeTask('second', 5)),
      runSerializedInferenceTask(makeTask('third', 0)),
    ]);

    expect([first, second, third]).toEqual(['first', 'second', 'third']);
    expect(peakConcurrency).toBe(1);
    expect(timeline).toEqual([
      'first:start',
      'first:end',
      'second:start',
      'second:end',
      'third:start',
      'third:end',
    ]);
  });

  it('queue keeps draining after a task failure', async () => {
    const timeline: string[] = [];

    const failedTask = runSerializedInferenceTask(async () => {
      timeline.push('failed:start');
      await sleep(5);
      timeline.push('failed:error');
      throw new Error('expected failure');
    });

    const nextTask = runSerializedInferenceTask(async () => {
      timeline.push('next:start');
      await sleep(1);
      timeline.push('next:end');
      return 'ok';
    });

    await expect(failedTask).rejects.toThrow('expected failure');
    await expect(nextTask).resolves.toBe('ok');
    expect(timeline).toEqual([
      'failed:start',
      'failed:error',
      'next:start',
      'next:end',
    ]);
  });
});
