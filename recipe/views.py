from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from opensearchpy import OpenSearch
from .opensearch_client import client, index_name

class SearchRecipesView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            keyword = request.query_params.get('q', '')
            page = int(request.query_params.get('page', 1))
            size = int(request.query_params.get('size', 10))

            if page < 1 or size < 1:
                return Response({"error": "Page and size must be positive integers."}, status=status.HTTP_400_BAD_REQUEST)

            search_body = {
                "query": {
                    "multi_match": {
                        "query": keyword,
                        "fields": ["title^2", "ingredients", "categories", "description", "directions"]
                    }
                },
                "from": (page - 1) * size,
                "size": size
            }

            response = client.search(index=index_name, body=search_body)
            hits = response['hits']['hits']
            recipes = []
            for hit in hits:
                recipe = hit['_source']
                recipes.append({
                    "id": recipe.get("id"),
                    "title": recipe.get("title"),
                    "ingredients": recipe.get("ingredients"),
                    "categories": recipe.get("categories"),
                    "calories": recipe.get("calories"),
                    "protein": recipe.get("protein"),
                    "fat": recipe.get("fat"),
                    "sodium": recipe.get("sodium"),
                    "rating": recipe.get("rating"),
                    "date": recipe.get("date"),
                    "description": recipe.get("desc"),
                    "directions": recipe.get("directions"),
                })

            return Response({'recipes': recipes}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FilterRecipesView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            search_query = request.GET.get('q', '')
            filters = {
                "calories": request.GET.get('calories', None),
                "protein": request.GET.get('protein', None),
                "fat": request.GET.get('fat', None),
                "sodium": request.GET.get('sodium', None),
                "rating": request.GET.get('rating', None)
            }
            
            filter_conditions = []
            margin = 2
            
            # Add search condition
            if search_query:
                filter_conditions.append({
                    "match": {
                        "title": search_query  # You can adjust this to search across multiple fields
                    }
                })

            # Build filter conditions with a margin
            for field, value in filters.items():
                if value:
                    filter_conditions.append({
                        "range": {
                            field: {
                                "gte": float(value) - margin,
                                "lte": float(value)
                            }
                        }
                    })

            search_body = {
                "query": {
                    "bool": {
                        "must": filter_conditions  # Apply all filter conditions
                    }
                }
            }
            
            response = client.search(index=index_name, body=search_body)

            hits = response['hits']['hits']
            recipes = [hit['_source'] for hit in hits]

            return Response({"recipes": recipes}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
