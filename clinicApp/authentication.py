from rest_framework.authentication import BaseAuthentication, get_authorization_header
from rest_framework import exceptions
from .models import Token

class BearerTokenAuthentication(BaseAuthentication):
    keyword = b"Bearer"

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if not auth or auth[0].lower() != self.keyword.lower():
            # Also support: "Token token=<key>" for your Postman header
            if auth and auth[0].lower() == b"token" and len(auth) == 2 and auth[1].startswith(b"token="):
                key = auth[1].split(b"=", 1)[1].decode()
                return self._user_from_key(key)
            return None
        if len(auth) != 2:
            raise exceptions.AuthenticationFailed("Invalid Authorization header.")
        key = auth[1].decode()
        return self._user_from_key(key)

    def _user_from_key(self, key):
        try:
            t = Token.objects.select_related("user").get(key=key)
            return (t.user, None)
        except Token.DoesNotExist:
            raise exceptions.AuthenticationFailed("Invalid token.")
