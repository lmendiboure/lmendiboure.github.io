/*
  IoT course release configuration
  --------------------------------
  NORMAL WEEK-TO-WEEK USE: edit ONE number only.

      releasedThrough: 1

  When Session 2 is ready:
    1. add cours/iot/session-2/
    2. add cours/instructor/iot/session-2/
    3. change releasedThrough from 1 to 2
    4. commit + push

  The hub derives states automatically:
    id < releasedThrough  -> Review
    id = releasedThrough  -> Current mission
    id > releasedThrough  -> Locked

  IMPORTANT: a visual lock is not access control. Do not place future
  student session folders in the public Pages tree before release.
*/
window.IOT_COURSE_CONFIG = {
  release: {
    releasedThrough: 1
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
      summary: "Map the IoT landscape, build a campus architecture, expose requirements, discover communication families and revise the design when assumptions change.",
      objectives: ["architecture & flows", "requirements", "communication choices"],
      storageKey: "iot-systems-design-session1-v10"
    },
    {
      id: 2,
      number: "02",
      kicker: "INFORMATION EXCHANGE",
      title: "How do things communicate?",
      question: "Once connectivity exists, how should devices and services exchange information?",
      summary: "Compare interaction patterns and application-level communication choices through the needs of an IoT system.",
      objectives: ["message exchange", "interaction patterns", "application protocols"]
    },
    {
      id: 3,
      number: "03",
      kicker: "PLACEMENT",
      title: "Where does the IoT application live?",
      question: "What belongs on the device, nearby, at the edge or in the cloud?",
      summary: "Reason about where computation, storage and decisions should happen as constraints and system scale change.",
      objectives: ["device / edge / cloud", "compute & storage", "placement trade-offs"]
    },
    {
      id: 4,
      number: "04",
      kicker: "ROBUSTNESS",
      title: "How do we make the system robust?",
      question: "What happens when scale, failures, mobility or dependencies change?",
      summary: "Challenge an IoT architecture, reason about failure and adaptation, and make the system survive beyond its nominal assumptions.",
      objectives: ["failure & adaptation", "lifecycle", "system trade-offs"]
    }
  ]
};
