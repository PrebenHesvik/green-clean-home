from django.shortcuts import render
from home.views import home


def faq(request):
    template = 'faq/index.html'
            
    context = {
    }
   
    return render(request, template, context)
