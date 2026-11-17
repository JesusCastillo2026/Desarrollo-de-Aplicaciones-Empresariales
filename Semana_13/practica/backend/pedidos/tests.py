from django.conf import settings
from django.test import SimpleTestCase

class PedidosScaffoldTests(SimpleTestCase):
    def test_app_is_registered(self):
        self.assertIn("pedidos", settings.INSTALLED_APPS)
