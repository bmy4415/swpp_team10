#  from django.conf.urls import url
#  from api import views
from django.urls import path

from . import views

# urls for auth
urlpatterns = [
    path('', views.main_page),
    path('signup_customer/', views.signup_customer),
    path('signup_store/', views.signup_store),
    #  path('success_page/', views.SuccessView.as_view(template_name='registration/logout.html')),
    #  path('logout/', views.MyLogoutView.as_view(),name='logout'),
]
