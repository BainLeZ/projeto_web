from django.urls import path
from .views import instituto

urlpatterns = [
path('', instituto, name='institucional'),
# path('quemsomos/', quemsomos, name='quemsomos'),
]