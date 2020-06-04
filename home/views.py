#import requests
#import json

from django.shortcuts import render, redirect
from django.conf import settings
from django.shortcuts import render
from django.contrib import messages

from django.http import HttpResponse, HttpResponseRedirect
from django.core.mail import send_mail
from .forms import ContactForm


def home(request):
    template = 'home/index.html'

    context = {
        'form': ContactForm()
    }

    return render(request, template, context)
