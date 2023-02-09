from django.contrib import admin

from notes_users import models as user_models


@admin.register(user_models.NotesUser)
class NewsAdmin(admin.ModelAdmin):
    pass