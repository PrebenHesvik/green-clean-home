from django.urls import path

from .views import home, calc_price

app_name = 'home'

urlpatterns = [
    path('', home, name='home'),
    path('calc-price/', calc_price, name='price')
]
