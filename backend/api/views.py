from api.models import Customer, Store, Coupon, Has_coupon
from api.serializers import CustomerSerializer,StoreSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import render
from django.contrib.auth.views import *
from django.views.generic.base import TemplateView
# Create your views here.

class MyLoginView(LoginView):
    def get_success_url(self):
        url = self.get_redirect_url()
        """
	    if request.user.isCustomer:
		    LOGIN_REDIRECT_URL = ''
	    else:
		    LOGIN_REDIRECT_URL = ''
        """
        LOGIN_REDIRECT_URL = '/api/success_page'
        return url or resolve_url(LOGIN_REDIRECT_URL)

class MyLogoutView(LogoutView):
    next_page = '/api/login'

SuccessView = TemplateView


# [TODO] CustomerSignUp must not be seen.
class CustomerSignUp(generics.CreateAPIView):
    """
    Create new Customer
    """
    serializer_class = CustomerSerializer

    def perform_create(self, serializer):
        new_user = User.objects.create_user(
                                 username=serializer.validated_data['user']['username'],
                                 password=serializer.validated_data['user']['password'])
        serializer.save(user = new_user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # [TODO] check wrong form 
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# [TODO] StoreSignUp must not be seen.
class StoreSignUp(generics.CreateAPIView):
    """
    List all Store, or Create new Store
    """
    serializer_class = StoreSerializer

    def perform_create(self, serializer):
        new_user = User.objects.create_user(
                                 username=serializer.validated_data['user']['username'],
                                 password=serializer.validated_data['user']['password'])
        serializer.save(user = new_user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # [TODO] check wrong form 
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
