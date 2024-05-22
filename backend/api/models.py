from django.db import models
from pgvector.django import VectorField
from django.contrib.postgres.fields import ArrayField

class items(models.Model):
    festival_name = models.CharField(max_length=150)
    State = models.CharField(max_length=30)
    month = models.CharField(max_length=30)
    serorprod = models.CharField(max_length=30)
    item = models.CharField(max_length=100)
    description = models.CharField(max_length=600)
    imgurl = models.CharField(max_length=1000 ,default="")
    feature_vector = VectorField(dimensions=1536)
# Create your models here.

class Knowledgeext(models.Model):
    link = models.CharField(max_length=200)
    chunk = models.CharField(max_length=1000)
    feature_vector = VectorField(dimensions=1536)