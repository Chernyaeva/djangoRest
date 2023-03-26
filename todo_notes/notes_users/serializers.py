from rest_framework.serializers import ModelSerializer

from .models import NotesUser


class NotesUserModelSerializer(ModelSerializer):

    class Meta:
        model = NotesUser
        fields = ('username', 'first_name', 'last_name', 'birthday_year', 'email')

class NotesUserModelSerializerExt(ModelSerializer):

    class Meta:
        model = NotesUser
        fields = ('username', 'first_name', 'last_name', 'birthday_year', 'email', 'is_staff', 'is_superuser')
