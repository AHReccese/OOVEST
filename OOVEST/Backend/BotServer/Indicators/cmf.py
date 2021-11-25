class CMF(object):
    def __init__(self):
        pass

    @staticmethod
    def cmf(candles, period=20):
        close_prices = [candle[2] for candle in candles]
        high_prices = [candle[3] for candle in candles]
        low_prices = [candle[4] for candle in candles]
        volumes = [candle[5] for candle in candles]

        money_flow_volumes = [0 for i in range(len(candles))]

        for i in range(len(candles)):
            multiplier = None
            if high_prices[i] - low_prices[i] == 0:
                multiplier = 0
            else:
                multiplier = ((close_prices[i] - low_prices[i]) - (high_prices[i] - close_prices[i])) / (
                        high_prices[i] - low_prices[i])
            print(multiplier)
            money_flow_volumes[i] = multiplier * volumes[i]

        cmf = [0 for i in range(len(candles))]

        for i in range(period, len(candles)):

            if sum(volumes[i - period + 1: i + 1]) == 0:
                cmf[i] = 0
            else:
                cmf[i] = sum(money_flow_volumes[i - period + 1: i + 1]) / sum(volumes[i - period + 1: i + 1])

        return cmf
