#  from django.conf.urls import url
#  from api import views
from django.urls import path

from . import views

# urls for auth
urlpatterns = [
    path('', views.main_page),
]
