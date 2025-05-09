from django.shortcuts import render, redirect
from .forms import CadastroForm

def cadastro(request):
    if request.method == 'POST':
        form = CadastroForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('sucesso')
    else:
        form = CadastroForm()
    
    return render(request, 'app_cadastro/cadastro.html', {'form': form})

def sucesso(request):
    return render(request, 'app_cadastro/sucesso.html')

