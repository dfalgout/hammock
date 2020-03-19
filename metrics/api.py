import requests
import pandas as pd
import calendar
from datetime import datetime
import pprint

class InstagramAPI():
  daily_metrics = [
    'email_contacts',
    'follower_count',
    'get_directions_clicks',
    'impressions',
    'phone_call_clicks',
    'profile_views',
    'reach',
    'text_message_clicks',
    'website_clicks'
  ]

  lifetime_metrics = [
    'audience_city',
    'audience_country',
    'audience_gender_age',
    'audience_locale',
    'online_followers'
  ]

  def convertTime(self, ts):
    return calendar.timegm(datetime.timetuple(ts))

  def getInsightsByUser(self, user, since, until):
    queryParams = 'metric={metrics}&period={period}&since={since}&until={until}'.format(
      metrics = ','.join(self.daily_metrics),
      period = 'day',
      since = self.convertTime(since),
      until = self.convertTime(until)
    )

    table = {}

    account = user['linkedInstagramAccount']
    accessToken = account['accessToken']
    instagramId = account['instagramId']
    url = 'https://graph.facebook.com/{id}/insights?{queryParams}'.format(id = instagramId, queryParams = queryParams)
    bearer = 'Bearer {token}'.format(token = accessToken)
    response = requests.get(
      url,
      headers={'Authorization': bearer}
    )
    records = response.json()

    if 'error' in records.keys() and records['error']['type'] == 'OAuthException':
      if 'Error validating access token' in records['error']['message']:
        raise Exception('Account Not Linked')
    
    end_times = set()
    for record in records['data']:
      for value in record['values']:
        table['id'] = instagramId
        end_times.add(value['end_time'])
        if record['name'] not in table.keys():
          table[record['name']] = []
        table[record['name']].append(value['value'])

    table['end_time'] = list(end_times)
    return pd.DataFrame(table)