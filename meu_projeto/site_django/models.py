from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Jogo(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    
    icone = models.ImageField(upload_to='icones/')
    banner = models.ImageField(upload_to='banners/')
    imagem_extra_1 = models.ImageField(upload_to='extras/', blank=True, null=True)
    imagem_extra_2 = models.ImageField(upload_to='extras/', blank=True, null=True)
    imagem_extra_3 = models.ImageField(upload_to='extras/', blank=True, null=True)
    
    processor_min = models.CharField(max_length=100)
    gpu_min = models.CharField(max_length=100)
    ram_min = models.CharField(max_length=50)
    disk_min = models.CharField(max_length=50)

    processor_rec = models.CharField(max_length=100)
    gpu_rec = models.CharField(max_length=100)
    ram_rec = models.CharField(max_length=50)
    disk_rec = models.CharField(max_length=50)

    genero = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    descricao = models.TextField(blank=True)
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True)

    def __str__(self):
        return self.user.username

# Signal para criar ou salvar o profile automaticamente ao criar/alterar um usuário
@receiver(post_save, sender=User)
def criar_ou_salvar_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        profile, _ = Profile.objects.get_or_create(user=instance)
        profile.save()