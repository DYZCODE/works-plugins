# WORKS Public Evidence

## Paired Multistack Pilot v2

Decision: `scale_to_100`.

This experiment compared the same repair prompt with and without the WORKS
verifier over 20 randomized pairs:

- two runtimes: Node 24 and Python 3.13;
- four synthetic repository shapes;
- five tasks per shape;
- two hidden mutations per task;
- one model configuration: `gpt-5.6-sol/low`;
- five WORKS verification calls maximum;
- six minutes maximum per arm.

| Metric | Control | WORKS |
| --- | ---: | ---: |
| Passed | 6/20 | 20/20 |
| Success rate | 30% | 100% |
| Median wall time | 132.2 s | 155.9 s |
| Median input tokens | 187,985 | 288,073 |
| Output tokens total | 94,267 | 92,124 |

WORKS added 14 successful repairs, increased median wall time by 17.97%, and
increased median input tokens by 53.24%. Its verifier was selected in all 20
WORKS arms. Median verification calls were two and the maximum was five. One
infrastructure error produced a 5% rate, exactly at the frozen ceiling.

Files:

- `paired-value-multistack-pilot-v2.json`: raw bounded task metrics;
- `paired-value-multistack-pilot-v2.score.json`: deterministic aggregate score.

SHA-256:

```text
8307ed5eb3de2b1e4e0ada0a08d35ace9d38cdeb0b684487aecdb9bdb3481cd1  paired-value-multistack-pilot-v2.json
6054e7d3a63a8d655417778949d1bdab4ce5ee9aa4bbcce40e03d0fc572eb349  paired-value-multistack-pilot-v2.score.json
```

## Limits

This is technical evidence, not market evidence. The repositories are synthetic,
the run used one model/version, and it does not measure organic users, retention,
willingness to pay, production repairs, or dollar unit economics. The valid next
step is a larger technical run while billing remains disabled.
