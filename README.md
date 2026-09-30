# Jev Decision Lab

A small, browser-based workbench for designing typed decisions to test in the [TypeSafe Jev Playground](https://console.typesafe.ai/playground).

Choose a scenario, edit its context, and copy a valid Jev `questions` JSON object. Then run it in TypeSafe's Playground and change one fact to see how the answers and probabilities move.

## Why this exists

Many useful product decisions are bounded: which team should review a request, how urgent is a report, or does a case meet a defined condition? Jev is designed to return typed answers to questions like these. This workbench helps make the decision and its answer space explicit before connecting a model to an application.

The examples cover enterprise assessment triage, security incident triage, product feedback, and leadership interview coaching.

## Try it

1. Open [`index.html`](./index.html) in a modern browser.
2. Choose one of the four scenarios. Edit the State text if you want to change the facts.
3. Copy the state and questions into the matching areas in the [TypeSafe Playground](https://console.typesafe.ai/playground).
4. Run the request, change one fact, and compare the result.

No build step, API key, server, or dependency install is required. The page runs locally in your browser. It does not make a Jev request and does not generate example results. To see Jev's answers, run the inputs in the Playground.

## Design principles

- Ask a specific, bounded question.
- Define the answer space with `choice`, `score`, or `noul`.
- Separate independent judgments so they can be inspected separately.
- Change one piece of evidence at a time when exploring how a decision shifts.
- Keep a person involved when mistakes have meaningful consequences.

## Project files

- `index.html` — interface and instructions
- `styles.css` — responsive visual design
- `app.js` — scenario data, question JSON rendering, and copy actions

## References

- [TypeSafe documentation](https://docs.typesafe.ai/introduction)
- [TypeSafe quick start](https://docs.typesafe.ai/introduction/quickstart)
- [Vercel announcement: Jev on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway)

This is an independent learning project and is not affiliated with or endorsed by TypeSafe AI.
