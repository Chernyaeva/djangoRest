import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import NotesUserModelViewSet
from .models import NotesUser
from todo_app.models import TODO

class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/notes_users/')
        view = NotesUserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/notes_users/', {'username': 'Eren', 'birthday_year': 3000, 'email': 'eren.jeger@wall.eld'}, format='json')
        admin = NotesUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = NotesUserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = NotesUser.objects.create(username='Armin', birthday_year=3000)
        client = APIClient()
        response = client.get(f'/api/notes_users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    class TestBookViewSet(APITestCase):
        def test_get_list(self):
            response = self.client.get('/api/notes/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        def test_get_detail(self):
            note = mixer.blend(TODO, name='Sad cat')
            response = self.client.get(f'/api/notes/{note.id}/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            response_note = json.loads(response.content)
            self.assertEqual(response_note['name'], 'Sad cat')
