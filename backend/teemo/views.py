from teemo.models import Customer, Store, Coupon, Has_coupon
from teemo.serializers import CustomerSerializer,StoreSerializer
from rest_framework import generics


class CustomerList(generics.ListAPIView):
    """
    List all Cusomter
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class StoreList(generics.ListAPIView):
    """
    List all Store
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer