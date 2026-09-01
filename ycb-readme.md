🧠 Your Company Brain (v3.2.2)
Your Company Brain is an automated, offline-first knowledge extraction pipeline and multi-provider AI Q&A system. It connects to 38 connectors across your company's communication, engineering, HR, productivity, customer support, and analytics stack, pulls all scattered information, runs it through local or cloud LLMs, and outputs structured "Skills" — machine-readable procedure cards that AI agents can directly execute, or lets you query your company data directly in your terminal using natural-language search (ycb --ask).

Instead of manually writing instruction manuals for your AI tools or searching across 10 different dashboards, Your Company Brain generates them automatically and answers questions across any model you choose.

🚀 What's New in v3.2.1 — Multi-Provider LLMs, Dynamic Skill Synthesis & Curated Skills Retrieval:

Multi-Provider LLM Support: Switch between Local (gemma4:e4b via Ollama), OpenAI (gpt-5.6-sol, gpt-5.6-terra, gpt-5.6-luna), Claude (claude-fable-5, claude-opus-5, claude-sonnet-5, claude-haiku-4-5), and OpenRouter (openrouter/free, nvidia/nemotron-3-super-120b-a12b:free, google/gemma-4-26b-a4b-it:free, or any custom model slug) with ycb switch model.
Dynamic Model Skill Synthesis: SkillsSynthesizer and KnowledgeExtractor now dynamically use the active selected provider to synthesize skills and extract concepts during ycb sync.
Curated Skills File Retrieval & Ranking: Fast keyword scoring directly surfaces the most relevant procedure cards from output/skills_file.json with an expanded 365-day freshness window.
Cross-Platform Compatibility: ASCII border rendering fallback prevents encoding crashes on Windows cp1252 consoles.
✨ What Does It Actually Do?
Reads Your Data: Securely connects to 38 connectors (Slack, Google Docs, GitHub, Notion, Discord, Linear, Outlook, GitLab, Dropbox, Mixpanel, Amplitude, Algolia, Exa, Perplexity, Facebook, Todoist, Web Crawler, Jira, Asana, Calendly, ClickUp, Airtable, Datadog, Segment, Front, Zoom, Twitter, HubSpot, Salesforce, Monday, Basecamp, Ashby, BambooHR, Deel, Rippling, Gmail, Google Sheets, Google Drive) ingesting raw text through a unified connector registry.
Understands Context: It breaks the text down and uses a local AI model (gemma4:e4b) to figure out what the text is actually about (e.g., "Is this a refund policy?" or "Is this a server deployment guide?").
Synthesizes "Skills": It groups related information together and writes step-by-step procedures, including decision points (if/then rules) and edge cases.
Exports for AI Agents: It outputs everything into a clean skills_file.json that you can plug directly into tools like LangChain, AutoGen, or your own custom AI bots so they know exactly how your company operates.
🛠️ Technical Architecture & Algorithms
For technical deep-dives, here is exactly how the pipeline operates under the hood:

1. Ingestion & Connectors (Data Layer)
Abstract Base Connector: All 38 connectors implement BaseConnector, a shared abstract class that enforces a standard ingest(days_back) interface, provides retry_with_backoff() for exponential backoff on API rate limits (429/5xx errors), and checks CONNECTORS_ENABLED for dynamic toggling without code changes.
Connector Registry: registry.py maintains a central list of all 38 connector classes. get_enabled_connectors() instantiates each one and filters out unconfigured connectors (e.g., if GITHUB_TOKEN is missing, GitHubConnector silently skips). This means SyncScheduler never imports individual connectors — it only loops over whatever is enabled.
Error Isolation: Each connector runs in a try/except block inside the sync loop. A bad token or an API outage on one connector logs an error and moves on — it will not crash the entire sync run.
Idempotency: Before processing, the system calls get_processed_source_item_ids() which returns all item IDs already stored in processed_chunks. Any item already in that set is skipped. Running sync 10 times on the same data produces the same result as running it once.
2. Document Chunking Algorithm
Semantic Sentence Splitting: Instead of naive character-count splitting (which breaks code blocks and sentences in half), the DocumentChunker uses regex-based sentence boundary detection.
Sliding Window Overlap: Text is chunked into 5-sentence blocks with a 2-sentence overlap. This guarantees that context isn't lost across chunk boundaries, which is critical for accurate LLM extraction.
3. Knowledge Extraction (LLM Pipeline)
Combined Single LLM Call: The KnowledgeExtractor sends a single optimised prompt that simultaneously classifies the chunk type (procedure, policy, decision, incident, general) AND extracts key concepts as a JSON array. This halves API latency compared to two sequential calls.
Structured JSON Fallbacks: Because open-source LLMs can hallucinate formatting, the prompt enforces strict JSON output, which is then parsed using Python's built-in json library with regex fallbacks to strip out markdown code fences.
4. Skill Synthesis (Clustering & Generation)
Context Window Assembly: The SkillsSynthesizer filters the database for high-confidence chunks (confidence_score >= 0.2) classified as actionable knowledge.
Schema Enforcement: It asks the LLM to act as a technical writer, reading the raw concepts and synthesizing them into a strict domain model (Skill Pydantic class). This generates the final procedure steps, prerequisites, and edge cases.
5. UI Architecture (Event-Driven Dashboard)
Decoupled State: The rich terminal dashboard runs independently of the backend pipeline.
Log Interception: Instead of polluting SyncScheduler with UI logic, a custom Python logging.Handler intercepts backend logs (e.g., "Phase 1: Ingesting data"), updates the UI's internal state machine, and computes progress/ETA — the SyncScheduler never knows a UI exists.
⚙️ The Pipeline Workflow
graph TD;
    A[38 Data Sources via REST/GraphQL APIs] -->|BaseConnector.ingest| B(ConnectorRegistry)
    B -->|RawDataItem objects| C(SQLite: raw_data_items)
    C -->|Sliding Window Chunker| D{Local LLM: gemma4:e4b}
    D -->|Single combined prompt| E(SQLite: processed_chunks)
    E -->|Confidence filtering + concept clustering| F[LLM Synthesizer]
    F -->|Pydantic Skill schema| G((skills_file.json))
