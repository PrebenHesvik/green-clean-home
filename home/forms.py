from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(required=True)
    phone = forms.CharField(required=True)
    email = forms.CharField(required=True)
    message = forms.CharField(
        required=True, widget=forms.Textarea(attrs={'rows': 5, 'cols': 5}))

    ''' def clean(self):
        cleaned_data = super(ContactForm, self).clean()
        name = cleaned_data.get('name')
        email = cleaned_data.get('email')
        message = cleaned_data.get('message')
        if not name and not email and not message:
            raise forms.ValidationError('You have to write something!')
        return cleaned_data '''

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update(
            {'placeholder': 'Full name'})
        self.fields['phone'].widget.attrs.update(
            {'placeholder': 'Phone number'})
        self.fields['email'].widget.attrs.update(
            {'placeholder': 'Email address'})
        self.fields['message'].widget.attrs.update(
            {'placeholder': 'Please type your message'})
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'effect-9'
