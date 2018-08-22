"""
# middleware for dispatch url
"""

from django.shortcuts import render_to_response
from django.conf import settings
from django.http import  HttpResponsePermanentRedirect, JsonResponse


class QtsAuthentication(object):
    def process_request(self, request):
        if 'api' in request.path:
            pass
        else:
            return render_to_response('index.html')


class SecureRequiredMiddleware(object):

    def __init__(self):

        self.paths = getattr(settings, 'SECURE_REQUIRED_PATHS')

        self.enabled = self.paths and getattr(settings, 'HTTPS_SUPPORT')

    def process_request(self, request):

        if self.enabled and not request.is_secure():

            for path in self.paths:

                if request.get_full_path().startswith(path):
                    request_url = request.build_absolute_uri(request.get_full_path())
                    secure_url = request_url.replace('http://', 'https://')

                    return HttpResponsePermanentRedirect(secure_url)

        return None


class AccessRestrictionsMiddleware(object):

    def process_request(self, request):

        if 'HTTP_X_FORWARDED_FOR' in request.META:
            REMOTE_IP = request.META['HTTP_X_FORWARDED_FOR']
        else:
            REMOTE_IP = request.META['REMOTE_ADDR']

        REQUEST_COUNT = request.session.get(REMOTE_IP)

        if not REQUEST_COUNT:
            request.session[REMOTE_IP] = 1
            request.session.set_expiry(60)
        else:
            if REQUEST_COUNT >= 100:
                return JsonResponse({'code': 201, 'message': 'TAKE A BREAK'})
            request.session[REMOTE_IP] = REQUEST_COUNT + 1