🚀 Setup Guide
Prerequisites
Python 3.11+
Ollama — Download from ollama.ai
API keys for the connectors you want to enable (see .env.example)
Option A — Install via pip (Recommended for users)
# 1. Create and activate a virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# 2. Install the package
pip install ycb

# 3. Pull the required AI model and start Ollama
ollama pull gemma4:e4b
ollama serve            # Keep running in background

# 4. Initialize — creates .env from template, verifies Ollama & license key
ycb                     # Or reference directly without activating: .\venv\Scripts\ycb.exe init
ycb init

# 5. Fill in your API keys
#    Edit the .env file created in the current directory or use: ycb connect <connector>
Note: If ycb is not recognized, make sure your virtual environment is activated, reference the full path to the executable (e.g. .\venv\Scripts\ycb.exe), or ensure your Python Scripts folder is on PATH. Tip: ycb init will automatically copy .env.example into your working directory if no .env exists, and will tell you exactly which keys to fill in.

Option B — Developer / Source Setup
# Clone and enter the repo
git clone https://github.com/your-org/company-brain.git
cd company-brain

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate         # Windows
# source venv/bin/activate      # macOS/Linux

# Install in editable mode
pip install -e .

# Pull the required AI model
ollama pull gemma4:e4b
ollama serve

# Configure credentials
cp .env.example .env
# Edit .env and add your API keys
Connector Credentials
Edit .env or use ycb connect <connector> — unused connectors are automatically skipped if their credentials are absent:

Connector	Env Var	Where to get it
Slack	SLACK_BOT_TOKEN	api.slack.com/apps
Google Docs/Drive/Sheets	OAuth via credentials.json	console.cloud.google.com
GitHub	GITHUB_TOKEN	github.com/settings/tokens
Notion	NOTION_TOKEN	notion.so/my-integrations
Linear	LINEAR_API_KEY	Linear Settings
Discord	DISCORD_BOT_TOKEN	discord.com/developers
Jira / Confluence	JIRA_API_TOKEN, JIRA_DOMAIN	id.atlassian.com
Asana	ASANA_ACCESS_TOKEN	app.asana.com/-/developer_console
ClickUp	CLICKUP_API_KEY	app.clickup.com/settings/apps
HubSpot	HUBSPOT_ACCESS_TOKEN	app.hubspot.com
Salesforce	SALESFORCE_ACCESS_TOKEN	login.salesforce.com
See .env.example for the full list of all 38 connectors.

💻 Usage & Commands
If installed via pip, use the ycb command from anywhere:

# First-time setup check & license prompt
ycb init
Developer mode: If running from source, prefix commands with python main.py instead of ycb.

Connect a Data Source
Interactively prompt for and configure credentials for a single connector on demand.

ycb connect slack
Disconnect a Data Source
Remove stored credentials for a specific connector.

ycb disconnect slack
Run an Interactive Sync (Recommended)
Processes sources in small batches and pauses after each batch.

ycb sync --interactive
Run a Single-Connector Sync
Sync only a specific configured connector.

ycb sync --connector slack --once
Run a Full One-Time Sync
Processes everything in one go without stopping.

ycb sync --once
Run Continuous Background Sync
Automatically re-syncs every 30 minutes.

ycb sync
Check Current Status
View license tier, active connectors, tier-locked connectors, and skills stats.

ycb status
Export Your Skills
Export structured data for use by AI agents.

# Export as JSON (Best for AI Agents)
ycb export --output output/skills.json

# Export as Markdown (Best for Humans)
ycb export --output output/skills.md --format markdown
Ask Questions About Your Company Knowledge (--ask)
Run natural-language Q&A directly against your synced company data with multi-turn session support:

