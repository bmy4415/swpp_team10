from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14)

class Store(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=14)

class Coupon(models.Model):
    store_id = models.ForeignKey(Store, related_name='store_id', on_delete=models.CASCADE)
    stamp_count = models.IntegerField(default=0)

class Has_coupon(models.Model):
    customer_id = models.ForeignKey(Customer, related_name='customer_id', on_delete=models.CASCADE)
    coupon_id = models.ForeignKey(Coupon, related_name='coupon_id', on_delete=models.CASCADE)