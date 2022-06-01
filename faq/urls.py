from django.urls import path
from .views import faq

app_name = "faq"
urlpatterns = [
    path("faq/", faq, name="index"),
]
