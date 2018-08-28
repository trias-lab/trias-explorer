"""
logger system
"""
import logging


def make_trias_django_logger():
    """
    A logger using the django framework is typically configured in settings.py
    :return: logger
    """
    return logging.getLogger("app")


logger = make_trias_django_logger()

