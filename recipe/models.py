from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    ingredients = models.TextField()
    categories = models.JSONField()
    calories = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    sodium = models.FloatField()
    rating = models.FloatField()
    date = models.DateField()
    desc = models.TextField()
    directions = models.TextField()

    def __str__(self):
        return self.title
