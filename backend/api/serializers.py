from rest_framework import serializers
from api.models import Customer, Store, Coupon, Has_coupon

class CustomerSerializer(serializers.ModelSerializer):
    account = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')
    phone_number = serializers.CharField()
    class Meta:
        model = Customer
        fields = ('id', 'account', 'password', 'phone_number')

class StoreSerializer(serializers.ModelSerializer):
    account = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')
    phone_number = serializers.CharField()
    class Meta:
        model = Store
        fields = ('id', 'account', 'password', 'phone_number', 'address', 'name')

class CouponSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Coupon
        fields = ('id', 'store', 'stamp_count')

class CustomerNameSerializer(serializers.ModelSerializer):
    customer = serializers.CharField()
    class Meta:
        model = Has_coupon
        fields = ('customer',)

class HasCouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Has_coupon
        fields = ('customer', 'coupon')

class CouponStoreSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    store = StoreSerializer(read_only=True)
    class Meta:
        model = Coupon
        fields = ('id', 'store', 'stamp_count')

class CustomerHasCouponStoreSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    coupon = CouponStoreSerializer(read_only=True)
    class Meta:
        model = Has_coupon
        fields = ('customer', 'coupon')

class CouponStampingSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    store = StoreSerializer(read_only=True)  
    stamp_count = serializers.ReadOnlyField()  
    class Meta:
        model = Coupon
        fields = ('id', 'store', 'stamp_count')

class CouponUsingSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    store = StoreSerializer(read_only=True)  
    stamp_count = serializers.IntegerField()
    class Meta:
        model = Coupon
        depth = 1
        fields = ('id', 'store', 'stamp_count')

class CouponGivingSerializer(serializers.ModelSerializer):

    store = StoreSerializer(read_only=True)
    stamp_count = serializers.IntegerField()
    customer = serializers.CharField()
    
    class Meta:
        model = Coupon
        fields = ('id', 'store', 'stamp_count', 'customer')
    
