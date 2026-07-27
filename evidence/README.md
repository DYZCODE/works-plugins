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

## Scale v3 early stop

Decision: `kill_or_pivot`.

The frozen 100-pair plan stopped at task 34 because the third WORKS-arm error
made its final 2% error budget mathematically unreachable.

| Metric | Control | WORKS |
| --- | ---: | ---: |
| Decisive passes | 15/30 | 22/30 |
| Success rate | 50.00% | 73.33% |
| Median wall time | 141.3 s | 141.0 s |
| Median input tokens | 191,463 | 242,091 |
| Arm errors | 1 | 3 |

WORKS improved success by 23.33 points but missed the frozen input-token limit
at 26.44%. Two WORKS agents crossed the six-minute cutoff and one launch failed
when the selected model was at capacity. Verifier errors were zero, but the
end-to-end policy counts all arm errors.

## Authoritative-early corrective canary

Decision: `adopt_authoritative_early`.

Four known v3 failures were rerun with instructions to verify after one coherent
repair, use compact failed-step guidance, avoid reading the full receipt, and
stop after `passed`.

| Metric | v3 arms | Corrective arms |
| --- | ---: | ---: |
| Passed | 0/4 | 4/4 |
| Median input tokens | 354,233 | 112,233 |
| Median wall time | 290.0 s | 95.5 s |
| Median verifier calls | 2 | 1.5 |
| Full receipt reads | not instrumented | 0 |

Files and SHA-256:

```text
abfb91bc40204a9d14691fa609426ad6c73f5a0481e6096a00e82942b23d87b3  paired-value-multistack-scale-v3.json
22c287f1e5fe074d0b6d1fc8b0c952d985a112676a84e0b5042809c7cbb6d51f  paired-value-multistack-scale-v3.early-stop.score.json
547a11bfcddcefc5768dd1ef3f7ec62d1243554eea3229e5efeece10917774cf  paired-response-priority-canary-v3.json
a7f9a4a6dd1c1510a18f42a5b8647ea43b236f7933bc5320ddb9017ab8b15d7b  paired-response-priority-canary-v3.score.json
```

## Reserved authoritative holdout v4b

Decision: `scale_to_100`.

The successor holdout excluded all 46 tasks observed in v3 and the first
holdout, then froze 20 primary tasks and four balanced reserves before
execution.

| Metric | Control | WORKS |
| --- | ---: | ---: |
| Decisive passes | 7/23 | 21/23 |
| Success rate | 30.43% | 91.30% |
| Median wall time | 118.5 s | 65.2 s |
| Median input tokens | 178,901 | 142,329 |
| Output tokens total | 114,780 | 41,236 |

WORKS added 14 successful repairs, reduced median wall time by 45.01%, and
reduced median input tokens by 20.44%. Verifier selection was 100%, calls had
median two and maximum three, and one of 24 WORKS arms timed out. All runtime
and fixture segments met the frozen coverage and non-regression rules. The
paired table contained 14 WORKS-only passes and zero control-only passes
(two-sided exact McNemar p = 0.0001220703125).

Two Python `webhook + welcome + checkout` tasks failed in both arms. The
excluded Node layered task in the same family reached the strict six-minute
WORKS limit.

Files and SHA-256:

```text
fdabe7408c72eca4dcf2c7c8a839c7e2417e33f4a47768f4290be162762750c6  paired-value-authoritative-holdout-v4b.json
b6545df30489fc5d419cbb74955de9929a9fdc1c498b7556093e2f3e4d92065c  paired-value-authoritative-holdout-v4b.score.json
```

## Limits

This is technical evidence, not market evidence. The repositories are synthetic,
the run used one model/version, and it does not measure organic users, retention,
willingness to pay, production repairs, or dollar unit economics. The valid next
step is organic activation measurement while billing remains disabled.
