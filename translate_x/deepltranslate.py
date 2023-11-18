"""Translate API. 
API setup courtesy of Author Euguene Williams 
Coded and designed by Luke Briden
"""
import requests
import os
import sys
import json

AUTH_KEY = os.environ["DEEPL_API_KEY"]

translate_url = "https://api-free.deepl.com/v2/document"
translate_status_url = "https://api-free.deepl.com/v2/document/{0}"
translate_download_url = "https://api-free.deepl.com/v2/document/{0}/result"

def translatedoc(path, language):
    """
    translates a document and prints out the subsequent 
    commands to get status and download

    :param path: the path of the file to be translated
    :return: nothing
    """ 
    up_file = open(path,"rb")
    
    _params = {
        "source_lang" : "EN",
        "auth_key" : AUTH_KEY,
        "target_lang" : language
    }
    response = requests.post(translate_url,params=_params,files={"file":up_file})
    jdata = json.loads(response.text)
    docid = jdata["document_id"]
    dockey = jdata["document_key"]

    # Status chcek 
    _params2 = {
        "auth_key" : AUTH_KEY,
        "document_key" : dockey
    }

    status = requests.get(translate_status_url.format(docid),params=_params2)

    # Check if done and return an ouputted file
    if 'done' in status.text:
        output = requests.get(translate_download_url.format(docid),params=_params2,allow_redirects=True)
        open("new.txt".format(docid),"wb").write(output.content)


# the program should be run with the following structure
# python deepltranslate.py [action] [param 1] [param 2]
# action = sys.argv[1]
# if action == "translate":
#     translatedoc(sys.argv[2])