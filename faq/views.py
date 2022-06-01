from django.shortcuts import render


def faq(request):
    template = "faq/index.html"
    context = {}

    return render(request, template, context)
