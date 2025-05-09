from django.db import models

class Cadastro(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    
    def __str__(self):
        return self.nome
