from django.shortcuts import render
# from django.http import HttpResponse

# Create your views here.
# def instituto(request):
    # return HttpResponse("Bem-vindo ao site institucional!")

# def quemsomos(request):
    # return HttpResponse("Quem somos")

def instituto(request):
    return render(request,'site_institucional/index.html')