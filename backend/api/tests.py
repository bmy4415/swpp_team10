from django.test import TestCase, RequestFactory
from .models import Customer, Store, Coupon
from django.contrib.auth.models import User
from .views import CouponPublishing, CouponListOfCustomer, CouponListOfStore, CouponStamping, CouponUsing
from django.urls import reverse

# Create your tests here.

i = 0

def create_customer(self, username, password, phone_number):
    url = "/api/customer_sign_up/"
    result = self.client.post(url, {"account" : username, "password" : password, "phone_number" : phone_number})
    return result

def create_store(self, username, password, phone_number, address, store_name):
    url = "/api/store_sign_up/"
    result = self.client.post(url, {"account" : username, "password" : password, "phone_number" : phone_number, "address" : address, "name" : store_name})
    return result

class SigninTests(TestCase):
    url = "/api/login/"
    username = "testuser"
    password = "test123user"
    phone_number = "010306105135"
    address = "home"
    store_name = "tomtom"
    
    # check customer sign in general case
    def test_customer_sign_in(self):
        global i
        i=i+1
        print("\n{}. Test customer sign in...".format(i))
        create_result = create_customer(self, self.username, self.password, self.phone_number)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : self.password})
        self.assertEqual(signin_result.status_code, 200)
    # check customer sign in wrong password case(bad)
    def test_customer_sign_in_wrong_pwd(self):
        global i
        i=i+1
        print("\n{}. Test customer sign in with wrong password...".format(i))
        create_result = create_customer(self, self.username, self.password, self.phone_number)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : "another_pwd"})
        self.assertEqual(signin_result.status_code, 200)

     # check store sign in general case
    def test_store_sign_in(self):
        global i
        i=i+1
        print("\n{}. Test store sign in...".format(i))
        create_result = create_store(self, self.username, self.password, self.phone_number, self.address, self.store_name)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : self.password})
        self.assertEqual(signin_result.status_code, 200)
    # check store sign in wrong password case(bad)
    def test_store_sign_in_wrong_pwd(self):
        global i
        i=i+1
        print("\n{}. Test store sign in with wrong password...".format(i))
        create_result = create_store(self, self.username, self.password, self.phone_number, self.address, self.store_name)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : "another_pwd"})
        self.assertEqual(signin_result.status_code, 200)

       
 
