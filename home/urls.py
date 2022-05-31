from django.urls import path

from .views import home, calc_price, submit_form

app_name = "home"

urlpatterns = [
    path("", home, name="home"),
    path("calc-price/", calc_price, name="price"),
    path("submit-form/", submit_form, name="submit_form"),
]
