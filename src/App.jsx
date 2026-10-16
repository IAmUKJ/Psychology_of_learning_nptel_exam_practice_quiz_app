import { useState, useCallback } from "react";

// ─── Question Bank ────────────────────────────────────────────────────────────
const ALL_QUESTIONS = {
  1: {
    title: "Introduction to Learning",
    questions: [
      { q: "Learning is often seen as the contiguous causal effect of ____ on behavior.", opts: ["blood", "bone density", "trauma", "experience"], ans: 3 },
      { q: "In order to say that learning has occurred, a hidden change in behavior must occur.", opts: ["True", "False"], ans: 1 },
      { q: "Which of the following is not a mental construct?", opts: ["skeleton", "knowledge", "representations", "associations"], ans: 0 },
      { q: "Learning changes the ___ structure of the brain through the process of continuous interactions between the learner and the external environment.", opts: ["physical", "social", "biological", "none of the given"], ans: 0 },
      { q: "___ shapes the learning process.", opts: ["Only thoughts", "Only emotions", "Both thoughts and emotions", "Neither thoughts nor emotions"], ans: 2 },
      { q: "Watson's work included the famous Little Albert experiment in which he conditioned a small child to ___ a white rat.", opts: ["fear", "love", "hate", "play with"], ans: 0 },
      { q: "Behaviorism dominated psychology for much of the early ___ century.", opts: ["20th", "19th", "18th", "17th"], ans: 0 },
      { q: "The state of \"conscious incompetence\" may be valuable ____ of a learning experience.", opts: ["at the end", "in the middle", "2 years after the end", "at the start"], ans: 3 },
      { q: "Which of the following is not an outcome of effective e-learning?", opts: ["wider range of strategies", "more reflective approach", "more positive emotions towards learning", "more disconnected knowledge"], ans: 3 },
      { q: "Instrumental conditioning is an example of ___ learning.", opts: ["sensitization", "habituation", "associative", "meaningful"], ans: 2 },
    ],
  },
  2: {
    title: "Behaviorism & Intelligence",
    questions: [
      { q: "The three major types of learning described by ___ psychology are classical conditioning, operant conditioning and observational learning.", opts: ["cognitive", "behavioral", "emotional", "evolutionary"], ans: 1 },
      { q: "According to the view of Watson, psychology is ___.", opts: ["subjective", "only descriptive", "experimental", "about internal mental processes that cannot be measured and observed"], ans: 2 },
      { q: "___ is given by Ivan Pavlov.", opts: ["Operant conditioning", "Functional conditioning", "Classical conditioning", "Modern conditioning"], ans: 2 },
      { q: "The process by which organisms learn to respond to certain stimuli but not to others is known as ___.", opts: ["stimulus generalization", "stimulus appreciation", "stimulus discrimination", "stimulus differentiation"], ans: 2 },
      { q: "Higher-order conditioning is intrinsically weaker than its first-order counterpart.", opts: ["True", "False"], ans: 0 },
      { q: "____ is the process of gradually changing the quality of a response.", opts: ["Shaping", "Modeling", "Cueing", "Shifting"], ans: 0 },
      { q: "The works of ___ were instrumental in engendering the dramatic shift from behaviorism to cognitive theories.", opts: ["Edward C. Tolman", "Jean Piaget", "German Gestalt", "All of the given"], ans: 3 },
      { q: "___ intelligence is the ability to perceive the visual–spatial world accurately and involves sensitivity to color, line, shape, form, space, and the potential for recognizing and manipulating the patterns of spaces.", opts: ["Interpersonal", "Spatial", "Bodily-kinesthetic", "Linguistic"], ans: 1 },
      { q: "Sternberg proposed his theory in 1985 as an alternative to the idea of the ___.", opts: ["general intelligence factor", "multiple intelligences", "specific intelligence factor", "unconscious intelligence"], ans: 0 },
      { q: "Which of the following is not a kind of product in the structure of intellect model?", opts: ["symbolic", "classes", "systems", "implications"], ans: 0 },
    ],
  },
  3: {
    title: "Memory & Cognition",
    questions: [
      { q: "The connections between nerves cells are called ___.", opts: ["systems", "syntaxes", "neurons", "synapses"], ans: 3 },
      { q: "In order to create a ___, information must be changed into a usable form, which occurs through a process known as encoding.", opts: ["past memory", "new imagination", "new memory", "past imagination"], ans: 2 },
      { q: "Calling back the stored information in response to some cue for use in a process or activity is called ___.", opts: ["Retrieval", "Recall", "Recollection", "All of the given"], ans: 3 },
      { q: "For many with ___ deficits, reading facial expressions and knowing how to respond are confusing daily challenges.", opts: ["memory", "intelligence", "social cognition", "biological cognition"], ans: 2 },
      { q: "The Information Processing View of Learning assumes that there are limits to how much information can be processed at each stage.", opts: ["True", "False"], ans: 0 },
      { q: "The Information Processing View of Learning assumes that information process is involved in ___", opts: ["forgetting", "remembering", "perceiving", "All of the given"], ans: 3 },
      { q: "The capacity of the sensory register is ___.", opts: ["very small", "very large", "7+/-2 chunks", "unlimited"], ans: 1 },
      { q: "Most children do not begin to engage in the process of rehearsal on their own until about age ___.", opts: ["seven", "two", "thirteen", "one"], ans: 0 },
      { q: "___ provides an interface between the sub-systems of working memory and the part of long term memory specialized for episodic memory.", opts: ["Phonological loop", "Visuo-spatial sketchpad", "Retrieval buffer", "Episodic buffer"], ans: 3 },
      { q: "Memories of specific episodes of one's life refers to ___.", opts: ["declarative memory", "experimental episodic memory", "autobiographical episodic memory", "procedural memory"], ans: 2 },
    ],
  },
  4: {
    title: "Thinking & Bloom's Taxonomy",
    questions: [
      { q: "___ thinking is the ability to create mental representations of objects, places, events, or people in your mind.", opts: ["General", "Creative", "Divergent", "Symbolic"], ans: 3 },
      { q: "We compare new information to our ___ of the person, place, or thing, so we know how to categorize the new information mentally.", opts: ["protofit", "protobite", "prototype", "none of the given"], ans: 2 },
      { q: "Which of the following is not true?", opts: ["Thinking is a higher mental process", "Thinking is a sub-vocal talking", "Thinking is fulfilling a need or problem solving", "Thinking is only done in verbal symbols"], ans: 3 },
      { q: "Mental images are ___.", opts: ["Auditory", "Visual", "Gustatory", "All of the given"], ans: 3 },
      { q: "___ organize complex phenomena into simpler, easily understandable, and usable categories and help to solve our problems.", opts: ["Concepts", "Propositions", "Constructs", "Components"], ans: 0 },
      { q: "The lowermost level of Bloom's taxonomy is ___.", opts: ["remember", "apply", "understand", "analyze"], ans: 0 },
      { q: "The psychomotor domain of the Bloom's taxonomy is concerned with ___.", opts: ["Biological makeup", "Thoughts and beliefs", "Feelings and emotions", "Skilled behavior"], ans: 3 },
      { q: "Which of the following is an example of meta-cognition skills?", opts: ["Ignoring your limits", "Self-monitoring", "Skimming all important information", "All of the given"], ans: 1 },
      { q: "___ critical thinking skill helps you analyze and process information to come to an unbiased conclusion.", opts: ["Open-mindedness", "Self-regulation", "Self-control", "Observation"], ans: 0 },
      { q: "The inspiration phase of the creative thinking process refers to the ___ stage.", opts: ["Incubation", "Insight", "Evaluation", "Preparation"], ans: 3 },
    ],
  },
  5: {
    title: "Motivation",
    questions: [
      { q: "Which of the following is true about motivation?", opts: ["It is a physical impulse", "It is an external process", "It has a willingness to activate but not channel the attitudes of learners", "None of the given"], ans: 3 },
      { q: "The term \"motivation\" comes from a ___ word.", opts: ["Greek", "Latin", "Hindi", "Bengali"], ans: 1 },
      { q: "It is called extrinsic motivation if causal factor is ___.", opts: ["curiosity", "social pressure", "self-satisfaction", "needs"], ans: 1 },
      { q: "___ motivation is considered to be more crucial for students as it is associated with deep learning, better performance and self-efficacy.", opts: ["Intrinsic", "Extrinsic", "Introjected regulation", "None of the given"], ans: 0 },
      { q: "___ proposed that there are three primary drives that drive human behavior.", opts: ["Hull", "Watson", "Piaget", "Gestalt"], ans: 0 },
      { q: "Expectancy Theory of Motivation was developed by ___.", opts: ["Vroom", "Hull", "Murray", "None of the given"], ans: 0 },
      { q: "An example of ___ is thinking, \"If I work hard I can achieve the targets my boss has set for me\".", opts: ["purposeful", "valence", "instrumentality", "expectancy"], ans: 3 },
      { q: "In SMART goals, T stands for ___.", opts: ["Temporary", "Time-based", "Tough", "Testing"], ans: 1 },
      { q: "Friendship is a ___ need in Maslow's hierarchy.", opts: ["Love and belonging", "Esteem", "Physiological", "Safety"], ans: 0 },
      { q: "___ theory differentiates between autonomous motivation and controlled motivation.", opts: ["Arousal", "Goal-setting", "Need hierarchy", "Self-determination"], ans: 3 },
    ],
  },
  6: {
    title: "Emotional Intelligence",
    questions: [
      { q: "According to Daniel Goleman, ___ component of emotional intelligence focuses on how we handle relationships with others.", opts: ["self-awareness", "motivation", "empathy", "emotional regulation"], ans: 2 },
      { q: "Emotional intelligence can be considered a type of ___ intelligence.", opts: ["academic", "genetic", "social", "external"], ans: 2 },
      { q: "Noticing a difficult emotion and slowing down or resisting any impulsive action that may follow highlights ___ component of emotional intelligence.", opts: ["Self-regulation", "Motivation", "Emotional literacy", "Empathy"], ans: 0 },
      { q: "The following are signs of emotional intelligence, except ___.", opts: ["strong sense of curiosity", "holding onto mistakes", "ability to manage emotions in difficult situations", "self-confidence"], ans: 1 },
      { q: "Perceiving emotions means ___.", opts: ["Ignoring signals", "Understanding only what somebody is saying to you", "Understanding only somebody's facial expression", "Understanding both verbal and nonverbal signals"], ans: 3 },
      { q: "___ suggests that 10 distinct components provide the scaffolding of emotionally and socially intelligent behaviors.", opts: ["Bar-On", "Goleman", "Salovey", "Mayer"], ans: 0 },
      { q: "Which of the following is a facilitator of EQ?", opts: ["optimism", "happiness", "independence", "all of the given"], ans: 3 },
      { q: "___ is a strategy for improving one's self-awareness.", opts: ["rejecting feedback", "using critical self-talk daily", "developing a fixed mindset", "pursuing one's passion"], ans: 3 },
      { q: "Having students create autobiographies is an example of creating opportunities for ___.", opts: ["emotional labor", "emotional contagion", "metacognition", "none of the given"], ans: 2 },
      { q: "Which of the following is not true about management of emotions?", opts: ["It is essentially a private act", "It is directly regulated by others", "It is influenced by cultural norms", "It is influenced by what society defines as appropriate to feel and express"], ans: 1 },
    ],
  },
  7: {
  title: "Learning Theories & Styles",
  questions: [
    {
      q: "Simon defined learning as changes in a system that result in ___ over time on tasks similar to those done previously.",
      opts: [
        "Boredom",
        "Decreased anxiety",
        "Improved performance",
        "Reduced performance"
      ],
      ans: 2
    },
    {
      q: "Robert Gagne defined learning as ___.",
      opts: [
        "A change in human disposition or capacity",
        "A change that persists over a period of time",
        "A change not simply ascribable to processes of growth",
        "All of the given"
      ],
      ans: 3
    },
    {
      q: "Psychomotor skills are ___ skills.",
      opts: [
        "Cognitive",
        "Spiritual",
        "Mental",
        "Physical"
      ],
      ans: 3
    },
    {
      q: "Returning to experience refers to ___.",
      opts: [
        "Attending to feelings",
        "Re-examining experience in the light of one's intent and existing knowledge",
        "Using helpful feelings and removing obstructive ones",
        "Recalling or detailing salient events"
      ],
      ans: 3
    },
    {
      q: "Which of the following assumptions does not come under the behaviorist orientation to learning?",
      opts: [
        "Differences between individuals are important as they will affect learning",
        "Observable behavior rather than internal thought processes are the focus of study",
        "Environment shapes one's behavior",
        "The principle of contiguity is central"
      ],
      ans: 0
    },
    {
      q: "Reinforcement can come through sharing of results rather than a reward.",
      opts: [
        "True",
        "False"
      ],
      ans: 0
    },
    {
      q: "___ has contributed to the humanistic orientations to learning.",
      opts: [
        "Linguistic",
        "Kinesthetic",
        "Visual",
        "Carl Rogers"
      ],
      ans: 3
    },
    {
      q: "In the process of learning, which of the following is not a component of output?",
      opts: [
        "Certification",
        "Attitude change",
        "Knowledge enhancement",
        "Training plan"
      ],
      ans: 3
    },
    {
      q: "Ambience, space and decorum do not affect learning.",
      opts: [
        "True",
        "False"
      ],
      ans: 1
    },
    {
      q: "Role-playing can motivate ___ type of learners effectively.",
      opts: [
        "Solitary",
        "Social",
        "Reading/writing",
        "Logical/analytical"
      ],
      ans: 1
    }
  ]
},
  8: {
    title: "Pedagogy & Experiential Learning",
    questions: [
      { q: "The word 'pedagogy' has been derived from the ___ word \"pedagogue\".", opts: ["Latin", "Sanskrit", "Greek", "English"], ans: 2 },
      { q: "Which of the following statements is not true about pedagogy?", opts: ["It is a method or way of teaching", "It is derived from the Greek word \"pedagogue\"", "It helps a teacher understand how learning should be facilitated.", "It harms the quality of teaching and learning."], ans: 3 },
      { q: "Pedagogy can enhance the student-teacher relationship.", opts: ["True", "False"], ans: 0 },
      { q: "___ learning is based on the model that knowledge can be created within a population where members actively interact by sharing experiences and take on asymmetry roles.", opts: ["integrative", "inquiry-based", "collaborative", "constructivist"], ans: 2 },
      { q: "The Pedagogical Model provides an overview of the learning cycle and breaks it down into ___ domains or phases of instruction.", opts: ["five", "three", "two", "seven"], ans: 0 },
      { q: "Which of the following is not a type of inquiry-based approach?", opts: ["confrontation", "structure", "guided", "open"], ans: 0 },
      { q: "In experiential learning, students are engaged ___.", opts: ["intellectually", "soulfully", "socially", "all of the given"], ans: 3 },
      { q: "___ stage of experiential theory by Kolb focuses on planning.", opts: ["concrete experience", "abstract conceptualization", "reflective observation", "active experimentation"], ans: 3 },
      { q: "People with a ___ learning style can often act on \"gut feeling\" and will rely on others' analysis rather than their own.", opts: ["accommodating", "converging", "diverging", "assimilating"], ans: 0 },
      { q: "According to the ___ principle, students learn better from animation and narration than from animation and on-screen text.", opts: ["multimedia", "modality", "coherence", "temporal contiguity"], ans: 1 },
    ],
  },
  9: {
    title: "E-Learning",
    questions: [
      { q: "E-learning is any form of ___.", opts: ["teaching", "training", "tutoring", "all of the given"], ans: 3 },
      { q: "___ is a feature of e-learning.", opts: ["difficulty in access", "user friendliness", "social injustice", "closed learning"], ans: 1 },
      { q: "E-learning is a synonym of audio-visual learning, multimedia learning, and distance learning.", opts: ["True", "False"], ans: 1 },
      { q: "Which of the following is not a type of e-learning?", opts: ["text-driven", "interactive", "simulation", "physical"], ans: 3 },
      { q: "Which of the following is not a benefit of e-learning?", opts: ["It can accommodate the need of a housewife", "People can revise the learning content as many times as they want", "It facilitates in developing and communicating new training policies", "None of the given"], ans: 3 },
      { q: "Good learners know ___.", opts: ["What they are learning", "Why they are learning", "How they are learning", "All of the given"], ans: 3 },
      { q: "Learners may multitask when engaging in an online course, which could be resulting in ___.", opts: ["hyperfocus", "better retrieval", "shorter attention spans", "None of the given"], ans: 2 },
      { q: "___ learning is the crucial determinant of successful e-learning.", opts: ["passive", "retrospective", "social", "active"], ans: 3 },
      { q: "The brain can process 36,000 visual cues per___.", opts: ["hour", "second", "day", "year"], ans: 0 },
      { q: "For effective learning, online courses should ___.", opts: ["use headings", "use complex language", "present long pieces of text", "use random images"], ans: 0 },
    ],
  },
  10: {
    title: "Teaching & Assessment",
    questions: [
      { q: "During Covid-19 the world was busy in preparing 1.5 billion learners for the new normal, i.e., ___ learning.", opts: ["ineffective", "physical", "remote", "experiential"], ans: 2 },
      { q: "To develop learner readiness for online learning, training sessions on ___ are helpful.", opts: ["netiquettes", "time management", "developing study skills", "all of the given"], ans: 3 },
      { q: "The typical picture of a teacher being a dispenser of knowledge to the students has been replaced by that of a ___.", opts: ["obstructor", "parent", "friend", "facilitator"], ans: 3 },
      { q: "In 2018, Global Education and Skills Forum noted that the 'future' teacher would need the 5 skills to thrive in the 21st century. Which of the following is not one of them?", opts: ["Strong social skills", "Data analysis", "External focus", "Strictness"], ans: 3 },
      { q: "Participatory education demands ___ so as to build a needs-based approach to teaching.", opts: ["creativity", "stubbornness", "reward", "none of the given"], ans: 0 },
      { q: "Students who consider intelligence as a malleable entity tend to focus on their obstacles instead of goals.", opts: ["True", "False"], ans: 1 },
      { q: "Which of the following is not a principle to enhance student learning.", opts: ["What students already know affects their learning", "Learning is context-based", "Students' cognitive development and learning is limited by the general stages of development.", "The acquisition of knowledge and skills in the long term depends largely on practice."], ans: 2 },
      { q: "___ feedback to students is important for learning.", opts: ["Unclear", "Late", "Harsh", "Explanatory"], ans: 3 },
      { q: "Mastery goals are those that are geared towards the acquisition or improvement of___.", opts: ["Skills", "Number of students in a classroom", "Teacher feedback", "None of the given"], ans: 0 },
      { q: "The vast majority of formative assessment is___.", opts: ["Formal", "Incorrect", "Written", "informal"], ans: 3 },
    ],
  },
  11: {
    title: "Social Cognition",
    questions: [
      { q: "Social cognition has a protracted development through infancy to ___.", opts: ["teenage", "old-age", "adulthood", "death"], ans: 2 },
      { q: "Which of the following abilities comes under social cognition?", opts: ["Face processing", "Joint attention", "Theory of mind", "All of the given"], ans: 3 },
      { q: "Under social cognition, abilities involved in affective processing are often called ___.", opts: ["hot", "cold", "white", "black"], ans: 0 },
      { q: "Social schemas refer to people's mental representations of social ___.", opts: ["values", "memories", "skills", "patterns"], ans: 3 },
      { q: "During the earliest stages of development, children are very ___-centric. They see the world from their own perspective and struggle to think about how other people may view the world.", opts: ["selfish", "ego", "conscious", "emotional"], ans: 1 },
      { q: "A theory of mind refers to a person's ability to understand and think about the ___ of other people.", opts: ["behaviors", "family backgrounds", "mental states", "language"], ans: 2 },
      { q: "The same social behavior in one cultural setting might have a very different meaning and interpretation if it were to occur or be observed in another culture.", opts: ["True", "False"], ans: 0 },
      { q: "Social cognitive theory by Bandura focuses on concepts of ___.", opts: ["self-efficacy", "modeling", "observational learning", "all of the given"], ans: 3 },
      { q: "The central tenet of Bandura's social-cognitive theory is that people seek to develop a sense of ___ over the important events in their lives.", opts: ["agency", "dependency", "attachment", "emotion"], ans: 0 },
      { q: "___ hypothesis suggests that social processes influence how information is selected, organized, integrated, and retrieved.", opts: ["activation", "cognitive influence", "interaction", "social cue strength"], ans: 1 },
    ],
  },
  12: {
    title: "Sustainability & ESD",
    questions: [
      { q: "Sustainability in economic sustainability is ___.", opts: ["multidimensional", "bidimensional", "unidimensional", "none of the given"], ans: 2 },
      { q: "The term \"sustainable development\" was first mentioned in a book related to the 1972 UN Stockholm conference on ___.", opts: ["water", "poverty", "economic crisis", "human environment"], ans: 3 },
      { q: "Environmental sustainability focuses on impacts of processes, products and services on ___.", opts: ["water", "biodiversity", "human health", "all of the given"], ans: 3 },
      { q: "Which of the following does not come under social sustainability?", opts: ["Labour practices", "Revenue generation", "Human rights", "Business ethics"], ans: 1 },
      { q: "SDG __ focuses on clean water and sanitation.", opts: ["1", "17", "6", "3"], ans: 2 },
      { q: "SDG 16 focuses on ___.", opts: ["No poverty", "No hunger", "Good health", "Peace and justice"], ans: 3 },
      { q: "On 20 October 2020, the Higher Education Sustainability Initiative (HESI) raised the flag of higher education as a driver for sustainable development and inclusive societies on the first day of the ___ 2020.", opts: ["National Sustainability Meeting", "National Teachers Meeting", "Global Childrens' Meeting", "Global Education Meeting"], ans: 3 },
      { q: "Education is related to all SDGs.", opts: ["True", "False"], ans: 0 },
      { q: "Successful implementation of ESD requires a shift in focus from ___.", opts: ["teaching to learning", "learning to teaching", "reading to speaking", "knowing to ignoring"], ans: 0 },
      { q: "___ competency is the ability to reflect on one's own role in the local community and (global) society.", opts: ["collaboration", "self-awareness", "strategic", "normative"], ans: 1 },
    ],
  },
};

