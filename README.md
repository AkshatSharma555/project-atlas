# ATLAS: AIOps & Decision Intelligence Console

> An enterprise-grade observability, telemetry, and automated Root Cause Analysis (RCA) platform designed for distributed systems. 

ATLAS is a comprehensive AIOps solution that combines real-time system monitoring with a deterministic Decision Intelligence Engine. Instead of just displaying metrics, ATLAS actively correlates cascading failures across microservices, generates evidence-based root cause analyses, and provides actionable recommendations with a human-in-the-loop review system.

## 🚀 System Architecture & Capabilities

While ATLAS features a premium, high-density React frontend, the core of the application is powered by a **Deterministic Simulation & RCA Engine**. This engine acts as an internal state machine (Testbed), simulating a live backend environment with interconnected microservices.

### 1. Deterministic Fault Engine (The Testbed)
- Simulates a 5-tier microservice architecture (API Gateway, URL Service, Order Service, Payment Service, and PostgreSQL Database).
- Allows injection of specific anomalies (e.g., Database Latency, CPU Saturation, Payment Gateway Drops).
- Calculates real-time cascading effects (e.g., a DB latency spike automatically degrades downstream payment and order services).

### 2. Telemetry & Observability Pipeline
- **Real-time Metrics:** Generates and visualizes time-series data for latency and CPU usage using Recharts.
- **Structured Log Aggregation:** Captures and displays simulated terminal logs with contextual severity (INFO, WARN, CRITICAL, ERROR).
- **Service Topology Graph:** A visual dependency map that updates node health and failure propagation in real-time.

### 3. Automated Incident & RCA Engine
- Detects baseline deviations and automatically flags system anomalies as High/Medium severity incidents.
- Runs a multi-step analysis pipeline (Telemetry Collection -> Signal Normalization -> Evidence Correlation -> Root Cause Ranking).
- Outputs a definitive AI Confidence Score along with a correlated evidence bundle.

### 4. Decision Intelligence Center (Human-in-the-Loop)
- Presents the final RCA and mitigation strategy to the SRE/DevOps operator.
- Enforces an audit trail workflow requiring human validation (`ACCEPT DECISION` or `REJECT DECISION`) before mitigation actions are simulated.

## 🔄 System Flow (How it works)

1. **Baseline Operation:** The system starts in a `HEALTHY` state. Metrics are stable, and the topology map shows all green nodes.
2. **Anomaly Injection:** An operator injects a fault (e.g., *Database Latency*) via the Command Center testbed controls.
3. **Cascading Failure:** The engine calculates dependencies. The DB goes `CRITICAL` (Red), causing downstream services to go `DEGRADED` (Yellow).
4. **Telemetry Spikes:** The Recharts pipeline immediately visualizes the latency spike, and the terminal outputs critical error logs.
5. **Incident Trigger:** The anomaly is caught by the Incident Management module. The operator runs the Incident Analysis.
6. **Decision Processing:** The RCA Engine correlates the telemetry data, identifies the origin node, and builds an evidence bundle.
7. **Resolution:** The operator reviews the AI's findings in the Decision Center and approves the recommended architectural action.

## 💻 Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript (Strict Type Checking)
- **Styling:** Tailwind CSS (Custom Dark/Enterprise Theme)
- **Routing:** React Router DOM (Single Page Application architecture)
- **Data Visualization:** Recharts (Time-series metrics)
- **Icons:** Lucide React
- **State Management:** React Context API (Engine State & Simulation Provider)

## ⚙️ Local Development Setup

Clone the repository and install the dependencies to run the ATLAS testbed locally:

```bash
# Clone the repository
git clone [https://github.com/your-username/project-atlas.git](https://github.com/your-username/project-atlas.git)

# Navigate into the directory
cd project-atlas

# Install dependencies
npm install

# Start the local Vite development server
npm run dev
