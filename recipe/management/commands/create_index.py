from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Create OpenSearch index'

    def handle(self, *args, **kwargs):
        client = settings.OPENSEARCH_CLIENT
        # Your script logic here
