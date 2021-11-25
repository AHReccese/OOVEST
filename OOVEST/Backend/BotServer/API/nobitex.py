import datetime
from API.mainserver import MainServer


class Bitfinex(object):
    def __init__(self):
        self.limit = 10000

    def request_candles(self, coin, market, start_time, end_time, candle_length, candle_prior):
        print("_______________________")
        year, month, day, hour, minutes = start_time
        start_time = str(datetime.datetime(year, month, day, hour, minutes))

        temp = list(start_time)
        temp[10] = 'T'
        start_time = "".join(temp)
        start_time = start_time + 'Z'

        _year, _month, _day, _hour, _minutes = end_time
        end_time = str(datetime.datetime(_year, _month, _day, _hour, _minutes))

        temp = list(end_time)
        temp[10] = 'T'
        end_time = "".join(temp)
        end_time = end_time + 'Z'

        print(start_time)
        print(end_time)

        print(candle_length)
        print(candle_prior)

        # start_time = datetime.datetime(start_time[0], start_time[1], start_time[2], start_time[3], start_time[4])
        # end_time = datetime.datetime(end_time[0], end_time[1], end_time[2], end_time[3], end_time[4])

        # if candle_length == '1D':
        #     t_start_before = start_time - datetime.timedelta(days=candle_prior)
        # elif candle_length == '7D':
        #     t_start_before = start_time - datetime.timedelta(days=candle_prior * 7)
        # elif candle_length == '14D':
        #     t_start_before = start_time - datetime.timedelta(days=candle_prior * 14)
        # elif candle_length == '1M':
        #     t_start_before = start_time - datetime.timedelta(weeks=candle_prior * 4)
        # elif candle_length == '1m':
        #     t_start_before = start_time - datetime.timedelta(minutes=candle_prior)
        # elif candle_length == '5m':
        #     t_start_before = start_time - datetime.timedelta(minutes=candle_prior * 5)
        # elif candle_length == '15m':
        #     t_start_before = start_time - datetime.timedelta(minutes=candle_prior * 15)
        # elif candle_length == '30m':
        #     t_start_before = start_time - datetime.timedelta(minutes=candle_prior * 30)
        # elif candle_length == '1h':
        #     t_start_before = start_time - datetime.timedelta(hours=candle_prior)
        # elif candle_length == '3h':
        #     t_start_before = start_time - datetime.timedelta(hours=candle_prior * 3)
        # elif candle_length == '6h':
        #     t_start_before = start_time - datetime.timedelta(hours=candle_prior * 6)
        # elif candle_length == '12h':
        #     t_start_before = start_time - datetime.timedelta(hours=candle_prior * 12)
        #
        # api_v2 = bitfinex.bitfinex_v2.api_v2
        # t_start_before = time.mktime(t_start_before.timetuple()) * 1000
        #
        # t_stop = time.mktime(end_time.timetuple()) * 1000
        #
        # candles = api_v2.candles(symbol=market, interval=candle_length, limit=self.limit
        #                          , start=t_start_before, end=t_stop)

        candles = MainServer.get_backtest_candles(coin, start_time, end_time)
        print(candles)
        print("_______________________")

        return candles
