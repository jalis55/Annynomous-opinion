# 🕵️ Anonymous Opinion

A real-time, fully anonymous opinion-sharing platform where employees can share workplace stories without revealing their identity. Posts are moderated by AI before publishing, and all new posts and replies appear instantly via WebSockets.

---

## ✨ Features

- 🔒 **Fully anonymous** — no accounts, no login, no tracking
- ⚡ **Real-time feed** — new posts appear instantly via WebSocket (Django Channels)
- 💬 **Real-time replies** — comments on each post broadcast live to all viewers
- 🤖 **AI content moderation** — Groq LLM checks every post for hate, threats, spam, and personal info before publishing
- 📊 **Sentiment analysis** — each post is labelled Positive / Mixed / Negative on the frontend
- 📜 **Terms agreement** — users must accept terms before posting

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, react-use-websocket, Bootstrap, SweetAlert2 |
| Backend | Django 5, Django REST Framework |
| Real-time | Django Channels 4, Daphne, Redis |
| AI Moderation | Groq SDK (`moonshotai/kimi-k2-instruct`) |
| Database | SQLite (dev) / PostgreSQL (prod) |

---

## 📁 Project Structure

```
Anonymous-opinion/
├── backend/                  # Django project
│   ├── api/                  # Posts & Comments app
│   │   ├── models.py         # Post, Comment models
│   │   ├── serializer.py     # DRF serializers
│   │   ├── views.py          # REST API views
│   │   ├── consumers.py      # WebSocket consumers
│   │   ├── signals.py        # Broadcast signals (post/comment save)
│   │   └── urls.py           # API URL patterns
│   ├── genai/                # AI moderation app
│   │   ├── helpers.py        # Groq API call & system prompt
│   │   ├── views.py          # Content-check endpoint
│   │   └── urls.py
│   ├── core/                 # Django project settings
│   │   ├── settings.py
│   │   ├── asgi.py           # ASGI entry point (Channels)
│   │   └── routing.py        # WebSocket URL routing
│   ├── .env                  # 🔒 Secret keys (never commit)
│   ├── .env.example          # ✅ Safe template to copy
│   └── requirements.txt
│
└── frontend/                 # React app
    └── src/
        ├── components/
        │   ├── Post/
        │   │   ├── AllPosts.jsx      # Live post feed (WS homepage)
        │   │   ├── Posts.jsx         # Single post wrapper + sentiment
        │   │   ├── PostCard.jsx      # Post card shell
        │   │   ├── PostCardBody.jsx  # Post content + timestamp
        │   │   ├── PostCardReply.jsx # Real-time replies (WS per-post)
        │   │   └── CreatePost.jsx    # Create post form + AI check
        │   ├── NavBar/               # Navigation bar
        │   ├── Agreement/            # Terms modal
        │   └── AboutUs/              # About page
        └── api/axios.js              # Axios base config
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Redis (running on `localhost:6379`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Annynomous-opinion.git
cd Annynomous-opinion
```

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# ✏️  Open .env and paste your real Groq API key

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

> The backend runs at **http://127.0.0.1:8000**

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

> The frontend runs at **http://localhost:3000**

### 4. Start Redis

Redis is required for Django Channels to broadcast WebSocket messages.

```bash
# macOS / Linux
redis-server

# Docker
docker run -p 6379:6379 redis
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/posts/` | List all posts |
| `POST` | `/api/posts/` | Create a new post |
| `GET` | `/api/post/comments/<id>/` | Get comments for a post |
| `POST` | `/api/comments/add/` | Add a comment |
| `POST` | `/api/genai/check/` | AI content moderation check |

## 🔌 WebSocket Endpoints

| URL | Consumer | Purpose |
|-----|----------|---------|
| `ws/homepage/` | `HomeConsumer` | Broadcasts new posts to all clients |
| `ws/post/<post_id>/` | `PostDetailConsumer` | Broadcasts new replies to a specific post |

---

## 🔑 Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in the values:

```env
GENAI_API_KEY="your_groq_api_key_here"
```

> **🔴 Important:** Never commit your `.env` file. It is listed in `.gitignore`.  
> If you accidentally committed it, rotate your API key immediately at [console.groq.com](https://console.groq.com).

---

## 🤖 AI Content Moderation

Before a post is published, the frontend sends the content to the `/api/genai/check/` endpoint. The Groq LLM (`moonshotai/kimi-k2-instruct`) evaluates it against these rules:

| Rule | Description |
|------|-------------|
| 🔒 Personal Info | Rejects real names, addresses, phone/email, social handles |
| 🚫 Hate / Abuse | Rejects attacks on any group or person |
| ⚖️ Illegal Content | Rejects CSAM, piracy, threats, drug/weapon deals |
| 📢 Spam | Rejects repetitive, bot, or gibberish text |
| ⚠️ Threats | Rejects any threat of violence |

The API returns `{"accepted": 1/0, "sentiment": "positive"/"mixed"/"negative"}`.

---

## ⚡ How Real-Time Works

```
User submits post/reply
       │
       ▼
REST API saves to DB → Django signal fires
       │
       ▼
channel_layer.group_send(...)
       │
       ▼
WebSocket Consumer broadcasts to group
       │
       ▼
All connected React clients receive message → state updated instantly
```

---

## 📄 License

MIT — free to use, modify, and distribute.
