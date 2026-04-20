// Shared data for the portfolio.
const DATA = {
  name: "Nikola Ćehić",
  role: "Senior Fullstack Engineer",
  location: "Belgrade, Serbia",
  email: "nikola95cehic@gmail.com",
  phone: "+381 60 1325 266",
  linkedin: "linkedin.com/in/nikolacehic",
  linkedinUrl: "https://linkedin.com/in/nikolacehic",
  github: "github.com/nikolacehic",
  years: 7,
  summary: [
    "Senior Fullstack Engineer with 7+ years building production software across Web3, fintech, and enterprise platforms.",
    "Deep specialization in blockchain infrastructure — Cosmos SDK modules, Go-based indexers, block explorers, DAO frameworks.",
    "Full-stack: TypeScript, React, Next.js, Node.js, Go, PostgreSQL. 0→1 product track record, frontend architecture lead, remote-first async operator.",
  ],

  skills: {
    "languages": ["TypeScript", "JavaScript", "Go", "SQL"],
    "frontend": ["React", "Next.js", "Angular", "Vue.js", "RxJS", "NgRx", "Redux", "Apollo Client"],
    "backend": ["Node.js", "NestJS", "Express", "GraphQL", "REST", "Prisma", "Apache Pulsar"],
    "blockchain": ["Cosmos SDK", "CosmWasm", "Terra", "SEDA", "Go indexers", "KV-store publishers", "Wallet signing"],
    "data": ["PostgreSQL", "KV stores", "WebSockets", "Event streaming", "Pub/Sub"],
    "tooling": ["NX Monorepo", "Jest", "Playwright", "Design Systems", "Storybook", "CI/CD"],
  },

  experience: [
    {
      id: "seda",
      company: "SEDA",
      role: "Senior Fullstack Engineer",
      start: "Apr 2024", end: "Present",
      period: "2024 — now",
      mode: "Remote",
      stack: ["Go", "React", "PostgreSQL", "Cosmos SDK", "TypeScript", "Prisma", "Playwright"],
      summary: "Owning block-explorer infra, Cosmos SDK group module platform, and the company's design system monorepo — end-to-end from Go indexers to React surfaces.",
      highlights: [
        {
          title: "SEDA Explorer",
          body: "Built the network's block explorer from the ground up as the primary engineer. Owned the full stack: Go-based chain indexers, PostgreSQL modeling, React frontend, public-facing API. Designed ingestion for blocks, txs, validators, events; shipped search, filtering, and real-time updates used across the SEDA ecosystem.",
        },
        {
          title: "Cosmos SDK Group Module Platform",
          body: "Delivered a production app on the Cosmos SDK group module enabling on-chain treasury management, security-group administration, and multisig governance. Proposal lifecycle, threshold-based policy config, member management — integrated with chain-level primitives and wallet signing.",
        },
        {
          title: "Design System Monorepo",
          body: "Architected and shipped the company's standalone design system — versioned monorepo with React components, design tokens, theming primitives consumed across multiple production apps. Defined API conventions, a11y baseline, and release workflow.",
        },
        {
          title: "Backend & API",
          body: "Designed API endpoints across product surfaces, authored Prisma schemas and Postgres migrations, modeled relational data for high-read workloads. Established integration + e2e coverage with Jest and Playwright; enforced schema validation and consistent response contracts.",
        },
        {
          title: "Indexer Development",
          body: "Built KV-store publishers in Go for multiple Cosmos SDK modules — the end-to-end indexing pipeline that powers the web app's database layer. Event parsers, state-change listeners, publisher logic mapping raw chain data to queryable app state.",
        },
      ],
    },
    {
      id: "terraform",
      company: "TerraformLabs",
      role: "Senior Fullstack Engineer",
      start: "Dec 2022", end: "Apr 2024",
      period: "2022 — 2024",
      mode: "Remote",
      stack: ["TypeScript", "React", "Next.js", "CosmWasm", "Apache Pulsar", "Node.js"],
      summary: "Led frontend on Enterprise — a Terra-based DAO framework. Shipped v1 and rebuilt v2, built Enterprise Hub from scratch, extended middleware with Pulsar streaming.",
      highlights: [
        {
          title: "Enterprise DAO",
          body: "Led design + delivery of a DAO framework on Terra enabling token- and NFT-based DAOs through wizard-style creation. Owned DAO lifecycle from deployment to voting and on-chain execution; built Treasury for multiple DAO archetypes. Defined frontend architecture, state patterns, and CosmWasm integration points.",
        },
        {
          title: "Enterprise DAO v2",
          body: "Partnered with a cross-functional team to fully rebuild the Enterprise DAO interface. Improved information architecture, performance, and a11y across the product. Lead role on flagship v2 features: cross-chain treasury and one-click staking.",
        },
        {
          title: "Enterprise Hub",
          body: "Built client-side infrastructure for Enterprise Hub from inception — foundational architecture, component hierarchy, routing, state management. Worked side-by-side with design to define visual language, interaction patterns, and the component library.",
        },
        {
          title: "Enterprise Proxy",
          body: "Extended the middleware service by integrating Apache Pulsar as the event-streaming backbone — real-time pub/sub for token, NFT, and wallet analytics. Designed event schemas, producer/consumer flows, and downstream handlers powering analytics dashboards and activity feeds.",
        },
        {
          title: "Production Reliability & Customer Success",
          body: "First responder for live incidents across Enterprise DAO and v2. Rapidly triaged user issues across Discord, support, and internal trackers; debugged across the stack from contract interactions to frontend state, shipping hotfixes during critical periods.",
        },
      ],
    },
    {
      id: "tx",
      company: "TX Services",
      role: "Frontend Engineer",
      start: "May 2022", end: "Dec 2022",
      period: "2022",
      mode: "Belgrade",
      stack: ["Angular", "RxJS", "NgRx", "NestJS", "GraphQL", "Apollo", "NX"],
      summary: "JobCloud platform delivery — complex data-heavy Angular features, middleware refactor, design-system contribution, NX monorepo migration.",
      highlights: [
        { title: "JobCloud Platform", body: "Delivered user-facing features for one of Switzerland's largest recruitment platforms. Complex data-heavy views in Angular + RxJS + NgRx, reactive state management, selector composition, side-effect handling — predictable and testable across feature modules." },
        { title: "Middleware Refactoring", body: "Led refactor + optimization of a NestJS middleware between frontend and backend APIs. Cleaner service boundaries, GraphQL resolvers, Apollo client/server integration; reduced over-fetching and improved DX." },
        { title: "Design System & UI Components", body: "Partnered with design to define and implement reusable UI components. Translated tokens and Figma primitives into Angular components with well-defined inputs, outputs, and styling contracts." },
        { title: "Reusable Library Architecture", body: "Authored Angular libraries; migrated feature code from monolithic modules into an NX monorepo. Defined library boundaries, dep rules, build targets — enabled independent versioning and affected-graph builds." },
        { title: "Testing & QA", body: "Developed + overhauled the Jest test suite; wrote unit tests for components, services, NgRx stores; established testing patterns that improved coverage and reliability." },
      ],
    },
    {
      id: "daon",
      company: "Daon",
      role: "Frontend Engineer",
      start: "Dec 2020", end: "May 2022",
      period: "2020 — 2022",
      mode: "Belgrade",
      stack: ["Angular", "React", "TypeScript", "RxJS", "NgRx"],
      summary: "Core UI for an enterprise identity/biometrics admin platform, internal tooling, embedded web views for native iOS/Android, frontend team lead responsibilities.",
      highlights: [
        { title: "Administration Platform UI", body: "Central role building core UI for Daon's enterprise Administration Platform — used by identity/biometric customers to manage users, policies, workflows. Complex, data-dense interfaces in Angular with RxJS + NgRx; contributed to architectural decisions around module boundaries and composition." },
        { title: "Internal Process Optimization Tools", body: "Designed and built bespoke internal tools in TypeScript + React to streamline recurring engineering/ops workflows. Owned end-to-end: requirements → UI → deployment → iteration." },
        { title: "Mobile Web Views", body: "Built embedded web views rendered inside native iOS + Android apps for passenger credentials and identity verification. Engineered cross-platform behavior inside native WebView containers and handled secure data exchange with the host native app." },
        { title: "Frontend Team Leadership", body: "Owned task breakdown, allocation, and delivery coordination. Led technical discussions, reviewed PRs, onboarded new engineers — while shipping production features as an IC." },
        { title: "Cross-platform & Native Integration", body: "Coordinated with iOS/Android engineers to define the contract between web views and host apps — navigation handoffs, data passing, lifecycle events, error handling for seamless hybrid experiences." },
      ],
    },
    {
      id: "ibs",
      company: "Intelligent Betting Software",
      role: "Frontend Engineer",
      start: "Feb 2019", end: "Dec 2020",
      period: "2019 — 2020",
      mode: "Belgrade",
      stack: ["AngularJS", "Angular", "Vue.js", "WebSockets"],
      summary: "Two production betting platforms, back-office ops app, service+crawler health-check tool. Foundation in real-time UIs and strict latency requirements.",
      highlights: [
        { title: "Web Betting Platforms", body: "Designed and delivered two production web betting platforms serving live sports betting users — robust, high-performance UIs in AngularJS + Angular. Real-time odds updates, bet-slip management, market selection, live event tracking. Contributed to migration from legacy AngularJS to modern Angular." },
        { title: "Back Office Application", body: "Comprehensive back-office in Angular for ops and trading to manage offerings, configure markets, monitor active bets, and handle real-time data. Data-heavy admin views, bulk editing, real-time dashboards where stale data was not acceptable." },
        { title: "Service & Crawler Health Check", body: "Built a dedicated service + crawler monitoring tool in Vue.js — real-time visibility into crawlers, backend services, scheduled jobs. Status indicators, uptime tracking, alerting cues that reduced MTTR for service degradations." },
        { title: "Real-time Data Handling", body: "Worked extensively with live data pipelines — WebSockets, polling, reactive state patterns — keeping UIs continuously in sync with rapidly changing backend state." },
      ],
    },
  ],
};

window.DATA = DATA;
