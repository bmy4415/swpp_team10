from rest_framework import serializers
from api.models import Customer, Store, Coupon, Has_coupon

class CustomerSerializer(serializers.ModelSerializer):
    account = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')
    class Meta:
        model = Customer
        fields = ('id', 'account', 'password', 'phone_number')

class StoreSerializer(serializers.ModelSerializer):
    account = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')
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
    

'''   
class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    code = serializers.CharField(style={'base_template': 'textarea.html'})
    linenos = serializers.BooleanField(required=False)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
'''
