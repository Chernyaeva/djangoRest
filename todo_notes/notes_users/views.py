from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import permissions


from .models import NotesUser
from .serializers import NotesUserModelSerializer

# class NotesUserModelViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin,
#     mixins.RetrieveModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
#     queryset = NotesUser.objects.all()
#     serializer_class = NotesUserModelSerializer

class NotesUserModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    queryset = NotesUser.objects.all()
    serializer_class = NotesUserModelSerializer