# Ask a question across all company data
ycb --ask "how do we handle customer refund requests"

# Scope question to a specific connector
ycb --ask "what PRs were merged this week" --connector github

# Run with verbose retrieval debugging audit
ycb --ask "tell me about our onboarding workflow" --verbose
Switch AI Models & Providers (switch model)
Select which model answers your questions and synthesizes skills:

# Open the interactive categorized model selection menu
ycb switch model

# List all supported categorized models without prompting
ycb switch model --list

# Switch directly by model name or slug
ycb switch model gemma4:e4b
ycb switch model gpt-5.6-terra
ycb switch model claude-sonnet-5
ycb switch model openrouter/free
ycb switch model mistralai/mistral-large-2407
Company Brain — Complete Technical Reference
This document covers every aspect of the Company Brain project: what it does, how it works under the hood, every API used, every technology used, the full data pipeline, CLI commands, and the engineering decisions made. Written for YC interviews and technical deep-dives.

Table of Contents
What is Company Brain?
The Core Problem It Solves
High-Level Architecture
Technology Stack
Connectors — All 38 Data Sources
Full Data Pipeline — Step by Step
Database Design
The LLM Integration
CLI Commands Reference
Terminal Dashboard (UI)
Key Engineering Decisions
Directory Structure
1. What is Company Brain?
Company Brain is an offline-first knowledge extraction pipeline. It connects to 38 of your company's existing communication, engineering, HR, customer support, and analytics tools, pulls all the scattered information, runs it through a local AI model, and outputs structured "Skills" — machine-readable procedure cards that AI agents can directly execute.

In plain English: Your team's knowledge lives in thousands of Slack messages, GitHub issues, Notion pages, and Jira tickets. Right now, no AI agent can act on that knowledge because it's buried in unstructured text across 38 different platforms. Company Brain reads all of it and converts it into clean, structured instructions.

2. The Core Problem It Solves
Without Company Brain	With Company Brain
AI agents have no idea how your company operates	AI agents get a skills_file.json with exact procedures
Building custom SOPs takes weeks of manual work	Company Brain auto-generates them by reading your existing docs
Institutional knowledge lives in people's heads / old Slack threads	It's extracted, structured, and searchable
Onboarding new hires is slow because no one knows where to find information	Skills are tagged by category, have prerequisites, and success criteria
Your knowledge is siloed across 38+ tools	A single unified sync pulls everything into one knowledge base
3. High-Level Architecture
┌───────────────────────────────────────────────────────────────────────────┐
│                              Data Sources (38)                             │
│  Slack  GitHub  Notion  Discord  Linear  Google Docs  Google Sheets        │
│  Outlook/Teams  GitLab  Dropbox  Mixpanel  Amplitude  Algolia  Exa        │
│  Perplexity  Facebook  Todoist  Web Crawler  Jira  Asana  Calendly         │
│  ClickUp  Airtable  Datadog  Segment  Front  Zoom  Twitter  HubSpot        │
│  Salesforce  Monday  Basecamp  Ashby  BambooHR  Deel  Rippling  Gmail      │
│  Google Drive                                                             │
└────────────────────────────────┬──────────────────────────────────────────┘
                                 │  REST / GraphQL APIs
                                 ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     Connector Layer (BaseConnector)                        │
│                                                                            │
│  • Every connector inherits BaseConnector (get_source_name, ingest)        │
│  • registry.py: get_enabled_connectors() loops all 38, skips unconfigured  │
│  • retry_with_backoff() handles 429/5xx with exponential backoff           │
│  • Error isolation: one failing connector never blocks the others          │
│  • CONNECTORS_ENABLED env var toggles connectors without code changes      │
└────────────────────────────────┬──────────────────────────────────────────┘                                                                  │
│  • Every connector inherits BaseConnector (get_source_name, ingest)        │
│  • registry.py: get_enabled_connectors() loops all 16, skips unconfigured  │
│  • retry_with_backoff() handles 429/5xx with exponential backoff           │
│  • Error isolation: one failing connector never blocks the others          │
│  • CONNECTORS_ENABLED env var toggles connectors without code changes      │
└────────────────────────────────┬──────────────────────────────────────────┘
                                 │  List[RawDataItem] (Pydantic model)
                                 ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          SQLite Database                                   │
│                      (via SQLAlchemy ORM)                                  │
│   Table: raw_data_items     Table: processed_chunks     Table: skills      │
└────────────────────────────────┬──────────────────────────────────────────┘
                                 │
                                 ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         Processing Pipeline                                │
│                                                                            │
│  1. DocumentChunker  → sentence-based sliding window (5 sentences,         │
│     2-sentence overlap), URL/email masking, noise filtering                │
│                                                                            │
│  2. KnowledgeExtractor → single optimised prompt to gemma4:e4b via Ollama  │
│     - Classifies chunk type (procedure/policy/decision/incident/general)   │
│     - Extracts key concepts as JSON array                                  │
│     - Computes heuristic confidence score (0.0 – 1.0)                     │
│                                                                            │
│  3. SkillsSynthesizer → filters high-confidence chunks, clusters by        │
│     primary concept, asks Gemma to write a complete Skill card             │
│     (steps, decisions, prerequisites, edge cases)                          │
└────────────────────────────────┬──────────────────────────────────────────┘
                                 │
                                 ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                            Export Layer                                    │
