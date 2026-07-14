// Roadmap + tracker data for the SAP & Cloud Engineer path.
// Each phase has an id, title, blurb, and a list of skills.
// Each skill has a stable id (used as the localStorage key), a title, a note
// explaining what it is and why it matters, and optional curated learning links.
// Users can add their own links per skill in the app (stored in localStorage).
const ROADMAP = [
  {
    id: "foundations",
    title: "Foundations",
    tagline: "Start here",
    blurb: "The baseline IT knowledge everything else builds on.",
    skills: [
      {
        id: "f-linux",
        title: "Linux fundamentals",
        note: "SAP systems run on Linux servers. Learn the filesystem, permissions, systemd services, and basic shell scripting — you'll use these daily as an admin or architect.",
        links: [
          { label: "Linux Journey (free course)", url: "https://linuxjourney.com/" },
          { label: "The Linux Command Line (free book)", url: "https://linuxcommand.org/tlcl.php" },
        ],
      },
      {
        id: "f-networking",
        title: "Networking basics",
        note: "TCP/IP, DNS, load balancers, firewalls, VPNs. Every SAP landscape is a network of servers talking to each other — you can't design or debug one without this.",
        links: [
          { label: "Practical Networking", url: "https://www.practicalnetworking.net/" },
          { label: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/" },
        ],
      },
      {
        id: "f-sql",
        title: "SQL & relational databases",
        note: "SAP is, at its heart, a giant database application. Knowing tables, joins, and indexes lets you understand how SAP stores and retrieves business data.",
        links: [
          { label: "SQLBolt (interactive)", url: "https://sqlbolt.com/" },
          { label: "SQL Tutorial — W3Schools", url: "https://www.w3schools.com/sql/" },
        ],
      },
      {
        id: "f-hana-basics",
        title: "SAP HANA basics",
        note: "HANA is SAP's in-memory, column-store database — the engine under S/4HANA. Understand why in-memory + columnar makes it fast and what that changes for sizing.",
        links: [
          { label: "SAP HANA docs (help.sap.com)", url: "https://help.sap.com/docs/SAP_HANA_PLATFORM" },
          { label: "SAP Learning — HANA journeys", url: "https://learning.sap.com/" },
        ],
      },
      {
        id: "f-scripting",
        title: "A scripting language",
        note: "Python, Bash, or PowerShell. Automation is how one engineer manages hundreds of servers — scripts for checks, deployments, and housekeeping.",
        links: [
          { label: "Automate the Boring Stuff (Python)", url: "https://automatetheboringstuff.com/" },
          { label: "PowerShell — Microsoft Learn", url: "https://learn.microsoft.com/en-us/powershell/" },
        ],
      },
    ],
  },
  {
    id: "sap-core",
    title: "SAP Core Fundamentals",
    tagline: "The classic stack",
    blurb: "Understand how a classic SAP ECC landscape is built and run.",
    skills: [
      {
        id: "s-ecc-modules",
        title: "SAP ECC modules overview",
        note: "FI/CO (finance), MM (materials), SD (sales), PP (production). You don't need to configure them — but you must know what business process each module runs.",
        links: [
          { label: "SAP Community", url: "https://community.sap.com/" },
        ],
      },
      {
        id: "s-netweaver",
        title: "SAP NetWeaver architecture",
        note: "The platform under classic SAP: application servers, the message server, and dialog/batch/update work processes. This is the anatomy of every SAP system.",
        links: [
          { label: "SAP NetWeaver docs", url: "https://help.sap.com/docs/SAP_NETWEAVER_750" },
        ],
      },
      {
        id: "s-basis",
        title: "SAP Basis administration",
        note: "Basis = SAP system administration. Client management, user admin, background jobs, system monitoring — the operational heartbeat of a landscape.",
        links: [
          { label: "SAP Learning (Basis journeys)", url: "https://learning.sap.com/" },
          { label: "SAP Community — Basis topics", url: "https://community.sap.com/" },
        ],
      },
      {
        id: "s-abap-read",
        title: "ABAP basics (read & debug)",
        note: "ABAP is SAP's programming language. As an architect you rarely write it, but you must read code and use the debugger to trace problems to their source.",
        links: [
          { label: "Acquire Core ABAP Skills — SAP Learning", url: "https://learning.sap.com/learning-journeys/acquire-core-abap-skills" },
          { label: "ABAP tutorials — developers.sap.com", url: "https://developers.sap.com/" },
        ],
      },
      {
        id: "s-transport",
        title: "Transport Management (STMS)",
        note: "How changes move Dev → QA → Prod in SAP. Transports are SAP's version of a deployment pipeline — and a top source of go-live incidents when mismanaged.",
        links: [
          { label: "Change & Transport System docs", url: "https://help.sap.com/docs/SAP_NETWEAVER_750" },
        ],
      },
      {
        id: "s-solman",
        title: "SAP Solution Manager",
        note: "SAP's central ops tool: system monitoring, EarlyWatch reports, and ChaRM (change control). Know what it does and when landscapes rely on it.",
        links: [
          { label: "Solution Manager — SAP Support", url: "https://support.sap.com/en/alm/solution-manager.html" },
        ],
      },
    ],
  },
  {
    id: "s4-migration",
    title: "S/4HANA & Migration",
    tagline: "The big move",
    blurb: "Move from ECC know-how to S/4HANA conversion and greenfield builds.",
    skills: [
      {
        id: "m-s4-arch",
        title: "S/4HANA vs. ECC architecture",
        note: "S/4HANA simplifies the data model (goodbye aggregate tables), runs only on HANA, and is Fiori-first. Know exactly what changed and why it matters for migration.",
        links: [
          { label: "SAP S/4HANA overview", url: "https://www.sap.com/products/erp/s4hana.html" },
          { label: "SAP Learning — S/4HANA journeys", url: "https://learning.sap.com/" },
        ],
      },
      {
        id: "m-paths",
        title: "Conversion vs. greenfield vs. selective",
        note: "Three roads to S/4: convert the existing system (brownfield), start fresh (greenfield), or move selected data. Choosing the right path is a core architect decision.",
        links: [
          { label: "SAP Community — S/4HANA migration", url: "https://community.sap.com/" },
        ],
      },
      {
        id: "m-readiness",
        title: "Readiness Check & custom code analysis",
        note: "SAP's tools that scan an ECC system and report what will break in S/4. This is how a migration project scopes its real effort.",
        links: [
          { label: "SAP Readiness Check", url: "https://support.sap.com/en/offerings-programs/support-services/readiness-check.html" },
        ],
      },
      {
        id: "m-fiori",
        title: "Fiori / UI5 basics",
        note: "Fiori is S/4HANA's web UI, built on the UI5 framework and served through the Fiori launchpad. Architects size and secure the Fiori front-end server.",
        links: [
          { label: "SAP Fiori design guidelines", url: "https://experience.sap.com/fiori/" },
          { label: "UI5 tutorials — developers.sap.com", url: "https://developers.sap.com/topics/ui-development.html" },
        ],
      },
      {
        id: "m-activate",
        title: "SAP Activate methodology",
        note: "SAP's official project methodology — Discover, Prepare, Explore, Realize, Deploy, Run. Every RISE/S4 project is governed by these phases and deliverables.",
        links: [
          { label: "SAP Activate & methodologies", url: "https://support.sap.com/en/offerings-programs/methodologies.html" },
          { label: "SAP Roadmap Viewer", url: "https://go.support.sap.com/roadmapviewer/" },
        ],
      },
      {
        id: "m-cutover",
        title: "Cutover planning & mock runs",
        note: "The go-live weekend playbook: sequence, timings, rollback points, and the mock/dress-rehearsal runs that prove it. This is where migrations succeed or fail.",
        links: [
          { label: "SAP Community — cutover blogs", url: "https://community.sap.com/" },
        ],
      },
    ],
  },
  {
    id: "cloud-fundamentals",
    title: "Cloud Fundamentals",
    tagline: "Hyperscaler skills",
    blurb: "General hyperscaler skills that apply to any cloud-hosted workload.",
    skills: [
      {
        id: "c-pick-cloud",
        title: "Pick a primary hyperscaler",
        note: "AWS, Azure, or GCP — learn one deeply first. Azure is the most common for SAP workloads, AWS is a close second; concepts transfer between all three.",
        links: [
          { label: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
          { label: "Microsoft Learn — training", url: "https://learn.microsoft.com/en-us/training/" },
        ],
      },
      {
        id: "c-iam",
        title: "Identity & access management",
        note: "IAM roles, policies, and least-privilege. Cloud security starts with who-can-do-what, and it's the first thing auditors and security teams check.",
        links: [
          { label: "AWS IAM user guide", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html" },
          { label: "Microsoft Entra ID docs", url: "https://learn.microsoft.com/en-us/entra/identity/" },
        ],
      },
      {
        id: "c-network",
        title: "Cloud networking",
        note: "VPC/VNet design, subnets, peering, private DNS, load balancing. SAP-on-cloud architecture is mostly a networking exercise — this is non-negotiable.",
        links: [
          { label: "Amazon VPC docs", url: "https://docs.aws.amazon.com/vpc/" },
          { label: "Azure Virtual Network docs", url: "https://learn.microsoft.com/en-us/azure/virtual-network/" },
        ],
      },
      {
        id: "c-compute-storage",
        title: "Compute & storage services",
        note: "VM families (including SAP-certified ones), block vs. object storage, snapshots and backup. This is what you actually size and pay for.",
        links: [
          { label: "Amazon EC2 docs", url: "https://docs.aws.amazon.com/ec2/" },
          { label: "Azure Virtual Machines docs", url: "https://learn.microsoft.com/en-us/azure/virtual-machines/" },
        ],
      },
      {
        id: "c-security",
        title: "Cloud security basics",
        note: "Encryption at rest/in transit, key management, security groups, and bastion patterns. You'll partner with security teams on every design review.",
        links: [
          { label: "AWS Well-Architected — Security", url: "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html" },
          { label: "Microsoft security docs", url: "https://learn.microsoft.com/en-us/security/" },
        ],
      },
      {
        id: "c-cert",
        title: "Associate-level cloud certification",
        note: "AWS Solutions Architect Associate or Azure AZ-104. The exam forces breadth, and the badge opens doors with clients and employers.",
        links: [
          { label: "AWS Solutions Architect Associate", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
          { label: "Azure Administrator (AZ-104)", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/" },
        ],
      },
    ],
  },
  {
    id: "sap-on-cloud",
    title: "SAP on Cloud & RISE",
    tagline: "Where it comes together",
    blurb: "Apply cloud knowledge specifically to SAP landscapes.",
    skills: [
      {
        id: "r-rise-overview",
        title: "RISE with SAP",
        note: "SAP's bundle: S/4HANA Cloud private edition + infrastructure + managed services in one subscription. Know the shared-responsibility split — what SAP owns vs. what you own.",
        links: [
          { label: "RISE with SAP — official", url: "https://www.sap.com/products/erp/rise.html" },
        ],
      },
      {
        id: "r-hyperscaler-sap",
        title: "SAP-certified infrastructure & sizing",
        note: "Only certain VM types are SAP-certified. Learn SAPS-based sizing, HANA memory rules, and hyperscaler reference architectures for SAP.",
        links: [
          { label: "SAP workloads on Azure", url: "https://learn.microsoft.com/en-us/azure/sap/" },
          { label: "SAP on AWS", url: "https://aws.amazon.com/sap/" },
        ],
      },
      {
        id: "r-provisioning",
        title: "Landscape & environment strategy",
        note: "How many tiers (dev/QA/pre-prod/prod), refresh strategy, and who provisions what. Environment planning is a named responsibility in most architect roles.",
        links: [
          { label: "Azure SAP planning guide", url: "https://learn.microsoft.com/en-us/azure/sap/workloads/planning-guide" },
        ],
      },
      {
        id: "r-btp",
        title: "SAP BTP fundamentals",
        note: "The Business Technology Platform: where extensions, integrations, and custom apps live so the S/4 core stays clean. Know Cloud Foundry, Kyma, and key services.",
        links: [
          { label: "BTP — developers.sap.com", url: "https://developers.sap.com/topics/business-technology-platform.html" },
          { label: "SAP Discovery Center", url: "https://discovery-center.cloud.sap/" },
        ],
      },
      {
        id: "r-integration",
        title: "Middleware & integration",
        note: "SAP Integration Suite (cloud) and PI/PO (legacy), APIs, IDocs, events. Almost every project is judged on how well its integrations work.",
        links: [
          { label: "SAP Integration Suite", url: "https://www.sap.com/products/technology-platform/integration-suite.html" },
          { label: "SAP Business Accelerator Hub", url: "https://api.sap.com/" },
        ],
      },
      {
        id: "r-hybrid",
        title: "Hybrid landscape architecture",
        note: "Real landscapes mix on-prem, RISE, and BTP for years. Design connectivity, identity, and data flows that span all of them safely.",
        links: [
          { label: "SAP Discovery Center — missions", url: "https://discovery-center.cloud.sap/" },
        ],
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    tagline: "Modern operations",
    blurb: "Bring modern engineering practices into SAP operations.",
    skills: [
      {
        id: "d-iac",
        title: "Infrastructure as Code",
        note: "Terraform (or Bicep/CloudFormation) to define landscapes in code — reviewable, repeatable, and disaster-recoverable. The modern way to build SAP infrastructure.",
        links: [
          { label: "Terraform tutorials", url: "https://developer.hashicorp.com/terraform/tutorials" },
        ],
      },
      {
        id: "d-cicd",
        title: "CI/CD pipelines",
        note: "Automated pipelines for infrastructure changes and increasingly for SAP transports (gCTS, SAP CI/CD service). Fewer manual steps, fewer go-live surprises.",
        links: [
          { label: "GitHub Actions docs", url: "https://docs.github.com/en/actions" },
          { label: "SAP CI/CD — developers.sap.com", url: "https://developers.sap.com/" },
        ],
      },
      {
        id: "d-containers",
        title: "Containers & Kubernetes",
        note: "SAP itself doesn't containerize, but everything around it does — BTP Kyma is Kubernetes, and side-car apps and tooling ship as containers.",
        links: [
          { label: "Kubernetes tutorials", url: "https://kubernetes.io/docs/tutorials/" },
          { label: "Docker getting started", url: "https://docs.docker.com/get-started/" },
        ],
      },
      {
        id: "d-monitoring",
        title: "Monitoring & observability",
        note: "Cloud-native monitoring, APM tools, and SAP-specific checks in one picture. You can't run 'operational readiness' without knowing what to watch.",
        links: [
          { label: "Prometheus overview", url: "https://prometheus.io/docs/introduction/overview/" },
          { label: "Azure Monitor for SAP", url: "https://learn.microsoft.com/en-us/azure/sap/monitor/" },
        ],
      },
      {
        id: "d-dr",
        title: "HA & disaster recovery design",
        note: "HANA system replication, clustering, backup strategy, RPO/RTO targets, and DR drills. A named responsibility in nearly every SAP architect job spec.",
        links: [
          { label: "Azure — SAP HA & DR guide", url: "https://learn.microsoft.com/en-us/azure/sap/workloads/sap-high-availability-guide-start" },
        ],
      },
    ],
  },
  {
    id: "architecture-governance",
    title: "Architecture & Governance",
    tagline: "Lead-level skills",
    blurb: "The senior/lead-level responsibilities of a technical architect.",
    skills: [
      {
        id: "a-landscape-strategy",
        title: "Own landscape strategy end to end",
        note: "The whole picture: which systems exist, where they run, how they connect, and where they're heading over a 3–5 year horizon.",
        links: [
          { label: "SAP Enterprise Architecture", url: "https://www.sap.com/products/technology-platform.html" },
        ],
      },
      {
        id: "a-design-review",
        title: "Technical design reviews",
        note: "Review designs from partners and dev teams against standards. Knowing what 'good' looks like — and saying no constructively — is the job.",
        links: [
          { label: "AWS Well-Architected Framework", url: "https://aws.amazon.com/architecture/well-architected/" },
        ],
      },
      {
        id: "a-dependencies",
        title: "Cross-initiative dependencies",
        note: "When the S/4 migration, a CRM rollout, and an integration revamp run in parallel, someone must sequence shared systems and environments. That's you.",
        links: [],
      },
      {
        id: "a-performance",
        title: "Performance & operational readiness",
        note: "Load testing, tuning, capacity planning, and the go-live readiness checklist — proving the system will survive day one and month twelve.",
        links: [
          { label: "SAP EarlyWatch & support services", url: "https://support.sap.com/en/offerings-programs/support-services.html" },
        ],
      },
      {
        id: "a-security-partner",
        title: "Security, Basis & dev governance",
        note: "Partner across teams to keep architecture decisions enforced: patching standards, access models, coding and transport rules.",
        links: [
          { label: "SAP Trust Center (security)", url: "https://www.sap.com/about/trust-center.html" },
        ],
      },
      {
        id: "a-risk",
        title: "Technical risk management",
        note: "Spot infrastructure and technical risks early, size their impact, and drive mitigation plans — the difference between an architect and a senior admin.",
        links: [],
      },
    ],
  },
  {
    id: "career",
    title: "Certifications & Career",
    tagline: "Make it official",
    blurb: "Formalize expertise and build the collaboration skills the role demands.",
    skills: [
      {
        id: "k-sap-certs",
        title: "SAP certifications",
        note: "SAP Certified Technology Consultant (HANA / S/4HANA installation & upgrade) and BTP certifications validate the technical track formally.",
        links: [
          { label: "SAP certifications — learning.sap.com", url: "https://learning.sap.com/certifications" },
        ],
      },
      {
        id: "k-cloud-certs",
        title: "Architect-level cloud certification",
        note: "AWS Solutions Architect Professional, Azure Solutions Architect Expert, or GCP PCA — the senior credential that matches the architect title.",
        links: [
          { label: "AWS certifications", url: "https://aws.amazon.com/certification/" },
          { label: "Microsoft certifications", url: "https://learn.microsoft.com/en-us/credentials/" },
        ],
      },
      {
        id: "k-industry",
        title: "Industry domain depth",
        note: "Utilities, manufacturing, retail — pick a vertical and learn its processes (e.g. IS-U for utilities). Domain context is what job specs call 'required experience'.",
        links: [
          { label: "SAP for Utilities", url: "https://www.sap.com/industries/utilities.html" },
        ],
      },
      {
        id: "k-stakeholders",
        title: "Stakeholder management",
        note: "Working across implementation partners, offshore/onshore teams, and business stakeholders. Architecture is 50% communication.",
        links: [],
      },
      {
        id: "k-leadership",
        title: "Technical leadership",
        note: "Mentoring, calm troubleshooting under go-live pressure, and making decisions with incomplete information. The skills that make people follow your designs.",
        links: [],
      },
    ],
  },
];
