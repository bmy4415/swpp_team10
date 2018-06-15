from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14, unique=True)

    def __str__(self):
        return self.user.username

class Store(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=14, unique=True)

    def __str__(self):
        return self.user.username

class Coupon(models.Model):
    store = models.ForeignKey(Store, related_name='all_coupon_of_store', on_delete=models.CASCADE)
    stamp_count = models.IntegerField(default=0)

    @property
    def customer(self):
        has_coupon = Has_coupon.objects.get(coupon=self)
        return has_coupon.customer

class Has_coupon(models.Model):
    customer = models.ForeignKey(Customer, related_name='maybe_not_used', on_delete=models.CASCADE)
    coupon = models.ForeignKey(Coupon, related_name='related_has_coupon', on_delete=models.CASCADE)
