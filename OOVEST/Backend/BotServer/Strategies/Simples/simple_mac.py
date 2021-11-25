from Indicators.moving_average import MovingAverage
from Portfolio_Management.portfolio_manager import PortfolioManager


class SimpleMAC(object):
    def __init__(self, candle_length='1D', slow_period=100, fast_period=20):
        self.candle_length = candle_length
        self.slow_period = slow_period
        self.fast_period = fast_period
        self.moving_average = MovingAverage()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, prices):

        signal_vector = [None for i in range(len(prices))]

        for i in range(self.slow_period, len(prices)):
            slow_ma = self.moving_average.moving_average(prices[i - self.slow_period: i + 1], self.slow_period)
            fast_ma = self.moving_average.moving_average(prices[i - self.fast_period: i + 1], self.fast_period)

            if fast_ma > slow_ma:
                signal_vector[i] = 'buy'
            elif fast_ma < slow_ma:
                signal_vector[i] = 'sell'

        return signal_vector

    def get_prior_candle_count(self):
        return self.slow_period

    def get_candle_length(self):
        return self.candle_length

    def get_portfolio_manager(self):
        return self.portfolio_manager
