from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Manager(User):
  phone = models.CharField(max_length=10)
  bio = models.TextField()

class Client(User):
  address = models.CharField(max_length=100)
  phone = models.CharField(max_length=10)
  p_manager = models.ForeignKey(Manager, on_delete=models.CASCADE)