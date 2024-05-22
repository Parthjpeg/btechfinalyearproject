from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .helpers import *
from rest_framework import status
from pgvector.django import L2Distance
from django.db.models import Q
from datetime import datetime
from .models import *
@api_view(['POST'])
def addItems(request):
    if(request.data):
        festival_name = request.data.get('festival_name')
        State = request.data.get('State')
        month = request.data.get('month')
        item = request.data.get('item')
        description = request.data.get('description')
        embedding_string = festival_name + " "+State+" "+month+" "+item+" "+description
        feature_vector = getembb(embedding_string)
        request.data['feature_vector'] = feature_vector
        print(request.data)
        serializers = IemsSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
    serializers = IemsSerializer(data=request.data)
    serializers.is_valid()
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def search(request):
    print(request.data.get("Query"))
    query = request.data.get("Query")
    query = translate(1 , request.data.get("Query"))
    print(query)
    query_vector = getembb(query)
    #prods = items.objects.filter(festival_name = "Diwali").values('id','festival_name','item','description','imgurl')[:3]
    prods = items.objects.annotate(distance=L2Distance('feature_vector',query_vector)).order_by('distance').values('id','festival_name','item','description','distance')[:3]
    print(type(prods[0]))
    prods[0].update(festival_name = "10")
    for i in prods:
        stringtotranslate = "userquery - "+ request.data.get("Query") +" content - " + i.get('festival_name')
        i.update(festival_name = translate(0 , stringtotranslate))
        stringtotranslate = "userquery - "+ request.data.get("Query") +" content - " + i.get('item')
        i.update(item = translate(0, stringtotranslate))
        stringtotranslate = "userquery - "+ request.data.get("Query") +" content - " + i.get('description')
        i.update(description = translate(0 ,stringtotranslate))
    return Response(prods)
# Create your views here.


@api_view(['POST'])
def adddatachunks(request):
    s = request.data.get('chunk')
    cnt = 0
    chunk = ""
    l = []
    data = {}
    for i in s:
        if(cnt<800):
            chunk = chunk+i
            cnt = cnt+1
        elif cnt>=800 and i ==".":
            chunk = chunk+i
            l.append(chunk)
            cnt = 0
            chunk = ""
        else:
            chunk = chunk+i
            cnt = cnt+1
    if(len(chunk)>1):
        # data["link"] = link
        # data["feature_vector"] = feature_vector
        # data["chunk"] = chunk
        l.append(chunk)
    data = {}
    for i in l:
        data["link"] = request.data.get('link')
        data["feature_vector"] = getembb(i)
        data["chunk"] = i
        serializers = ChunkSerializer(data=data)
        if serializers.is_valid():
            serializers.save()
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        data = {}
    return Response({'msg':'uploaded'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def chat(request):
    print(request.data.get("Query"))
    query = translate(1 , request.data.get("Query"))
    print(query)
    query_vector = getembb(query)
    prods = Knowledgeext.objects.annotate(distance=L2Distance('feature_vector',query_vector)).order_by('distance').values('id','chunk','distance')[:2]
    stringtotranslate = "userquery - (" + request.data.get("Query") +") knowledge - (" + prods[0].get("chunk") +" " + prods[1].get("chunk") + " )"
    print(stringtotranslate)
    translatedans = translate(2 , stringtotranslate)
    return Response({"answer":translatedans})


