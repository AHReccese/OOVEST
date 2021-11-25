from Indicators.moving_average import MovingAverage


class Stochastic(object):
    def __init__(self):
        pass

    @staticmethod
    def stochastic(candles, look_back_period=14, k_trigger_period=3, d_trigger_period=3):
        high_prices = [candle[3] for candle in candles]
        low_prices = [candle[4] for candle in candles]
        close_prices = [candle[2] for candle in candles]

        k_percent = [50 for i in range(len(candles))]
        full_k_percent = [50 for i in range(len(candles))]
        full_d_percent = [50 for i in range(len(candles))]

        for i in range(look_back_period - 1, len(k_percent)):
            lowest_low = min(low_prices[i - look_back_period + 1: i + 1])
            highest_high = max(high_prices[i - look_back_period + 1: i + 1])

            if highest_high - lowest_low == 0:
                k_percent[i] = 0  # (close_prices[i] - lowest_low) / (highest_high - lowest_low) * 100
            else:
                k_percent[i] = (close_prices[i] - lowest_low) / (highest_high - lowest_low) * 100

        for i in range(k_trigger_period - 1, len(full_k_percent)):
            full_k_percent[i] = MovingAverage.moving_average(k_percent[i - k_trigger_period + 1: i + 1]
                                                             , k_trigger_period)

        for i in range(d_trigger_period - 1, len(full_d_percent)):
            full_d_percent[i] = MovingAverage.moving_average(full_k_percent[i - d_trigger_period + 1: i + 1],
                                                             d_trigger_period)

        return full_k_percent, full_d_percent
