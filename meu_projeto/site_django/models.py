from django.db import models

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
