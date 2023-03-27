import graphene
from graphene_django import DjangoObjectType
from todo_app.models import TODO, Project, NotesUser


class TodosType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class NotesUserType(DjangoObjectType):
    class Meta:
        model = NotesUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):

    all_todos = graphene.List(TodosType)

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    all_notesUsers = graphene.List(NotesUserType)

    def resolve_all_notesUsers(root, info):
        return NotesUser.objects.all()

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    notesUsers_by_id = graphene.Field(NotesUserType, id=graphene.Int(required=True))

    def resolve_notesUsers_by_id(self, info, id):
        try:
            return NotesUser.objects.get(id=id)
        except NotesUser.DoesNotExist:
            return None

    todos_by_creator_name = graphene.List(TodosType, name=graphene.String(required=False))

    def resolve_todos_by_creator_name(self, info, name=None):
        todos = TODO.objects.all()
        if name:
            todos = todos.filter(creator__username=name)
        return todos


schema = graphene.Schema(query=Query)

