from Indicators.cmf import CMF
from Portfolio_Management.StopLoss_and_TakeProfit.stop_loss import StopLoss
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleCMF(object):
    def __init__(self, candle_length='1D', period=20):
        self.candle_length = candle_length
        self.period = period
        self.cmf = CMF()
        self.portfolio_manager = PortfolioManager(stop_loss=StopLoss('normal', 40, 1))

    def analysis(self, candles):

        signal_vector = [None for i in range(len(candles))]

        cmf = self.cmf.cmf(candles, self.period)

        for i in range(self.period, len(cmf)):

            if cmf[i] > 0.05 > cmf[i-1]:
                signal_vector[i] = Signal('buy')
            elif cmf[i] < -0.05 < cmf[i-1]:
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