│              skills_file.json  /  skills_file.md                          │
│       (ready to plug into LangChain, AutoGen, or custom bots)             │
└───────────────────────────────────────────────────────────────────────────┘
4. Technology Stack
Category	Library / Tool	Why We Used It
Language	Python 3.11	Mature ecosystem for AI/NLP pipelines
Data Validation	pydantic v2	Enforces strict schema for every data model
Database ORM	sqlalchemy v2	Maps Python classes to SQLite tables cleanly
Database	SQLite	Zero-config local persistence, no server needed
HTTP Client	requests	Used by all new connectors for REST/GraphQL API calls
Slack Integration	slack-sdk v3	Official Slack client; handles pagination & auth
Google Integration	google-api-python-client, google-auth-oauthlib	Shared OAuth 2.0 flow for both Google Docs and Google Sheets
Local AI	ollama (Python client)	Runs Gemma 4 locally; zero data sent externally
CLI Framework	click	Clean, composable command-line interface
Terminal UI	rich	Beautiful dashboard with live animations, progress bars
Background Scheduler	apscheduler	Runs sync jobs on a 30-minute interval
Env Management	python-dotenv	Loads .env credentials without hardcoding secrets
5. Connectors — All 38 Data Sources
Company Brain uses a pluggable connector architecture. All 38 connectors inherit from BaseConnector and are registered in registry.py. The sync loop dynamically loads only the ones with valid credentials configured in .env.

Tier 1 — Core Team Communication & Engineering Knowledge
Connector	Auth	What It Ingests	Dedup Key
Slack	Bot Token	Messages, threads, replies from joined channels	slack:{channel_id}:{ts}
Google Docs	OAuth 2.0	Document text, paragraph headers, tables	gdoc:{doc_id}
Google Sheets	OAuth 2.0	Spreadsheet tabs as key-value row text	gsheet:{spreadsheet_id}:{sheet_name}
Google Drive	OAuth 2.0	Folder files metadata and text contents	gdrive:{file_id}
Gmail	OAuth 2.0	Email threads, messages, attachments text	gmail:{message_id}
GitHub	Personal Access Token	Issues, PR descriptions, labels, review comments	github:{repo}:{issue_number}
Notion	Integration Token	Page block hierarchies, databases, nested pages	notion:{page_id}
Discord	Bot Token	Server text channels and message history	discord:{channel_id}:{message_id}
Linear	API Key	Issues, descriptions, team context, comments (GraphQL)	linear:{issue_id}
Outlook / Teams	Azure OAuth 2.0 (MS Graph)	Outlook email threads + Teams channel messages	outlook:{message_id} / teams:{channel_id}:{message_id}
Tier 2 — Extended Dev, File & Search Sources
Connector	Auth	What It Ingests	Dedup Key
GitLab	Personal Access Token	Projects, issues, merge requests, notes	gitlab:{project}:{type}:{iid}
Dropbox	OAuth Access Token	Text files (.md, .txt, .json, .csv, .doc)	dropbox:{file_id}
Mixpanel	API Secret	Tracked event schema catalog	mixpanel:event_schema:{project_id}
Amplitude	API Key + Secret	Event taxonomy definitions	amplitude:taxonomy:{key}
Algolia	App ID + API Key	Indexed search records from named index	algolia:{index}:{objectID}
Exa	API Key	Web research results for search queries	exa:{hash(query)}
Perplexity	API Key	AI search completions for configured prompts	perplexity:{hash(prompt)}
Facebook	Page Access Token	Page posts and customer comments	facebook:{post_id}
Todoist	API Token	Project tasks, descriptions, comments	todoist:{task_id}
Web Crawler	None / Config URL	Scraped web pages, documentation site text	webcrawler:{url_hash}
Tier 3 — Project Management, Issue Tracking & Analytics
Connector	Auth	What It Ingests	Dedup Key
Jira	API Token + Domain	Issues, sprint boards, work logs, comments	jira:{issue_key}
Asana	Personal Access Token	Tasks, project boards, subtasks, stories	asana:{task_gid}
ClickUp	API Key	Tasks, docs, comments, custom fields	clickup:{task_id}
Airtable	Personal Access Token	Base tables, records, field mappings	airtable:{base_id}:{record_id}
Monday.com	API Token	Boards, items, column updates	monday:{item_id}
Basecamp	OAuth 2.0	Message boards, to-dos, campfires	basecamp:{recording_id}
Datadog	API Key + APP Key	Incident logs, monitors, alert post-mortems	datadog:{incident_id}
Segment	Public API Key	Tracking plans, event schema catalog	segment:{event_id}
Tier 4 — CRM, Support, HR & Enterprise
Connector	Auth	What It Ingests	Dedup Key
Front	API Token	Shared inbox conversations, messages	front:{conversation_id}
Zoom	Account Credentials	Cloud recording transcripts, meeting chat logs	zoom:{meeting_id}
Twitter / X	Bearer Token	User tweets, replies, thread context	twitter:{tweet_id}
HubSpot	Private App Token	CRM contacts, deal notes, ticket history	hubspot:{object_type}:{id}
Salesforce	OAuth 2.0	Accounts, Opportunities, Case resolution notes	salesforce:{object}:{id}
Calendly	Personal Access Token	Scheduled event types, meeting notes	calendly:{event_uuid}
Ashby	API Key	Candidates, interview feedback, job postings	ashby:{candidate_id}
BambooHR	API Key + Subdomain	HR policies, company announcements	bamboohr:{announcement_id}
Deel	API Token	Compliance docs, contractor agreements	deel:{contract_id}
Rippling	API Key	HR docs, policy handbooks, team structures	rippling:{document_id}
How to Enable/Disable Connectors
Edit the CONNECTORS_ENABLED variable in your .env:

