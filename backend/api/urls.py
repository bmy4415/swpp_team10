from django.conf.urls import url
from api import views
from django.urls import path

from . import views

# urls for auth
urlpatterns = [
    path('login/', views.MyLoginView.as_view(template_name='registration/login.html'), name='login'),
    path('success_customer_login/', views.SuccessCustomerLogin),
    path('success_store_login/', views.SuccessStoreLogin),
    path('logout/', views.MyLogoutView.as_view(),name='logout'),
]

# urls for sign_up
urlpatterns += [
    url(r'^customer_sign_up/$', views.CustomerSignUp.as_view()),
    url(r'^store_sign_up/$', views.StoreSignUp.as_view()),
]

urlpatterns += [
    url(r'^coupon_publishing/$', views.CouponPublishing.as_view()),
    url(r'^coupon_list_of_customer/$', views.CouponListOfCustomer.as_view()),
    url(r'^coupon_list_of_store/$', views.CouponListOfStore.as_view()),
    url(r'^coupon_stamping/(?P<pk>[0-9]+)$', views.CouponStamping.as_view()),   
]