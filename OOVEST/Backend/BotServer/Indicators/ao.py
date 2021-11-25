from Indicators.moving_average import MovingAverage


class AO(object):
    def __init__(self):
        pass

    @staticmethod
    def ao(candles, slow_period=34, fast_period=5):
        high_prices = [candle[3] for candle in candles]
        low_prices = [candle[4] for candle in candles]
        midpoint_prices = [None for i in range(len(candles))]
        for i in range(len(candles)):
            midpoint_prices[i] = (high_prices[i] + low_prices[i]) / 2

        ao = [0 for i in range(len(candles))]
        for i in range(slow_period, len(candles)):
            fast_ma = MovingAverage.moving_average(midpoint_prices[i - fast_period: i+1], fast_period)
            slow_ma = MovingAverage.moving_average(midpoint_prices[i - slow_period: i+1], slow_period)
            ao[i] = fast_ma - slow_ma

        return ao
