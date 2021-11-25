from Indicators.macd import MACD
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleMACD(object):
    def __init__(self, candle_length='1D', slow_period=26, fast_period=12):
        self.candle_length = candle_length
        self.slow_period = slow_period
        self.fast_period = fast_period
        self.macd = MACD()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, candles):
        ema_slow, ema_fast, diff = self.macd.macd(candles, self.slow_period, self.fast_period)

        signal_vector = [None for i in range(len(candles))]

        for i in range(self.slow_period, len(diff)):
            if diff[i] > 0:
                signal_vector[i] = Signal('buy')
            elif diff[i] < 0:
                signal_vector[i] = Signal('sell')

        return signal_vector

    def get_prior_candle_count(self):
        return self.slow_period

    def get_candle_length(self):
        return self.candle_length

    def get_portfolio_manager(self):
        return self.portfolio_manager
