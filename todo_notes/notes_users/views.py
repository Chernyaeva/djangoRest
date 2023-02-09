from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet

from .models import NotesUser
from .serializers import NoteUserModelSerializer

class NoteUserModelViewSet(ModelViewSet):
    queryset = NotesUser.objects.all()
    serializer_class = NoteUserModelSerializer

