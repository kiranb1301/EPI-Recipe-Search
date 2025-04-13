import csv 
from opensearchpy import OpenSearch,helpers
import os
from django.conf import settings 
import django

host = 'localhost'  # Update with your OpenSearch host
port = 9200         # Update with your OpenSearch port
auth = ('admin', 'Aa@208010')  # Update with your OpenSearch username and password
client = OpenSearch(
    hosts=[{'host': host, 'port': port}],
    http_compress=True,
    http_auth=auth,
    use_ssl=True,
    verify_certs=False,
    ssl_assert_hostname=False,
    ssl_show_warn=False,
)

index_name = 'epirecipes' 
mapping = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "id": {"type": "integer"},
            "title": {"type": "text"},
            "ingredients": {"type": "text"},
            "categories": {"type": "keyword"},
            "calories": {"type": "integer"},
            "protein": {"type": "integer"},
            "fat": {"type": "integer"},
            "sodium": {"type": "integer"},
            "rating": {"type": "float"},
            "date": {"type": "date"},
            "desc": {"type": "text"},
            "directions": {"type": "text"}
        }
    }
}

if not client.indices.exists(index_name):
    client.indices.create(index=index_name, body=mapping)
    print(f"Created index: {index_name}")
else:
    print(f'Index {index_name} already exists') 
    
file_path = 'epi_r.csv'
actions = [] 
with open(file_path, mode='r', encoding='utf-8') as f:
    csv_reader = csv.DictReader(f)
    for idx, row in enumerate(csv_reader):
        actions.append({
            "_index": index_name,
            "_id": idx,  # Optionally use the row index or some unique ID
            "_source": {
                "id": idx,
                "title": row.get('title', 'No Title'),
                "ingredients": row.get('ingredients', ''),
                "categories": row.get('categories', '').split(','),  # Assuming categories are comma-separated
                "calories": int(float(row['calories'])) if row['calories'] else 0,  # Handle empty string
                "protein": int(float(row['protein'])) if row['protein'] else 0,
                "fat": int(float(row['fat'])) if row['fat'] else 0,
                "sodium": int(float(row['sodium'])) if row['sodium'] else 0,
                "rating": float(row['rating']) if row['rating'] else 0.0,  # Keep as float, handle empty
                "date": row.get('date', None),
                "desc": row.get('desc', None),
                "directions": row.get('directions', '')
            }
        })
try:
    helpers.bulk(client, actions)
    print(f"Indexed {len(actions)} documents into '{index_name}'")
except Exception as e:
    print(f"Error during bulk indexing: {e}")  

'''
Features: 1. search functionality: Allow users to search recipes by title or keywords 

filters -> implement dynamic filters that update search results in real-time 

Recipe Display -> Show recipe details in an organized and visually appealing manner 

navigation : ensure smooth navigation between different sections of application. 

Integration with backend 

connect the react frontend with django backend APIs for data retrieval and interaction. ''' 
