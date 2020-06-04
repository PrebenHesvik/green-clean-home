def phone_number(request):
    phone_number = str('(301) 565-788')
    return {'phone': phone_number}


def email(request):
    email = str('hello@greencleanhome.com')
    return {'email': email}
