const scenarios = [
  {
    id: "assessment",
    label: "Enterprise assessment",
    state: "A customer assessment covers 28 branch switches. It flags 4 devices as running software versions marked unsupported in the assessment data. There are no active outages, and configuration backups are current. The customer asks what to do next.",
    hint: "Change “There are no active outages” to “Two branches are currently unable to connect.” Does the next step change?",
    questions: {
      next_step: {
        type: "choice",
        instructions: "What is the most appropriate next step based on the information provided?",
        criteria: {
          validate_finding: "Confirm the affected devices, software versions, and assessment data before recommending action",
          plan_remediation: "The findings are sufficiently clear to begin planning a software update or replacement",
          incident_response: "The information indicates an active outage or immediate security incident requiring urgent response",
          human_review: "The evidence is ambiguous or the consequences warrant expert review"
        }
      },
      evidence_quality: {
        type: "score",
        instructions: "How strong is the evidence for deciding on a next step?",
        criteria: [
          "Insufficient evidence",
          "Some useful evidence, with important gaps",
          "Mostly sufficient evidence",
          "Clear and sufficient evidence"
        ]
      },
      active_outage: {
        type: "noul",
        instructions: "Does the assessment report an active outage?"
      }
    }
  },
  {
    id: "security",
    label: "Security incident",
    state: "An employee reports receiving an unexpected MFA prompt and denying it. The identity system shows a successful sign-in from a new location 10 minutes later. The employee says they were not traveling. No confirmed data access or data transfer has been identified yet.",
    hint: "Change “No confirmed data access or data transfer” to “The logs show a large download of customer records.” Which judgments shift?",
    questions: {
      first_owner: {
        type: "choice",
        instructions: "Which team should assess this report first?",
        criteria: {
          identity_security: "The main evidence concerns authentication, account access, or MFA",
          endpoint_security: "The main evidence concerns malware or a compromised device",
          network_security: "The main evidence concerns suspicious network traffic or infrastructure",
          security_triage: "The evidence is not sufficient to choose a specialist team"
        }
      },
      urgency: {
        type: "score",
        instructions: "How urgent is the reported situation based on the evidence?",
        criteria: [
          "Low: no credible sign of account compromise",
          "Moderate: suspicious activity needs investigation",
          "High: credible sign of unauthorized access",
          "Critical: confirmed widespread impact or active data loss"
        ]
      },
      confirmed_data_loss: {
        type: "noul",
        instructions: "Does the report confirm that data was accessed or transferred without authorization?"
      }
    }
  },
  {
    id: "product",
    label: "Product feedback",
    state: "A customer writes: “I like the new dashboard, but I can’t find the export button anymore. I need to send the monthly report to my team this afternoon. I tried the help article and still can’t do it.”",
    hint: "Change “this afternoon” to “sometime this quarter.” Does urgency move independently of the underlying product issue?",
    questions: {
      primary_need: {
        type: "choice",
        instructions: "What is the customer's primary need?",
        criteria: {
          usability_help: "The customer needs help finding or using an existing capability",
          product_gap: "The customer needs a capability the product does not currently provide",
          defect_report: "The customer reports that a capability is broken or behaving incorrectly",
          unclear: "The message does not contain enough evidence to identify the primary need"
        }
      },
      time_sensitivity: {
        type: "score",
        instructions: "How time-sensitive is the customer's request?",
        criteria: [
          "No deadline is mentioned",
          "A future deadline is mentioned",
          "The customer needs a response within days",
          "The customer has an immediate deadline"
        ]
      },
      tried_self_service: {
        type: "noul",
        instructions: "Does the customer say they tried self-service help and remained blocked?"
      }
    }
  },
  {
    id: "coaching",
    label: "Leadership coaching",
    state: "Interview answer: “I set up weekly meetings with Product, Design, and Engineering and created a shared document for dependencies. The team delivered the launch on time.”",
    hint: "Add why the actions helped, then add a reusable principle. Does Jev distinguish the answer's altitude?",
    questions: {
      answer_altitude: {
        type: "choice",
        instructions: "What level of leadership thinking does the answer mainly demonstrate?",
        criteria: {
          actions: "Describes activities or processes, such as meetings or documentation",
          causal_reasoning: "Explains the problem behind the actions and why they helped",
          transferable_principle: "States a reusable leadership principle that could guide action in other situations"
        }
      },
      explains_why: {
        type: "noul",
        instructions: "Does the answer explain why the actions improved collaboration or delivery?"
      },
      impact_evidence: {
        type: "score",
        instructions: "How much concrete evidence does the answer provide about the candidate's impact?",
        criteria: [
          "No specific evidence of impact",
          "Outcome is stated but not connected to the candidate's actions",
          "Actions and outcome are connected",
          "Clear evidence explains the candidate's contribution and result"
        ]
      }
    }
  }
];

const tabs = document.querySelector("#scenario-tabs");
const stateInput = document.querySelector("#state-input");
const questionsOutput = document.querySelector("#questions-json");
const charCount = document.querySelector("#char-count");
const questionCount = document.querySelector("#question-count");
const variationHint = document.querySelector("#variation-hint");
const toast = document.querySelector("#toast");
let activeId = scenarios[0].id;
let toastTimeout;

function renderTabs() {
  tabs.innerHTML = scenarios.map((scenario, index) => `
    <button class="scenario-tab" id="tab-${scenario.id}" type="button" role="tab"
      aria-selected="${scenario.id === activeId}" aria-controls="workbench" tabindex="${scenario.id === activeId ? 0 : -1}"
      data-scenario="${scenario.id}"><span class="tab-number">0${index + 1}</span> &nbsp;${scenario.label}</button>
  `).join("");
  tabs.querySelectorAll(".scenario-tab").forEach((tab) => {
    tab.addEventListener("click", () => selectScenario(tab.dataset.scenario));
    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const current = scenarios.findIndex((item) => item.id === activeId);
        const next = scenarios[(current + direction + scenarios.length) % scenarios.length];
        selectScenario(next.id);
        document.querySelector(`#tab-${next.id}`).focus();
      }
    });
  });
}

function selectScenario(id) {
  activeId = id;
  renderTabs();
  const scenario = scenarios.find((item) => item.id === id);
  stateInput.value = scenario.state;
  questionsOutput.textContent = JSON.stringify(scenario.questions, null, 2);
  variationHint.textContent = scenario.hint;
  updateCounts();
}

function updateCounts() {
  charCount.textContent = `${stateInput.value.length} characters`;
  const count = Object.keys(scenarios.find((item) => item.id === activeId).questions).length;
  questionCount.textContent = `${count} QUESTION${count === 1 ? "" : "S"}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(value, message) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.append(temporary);
    temporary.select();
    document.execCommand("copy");
    temporary.remove();
  }
  showToast(message);
}

stateInput.addEventListener("input", updateCounts);
document.querySelector("#copy-state").addEventListener("click", () => copyText(stateInput.value, "State copied — paste it into the Playground."));
document.querySelector("#copy-questions").addEventListener("click", () => copyText(questionsOutput.textContent, "Questions copied — paste them into the Questions editor."));

renderTabs();
selectScenario(activeId);
