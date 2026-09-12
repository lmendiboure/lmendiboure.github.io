# Session 4 — Robustness planning note

Relocated from the earlier Session-1 ending:

- start from a defended design and an explicit assumption;
- inject a concrete incident;
- trace **broken assumption → affected responsibility/flow → requirement under pressure → minimum justified design change → residual dependency**;
- integrate retry/delivery semantics, duplicate effects, connectivity loss and degraded behaviour in the same robustness arc;
- introduce satellite/NTN only when terrestrial coverage is explicitly removed, distinguishing direct NTN access from satellite backhaul.

This is intentionally not a public student session yet.
