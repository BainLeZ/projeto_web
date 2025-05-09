from django.urls import path
from . import views

urlpatterns = [
    path('', views.cadastro, name='cadastro'),
    path('sucesso/', views.sucesso, name='sucesso'),
]
