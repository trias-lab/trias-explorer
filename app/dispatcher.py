"""
# middleware for dispatch url
"""

from django.shortcuts import render_to_response


class QtsAuthentication(object):
    def process_request(self, request):
        if 'api' in request.path:
            pass
        else:
            return render_to_response('index.html')