// ─── Themes ───────────────────────────────────────────────────────────────────
const DARK = {
  bg: "#0d0f14", surface: "#151820", border: "#252a38",
  text: "#e4e8f0", muted: "#a8b0c4", faint: "#5a6280",
  accent: "#6c8fff", accentText: "#ffffff",
  optDefault: { bg: "#0d0f14", border: "#252a38", color: "#a8b0c4" },
  optDimmed: { bg: "#0d0f14", border: "#1a1e2a", color: "#3a4060" },
  correct: { bg: "#0f2a1a", border: "#2d7a4f", color: "#7dd4a8" },
  wrong: { bg: "#2a0f14", border: "#7a2d3a", color: "#d47d8a" },
  weekActive: { bg: "#141828", border: "#6c8fff55" },
  progressTrack: "#252a38",
};
const LIGHT = {
  bg: "#f0f2f8", surface: "#ffffff", border: "#dde2f0",
  text: "#1a1e2e", muted: "#4a5070", faint: "#8a92b0",
  accent: "#4a6ef5", accentText: "#ffffff",
  optDefault: { bg: "#ffffff", border: "#dde2f0", color: "#3a4060" },
  optDimmed: { bg: "#f0f2f8", border: "#eaedf5", color: "#b0b8d0" },
  correct: { bg: "#edfaf3", border: "#3aaa6a", color: "#0a5a30" },
  wrong: { bg: "#faedef", border: "#aa3a4a", color: "#5a0a18" },
  weekActive: { bg: "#eef1ff", border: "#4a6ef555" },
  progressTrack: "#dde2f0",
};

