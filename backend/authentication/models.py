from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_member = models.BooleanField('member status', default=False)
    is_employee = models.BooleanField('employee status', default=False)
    address = models.CharField(verbose_name="Address", max_length=100, null=True, blank=True)
    city = models.CharField(verbose_name="City", max_length=100, null=True, blank=True)
    state = models.CharField(verbose_name="State", max_length=100, null=True, blank=True)
    zip_code = models.CharField(verbose_name="Zip Code", max_length=10, null=True, blank=True)
    country = models.CharField(verbose_name="Country", max_length=100, null=True, blank=True)
    longitude = models.CharField(verbose_name="Longitude", max_length=100, null=True, blank=True)
    latitude = models.CharField(verbose_name="Latitude", max_length=100, null=True, blank=True)
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    # Example (note import of models above that is commented out)
    # this will add a column to the user table