class CouponTests(TestCase):
    username = "testuser"
    password = "test123user"
    url = "/api/login/"
    phone_number = "01001011013"
    store_name = "storename"
    address = "address"

    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
                username='store1', password='rmsrnr5135')

    # check coupon publishing
    def test_coupon_publishing(self):
        global i
        i=i+1
        print("\n{}. Test coupon publishing...".format(i))


        create_result = create_store(self, "store", self.password, self.phone_number, self.address, self.store_name)

        create_result = create_customer(self, "customer", self.password, "01030615135")

        request = self.factory.post('/api/coupon_publishing/', {"customer" : "customer"})
        request.user = Store.objects.get(phone_number=self.phone_number).user
        response = CouponPublishing.as_view()(request)

        self.assertEqual(response.status_code, 403)
     
    # check coupon using
    def test_coupon_using(self):
        global i
        i=i+1
        print("\n{}. Test coupon using...".format(i))


        create_result = create_store(self, "store", self.password, self.phone_number, self.address, self.store_name)

        create_result = create_customer(self, "customer", self.password, "01030615135")

        request = self.factory.post('/api/coupon_publishing/', {"customer" : "customer"})
        request.user = Store.objects.get(phone_number=self.phone_number).user
        response = CouponPublishing.as_view()(request)

        request = self.factory.post('/api/coupon_using/1', {"stamp_count" : "1"})
        request.user = Store.objects.get(phone_number=self.phone_number).user
        response = CouponUsing.as_view()(request)       

        self.assertEqual(response.status_code, 403)

     
    # check coupon giving
    def test_coupon_giving(self):
        global i
        i=i+1
        print("\n{}. Test coupon giving...".format(i))


        create_result = create_store(self, "store", self.password, self.phone_number, self.address, self.store_name)

        create_result = create_customer(self, "customer", self.password, "01030615135")
        create_result = create_customer(self, "customer2", self.password, "01000115135")

        request = self.factory.post('/api/coupon_publishing/', {"customer" : "customer"})
        request.user = Store.objects.get(phone_number=self.phone_number).user
        response = CouponPublishing.as_view()(request)

        request = self.factory.post('/api/coupon_publishing/', {"customer" : "customer2"})
        request.user = Store.objects.get(phone_number=self.phone_number).user
        response = CouponPublishing.as_view()(request)

        request = self.factory.post('/api/coupon_giving/1', {"customer" : "customer2", "stamp_count" : "1"})
        request.user = Customer.objects.get(phone_number="01030615135").user
        response = CouponUsing.as_view()(request)       

        self.assertEqual(response.status_code, 403)


    # check coupon list of customer
    def test_coupon_list_of_customer(self):
        global i
        i=i+1
        print("\n{}. Test coupon list of customer...".format(i))
        create_result = create_customer(self, self.username, self.password, self.phone_number)

        request = self.factory.get('/api/coupon_list_of_customer/')
        request.user = Customer.objects.get(phone_number=self.phone_number).user
        response = CouponListOfCustomer.as_view()(request)
        self.assertEqual(response.status_code, 200)
  
  
    # check coupon list of store
    def test_coupon_list_of_store(self):
        global i
        i=i+1
        print("\n{}. Test coupon list of store...".format(i))
        create_result = create_store(self, self.username, self.password, self.phone_number, self.address, self.store_name)

        request = self.factory.get('/api/coupon_list_of_store/')
        request.user = Store.objects.get(phone_number=self.phone_number).user
        response = CouponListOfStore.as_view()(request)
        self.assertEqual(response.status_code, 200)

class CustomerSignupTests(TestCase):

    username = "cutomer"
    password = "1q2w3e4r!"
    phone_number = "01030615135"

    # check success case of customer_sign_up
    def test_create_users(self):
        global i
        i=i+1
        print("\n{}. Test customer sign up...".format(i))
        result = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number})
        self.assertRedirects(result, '/')

    
    # check duplicate account case (bad)
    def test_create_users_dup_account_case(self):
        global i
        i=i+1
        print("\n{}. Test customer sign up duplicate case...".format(i))
        result = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number})
        result_dup = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number})
        self.assertEqual(result_dup.status_code, 400)

    
    # check long phone number case (bad)
    def test_create_users_bad_phone_case(self):
        global i
        i=i+1
        print("\n{}. Test customer sign up bad phone number case...".format(i))
        phone_number = "01023111111111111111111111"

        result = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : phone_number})
        self.assertEqual(result.status_code, 302)
      
class StoreSignupTests(TestCase):

    username = "store"
    password = "1q2w3e4r!"
    phone_number = "01030615135"
    address = "home"
    store_name = "tomtom"

    # check success case of store_sign_up
    def test_create_users(self):
        global i
        i=i+1
        print("\n{}. Test store sign up...".format(i))
        result = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number, "address" : self.address, "name" : self.store_name})
        self.assertRedirects(result, '/')

    
    # check duplicate store case (bad)
    def test_create_users_dup_account_case(self):
        global i
        i=i+1
        print("\n{}. Test store sign up duplicate case...".format(i))
        result = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number, "address" : self.address, "name" : self.store_name})
        
        result_dup = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number, "address" : self.address, "name" : self.store_name})
       
        self.assertEqual(result_dup.status_code, 400)

    
    # check long phone number case (bad)
    def test_create_users_bad_phone_case(self):
        global i
        i=i+1
        print("\n{}. Test store sign up bad phone number case...".format(i))
        phone_number = "01023111111111111111111111"

        result = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : phone_number, "address" : self.address, "name" : self.store_name})
        self.assertEqual(result.status_code, 302)
     
