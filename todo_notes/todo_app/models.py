from django.db import models
from notes_users.models import NotesUser

"""
Добавить модель Project. Это проект, для которого записаны TODO. У него есть название,
может быть ссылка на репозиторий и набор пользователей, которые работают с этим
проектом. Создать модель, выбрать подходящие типы полей и связей с другими моделями.
"""
class Project(models.Model):
    name = models.CharField(blank=False, max_length=128)
    repo_link = models.CharField(blank=True, max_length=500)
    project_users = models.ManyToManyField(NotesUser)

    def __str__(self):
        return self.name
'''   
Добавить модель TODO. Это заметка. У ToDo есть проект, в котором сделана заметка, текст
заметки, дата создания и обновления, пользователь, создавший заметку. Содержится и
признак — активно TODO или закрыто. Выбрать подходящие типы полей и связей с другими
моделями
'''
class TODO(models.Model):
    project = models.ManyToManyField(Project)
    text = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    creator = models.ManyToManyField(NotesUser)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.project.name} note'



