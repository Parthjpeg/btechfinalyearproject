from rest_framework import serializers
from .models import *

class IemsSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = items
        fields = '__all__'

class ChunkSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Knowledgeext
        fields = '__all__'
