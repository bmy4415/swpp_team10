from rest_framework import serializers
from api.models import Customer, Store, Coupon

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
        fields = ('id', 'customer_id', 'store_id', 'stamp_count')

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