# Enable only what you use — unconfigured connectors are silently skipped
CONNECTORS_ENABLED=slack,google_docs,github,notion,linear,jira,hubspot
Leave it empty to attempt all 38 connectors (only those with valid credentials will run).

6. Full Data Pipeline — Step by Step
Step 1: Ingestion
The SyncScheduler calls get_enabled_connectors() from registry.py. This returns a list of instantiated connectors whose credentials are present. For each connector, ingest(days_back=30) is called and the returned RawDataItem objects are collected.

# Every piece of data becomes this shape regardless of source
class RawDataItem(BaseModel):
    id: str              # e.g., "github:owner/repo:42" or "notion:abc123"
    source: DataSourceType   # enum: "slack", "github", "notion", etc.
    source_id: str       # platform-native ID (channel ID, doc ID, issue ID)
    title: str           # human-readable display name
    content: str         # full normalized text
    author: str          # username or display name
    created_at: datetime
    updated_at: datetime
    raw_metadata: dict   # source-specific extras (labels, state, channel, etc.)
Idempotency check: Before processing, the system calls get_processed_source_item_ids() on the database. This returns the set of all item IDs already processed into chunks. The pipeline filters out any item whose ID is already in this set. This means:

You can stop the sync halfway through and resume exactly where you left off.
Running sync again never re-processes already-seen items.
Step 2: Chunking — DocumentChunker
Long documents are split into smaller, manageable pieces before being sent to the LLM.

Text Cleaning (always runs first):

- Collapses multiple whitespace characters into single spaces
- Strips control characters (ASCII 0-31, 127-159)
- Replaces URLs with the token [URL]
- Replaces email addresses with the token [EMAIL]
Sliding-Window Sentence Chunking:

Default chunk size: 5 sentences
Default overlap: 2 sentences (retains tail context from the previous chunk)
Uses regex (?<=[.!?])\s+ to split on sentence boundaries (not mid-sentence)
Chunks shorter than 20 characters are discarded
Why overlap? Without overlap, if a procedure starts at the end of one chunk and continues at the start of the next, the LLM would only see half the context. The overlap ensures key context is preserved across boundaries.

Step 3: Knowledge Extraction — KnowledgeExtractor
For every chunk, the extractor makes a single combined LLM call (optimised from two separate calls):

Prompt: "Classify this text as ONE of: procedure, decision, incident, policy, or general.
         Then extract 3-5 key concepts. Return as JSON: { type: ..., concepts: [...] }"

Output: { "type": "procedure", "concepts": ["Handle Refunds", "Verify order status", "Payment processor"] }
Confidence Scoring (no LLM call, pure heuristic):

+0.3  if chunk is longer than 100 words
+0.2  if chunk is 50–100 words
+0.3  if classified as "procedure", "policy", or "decision"
+0.2  if 4+ key concepts were extracted
+0.1  if 2–3 key concepts were extracted
Max score: 1.0
Every processed chunk becomes a ProcessedChunk object and is saved to the database.

Step 4: Skill Synthesis — SkillsSynthesizer
This is where the real magic happens.

Phase A — Filtering: Only chunks with confidence_score >= 0.2 move forward.

Phase B — Clustering: Chunks are grouped by their first (primary) key concept. For example, all chunks where the first concept is "Handle Refunds" end up in the same cluster. Clusters with fewer than 2 chunks get merged into a miscellaneous cluster.

Phase C — Skill Generation: For each cluster, the LLM is given all the chunk texts combined and asked to synthesize a complete Skill card:

