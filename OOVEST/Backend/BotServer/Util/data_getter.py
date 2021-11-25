import json
import urllib

from API.poloniex import poloniex
from Util.candlestick import BotCandlestick


class DataGetter(object):
    def __init__(self, exchange, pair, period, back_test=True):
        self.pair = pair
        self.period = period

        self.startTime = 1491048000
        self.endTime = 1491591200

        self.data = []

        if exchange == "poloniex":
            self.conn = poloniex('4NRO3FXJ-1LQL4IK7-ZOYCA9I2-O0PSJMME'
                                 , 'fb6aac4d906ce7516fa09abd631687bf5fa5a8a93f171bd0bcc444cd74efca166ac7c50ef394b9239'
                                   'f7f9425ebddcff80b4d6c26faccb76970bedec8459d9026')

            if back_test:
                polo_data = self.conn.api_query("returnChartData",
                                               {"currencyPair": self.pair, "start": self.startTime, "end": self.endTime,
                                                "period": self.period})
                for datum in polo_data:
                    if datum['open'] and datum['close'] and datum['high'] and datum['low']:
                        self.data.append(
                            BotCandlestick(self.period, datum['open'], datum['close'], datum['high'], datum['low'],
                                           datum['weightedAverage']))

        if exchange == "bittrex":
            if back_test:
                url = "https://bittrex.com/Api/v2.0/pub/market/GetTicks?marketName=" + self.pair + "&tickInterval=" \
                      + self.period + "&_=" + str(self.startTime)
                response = urllib.urlopen(url)
                raw_data = json.loads(response.read())

                self.data = raw_data["result"]

    def get_points(self):
        return self.data

    def get_current_price(self):
        current_values = self.conn.api_query("returnTicker")
        last_pair_price = current_values[self.pair]["last"]
        return last_pair_price
