from Indicators.moving_average import MovingAverage
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleSMA(object):
    def __init__(self, candle_length='1D', period=20):
        self.candle_length = candle_length
        self.period = period
        self.moving_average = MovingAverage()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, candles):
        prices = [candle[2] for candle in candles]

        signal_vector = [None for i in range(len(prices))]

        for i in range(self.period, len(prices)):
            current_ma = self.moving_average.moving_average(prices[i - self.period: i + 1], self.period)

            if prices[i - 1] < current_ma < prices[i]:
                signal_vector[i] = Signal('buy')
            elif prices[i - 1] > current_ma > prices[i]:
                signal_vector[i] = Signal('sell')
            else:
                signal_vector[i] = Signal('Nothing')

        return signal_vector

    def get_prior_candle_count(self):
        return self.period

    def get_candle_length(self):
        return self.candle_length

    def get_portfolio_manager(self):
        return self.portfolio_manager