{
  "name": "clear skill name",
  "description": "what this skill does",
  "category": "refunds / pricing / incidents / ...",
  "procedure_steps": ["Step 1", "Step 2", "..."],
  "decision_points": {"if customer > 30 days": "deny refund"},
  "prerequisites": ["who can perform this", "required access"],
  "success_criteria": ["how to verify completion"],
  "exceptions": ["edge cases to watch for"]
}
The final Skill object is upserted (insert or update) into the SQLite skills table.

Step 5: Export
Running python main.py export serializes all skills from the database into a single SkillsFile object and writes it to disk.

{
  "version": "1.0.0",
  "generated_at": "2026-07-25T00:00:00",
  "company_name": "Your Company",
  "skills": [
    {
      "id": "skill-uuid-...",
      "name": "Handle Customer Refunds",
      "description": "...",
      "category": "refunds",
      "procedure_steps": ["Check eligibility", "Verify order", "Issue refund"],
      "decision_points": {"if_disputed": "escalate to manager"},
      "examples": [],
      "prerequisites": ["Customer support access"],
      "success_criteria": ["Refund confirmation sent"],
      "exceptions_and_edge_cases": ["Active subscriptions need billing cancel"],
      "source_items": ["github:myorg/repo:42", "slack-C01-123...", "notion:abc123"],
      "confidence_score": 0.75
    }
  ],
  "metadata": {
    "total_skills": 1,
    "by_category": {"refunds": 1}
  }
}
7. Database Design
The system uses SQLite with SQLAlchemy ORM. The database lives at data/company_brain.db (path configurable via DATABASE_URL in .env).

3 Tables:

raw_data_items
├── id (PK)          — unique ID e.g. "github:myorg/repo:42", "notion:abc123"
├── source           — enum: "slack", "github", "notion", "linear", etc.
├── source_id        — platform-native ID (channel ID, doc ID, issue ID)
├── title            — display name
├── content          — full raw text
├── author           — username or display name
├── created_at
├── updated_at
└── raw_metadata     — JSON blob with source-specific fields (labels, state, etc.)

processed_chunks
├── id (PK)          — "chunk-{uuid}"
├── source_item_id   — FK to raw_data_items.id
├── chunk_text       — the actual text block
├── chunk_index      — position within source document
├── key_concepts     — JSON list e.g. ["Refunds", "Policy"]
├── chunk_type       — "procedure", "policy", "decision", "incident", "general"
├── confidence_score — float 0.0 to 1.0
└── created_at

skills
├── id (PK)          — "skill-{uuid}"
├── name             — e.g. "Handle Customer Refunds"
├── description
├── category         — e.g. "refunds"
├── procedure_steps  — JSON list
├── decision_points  — JSON dict
├── examples         — JSON list
├── prerequisites    — JSON list
├── success_criteria — JSON list
├── exceptions_and_edge_cases — JSON list
├── source_items     — JSON list of contributing raw_data_items IDs
├── last_updated
└── confidence_score
8. The LLM Integration (Multi-Provider Engine)
Your Company Brain features a pluggable, multi-provider LLM abstraction layer (src/qa/providers/) that decouples knowledge extraction, skill synthesis, and Q&A retrieval from any single model back-end.

Supported Providers & Models
Provider	Supported Models	Description / Use Case
Local (Ollama)	gemma4:e4b	100% offline, privacy-first default running on localhost:11434.
OpenAI (ChatGPT)	gpt-5.6-sol, gpt-5.6-terra, gpt-5.6-luna	Frontier cloud models with 200K token context window budget.
Claude (Anthropic)	claude-fable-5, claude-opus-5, claude-sonnet-5, claude-haiku-4-5	High-reasoning Claude models with optional extended thinking mode.
OpenRouter	openrouter/free, nvidia/nemotron-3-super-120b-a12b:free, google/gemma-4-26b-a4b-it:free, custom slugs	Auto-routing free tier or any custom open-source model slug.
Architecture & Provider Interface (LLMProvider)
All providers implement the LLMProvider abstract base class (src/qa/providers/base.py):

class LLMProvider(ABC):
    display_name: str
    max_context_chars: int

    @abstractmethod
    def check_available(self) -> bool:
        """Health check and API authentication verification."""
        ...

    @abstractmethod
    def generate(self, question: str, context: str, history: List[Dict[str, str]]) -> str:
        """Multi-turn Q&A answer generation."""
        ...

    @abstractmethod
    def generate_text(self, prompt: str, max_tokens: int = 512, temperature: float = 0.0) -> str:
        """Raw prompt completion for concept extraction and skill synthesis."""
        ...
JSON Parsing Robustness
Because LLMs sometimes wrap structured JSON in markdown code fences, we extract payloads with regex fallbacks:

json_match = re.search(r'\[.*?\]', result_text, re.DOTALL)  # for arrays
json_match = re.search(r'\{.*\}', result_text, re.DOTALL)   # for objects
if json_match:
    data = json.loads(json_match.group())
9. CLI Commands Reference
All commands are run from inside the project root directory using the venv Python interpreter.

# Start interactive batch sync (RECOMMENDED)
# Processes 2 items at a time, asks whether to continue after each batch
.\venv\Scripts\python.exe main.py sync --interactive

