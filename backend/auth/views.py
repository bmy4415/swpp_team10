from django.shortcuts import render
from django.contrib.auth.views import *
from django.views.generic.base import TemplateView
# Create your views here.

class MyLoginView(LoginView):
    def get_success_url(self):
        url = self.get_redirect_url()
        """
	    if request.user.isCustomer:
		    LOGIN_REDIRECT_URL = ''
	    else:
		    LOGIN_REDIRECT_URL = ''
        """
        LOGIN_REDIRECT_URL = '/auth/success_page'
        return url or resolve_url(LOGIN_REDIRECT_URL)

class MyLogoutView(LogoutView):
    next_page = '/auth/login'

SuccessView = TemplateView
