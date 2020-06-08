from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.template.loader import render_to_string

from .forms import ContactForm

bedrooms_dict = {
    'Studio': 2,
    '1 bedroom': 2.5,
    '2 bedrooms': 3,
    '3 bedrooms': 3.5,
    '4 bedrooms': 4,
    '5 bedrooms': 5.5,
}

bathrooms_dict = {
    '1 bathroom': 0.3,
    '2 bathrooms': 0.6,
    '3 bathrooms': 0.9,
    '4 bathrooms': 1.2,
    '5 bathrooms': 1.5,
}

cleaning_type_dict = {
    'Standard': 1,
    'Standard Plus': 1.3,
    'Deep Clean': 1.5,
    'Moving in/out': 1.8,
}


def home(request):
    template = 'home/index.html'

    house_type = 'Studio'
    bathrooms = '1 bathroom'
    cleaning_type = 'Standard'

    price = calculator(house_type, bathrooms, cleaning_type)

    context = {
        'form': ContactForm(),
        'price': price,
    }

    return render(request, template, context)


@csrf_exempt
def calc_price(request):
    data = dict()
    template = 'home/includes/price.html'

    house_type = request.POST.get('house_type')
    bathrooms = request.POST.get('bathrooms')
    cleaning_type = request.POST.get('cleaning_type')

    price = calculator(house_type, bathrooms, cleaning_type)

    context = {
        'price': price
    }

    data['html'] = render_to_string(template, context)
    print(data)

    return JsonResponse(data)


def calculator(bedrooms, bathrooms, cleaning_type):
    bedroom_time = bedrooms_dict.get(bedrooms)
    bathroom_time = bathrooms_dict.get(bathrooms)
    cleaning_type_multiplier = cleaning_type_dict.get(cleaning_type)
    rate = 50

    price = (bedroom_time + bathroom_time) * cleaning_type_multiplier * rate

    return round(price)
