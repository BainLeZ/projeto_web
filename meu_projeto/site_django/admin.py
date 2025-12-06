from django.contrib import admin
from .models import Jogo, Profile
from django.utils.html import format_html

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'genero', 'icone_preview', 'banner_preview')
    
    readonly_fields = ('icone_preview', 'banner_preview', 'imagem_extra_1_preview', 'imagem_extra_2_preview', 'imagem_extra_3_preview')

    fieldsets = (
        ('Informações Gerais', {
            'fields': ('nome', 'descricao', 'genero')
        }),
        ('Imagens', {
            'fields': ('icone', 'icone_preview', 'banner', 'banner_preview', 
                       'imagem_extra_1', 'imagem_extra_1_preview',
                       'imagem_extra_2', 'imagem_extra_2_preview',
                       'imagem_extra_3', 'imagem_extra_3_preview')
        }),
        ('Requisitos Mínimos', {
            'fields': ('processor_min', 'gpu_min', 'ram_min', 'disk_min')
        }),
        ('Requisitos Recomendados', {
            'fields': ('processor_rec', 'gpu_rec', 'ram_rec', 'disk_rec')
        }),
    )

    def icone_preview(self, obj):
        if obj.icone:
            return format_html('<img src="{}" width="50" height="50" />', obj.icone.url)
        return "Sem ícone"
    icone_preview.short_description = 'Prévia do Ícone'

    def banner_preview(self, obj):
        if obj.banner:
            return format_html('<img src="{}" width="100" />', obj.banner.url)
        return "Sem banner"
    banner_preview.short_description = 'Prévia do Banner'

    def imagem_extra_1_preview(self, obj):
        if obj.imagem_extra_1:
            return format_html('<img src="{}" width="100" />', obj.imagem_extra_1.url)
        return "Sem imagem extra 1"

    def imagem_extra_2_preview(self, obj):
        if obj.imagem_extra_2:
            return format_html('<img src="{}" width="100" />', obj.imagem_extra_2.url)
        return "Sem imagem extra 2"

    def imagem_extra_3_preview(self, obj):
        if obj.imagem_extra_3:
            return format_html('<img src="{}" width="100" />', obj.imagem_extra_3.url)
        return "Sem imagem extra 3"


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'descricao', 'foto_preview')
    readonly_fields = ('foto_preview',)

    fieldsets = (
        (None, {
            'fields': ('user', 'descricao', 'foto_perfil', 'foto_preview')
        }),
    )

    def foto_preview(self, obj):
        if obj.foto_perfil:
            return format_html('<img src="{}" width="100" style="border-radius: 50%;" />', obj.foto_perfil.url)
        return "Sem foto"
    foto_preview.short_description = 'Foto do Perfil'