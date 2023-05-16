from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print('HEY, YOU THERE!')
        token = super().get_token(user)
        # custom token claims:
        token['name'] = user.username
        return token