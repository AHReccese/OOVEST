from Indicators.cmf import CMF
from Indicators.mfi import MFI
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleMFI(object):
    def __init__(self, candle_length='1D', period=14):
        self.candle_length = candle_length
        self.period = period
        self.mfi = MFI()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, candles):

        signal_vector = [None for i in range(len(candles))]

        cmf = self.mfi.mfi(candles, self.period)

        for i in range(self.period, len(cmf)):

            if cmf[i] > 30 > cmf[i-1]:
                signal_vector[i] = Signal('buy')
            elif cmf[i] < 70 < cmf[i-1]:
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
