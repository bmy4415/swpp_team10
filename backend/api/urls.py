from django.conf.urls import url
from api import views
from django.urls import path

from . import views

# urls for auth
urlpatterns = [
    path('login/', views.MyLoginView.as_view(template_name='registration/login.html'), name='login'),
    path('success_page/', views.SuccessView.as_view(template_name='registration/logout.html')),
    path('logout/', views.MyLogoutView.as_view(),name='logout'),
]

# urls for sign_up
urlpatterns += [
    url(r'^customer_sign_up/$', views.CustomerSignUp.as_view()),
    url(r'^store_sign_up/$', views.StoreSignUp.as_view()),
]

# urls for coupon
urlpatterns += [
    url(r'^coupons/$', views.CouponList.as_view()),
    url(r'^coupons_detail/(?P<pk>[0-9]+)/$', views.CouponDetail.as_view()),
]
