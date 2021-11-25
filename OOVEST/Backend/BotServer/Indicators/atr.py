import statistics


class ATR(object):
    def __init__(self):
        pass

    @staticmethod
    def atr(candles, period=14):
        high_prices = [candle[3] for candle in candles]
        low_prices = [candle[4] for candle in candles]
        close_prices = [candle[2] for candle in candles]

        tr = [0 for i in range(len(candles))]

        for i in range(len(candles)):
            if i == 0:
                tr[i] = high_prices[i] - low_prices[i]
            else:
                high_low_diff = high_prices[i] - low_prices[i]
                high_close_diff = abs(high_prices[i] - close_prices[i - 1])
                low_close_diff = abs(low_prices[i] - close_prices[i - 1])

                tr[i] = max(high_low_diff, high_close_diff, low_close_diff)

        atr = [0 for values in range(len(candles))]

        for i in range(period - 1, len(candles)):
            if i == period - 1:
                atr[i] = statistics.mean(tr[:period])
            else:
                atr[i] = (atr[i - 1] * 13 + tr[i]) / 14

        return tr, atr
