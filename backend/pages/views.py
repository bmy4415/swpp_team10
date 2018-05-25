from django.shortcuts import render


def main_page(request):
    return render(request, 'main_page/build/index.html')


def signup_customer(request):
    return render(request, 'signup_customer/build/index.html')


def signup_store(request):
    return render(request, 'signup_store/build/index.html')
