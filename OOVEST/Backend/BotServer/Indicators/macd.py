from Indicators.ema import EMA
from operator import sub


class MACD(object):
    def __init__(self):
        pass

    @staticmethod
    def macd(candles, slow_period=26, fast_period=12, signal_period=9):
        prices = [candle[2] for candle in candles]

        ema_slow = EMA.ema(prices, slow_period)
        ema_fast = EMA.ema(prices, fast_period)

        macd_line = list(map(sub, ema_fast, ema_slow))

        signal_line = EMA.ema(macd_line, signal_period)

        macd_histogram = list(map(sub, macd_line, signal_line))

        return macd_line, signal_line, macd_histogram