const makeS = (t) => ({
  app: { minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Segoe UI', 'Inter', system-ui, sans-serif" },
  header: {
    background: t.bg, borderBottom: `1px solid ${t.border}`,
    padding: "18px 32px", display: "flex", alignItems: "center",
    gap: "14px", position: "sticky", top: 0, zIndex: 10,
  },
  logo: {
    width: 38, height: 38, background: t.accent, borderRadius: "10px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", flexShrink: 0,
  },
  headerTitle: { fontSize: "15px", fontWeight: "600", color: t.text, letterSpacing: "0.01em" },
  headerSub: { fontSize: "12px", color: t.faint, marginTop: "2px" },
  themeBtn: {
    marginLeft: "auto", width: "36px", height: "36px", borderRadius: "8px",
    border: `1px solid ${t.border}`, background: t.surface, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "17px", flexShrink: 0,
  },
  main: { maxWidth: "780px", margin: "0 auto", padding: "40px 20px" },
  homeHero: { textAlign: "center", marginBottom: "44px" },
  homeTitle: {
    fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "700",
    color: t.text, lineHeight: 1.2, marginBottom: "10px",
  },
  homeAccent: { color: t.accent },
  homeSub: { fontSize: "14px", color: t.faint, marginBottom: "28px" },
  controlsCard: {
    background: t.surface, border: `1px solid ${t.border}`,
    borderRadius: "14px", padding: "26px", marginBottom: "28px",
  },
  label: {
    display: "block", fontSize: "11px", letterSpacing: "0.08em",
    color: t.faint, textTransform: "uppercase", marginBottom: "8px", fontWeight: "600",
  },
  select: {
    width: "100%", background: t.bg, border: `1px solid ${t.border}`,
    borderRadius: "8px", color: t.text, fontSize: "14px",
    padding: "10px 12px", outline: "none", cursor: "pointer", marginBottom: "18px",
  },
  toggleRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px", cursor: "pointer" },
  toggle: (active) => ({
    width: "40px", height: "22px", background: active ? t.accent : t.border,
    borderRadius: "11px", position: "relative", transition: "background 0.2s",
    flexShrink: 0, cursor: "pointer", border: "none", outline: "none",
  }),
  toggleKnob: (active) => ({
    position: "absolute", top: "3px", left: active ? "21px" : "3px",
    width: "16px", height: "16px", background: "#fff",
    borderRadius: "50%", transition: "left 0.2s",
  }),
  toggleLabel: { fontSize: "14px", color: t.muted, userSelect: "none" },
  startBtn: {
    width: "100%", padding: "13px", background: t.accent, border: "none",
    borderRadius: "9px", color: t.accentText, fontSize: "15px",
    fontWeight: "600", cursor: "pointer", transition: "opacity 0.15s",
  },
  weekGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(158px, 1fr))", gap: "10px" },
  weekCard: (active) => ({
    background: active ? t.weekActive.bg : t.surface,
    border: `1px solid ${active ? t.weekActive.border : t.border}`,
    borderRadius: "10px", padding: "13px", cursor: "pointer",
    transition: "border-color 0.15s, background 0.15s",
  }),
  weekNum: { fontSize: "11px", color: t.faint, marginBottom: "4px", fontWeight: "600" },
  weekName: { fontSize: "12px", color: t.muted, lineHeight: 1.4 },
  progressRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  progressMeta: { fontSize: "12px", color: t.faint },
  progressBar: { height: "4px", background: t.progressTrack, borderRadius: "2px", marginBottom: "28px", overflow: "hidden" },
  progressFill: (pct) => ({
    height: "100%", width: `${pct}%`, background: t.accent,
    borderRadius: "2px", transition: "width 0.4s ease",
  }),
  qCard: {
    background: t.surface, border: `1px solid ${t.border}`,
    borderRadius: "14px", padding: "26px", marginBottom: "18px",
  },
  qMeta: { fontSize: "11px", color: t.accent, letterSpacing: "0.06em", marginBottom: "12px", fontWeight: "600" },
  qText: { fontSize: "16px", color: t.text, lineHeight: 1.7, marginBottom: "22px", fontWeight: "500" },
  optBtn: (state) => {
    const base = {
      display: "block", width: "100%", textAlign: "left",
      padding: "12px 15px", borderRadius: "8px", fontSize: "14px",
      cursor: state === "default" ? "pointer" : "default",
      transition: "border-color 0.15s, background 0.15s",
      lineHeight: 1.5, marginBottom: "8px", border: "1px solid",
    };
    if (state === "correct") return { ...base, background: t.correct.bg, borderColor: t.correct.border, color: t.correct.color };
    if (state === "wrong") return { ...base, background: t.wrong.bg, borderColor: t.wrong.border, color: t.wrong.color };
    if (state === "dimmed") return { ...base, background: t.optDimmed.bg, borderColor: t.optDimmed.border, color: t.optDimmed.color };
    return { ...base, background: t.optDefault.bg, borderColor: t.optDefault.border, color: t.optDefault.color };
  },
  feedback: (ok) => ({
    padding: "11px 15px", borderRadius: "8px", fontSize: "13px",
    background: ok ? t.correct.bg : t.wrong.bg,
    color: ok ? t.correct.color : t.wrong.color,
    border: `1px solid ${ok ? t.correct.border : t.wrong.border}`,
    marginTop: "6px",
  }),
  navRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  navBtn: (primary) => ({
    padding: "10px 20px", borderRadius: "8px", fontSize: "14px",
    cursor: "pointer", fontWeight: "500",
    border: `1px solid ${primary ? t.accent : t.border}`,
    background: primary ? t.accent : t.surface,
    color: primary ? t.accentText : t.muted,
    transition: "opacity 0.15s",
  }),
  resultWrap: { textAlign: "center", padding: "44px 0" },
  bigScore: { fontSize: "76px", fontWeight: "700", color: t.accent, lineHeight: 1, marginBottom: "8px" },
  scoreLabel: { fontSize: "14px", color: t.faint, marginBottom: "28px" },
  resultMsg: { fontSize: "20px", color: t.text, fontWeight: "600", marginBottom: "36px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "36px" },
  statCard: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", padding: "18px 10px" },
  statNum: { fontSize: "28px", fontWeight: "700", color: t.text, marginBottom: "4px" },
  statLabel: { fontSize: "11px", color: t.faint, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600" },
  wrongCard: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", padding: "16px 20px", marginBottom: "10px" },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(weekKey, doShuffle) {
  let pool = [];
  if (weekKey === "all") {
    Object.entries(ALL_QUESTIONS).forEach(([wk, data]) =>
      data.questions.forEach((q) => pool.push({ ...q, week: wk, weekTitle: data.title }))
    );
  } else {
    const data = ALL_QUESTIONS[weekKey];
    pool = data.questions.map((q) => ({ ...q, week: weekKey, weekTitle: data.title }));
  }
  return doShuffle ? shuffle(pool) : pool;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Toggle({ value, onChange, label, S }) {
  return (
    <div style={S.toggleRow} onClick={() => onChange(!value)}>
      <button style={S.toggle(value)} aria-label="toggle">
        <span style={S.toggleKnob(value)} />
      </button>
      <span style={S.toggleLabel}>{label}</span>
    </div>
  );
}

function HomeScreen({ onStart, S }) {
  const [weekKey, setWeekKey] = useState("all");
  const [doShuffle, setDoShuffle] = useState(false);
  const total = weekKey === "all" ? 120 : 10;

  return (
    <div>
      <div style={S.homeHero}>
        <h1 style={S.homeTitle}>
          Psychology of <span style={S.homeAccent}>Learning</span>
        </h1>
        <p style={S.homeSub}>NPTEL · IIT Kharagpur · July 2026 · 12 Weeks · 120 Questions</p>
      </div>

      <div style={S.controlsCard}>
        <label style={S.label}>Select week</label>
        <select style={S.select} value={weekKey} onChange={(e) => setWeekKey(e.target.value)}>
          <option value="all">All weeks — combined (120 questions)</option>
          {Object.entries(ALL_QUESTIONS).map(([k, v]) => (
            <option key={k} value={k}>Week {k} — {v.title}</option>
          ))}
        </select>
        <Toggle value={doShuffle} onChange={setDoShuffle} label="Shuffle questions" S={S} />
        <button
          style={S.startBtn}
          onClick={() => onStart(buildPool(weekKey, doShuffle))}
          onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Start Quiz · {total} questions
        </button>
      </div>

      <label style={{ ...S.label, marginBottom: "12px" }}>Quick-pick by week</label>
      <div style={S.weekGrid}>
        {Object.entries(ALL_QUESTIONS).map(([k, v]) => (
          <div
            key={k}
            style={S.weekCard(weekKey === k)}
            onClick={() => setWeekKey(k)}
          >
            <div style={S.weekNum}>WEEK {k}</div>
            <div style={S.weekName}>{v.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizScreen({ questions, onFinish, onHome, S }) {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);

  const q = questions[current];
  const chosen = answered[current];
  const isAnswered = chosen !== null;
  const isLast = current === questions.length - 1;
  const pct = (current / questions.length) * 100;

  const choose = useCallback((i) => {
    if (isAnswered) return;
    const newAnswered = [...answered];
    newAnswered[current] = i;
    setAnswered(newAnswered);
    if (i === q.ans) setScore((s) => s + 1);
  }, [isAnswered, answered, current, q]);

  const getOptState = (i) => {
    if (!isAnswered) return "default";
    if (i === q.ans) return "correct";
    if (i === chosen) return "wrong";
    return "dimmed";
  };

  return (
    <div>
      <div style={S.progressRow}>
        <span style={S.progressMeta}>{current + 1} / {questions.length}</span>
        <span style={S.progressMeta}>Score: {score}/{questions.length}</span>
      </div>
      <div style={S.progressBar}>
        <div style={S.progressFill(pct)} />
      </div>

      <div style={S.qCard}>
        <div style={S.qMeta}>WEEK {q.week} · {q.weekTitle}</div>
        <div style={S.qText}>{q.q}</div>
        <div>
          {q.opts.map((opt, i) => (
            <button
              key={i}
              style={S.optBtn(getOptState(i))}
              onClick={() => choose(i)}
              disabled={isAnswered}
            >
              <span style={{ color: S.optBtn("default").color, marginRight: "10px", fontSize: "12px", opacity: 0.6 }}>
                {["A", "B", "C", "D"][i]}.
              </span>
              {opt}
            </button>
          ))}
        </div>
        {isAnswered && (
          <div style={S.feedback(chosen === q.ans)}>
            {chosen === q.ans ? "✓ Correct!" : `✗ Incorrect. Correct answer: ${q.opts[q.ans]}`}
          </div>
        )}
      </div>

      <div style={S.navRow}>
        <button
          style={S.navBtn(false)}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ← Previous
        </button>
        {isAnswered && !isLast && (
          <button
            style={S.navBtn(true)}
            onClick={() => setCurrent((c) => c + 1)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Next →
          </button>
        )}
        {isAnswered && isLast && (
          <button
            style={S.navBtn(true)}
            onClick={() => onFinish(score, answered)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            See Results
          </button>
        )}
        <button
          style={{ ...S.navBtn(false), marginLeft: "auto" }}
          onClick={onHome}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ✕ Exit
        </button>
      </div>
    </div>
  );
}

function ResultScreen({ score, total, questions, answered, onRetry, onHome, S }) {
  const pct = Math.round((score / total) * 100);
  const wrong = total - score;
  const msg = pct >= 90 ? "Outstanding! 🎉" : pct >= 70 ? "Great work! 👏" : pct >= 50 ? "Good effort, keep going!" : "More practice needed.";

  return (
    <div style={S.resultWrap}>
      <div style={S.bigScore}>{pct}%</div>
      <div style={S.scoreLabel}>{score} correct out of {total} questions</div>
      <div style={S.resultMsg}>{msg}</div>

      <div style={S.statsGrid}>
        <div style={S.statCard}>
          <div style={{ ...S.statNum, color: S.correct ? "#7dd4a8" : S.statNum.color }}>{score}</div>
          <div style={S.statLabel}>Correct</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statNum}>{wrong}</div>
          <div style={S.statLabel}>Wrong</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statNum}>{total}</div>
          <div style={S.statLabel}>Total</div>
        </div>
      </div>

      {wrong > 0 && (
        <div style={{ textAlign: "left", marginBottom: "36px" }}>
          <div style={{ ...S.label, marginBottom: "14px" }}>Questions you got wrong</div>
          {questions.map((q, i) => {
            if (answered[i] === q.ans) return null;
            return (
              <div key={i} style={S.wrongCard}>
                <div style={S.qMeta}>WEEK {q.week} · {q.weekTitle}</div>
                <div style={{ fontSize: "14px", color: S.muted, marginBottom: "8px", lineHeight: 1.55 }}>{q.q}</div>
                {answered[i] !== null && (
                  <div style={{ fontSize: "12px", color: "#d47d8a", marginBottom: "3px" }}>
                    Your answer: {q.opts[answered[i]]}
                  </div>
                )}
                <div style={{ fontSize: "12px", color: "#7dd4a8" }}>
                  Correct: {q.opts[q.ans]}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          style={S.navBtn(true)}
          onClick={onRetry}
          onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Retry same set
        </button>
        <button
          style={S.navBtn(false)}
          onClick={onHome}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finalAnswered, setFinalAnswered] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const S = makeS(isDark ? DARK : LIGHT);

  const handleStart = (pool) => {
    setQuestions(pool);
    setScreen("quiz");
  };

  const handleFinish = (score, answered) => {
    setFinalScore(score);
    setFinalAnswered(answered);
    setScreen("result");
  };

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={S.logo}>🧠</div>
        <div>
          <div style={S.headerTitle}>Psychology of Learning</div>
          <div style={S.headerSub}>NPTEL · IIT Kharagpur · Assignment Practice</div>
        </div>
        <button
          style={S.themeBtn}
          onClick={() => setIsDark((d) => !d)}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </header>

      <main style={S.main}>
        {screen === "home" && <HomeScreen onStart={handleStart} S={S} />}
        {screen === "quiz" && (
          <QuizScreen
            questions={questions}
            onFinish={handleFinish}
            onHome={() => setScreen("home")}
            S={S}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            score={finalScore}
            total={questions.length}
            questions={questions}
            answered={finalAnswered}
            onRetry={() => { setFinalScore(0); setFinalAnswered([]); setScreen("quiz"); }}
            onHome={() => setScreen("home")}
            S={S}
          />
        )}
      </main>
    </div>
  );
}