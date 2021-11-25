import statistics

from Indicators.atr import ATR


class ADX(object):
    def __init__(self):
        pass

    @staticmethod
    def adx(candles, period=14):
        close_prices = [candle[2] for candle in candles]
        high_prices = [candle[3] for candle in candles]
        low_prices = [candle[4] for candle in candles]

        tr, _ = ATR.atr(candles, period)

        plus_dm = [0 for i in range(len(candles))]
        minus_dm = [0 for i in range(len(candles))]

        for i in range(1, len(candles)):
            plus_dm[i] = max((high_prices[i] - high_prices[i - 1]), 0)
            minus_dm[i] = max((low_prices[i - 1] - low_prices[i]), 0)

        plus_dm_smoothed = ADX.smooth_sum(plus_dm, period, 0)
        minus_dm_smoothed = ADX.smooth_sum(minus_dm, period, 0)
        tr_smoothed = ADX.smooth_sum(tr, period, 0)

        plus_di = [0 for i in range(len(candles))]
        minus_di = [0 for i in range(len(candles))]

        for i in range(period, len(candles)):
            if tr_smoothed[i] != 0:
                plus_di[i] = plus_dm_smoothed[i] / tr_smoothed[i] * 100
                minus_di[i] = minus_dm_smoothed[i] / tr_smoothed[i] * 100

        dx = [0 for i in range(len(candles))]

        for i in range(period, len(candles)):
            diff_value = plus_di[i] - minus_di[i]
            sum_value = plus_di[i] + minus_di[i]
            if sum_value != 0:
                dx[i] = abs(diff_value / sum_value) * 100

        adx = ADX.smooth_average(dx, period, period)

        return plus_di, minus_di, adx

    @staticmethod
    def smooth_sum(vector, period, starting_index):
        smoothed_vector = [0 for i in range(len(vector))]

        for i in range(starting_index+period-1, len(vector)):
            if i == starting_index + period - 1:
                smoothed_vector[i] = sum(vector[i-period+1: i+1])
            else:
                smoothed_vector[i] = smoothed_vector[i - 1] * 13/14 + vector[i]

        return smoothed_vector

    @staticmethod
    def smooth_average(vector, period, starting_index):
        smoothed_vector = [0 for i in range(len(vector))]

        for i in range(starting_index+period-1, len(vector)):
            if i == starting_index + period - 1:
                smoothed_vector[i] = statistics.mean(vector[i-period+1: i+1])
            else:
                smoothed_vector[i] = (smoothed_vector[i - 1] * 13 + vector[i]) / 14

        return smoothed_vector



