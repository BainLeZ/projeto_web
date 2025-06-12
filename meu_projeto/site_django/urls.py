from django.contrib.auth.views import LogoutView
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('projeto/', views.projeto, name='projeto'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('jogo/<int:jogo_id>/', views.jogo_detalhes, name='jogo_detalhes'),
    path('logout/', LogoutView.as_view(next_page='projeto'), name='logout'),
    path('perfil/', views.perfil, name='perfil'),

    # Rota para salvar a foto e descrição do perfil via AJAX
    path('salvar_perfil/', views.salvar_perfil, name='salvar_perfil'),

    # path('quemsomos/', quemsomos, name='quemsomos'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

