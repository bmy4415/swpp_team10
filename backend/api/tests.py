from django.test import TestCase
from .models import Customer, Store

# Create your tests here.

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
        print("\n4. Test customer sign in...")
        create_result = create_customer(self, self.username, self.password, self.phone_number)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : self.password})
        self.assertEqual(signin_result.status_code, 200)
    # check customer sign in wrong password case(bad)
    def test_customer_sign_in_wrong_pwd(self):
        print("\n5. Test customer sign in with wrong password...")
        create_result = create_customer(self, self.username, self.password, self.phone_number)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : "another_pwd"})
        self.assertEqual(signin_result.status_code, 200)

     # check store sign in general case
    def test_store_sign_in(self):
        print("\n6. Test store sign in...")
        create_result = create_store(self, self.username, self.password, self.phone_number, self.address, self.store_name)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : self.password})
        self.assertEqual(signin_result.status_code, 200)
    # check store sign in wrong password case(bad)
    def test_store_sign_in_wrong_pwd(self):
        print("\n7. Test store sign in with wrong password...")
        create_result = create_store(self, self.username, self.password, self.phone_number, self.address, self.store_name)
        signin_result = self.client.post(self.url, {"username" : self.username, "password" : "another_pwd"})
        self.assertEqual(signin_result.status_code, 200)

       
       

class CustomerSignupTests(TestCase):

    username = "cutomer"
    password = "1q2w3e4r!"
    phone_number = "01030615135"

    # check success case of customer_sign_up
    def test_create_users(self):
        print("\n1. Test customer sign up...")
        result = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number})
        self.assertRedirects(result, '/')

    
    # check duplicate account case (bad)
    def test_create_users_dup_account_case(self):
        print("\n3. Test customer sign up duplicate case...")
        result = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number})
        result_dup = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number})
        self.assertEqual(result_dup.status_code, 400)

    
    # check long phone number case (bad)
    def test_create_users_bad_phone_case(self):
        print("\n2. Test customer sign up bad phone number case...")
        phone_number = "01023111111111111111111111"

        result = self.client.post('/api/customer_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : phone_number})
        self.assertEqual(result.status_code, 400)
      
class StoreSignupTests(TestCase):

    username = "store"
    password = "1q2w3e4r!"
    phone_number = "01030615135"
    address = "home"
    store_name = "tomtom"

    # check success case of store_sign_up
    def test_create_users(self):
        print("\n8. Test store sign up...")
        result = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number, "address" : self.address, "name" : self.store_name})
        self.assertRedirects(result, '/')

    
    # check duplicate store case (bad)
    def test_create_users_dup_account_case(self):
        print("\n10. Test store sign up duplicate case...")
        result = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number, "address" : self.address, "name" : self.store_name})
        
        result_dup = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : self.phone_number, "address" : self.address, "name" : self.store_name})
       
        self.assertEqual(result_dup.status_code, 400)

    
    # check long phone number case (bad)
    def test_create_users_bad_phone_case(self):
        print("\n9. Test store sign up bad phone number case...")
        phone_number = "01023111111111111111111111"

        result = self.client.post('/api/store_sign_up/', {"account" : self.username, "password" : self.password, "phone_number" : phone_number, "address" : self.address, "name" : self.store_name})
        self.assertEqual(result.status_code, 400)
     
