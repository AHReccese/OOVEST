from Indicators.moving_average import MovingAverage


class MFI(object):
    def __init__(self):
        pass

    @staticmethod
    def mfi(candles, period=14):
        high_prices = [candle[3] for candle in candles]
        low_prices = [candle[4] for candle in candles]
        close_prices = [candle[2] for candle in candles]
        volumes = [candle[5] for candle in candles]

        typical_prices = [0 for i in range(len(candles))]
        for i in range(len(typical_prices)):
            typical_prices[i] = (high_prices[i] + low_prices[i] + close_prices[i]) / 3

        raw_money_flow = [0 for i in range(len(candles))]
        for i in range(len(raw_money_flow)):
            raw_money_flow[i] = typical_prices[i] * volumes[i]

        mfi = [50 for i in range(len(candles))]
        for i in range(period, len(raw_money_flow)):
            negative_money_flow = 0
            positive_money_flow = 0

            for j in range(i - period + 1, i + 1):
                if typical_prices[j] > typical_prices[j - 1]:
                    positive_money_flow += raw_money_flow[j]
                elif typical_prices[j] < typical_prices[j - 1]:
                    negative_money_flow += raw_money_flow[j]

            if negative_money_flow == 0 and positive_money_flow > 0:
                mfi[i] = 100
            elif negative_money_flow == 0 and positive_money_flow == 0:
                mfi[i] = 50
            else:
                money_flow_ratio = positive_money_flow / negative_money_flow
                mfi[i] = 100 - 100 / (1 + money_flow_ratio)

        return mfi
