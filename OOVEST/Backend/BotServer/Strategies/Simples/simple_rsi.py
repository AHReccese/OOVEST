from Indicators.rsi import RSI
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleRSI(object):
    def __init__(self, candle_length='1D', period=14):
        self.candle_length = candle_length
        self.period = period
        self.rsi = RSI()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, candles):
        prices = [candle[2] for candle in candles]

        rsi_output = self.rsi.rsi(candles, self.period)

        signal_vector = [None for i in range(len(prices))]

        for i in range(self.period, len(rsi_output)):
            if rsi_output[i] < 30:
                signal_vector[i] = Signal('buy')
            elif rsi_output[i] > 70:
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
