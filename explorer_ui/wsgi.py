"""
WSGI config for explorer_ui project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os
import threading

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "explorer_ui.settings")

application = get_wsgi_application()

from explorer_ui.db_service import save2db
t = threading.Thread(target=save2db, args=())
t.start()
