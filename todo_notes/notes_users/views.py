from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets
from rest_framework import mixins


from .models import NotesUser
from .serializers import NotesUserModelSerializer

class NotesUserModelViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = NotesUser.objects.all()
    serializer_class = NotesUserModelSerializer

# class NotesUserModelViewSet(viewsets.ModelViewSet):
#     queryset = NotesUser.objects.all()
#     serializer_class = NotesUserModelSerializer

