from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from .models import Jogo
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Profile


# Exibe a página principal com os jogos
def projeto(request):
    jogos = Jogo.objects.all()
    return render(request, 'projeto/projeto.html', {'jogos': jogos})

# View para login
def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            login(request, user)
            return redirect('projeto')
        else:
            messages.error(request, 'Usuário ou senha incorretos. Se você não tem uma conta, registre-se!')
            return redirect('login')

    return render(request, 'projeto/login.html')

# View para cadastro de usuário
def register_view(request):
    if request.method == 'POST':
        nome = request.POST['nome']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password_confirm = request.POST['password_confirm']

        # Verifica se o username já está em uso
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Este nome de usuário já está em uso.')
            return redirect('register')

        # Verifica se o email já está em uso
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Este e-mail já está em uso.')
            return redirect('register')

        if password != password_confirm:
            messages.error(request, 'As senhas não coincidem.')
            return redirect('register')

        try:
            # Criação do usuário
            user = User.objects.create_user(username=username, email=email, password=password)
            user.first_name = nome
            user.save()

            # Criar perfil automaticamente
            Profile.objects.get_or_create(user=user)  # Criação do perfil

            messages.success(request, 'Registro bem-sucedido! Faça login agora.')
            return redirect('login')
        except Exception as e:
            messages.error(request, f'Ocorreu um erro ao registrar. Tente novamente. Erro: {e}')
            return redirect('register')

    return render(request, 'projeto/register.html')

# View para exibir detalhes do jogo
def jogo_detalhes(request, jogo_id):
    jogo = get_object_or_404(Jogo, id=jogo_id)

    contexto = {
        'name': jogo.nome,
        'banner': jogo.banner,
        'processor_min': jogo.processor_min,
        'gpu_min': jogo.gpu_min,
        'ram_min': jogo.ram_min,
        'disk_min': jogo.disk_min,
        'processor_rec': jogo.processor_rec,
        'gpu_rec': jogo.gpu_rec,
        'ram_rec': jogo.ram_rec,
        'disk_rec': jogo.disk_rec,
        'genero': jogo.genero,
    }
    return render(request, 'projeto/detalhes.html', contexto)

@login_required
def perfil(request):
    return render(request, 'projeto/perfil.html', {'user': request.user})

@login_required
def salvar_perfil(request):
    if request.method == 'POST':
        descricao = request.POST.get('descricao', '')
        foto = request.FILES.get('foto_perfil')

        profile = request.user.profile

        profile.descricao = descricao
        if foto:
            profile.foto_perfil = foto  # Correção aqui!
        profile.save()

        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Método inválido'})