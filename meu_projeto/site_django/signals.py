from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

# Signal para criar ou salvar o profile automaticamente ao criar/alterar um usuário
@receiver(post_save, sender=User)
def criar_ou_salvar_profile(sender, instance, created, **kwargs):
    if created:
        # Aqui usamos get_or_create para evitar criar perfis duplicados
        Profile.objects.get_or_create(user=instance)
    else:
        instance.profile.save()