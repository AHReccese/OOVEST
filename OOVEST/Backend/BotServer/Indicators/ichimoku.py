from Indicators.moving_average import MovingAverage


class Ichimoku(object):
    def __init__(self):
        pass

    @staticmethod
    def ichimoku(candles, conversion_period=9, base_period=26, leading_span_b_period=52, lagging_period=26):
        high_prices = [candle[3] for candle in candles]
        low_prices = [candle[4] for candle in candles]
        close_prices = [candle[2] for candle in candles]

        conversion_line = [0 for i in range(len(candles))]
        base_line = [0 for i in range(len(candles))]
        leading_span_a = [0 for i in range(len(candles))]
        leading_span_b = [0 for i in range(len(candles))]
        lagging_span = [0 for i in range(len(candles))]

        for i in range(conversion_period - 1, len(candles)):
            conversion_line[i] = (MovingAverage.moving_average(
                high_prices[i - conversion_period + 1: i + 1], conversion_period) + MovingAverage.moving_average(
                low_prices[i - conversion_period + 1: i + 1], conversion_period)) / 2

            if i >= base_period - 1:
                base_line[i] = (MovingAverage.moving_average(
                    high_prices[i - base_period + 1: i + 1], base_period) + MovingAverage.moving_average(
                    low_prices[i - base_period + 1: i + 1], base_period)) / 2

        for i in range(leading_span_b_period-1, len(candles)):
            if i + base_period < len(candles):
                leading_span_a[i + base_period] = (conversion_line[i] + base_line[i]) / 2

                leading_span_b[i + base_period] = (MovingAverage.moving_average(high_prices
                                                                                [i - leading_span_b_period + 1: i + 1]
                                                                                , leading_span_b_period) +
                                                   MovingAverage.moving_average(
                                                       low_prices[i - base_period + 1: i + 1]
                                                       , leading_span_b_period)) / 2

            if i + lagging_period < len(candles):
                lagging_span[i] = close_prices[i + lagging_period]

        return conversion_line, base_line, leading_span_a, leading_span_b, lagging_span
