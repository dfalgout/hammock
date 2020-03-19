import pandas as pd
import pprint
from pymongo import MongoClient
from datetime import datetime
from dateutil.relativedelta import relativedelta
from api import InstagramAPI
  
def main():
  client = MongoClient('mongodb://localhost:27018/')
  db = client['test']
  users = db['user']

  instagramAPI = InstagramAPI()

  frames = []
  since = datetime.now() - relativedelta(days=30)
  until = datetime.now()
  for user in users.find():
    try:
      result = instagramAPI.getInsightsByUser(user, since, until)
      frames.append(result)
    except Exception as error:
      pprint.pprint(error)
      pprint.pprint('Instagram not linked - updating user')
      users.update_one(user, {'$set': {'instagramLinked': False}})

  df = pd.concat(frames)
  pprint.pprint(df)

if __name__ == '__main__':
  main()