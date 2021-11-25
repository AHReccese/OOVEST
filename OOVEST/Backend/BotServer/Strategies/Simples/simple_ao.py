from Indicators.ao import AO
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleAO(object):
    def __init__(self, candle_length='1D', slow_period=34, fast_period=5):
        self.candle_length = candle_length
        self.slow_period = slow_period
        self.fast_period = fast_period
        self.ao = AO()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, candles):

        signal_vector = [None for i in range(len(candles))]

        ao = self.ao.ao(candles, self.slow_period, self.fast_period)

        for i in range(self.slow_period, len(ao)):

            if ao[i] > 0 > ao[i-1]:
                signal_vector[i] = Signal('buy')
            elif ao[i] < 0 < ao[i-1]:
                signal_vector[i] = Signal('sell')
            else:
                signal_vector[i] = Signal('Nothing')

        return signal_vector

    def get_prior_candle_count(self):
        return self.slow_period

    def get_candle_length(self):
        return self.candle_length

    def get_portfolio_manager(self):
        return self.portfolio_manager
