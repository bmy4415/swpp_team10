from django.conf.urls import url
from teemo import views

urlpatterns = [
    url(r'^customer/$', views.CustomerList.as_view()),
    url(r'^store/$', views.StoreList.as_view()),
]