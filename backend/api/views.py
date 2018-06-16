from api.models import Customer, Store, Coupon, Has_coupon
from api.serializers import CustomerSerializer, StoreSerializer, CouponSerializer, HasCouponSerializer
from api.serializers import  CouponStoreSerializer, CustomerHasCouponStoreSerializer 
from api.serializers import CustomerNameSerializer, CouponStampingSerializer, CouponUsingSerializer
from api.serializers import CouponGivingSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

from django.shortcuts import render, redirect
from django.contrib.auth.views import *

from django.db import IntegrityError

class AlreadyExistInDB(Exception):
    pass
class CustomerIsNotExist(Exception):
    pass
class StampInsufficient(Exception):
    pass
class GiverSameReceiver(Exception):
    pass
class AccountExistInDB(Exception):
    pass
class PhoneNumberExistInDB(Exception):
    pass

class MyLoginView(LoginView):
    def form_valid(self, form):
        auth_login(self.request, form.get_user())
        customer = Customer.objects.filter(user=self.request.user)
        if len(customer) == 1:  
            return JsonResponse({'is_customer': 'True'}, status=200)
        else :
            return JsonResponse({'is_customer': 'False'}, status=200)        

class MyLogoutView(LogoutView):
    next_page = '/'

class CustomerSignUp(generics.CreateAPIView):
    """
    Create new Customer
    """
    serializer_class = CustomerSerializer

    def perform_create(self, serializer):
        # check  duplicate of account, phone_number
        new_user_name = serializer.validated_data['user']['username']
        new_phone_number = serializer.validated_data['phone_number']
        
        find_customer = User.objects.filter(username=new_user_name)
        find_customer2 = Customer.objects.filter(phone_number=new_phone_number)
        find_customer3 = Store.objects.filter(phone_number=new_phone_number)

        if len(find_customer) != 0 :
            raise AccountExistInDB
        if len(find_customer2) != 0 :
            raise PhoneNumberExistInDB
        if len(find_customer3) != 0 :
            raise PhoneNumberExistInDB

        new_user = User.objects.create_user(
                                 username=serializer.validated_data['user']['username'],
                                 password=serializer.validated_data['user']['password'])
        serializer.save(user = new_user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except AccountExistInDB :
            return JsonResponse({'msg' : 'AccountExistInDB'}, status=400)
        except PhoneNumberExistInDB :
            return JsonResponse({'msg' : 'PhoneNumberExistInDB'}, status=400)
        except IntegrityError:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return redirect('/')

class StoreSignUp(generics.CreateAPIView):
    """
    List all Store, or Create new Store
    """
    serializer_class = StoreSerializer

    def perform_create(self, serializer):

        # check  duplicate of account, phone_number
        new_user_name = serializer.validated_data['user']['username']
        new_phone_number = serializer.validated_data['phone_number']

        find_store = User.objects.filter(username=new_user_name)
        find_store2 = Store.objects.filter(phone_number=new_phone_number)
        find_store3 = Customer.objects.filter(phone_number=new_phone_number)

        if len(find_store) != 0 :
            raise AccountExistInDB
        if len(find_store2) != 0 :
            raise PhoneNumberExistInDB
        if len(find_store3) != 0 :
            raise PhoneNumberExistInDB
            
        new_user = User.objects.create_user(
                                 username=serializer.validated_data['user']['username'],
                                 password=serializer.validated_data['user']['password'])
        serializer.save(user = new_user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except AccountExistInDB :
            return JsonResponse({'msg' : 'AccountExistInDB'}, status=400)
        except PhoneNumberExistInDB :
            return JsonResponse({'msg' : 'PhoneNumberExistInDB'}, status=400)    
        except IntegrityError:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return redirect('/')

class CouponPublishing(generics.CreateAPIView):
    '''
    request have to send customer account, cookie(login)
    '''
    serializer_class = CustomerNameSerializer

    def perform_create(self, serializer, request_store):

        # customer is not exist in User.       
        customer_user = User.objects.filter(username=serializer.validated_data['customer'])
        if len(customer_user) == 1 :
            owner_customer = Customer.objects.get(user=customer_user[0])
        else :
            arranged_phone_number = serializer.validated_data['customer'].replace('-', '')
            customer_filtered = Customer.objects.filter(phone_number=arranged_phone_number)
            if len(customer_filtered) == 0 :
                raise CustomerIsNotExist
            owner_customer=customer_filtered[0]
        has_coupons = Has_coupon.objects.filter(customer=owner_customer)

        coupons = Coupon.objects.filter(store=request_store)
 
        # customer and store already had this coupon
        for coupon in coupons :
            for has_coupon in has_coupons :
                if coupon == has_coupon.coupon :
                    raise AlreadyExistInDB

        new_coupon = Coupon.objects.create(
                                store=request_store,
                                stamp_count=0)
        serializer.save(customer = owner_customer, coupon = new_coupon )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request_store = Store.objects.get(user=request.user)

        try:
            self.perform_create(serializer, request_store)
        except IntegrityError:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except AlreadyExistInDB:
            return JsonResponse({'msg' : 'AlreadyExistInDB'}, status=400)
        except CustomerIsNotExist:
            return JsonResponse({'msg' : 'CustomerIsNotExist'}, status=400)
        
        return JsonResponse({'msg' : 'SuccessPublishing'}, status=201)

class CouponListOfCustomer(generics.ListAPIView):
    '''
    request have to send cookie(login) by customer
    '''
    serializer_class = CustomerHasCouponStoreSerializer
    
    def get_queryset(self, *args, **kwargs):
        me = Customer.objects.get(user=self.request.user)
        my_coupon_list = Has_coupon.objects.filter(customer=me)
        return my_coupon_list

class CouponListOfStore(generics.ListAPIView):
    '''
    request have to send cookie(login) by store
    '''
    serializer_class = CustomerHasCouponStoreSerializer

    def get_queryset(self, *args, **kwargs):
        owner_store = Store.objects.get(user=self.request.user)
        all_coupon_list = Coupon.objects.filter(store=owner_store)
        coupon_list_of_store = Has_coupon.objects.filter(coupon__in=all_coupon_list)
        return coupon_list_of_store

class CouponStamping(generics.RetrieveUpdateAPIView):
    '''
    request have to send to /api/coupon_stamping/%coupon_id%
    '''
    serializer_class = CouponStampingSerializer
    queryset = Coupon.objects.all()
    
    def perform_update(self, serializer):
        instance = self.get_object()
        old_data_serializer = self.get_serializer(instance)
        stamp = old_data_serializer.data["stamp_count"]
        serializer.save(stamp_count = stamp+1)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        ## if request user is not owner of coupon
        request_store_name = request.user.username
        db_serializer = self.get_serializer(instance)
        if db_serializer.data["store"]['account'] != request_store_name :
            return JsonResponse({'msg' : 'YouAreNotOwnerOfCoupon'}, status=400)
        
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class CouponUsing(generics.RetrieveUpdateAPIView):
    '''
    request have to send to api/coupon_using/%coupon_id%, How many use stamp
    '''
    serializer_class = CouponUsingSerializer
    queryset = Coupon.objects.all()

    def perform_update(self, serializer):
        instance = self.get_object()
        curr_data_serializer = self.get_serializer(instance)
        curr_stamp = curr_data_serializer.data["stamp_count"]
        request_stamp = serializer.validated_data["stamp_count"] 
        if request_stamp < 1 :
            raise ValueError
        elif curr_stamp < request_stamp :
            raise StampInsufficient
        serializer.save(stamp_count=curr_stamp-request_stamp)
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        ## if request user is not owner of coupon
        request_store_name = request.user.username
        db_serializer = self.get_serializer(instance)

        if db_serializer.data["store"]['account'] != request_store_name :
            return JsonResponse({'msg' : 'YouAreNotOwnerOfCoupon'}, status=400)
        
        try:
            self.perform_update(serializer)
        except ValueError :
            return JsonResponse({'msg': 'ValueError'}, status=400)
        except StampInsufficient:
            return JsonResponse({'msg': 'StampInsufficient'}, status=400)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

class CouponGiving(generics.RetrieveUpdateAPIView):
    serializer_class = CouponGivingSerializer
    queryset = Coupon.objects.all()

    def perform_update(self, serializer, db_serializer):
        # to_customer exist?
        to_customer_name = serializer.validated_data['customer']
        
        to_customer_user = User.objects.filter(username=to_customer_name)

        if len(to_customer_user) == 1 :
            to_customer = Customer.objects.get(user=to_customer_user[0])
        else :
            # have to find with phone_number
            to_customer_phone_number = to_customer_name.replace('-', '')
            customer_filtered= Customer.objects.filter(phone_number=to_customer_phone_number)
            if len(customer_filtered) == 0 :
                raise CustomerIsNotExist
            to_customer = customer_filtered[0]
        
        # to_customer == request_user
        if self.request.user.username == to_customer.user.username :
            raise GiverSameReceiver

        # request stamp_count must be >= 1
        if serializer.validated_data['stamp_count'] < 1 :
            raise ValueError

        # request stamp_count must be <= coupon['stamp_count']
        if serializer.validated_data['stamp_count'] > db_serializer.data['stamp_count'] :
            raise StampInsufficient
        
        # if to_customer had coupon, just use this coupon
        has_coupons = Has_coupon.objects.filter(customer=to_customer)
        owner_store = Store.objects.get(id=db_serializer.data['store']['id'])
        to_coupon_is_exist = 0
        for has_element in has_coupons :
            if has_element.coupon.store.id == owner_store.id :
                to_coupon = has_element.coupon
                to_coupon_is_exist = 1
        
        # to_customer don't have coupon. create coupon here
        if to_coupon_is_exist == 0 :
            new_coupon = Coupon.objects.create(
                                store=owner_store,
                                stamp_count=0)
            new_has_coupon = Has_coupon.objects.create(
                                customer=to_customer,
                                coupon=new_coupon)
            to_coupon = new_coupon

        give_stamp = serializer.validated_data['stamp_count'] 
        new_stamp = db_serializer.data['stamp_count'] - give_stamp
        
        to_coupon.stamp_count += give_stamp
        to_coupon.save()
        
        giver_coupon = Coupon.objects.get(id = db_serializer.data['id'])
        giver_coupon.stamp_count = new_stamp
        giver_coupon.save()
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        # coupon owner == request.user
        db_serializer = self.get_serializer(instance)
        request_customer = Customer.objects.get(user=request.user)
        if db_serializer.data['customer'] != request_customer.user.username :
            return JsonResponse({'msg' : 'YouAreNotOwnerOfCoupon'}, status=400)
        
        # transmitter == receiver
        try:
            self.perform_update(serializer, db_serializer)
        except ValueError :
            return JsonResponse({'msg': 'ValueError'}, status=400)
        except StampInsufficient:
            return JsonResponse({'msg' : 'StampInsufficient'}, status=400)
        except CustomerIsNotExist:
            return JsonResponse({'msg' : 'CustomerIsNotExist'}, status=400)
        except GiverSameReceiver:
            return JsonResponse({'msg' : 'GiverSameReceiver'}, status=400)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        result = Coupon.objects.get(id=serializer.data['id'])
        serializer = self.get_serializer(result)
        return Response(serializer.data)
