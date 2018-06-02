from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=14, unique=True)

class Store(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=14, unique=True)

'''
그니까... 저기서 말하는 related_name은 Coupon이 store_id를 폴린키로 가지니까
나중에 Store 객체에서 all_coupon_of_store로 부르면
자신을 포린키로 가지는 쿠폰리스트를 볼수있다.~~~ 뭐 이런컨셉.
'''
class Coupon(models.Model):
    store = models.ForeignKey(Store, related_name='all_coupon_of_store', on_delete=models.CASCADE)
    stamp_count = models.IntegerField(default=0)
    
'''
유저가 쿠폰을 가지고
그 쿠폰의 스탬프는 저기 쿠폰에 따로 음
'''
class Has_coupon(models.Model):
    customer = models.ForeignKey(Customer, related_name='maybe_not_used', on_delete=models.CASCADE)
    coupon = models.ForeignKey(Coupon, related_name='related_has_coupon', on_delete=models.CASCADE)