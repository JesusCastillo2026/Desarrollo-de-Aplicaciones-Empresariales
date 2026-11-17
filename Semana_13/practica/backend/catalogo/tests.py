from django.conf import settings
from django.test import SimpleTestCase

class CatalogoScaffoldTests(SimpleTestCase):
    def test_app_is_registered(self):
        self.assertIn("catalogo", settings.INSTALLED_APPS)
