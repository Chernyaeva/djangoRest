from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet

from .models import NotesUser
from .serializers import NotesUserModelSerializer

class NotesUserModelViewSet(ModelViewSet):
    queryset = NotesUser.objects.all()
    serializer_class = NotesUserModelSerializer

