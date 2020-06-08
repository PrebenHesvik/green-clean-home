from django.db import models
from django.utils.encoding import smart_text


class Home(models.Model):
    home_id = models.AutoField(primary_key=True)
    home_description = models.CharField(max_length=255, unique=True)
    home_size = models.CharField(max_length=255, unique=True)
    initial = models.CharField(max_length=15, verbose_name='Initial')
    weekly = models.CharField(max_length=15, verbose_name='Weekly')
    week2 = models.CharField(max_length=15, verbose_name='Every 2nd week')
    week3 = models.CharField(max_length=15, verbose_name='Every 3rd week')
    monthly = models.CharField(max_length=15, verbose_name='Monthly')

    class Meta:
        verbose_name = 'Home'
        verbose_name_plural = 'Homes'

    def __str__(self):
        return smart_text(self.home_description)
