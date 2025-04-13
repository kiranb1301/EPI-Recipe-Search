# 🍲 EpiRecipe - Smart Recipe Search App

**EpiRecipe** is a smart recipe search application built with **Django**, **OpenSearch**, and a modern frontend framework (React, Vue, etc.). It allows users to search recipes based on ingredients, cuisines, dietary tags, cook time, and more — leveraging OpenSearch for blazing-fast, multi-factor search functionality.

---

## 🧠 Features

- 🔍 Full-text search and filtering across recipe data
- ⚙️ Powerful OpenSearch queries with relevance ranking
- 🧾 RESTful API for frontend/backend communication
- 💻 User-friendly frontend to explore recipes
- 📦 Easy Docker-based OpenSearch deployment

---

## 📦 Tech Stack

- **Backend**: Django + Django REST Framework
- **Search Engine**: OpenSearch (via official Python client)
- **Frontend**: React (or Vue/Angular)
- **Database**: SQLite (optional, for user/admin metadata)
- **DevOps**: Docker for OpenSearch

---

## 🚀 Project Setup Instructions

### 🔧 Prerequisites

Ensure the following are installed:

- Python 3.10+
- Node.js (for frontend)
- Docker & Docker Compose
- Git

---

### 🛠️ 1. Clone the Repository

```bash
git clone https://github.com/yourusername/epirecipe.git
cd epirecipe
```
2. Backend Setup (Django)
   Step 1: Create a virtual environment and activate it
     ```bash
     python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   Step 2: Install Python dependencies
   ```bash
     pip install -r requirements.txt
   ```
  Step 3: Run migrations
   ```bash
     python manage.py migrate
   ```
  Step 4: Create a superuser (optional for admin access)
   ```bash
   python manage.py createsuperuser
   ```
3. OpenSearch Setup with Docker
   To run OpenSearch locally with Docker:
   ```bash
   docker run -d --name opensearch \
    -p 9200:9200 -p 9600:9600 \
   -e "discovery.type=single-node" \
   -e "plugins.security.disabled=true" \
   opensearchproject/opensearch:latest
   ```
4. Index Recipe Dataset into OpenSearch
   Ensure your dataset (e.g., recipes.json) is placed inside the recipe_dataset/ directory.
   ```bash
   python manage.py runscript index_recipes
   ```
5. Run the Django Development Server
   ```bash
   python manage.py runserver
   ```
## Example API Usage
GET /api/recipes/search/?q=chicken&cuisine=indian
→ Search recipes with keyword and filter

GET /api/recipes/<id>/
→ Retrieve a specific recipe

POST /api/recipes/reindex/
→ Reindex the dataset (admin/dev use)
   
 