# Run a single full sync (processes everything, no stops)
.\venv\Scripts\python.exe main.py sync --once

# Run continuous auto-sync (syncs every 30 minutes in the background)
.\venv\Scripts\python.exe main.py sync

# Check current database status: skill count, categories, confidence
.\venv\Scripts\python.exe main.py status

# Ask natural-language questions about your company data (v3.0.0 feature)
ycb --ask "what processes or procedures does our company have documented"

# Scope question to a specific connector only
ycb --ask "what updates or commits were made recently" --connector github

# Export skills as JSON (for AI agents)
ycb export --output output/skills.json

# Export skills as readable Markdown (for humans)
.\venv\Scripts\python.exe main.py export --output output/skills.md --format markdown

# Disable the Rich dashboard UI (useful for piping output to logs)
.\venv\Scripts\python.exe main.py sync --once --plain
Interactive Batch Menu (appears after each batch of 2 documents):

[Batch 1 complete. 5 total chunks processed so far.]
Do you want to: (1) Process next batch (2) Synthesize skills now and STOP (3) Quit immediately?
1 → Continue to next 2 items
2 → Stop ingesting new data, run synthesis on what you have right now, and export
3 → Exit immediately without synthesizing
10. Terminal Dashboard (UI)
The terminal UI is built with the rich library and runs inside a rich.live.Live context. This means the dashboard panel stays fixed at the top of the terminal while log messages scroll underneath it.

Key components:

SyncState — A plain Python class that holds the current progress percentage, file count, skill count, task statuses, and elapsed time.
SyncDashboard — A custom __rich_console__ renderable that reads from SyncState and draws the panel using rich.panel.Panel, rich.console.Group, and rich.progress.Progress.
ProceduralNetwork — The animated neural network animation. It's NOT pre-built frames. It uses math.sin(time.time() * 3 + offset) to procedurally compute the brightness/state of each node and edge in real time at ~10 FPS.
DashboardLogHandler — A custom Python logging.Handler that intercepts log messages from the backend (like "Phase 1: Ingesting data") and maps them to UI state updates (progress bar %, which task is active). This is how the backend and UI stay decoupled — the SyncScheduler never knows a UI exists.
11. Key Engineering Decisions
Why an Abstract Base Connector + Registry pattern?
With 16 connectors, hardcoding each one into SyncScheduler would create a monolithic, hard-to-maintain sync loop. Instead, BaseConnector enforces a uniform ingest() interface, and registry.py acts as a plugin system. Adding a new connector is three steps: write the class, register it in registry.py, add credentials to .env.example. The scheduler code never changes.

Why SQLite instead of a cloud database?
Privacy-first design. Company data stays on-premise. SQLite also requires zero configuration, which makes setup trivial. The path is configurable via DATABASE_URL if you want to swap in PostgreSQL for production.

Why local LLM (Ollama) instead of OpenAI?
Companies have confidential Slack data, GitHub issues, emails. Sending it to a third-party API is a major legal and trust risk. Ollama + Gemma 4 gives equivalent results while keeping everything local. This is a core value proposition: "your data, your machine, your AI."

Why a single combined LLM call instead of two?
The original design made two LLM calls per chunk: one for classification, one for concept extraction. This was optimised to a single JSON-returning prompt that does both simultaneously, cutting per-chunk latency roughly in half without sacrificing output quality.

Why a sliding window chunker instead of splitting by headers?
We also implemented chunk_by_structure() (splits by # headers). But most Slack messages and informal docs don't have formal headers. The sentence-based sliding window handles messy, unstructured text far better across all 16 source types.

Why concept-overlap clustering instead of embeddings/vector search?
For an MVP, cosine similarity over embeddings requires storing large float arrays and running nearest-neighbor search. Instead, we cluster purely by the primary concept extracted by the LLM. It's O(N) instead of O(N²) and produces very interpretable clusters. Embedding-based clustering is a listed future improvement (embedding field already exists on ProcessedChunk, it's just null for now).

Why the interactive batch system?
Running a full sync across 16 connectors through a local 4B model can take a long time. Users need to be able to stop, inspect partial results, and decide whether to continue. The batch system also lets users validate quality early without committing to the full pipeline run.

Idempotency
Every raw item has a globally unique ID (e.g., github:myorg/repo:42, notion:abc123, slack-C05-1234). Before any processing, we query processed IDs from the DB and filter them out. Running sync 10 times on the same data produces the same result as running it once.

