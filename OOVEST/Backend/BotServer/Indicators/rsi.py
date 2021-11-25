import numpy as np


class RSI(object):
    def __init__(self):
        pass

    @staticmethod
    def rsi(candles, period=14):
        prices = [candle[2] for candle in candles]

        deltas = np.diff(prices)
        seed = deltas[:period + 1]
        up = seed[seed >= 0].sum() / period
        down = -seed[seed < 0].sum() / period
        rs = up / down
        rsi = np.zeros_like(prices)
        rsi[:period] = 100. - 100. / (1. + rs)

        for i in range(period, len(prices)):
            delta = deltas[i - 1]  # cause the diff is 1 shorter
            if delta > 0:
                up_value = delta
                down_value = 0.
            else:
                up_value = 0.
                down_value = -delta

            up = (up * (period - 1) + up_value) / period
            down = (down * (period - 1) + down_value) / period
            if down == 0:
                rs = 0
            else:
                rs = up / down
                rsi[i] = 100. - 100. / (1. + rs)
        if len(prices) > period:
            return rsi
        else:
            return [50 for i in len(prices)]  # output a neutral amount until enough prices in list to calculate RSI
