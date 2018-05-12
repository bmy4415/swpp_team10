from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.MyLoginView.as_view(template_name='registration/login.html'), name='login'),
    path('success_page/', views.SuccessView.as_view(template_name='registration/logout.html')),
    path('logout/', views.MyLogoutView.as_view(),name='logout'),
]
