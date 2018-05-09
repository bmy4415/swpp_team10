from django.db import models
from django.contrib.auth.models import User

# id is auto-increasing
# account(username), password is already in User
class Customer(User):
    phone_number = models.CharField(NULL=False, max_length=14)

# id is auto-increasing
# account(username), password is already in User
class Store(User):
    address = models.CharField(NULL=False, max_length=100)
    name = models.CharField(NULL=False, max_length=100)
    phone_number = models.CharField(NULL=False, max_length=100)

# id is auto-increasing
class Coupon(models.Model):
    store_id = models.ForeignKey(Store, related_name='id',
                                 on_delete=models.CASCADE)
    stamp_count = models.IntegerField(default=0)

class Has_coupon(models.Model):
    customer_id = models.ForeignKey(Customer, related_name='id',
                                    on_delete=models.CASCADE)
    coupon_id = models.ForeignKey(Coupon, related_name='id',
                                  on_delete=models.CASCADE)