from Indicators.stochastic import Stochastic
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleStochastic(object):
    def __init__(self, candle_length='1D', look_back_period=14, k_trigger_period=3, d_trigger_period=3):
        self.candle_length = candle_length
        self.look_back_period = look_back_period
        self.k_trigger_period = k_trigger_period
        self.d_trigger_period = d_trigger_period
        self.stochastic = Stochastic()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, candles):
        signal_vector = [None for i in range(len(candles))]

        full_k_percent, full_d_percent = self.stochastic.stochastic(candles,
                                                                    self.look_back_period, self.k_trigger_period,
                                                                    self.d_trigger_period)

        starting_candle_index = self.look_back_period + self.k_trigger_period + self.d_trigger_period - 3
        for i in range(starting_candle_index, len(candles)):
            if full_k_percent[i] > 15 > full_k_percent[i-1]:
                signal_vector[i] = Signal('buy')
            elif full_k_percent[i] < 85 < full_k_percent[i-1]:
                signal_vector[i] = Signal('sell')
            else:
                signal_vector[i] = Signal('Nothing')

        return signal_vector

    def get_prior_candle_count(self):
        return self.look_back_period + self.k_trigger_period + self.d_trigger_period - 3

    def get_candle_length(self):
        return self.candle_length

    def get_portfolio_manager(self):
        return self.portfolio_manager
