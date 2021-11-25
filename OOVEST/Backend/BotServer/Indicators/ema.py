import numpy as np


class EMA(object):
    def __init__(self):
        pass

    @staticmethod
    def ema(prices, period):
        input_prices = np.asarray(prices)
        weights = np.exp(np.linspace(-1., 0., period))
        weights /= weights.sum()
        result = np.convolve(input_prices, weights, mode='full')[:len(input_prices)]
        result[:period] = result[period]
        return result
