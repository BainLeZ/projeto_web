from django.contrib.auth.views import LogoutView
from django.urls import path
from . import views

urlpatterns = [
path('projeto/', views.projeto, name='projeto'),
path('login/', views.login_view, name='login'),
path('register/', views.register_view, name='register'),
path('jogo/<int:jogo_id>/', views.jogo_detalhes, name='jogo_detalhes'),
path('logout/', LogoutView.as_view(next_page='projeto'), name='logout'),

# path('quemsomos/', quemsomos, name='quemsomos'),
]