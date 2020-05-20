#import requests
#import json

from django.shortcuts import render, redirect
from django.conf import settings
from django.shortcuts import render
from django.contrib import messages

from django.http import HttpResponse, HttpResponseRedirect
from django.core.mail import send_mail


def home(request):
    template = 'home/index.html'

    context = {
    }

    return render(request, template, context)
