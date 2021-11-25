from GUI.visualize_backtest import VisualizeBackTest
from Indicators.ao import AO
from Indicators.ichimoku import Ichimoku
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class SimpleIchimoku(object):
    def __init__(self, candle_length='1D', conversion_period=9, base_period=26, leading_span_b_period=52
                 , lagging_period=26):
        self.candle_length = candle_length
        self.conversion_period = conversion_period
        self.base_period = base_period
        self.leading_span_b_period = leading_span_b_period
        self.lagging_period = lagging_period
        self.ichimoku = Ichimoku()
        self.portfolio_manager = PortfolioManager()

    def analysis(self, candles):

        signal_vector = [None for i in range(len(candles))]

        conversion_line, base_line, leading_span_a, leading_span_b, lagging_span = \
            self.ichimoku.ichimoku(candles, self.conversion_period, self.base_period, self.leading_span_b_period
                                   , self.lagging_period)

        for i in range(self.leading_span_b_period, len(candles)):

            if candles[i][2] > leading_span_a[i] > leading_span_b[i]:

                if candles[i][2] > base_line[i] and candles[i - 1][2] < base_line[i - 1]:
                    signal_vector[i] = Signal('buy')
                elif conversion_line[i] > base_line[i] and conversion_line[i - 1] < base_line[i - 1]:
                    signal_vector[i] = Signal('buy')
                else:
                    signal_vector[i] = Signal('Nothing')

            elif candles[i][2] < leading_span_a[i] < leading_span_b[i]:

                if candles[i][2] < base_line[i] and candles[i - 1][2] > base_line[i - 1]:
                    signal_vector[i] = Signal('sell')
                elif conversion_line[i] < base_line[i] and conversion_line[i - 1] > base_line[i - 1]:
                    signal_vector[i] = Signal('sell')
                else:
                    signal_vector[i] = Signal('Nothing')

            else:
                signal_vector[i] = Signal('Nothing')

        print(signal_vector)

        return signal_vector

    def get_required_candle_numbers(self):
        return self.leading_span_b_period

    def get_candle_length(self):
        return self.candle_length

    def get_portfolio_manager(self):
        return self.portfolio_manager

