from django.urls import path
from .views import SearchRecipesView, FilterRecipesView

urlpatterns = [
    path('api/recipes/search/', SearchRecipesView.as_view(), name='search_recipes'),
    path('api/recipes/filter/', FilterRecipesView.as_view(), name='filter_recipes'),
]