12. Directory Structure
company_brain_mvp/
│
├── main.py                              ← CLI entry point (self-relative sys.path setup)
├── requirements.txt                     ← All Python dependencies
├── .env                                 ← Your API keys (gitignored)
├── .env.example                         ← Template for .env with all 38 connectors
├── credentials.json                     ← Google OAuth credentials (gitignored)
├── token.pickle                         ← Saved Google OAuth token (gitignored)
├── test_integration.py                  ← Quick smoke test (chunker + LLM + synthesizer)
│
├── src/
│   ├── connectors/
│   │   ├── base_connector.py            ← Abstract BaseConnector: ingest(), retry_with_backoff()
│   │   ├── registry.py                  ← Central connector registry: get_enabled_connectors()
│   │   │
│   │   │   ── Tier 1 Connectors ──
│   │   ├── slack_connector.py           ← Slack: messages, thread replies
│   │   ├── google_docs_connector.py     ← Google Docs: paragraph text, tables
│   │   ├── google_sheets_connector.py   ← Google Sheets: tabs as key-value row text
│   │   ├── google_drive_connector.py    ← Google Drive: file metadata & content text
│   │   ├── gmail_connector.py           ← Gmail: emails, threads, message text
│   │   ├── github_connector.py          ← GitHub: issues, PRs, comments (REST API v3)
│   │   ├── notion_connector.py          ← Notion: page blocks, recursive children
│   │   ├── discord_connector.py         ← Discord: server channels, messages
│   │   ├── linear_connector.py          ← Linear: issues, comments (GraphQL API)
│   │   ├── outlook_teams_connector.py   ← Outlook emails + Teams messages (MS Graph)
│   │   │
│   │   │   ── Tier 2 Connectors ──
│   │   ├── gitlab_connector.py          ← GitLab: issues, merge requests, notes
│   │   ├── dropbox_connector.py         ← Dropbox: text file downloads
│   │   ├── analytics_connector.py       ← Mixpanel + Amplitude: event schemas
│   │   ├── search_connector.py          ← Algolia + Exa + Perplexity: search results
│   │   ├── facebook_connector.py        ← Facebook: page posts, comments
│   │   ├── todoist_connector.py         ← Todoist: tasks, project details, comments
│   │   ├── web_crawler_connector.py     ← Web Crawler: scraped web page text
│   │   │
│   │   │   ── Tier 3 Connectors ──
│   │   ├── jira_connector.py            ← Jira: issues, comments, work logs
│   │   ├── asana_connector.py           ← Asana: tasks, projects, subtasks
│   │   ├── clickup_connector.py         ← ClickUp: tasks, docs, custom fields
│   │   ├── airtable_connector.py        ← Airtable: base records & fields
│   │   ├── monday_connector.py          ← Monday.com: boards, updates, items
│   │   ├── basecamp_connector.py        ← Basecamp: message boards, to-dos
│   │   ├── datadog_connector.py         ← Datadog: monitors, alert logs
│   │   ├── segment_connector.py         ← Segment: tracking plans & event schema
│   │   │
│   │   │   ── Tier 4 Connectors ──
│   │   ├── front_connector.py           ← Front: shared inbox conversations
│   │   ├── zoom_connector.py            ← Zoom: meeting transcripts & logs
│   │   ├── twitter_connector.py         ← Twitter / X: tweets, replies, threads
│   │   ├── hubspot_connector.py         ← HubSpot: contacts, deals, ticket notes
│   │   ├── salesforce_connector.py      ← Salesforce: objects, opportunities, cases
│   │   ├── calendly_connector.py        ← Calendly: scheduled events & notes
│   │   ├── ashby_connector.py           ← Ashby: candidate notes, jobs
│   │   ├── bamboohr_connector.py        ← BambooHR: HR policies & announcements
│   │   ├── deel_connector.py            ← Deel: contracts & compliance docs
│   │   └── rippling_connector.py        ← Rippling: policy handbooks & HR docs
│   │
│   ├── processors/
│   │   ├── chunker.py                   ← Sentence-based sliding window chunker
│   │   ├── knowledge_extractor.py       ← gemma4:e4b: single combined classify+extract call
│   │   └── skills_synthesizer.py        ← Cluster chunks → generate Skill cards
│   │
│   ├── models/
│   │   └── domain.py                    ← Pydantic models: RawDataItem, ProcessedChunk, Skill
│   │
│   ├── storage/
│   │   ├── database.py                  ← SQLAlchemy table definitions (3 tables)
│   │   └── storage_manager.py           ← CRUD: save_raw_items, save_chunks, get_processed_ids
│   │
│   ├── sync/
│   │   └── sync_scheduler.py            ← Orchestrates full & interactive sync via registry
│   │
│   └── cli/
│       ├── main.py                      ← Click commands: sync, export, status, init
│       └── ui/
│           ├── animation.py             ← Procedural neural network animation
│           ├── dashboard.py             ← Rich Live dashboard (SyncDashboard, SyncState)
│           ├── logger.py                ← Custom logging.Handler → UI state bridge
│           └── components.py            ← Rich tables/panels for status & export
│
├── tests/                               ← Unit test suite for all 38 connectors
│
├── data/
│   └── company_brain.db                 ← SQLite database (auto-created on first run)
│
└── output/
    ├── skills_file.json                 ← Final structured output for AI agents
    └── skills_file.md                   ← Human-readable version