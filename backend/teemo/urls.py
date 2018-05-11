from django.conf.urls import url
from teemo import views

urlpatterns = [
    url(r'^customer_sign_up/$', views.CustomerSignUp.as_view()),
    url(r'^store_sign_up/$', views.StoreSignUp.as_view()),
]