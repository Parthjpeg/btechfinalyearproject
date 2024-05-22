import os
from openai import OpenAI
import requests
import json


client = OpenAI()

def getembb(embedding_string):
  response = client.embeddings.create(
    input= embedding_string,
    model="text-embedding-ada-002"
  )
  feature_vector = response.data[0].embedding
  return feature_vector

def translate(indexsys , userQuery ,  *args):
  sysmsg = ["You are a translating bot who detects the language of the question and translates the content sent to you in that language your job isnt to answer that question just translate the content. The format of the query will be userquery - () , content - ()  your job is to detect the language from userquery not the language of origin of the word but the language that word is currently used in and translate the content and only return the content and nothing else make it seem as if the content was originally written in that language if the detechted language is english don't change the content just return it as is." , 
            "Your job is to translate the user query into english if the query is in englsh dont translate return the query as it is",
            "Your job is to answer user queries in the language user askes them in you can use the knowledge provided with the query. If the query is outside that knowledge decline to answer in the same language as the user. The fromat of the query will be userquery - () , Knowledge - (). If the userquery is in english answer in english"]
  l = [{"role": "system", "content": sysmsg[indexsys]}]
  l.append({"role": "user", "content": userQuery})
  response = client.chat.completions.create(
  model="gpt-4",
  messages=l
  )
  return (response.choices[0].message.content)


def bhashanifortranslation(query, detectedlang, translatedlang, sentence):
  url = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"
  headers = {
    'Content-Type': 'application/json',
    'Authorization': '0ELDJvqbaDLzAGPIR1Dfv38ehE21HkMjxWkXYWq-Mk1bajlyyxXMyHGpwb3lD2cz'
  }
  # Set up the request body
  payload ={
   "inputData": {
    "input": [
        {
            "source": "my name is parth and i am a maharashtrian "
        }
    ]
    },
    "pipelineTasks":[
    {
        "taskType": "translation",
        "config": {
            "language": {
                "sourceLanguage": "en",
                "targetLanguage": "mr"
            },
            "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
        }
    }
  ]
  }
  json_payload = json.dumps(payload)
  response = requests.post(url, headers=headers, data=json_payload)
# Check the response
  if response.status_code == 200:
      print('Request successful!')
      print(response.json())
      return response.json()
  else:
      print('Request failed!')
      print(response.text)