from teemo.models import Customer, Store, Coupon, Has_coupon
from teemo.serializers import CustomerSerializer,StoreSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status

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