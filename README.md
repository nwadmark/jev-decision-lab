# Jev Decision Lab

An approachable, browser-based workbench for exploring **Jev**, TypeSafe AI's decision model. It helps you turn a sample situation into clear, structured questions, then try those questions in the [TypeSafe Jev Playground](https://console.typesafe.ai/playground).

## What is Jev?

A useful first approximation is to think of Jev as a **classifier for decisions inside software**. A chatbot is built to write a response for a person to read. Jev is built to evaluate a situation and return a structured answer that software can use.

You provide:

- **State:** the facts or description Jev should evaluate.
- **Typed questions:** the specific decisions you want Jev to make.

Jev returns answers in defined formats, along with probabilities (and, for Choice and Score questions, confidence). For example, give it a description of an object, ask “Which color is it?”, and provide a fixed list of colors. Jev can return a choice and a probability for each option. An app could use that kind of result to sort, route, flag, or send a case for human review.

Jev supports three question types:

| Type | Plain-language meaning | Example |
| --- | --- | --- |
| `choice` | Pick from a list of answers | Which team should review this request? |
| `score` | Rate against a defined scale | How urgent is this incident from 1 to 5? |
| `noul` | Estimate whether a statement is true | Does this case contain a security incident? |

Keep each question focused on one judgment. If a decision depends on several factors, ask about those separately and combine the results using your own rules. Probabilities can help you decide when to automate and when to ask a person to review; they are not a guarantee that an answer is correct.

For TypeSafe's technical description, see the [Jev introduction](https://docs.typesafe.ai/introduction). The [video walkthrough](https://youtu.be/4mTLpuQpB80) is another overview.

## Try the demo

### Easiest option: open the website

This repository includes a small website, but **GitHub does not run `index.html` when you open its file page**. To make the workbench easy to use without downloading files or opening code, turn on GitHub Pages once:

1. Open [this repository's Pages settings](https://github.com/nwadmark/jev-decision-lab/settings/pages).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/(root)**, then click **Save**.
4. Wait for GitHub to show **Your site is live at**, then click **Visit site**.
5. On the site, choose a scenario, review or edit its sample State, and copy the State and questions into the matching areas of the [TypeSafe Playground](https://console.typesafe.ai/playground).

After Pages is on, people can use the website directly; they do not need to open `index.html` or use a command line. GitHub Pages makes the site public, so only publish information you intend to share.

### Try it locally

If you prefer not to enable Pages, download the repository files and open `index.html` in a modern browser. Choose a scenario, then copy its State and questions into the Playground.

No build step, dependency install, or API key is needed for this workbench. It only prepares the inputs: **it does not send a request to Jev or invent sample results.** Run the copied inputs in the Playground to see Jev's answers. Use fictional or sanitized examples when experimenting.

## Included scenarios

- Enterprise assessment triage
- Security incident triage
- Product feedback
- Leadership interview coaching

## Project files

- `index.html` — workbench interface and instructions
- `styles.css` — responsive visual design
- `app.js` — scenario data, question rendering, and copy actions

## References

- [TypeSafe documentation](https://docs.typesafe.ai/introduction)
- [TypeSafe quick start](https://docs.typesafe.ai/introduction/quickstart)
- [TypeSafe AI: Jev overview video](https://youtu.be/4mTLpuQpB80)
- [Vercel announcement: Jev on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway)

This is an independent learning project and is not affiliated with or endorsed by TypeSafe AI.
