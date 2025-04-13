from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class RecipeAPITests(APITestCase):
    def test_search_recipes(self):
        url = reverse('search-recipes')
        response = self.client.get(url, {'q': 'pasta'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add more assertions based on your expected data structure

    def test_filter_recipes(self):
        url = reverse('filter-recipes')
        response = self.client.get(url, {'calories': 500, 'protein': 10})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add more assertions based on your expected data structure
