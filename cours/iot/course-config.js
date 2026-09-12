/*
  IoT course release configuration
  --------------------------------
  NORMAL WEEK-TO-WEEK USE: edit ONE number only.

      releasedThrough: 2

  WORKING PACKAGE NOTE: Session 3 draft files are present for review, but
  releasedThrough remains 2. Before public deployment, either remove the
  draft student folder or accept that its direct URL can be opened.

  When Session 3 is ready to publish:
    1. keep cours/iot/session-3/ and cours/instructor/iot/session-3/
    2. change releasedThrough from 2 to 3
    3. commit + push

  The hub derives states automatically:
    id < releasedThrough  -> Review
    id = releasedThrough  -> Current mission
    id > releasedThrough  -> Locked

  IMPORTANT: a visual lock is not access control. Do not place future
  student session folders in the public Pages tree before release.
*/
window.IOT_COURSE_CONFIG = {
  release: {
    releasedThrough: 2
  },
  course: {
    code: "IoT Systems Design",
    title: "Design connected systems, one decision at a time.",
    subtitle: "Four guided missions move from the physical system to communication, placement and robustness. Each mission produces an artifact you can challenge and revise."
  },
  sessions: [
    {
      id: 1,
      number: "01",
      kicker: "FOUNDATIONS",
      title: "How do things connect?",
      question: "What must a connected system do before we can defend a communication choice?",
      summary: "Map the IoT landscape, build and close the loop of a campus architecture, expose per-flow requirements, then move from network shape to a defended communication-family choice.",
      objectives: ["architecture & flows", "per-flow requirements", "network shape & technology fit"],
      storageKey: "iot-systems-design-session1-v20",
      progressKind: "screen-frontier"
    },
    {
      id: 2,
      number: "02",
      kicker: "INFORMATION EXCHANGE",
      title: "How do things communicate?",
      question: "Once connectivity exists, how should devices and services exchange information?",
      summary: "Describe service conversations, make message order explicit, build protocol paths from four communication responsibilities, compare MQTT/CoAP/HTTP, and make exchanged data understandable across systems.",
      objectives: ["interaction & choreography", "protocol stacks & composition", "shared data meaning"],
      storageKey: "iot-systems-design-session2-v4",
      progressKind: "activity-frontier",
      progressLabels: ["Conversation","Message order","Stack jobs","Worked stack","Application protocols","Compose paths","Shared meaning","Defend design"]
    },
    {
      id: 3,
      number: "03",
      kicker: "PLACEMENT",
      title: "Where should the work happen?",
      question: "Which functions belong on the device, nearby or remotely — and why?",
      summary: "Place sensing, transformation, decisions, state and analytics across device, nearby and remote zones from latency, resource, data, privacy and scale constraints.",
      objectives: ["function placement", "data & resource trade-offs", "device / edge / cloud boundaries"],
      storageKey: "iot-systems-design-session3-v1",
      progressKind: "activity-frontier",
      progressLabels: ["Place functions","Data movement","Response budget","Feasibility","Data minimisation","Edge role","Split pipeline","Revise placement"]
    },
    {
      id: 4,
      number: "04",
      kicker: "ROBUSTNESS",
      title: "How do we make the system robust?",
      question: "What happens when scale, failures, mobility or dependencies change?",
      summary: "Stress-test defended designs, reason about delivery guarantees, retries, duplicate effects, connectivity loss, failures and adaptation, and justify the minimum design change when assumptions break.",
      objectives: ["scoped guarantees & failure", "adaptation", "lifecycle & system trade-offs"]
    }
  ]
};
