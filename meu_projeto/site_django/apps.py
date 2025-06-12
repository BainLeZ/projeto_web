from django.apps import AppConfig

class SiteDjangoConfig(AppConfig):
    name = 'site_django'

    def ready(self):
        import site_django.signals  # importa os signals para registrar o handler
