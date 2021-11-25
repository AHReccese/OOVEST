from Indicators.adx import ADX
from Indicators.ao import AO
from Indicators.cmf import CMF
from Indicators.ichimoku import Ichimoku
from Indicators.macd import MACD
from Indicators.rsi import RSI
from Indicators.stochastic import Stochastic
from Portfolio_Management.StopLoss_and_TakeProfit.stop_loss import StopLoss
from Portfolio_Management.portfolio_manager import PortfolioManager
from Signal.signal import Signal


class A1(object):
    def __init__(self, candle_length='1D'):
        self.candle_length = candle_length
        self.stochastic = Stochastic()
        self.portfolio_manager = PortfolioManager(stop_loss=StopLoss('normal', 80, 3))
        self.maximum_candle_longs = 52

    def analysis(self, candles):
        signal_vector = [None for i in range(len(candles))]

        cmf = CMF.cmf(candles)
        ao = AO.ao(candles)
        conversion_line, base_line, leading_span_a, leading_span_b, lagging_span = Ichimoku.ichimoku(candles)

        macd_line, signal_line, macd_histogram = MACD.macd(candles=candles)
        rsi = RSI.rsi(candles)
        full_k_percent, full_d_percent = Stochastic.stochastic(candles)
        _, _, adx = ADX.adx(candles)

        for i in range(self.maximum_candle_longs, len(candles)):
            if self.__initial_buying_check(cmf, ao, conversion_line, base_line, leading_span_a, leading_span_b,
                                           lagging_span, i):
                if self.__validation_buying_check(macd_line, signal_line, macd_histogram, rsi, full_k_percent,
                                                  full_d_percent, adx, i):
                    signal_vector[i] = Signal('buy')
                else:
                    signal_vector[i] = Signal('Nothing')

            elif self.__initial_selling_check(cmf, ao, conversion_line, base_line, leading_span_a, leading_span_b,
                                              lagging_span, i):
                if self.__validation_selling_check(macd_line, signal_line, macd_histogram, rsi, full_k_percent,
                                                   full_d_percent, adx, i):
                    signal_vector[i] = Signal('sell')
                else:
                    signal_vector[i] = Signal('Nothing')

            else:
                signal_vector[i] = Signal('Nothing')

        return signal_vector

    @staticmethod
    def __initial_buying_check(cmf, ao, conversion_line, base_line, leading_span_a, leading_span_b, lagging_span,
                               index):
        buying_signal = 0

        if A1.cmf_check(cmf, index) == 'buy':
            buying_signal += 1

        if A1.ichimoku_check(conversion_line, base_line, leading_span_a, leading_span_b, lagging_span, index) == 'buy':
            buying_signal += 1

        if A1.ao_check(ao, index) == 'buy':
            buying_signal += 1

        if buying_signal >= 2:
            return True
        else:
            return False

    @staticmethod
    def __validation_buying_check(macd_line, signal_line, macd_histogram, rsi, full_k_percent, full_d_percent, adx
                                  , index):
        buying_validation = 0

        if A1.macd_check(macd_line, signal_line, macd_histogram, index) == 'buy':
            buying_validation += 1

        if A1.rsi_check(rsi, index) == 'buy':
            buying_validation += 1

        if A1.stochastic_check(full_k_percent, full_d_percent, index) == 'buy':
            buying_validation += 1

        if A1.adx_check(adx, index) == 'Trending':
            buying_validation += 1

        if buying_validation >= 2:
            return True
        else:
            return False

    @staticmethod
    def __initial_selling_check(cmf, ao, conversion_line, base_line, leading_span_a, leading_span_b, lagging_span,
                                index):
        selling_signal = 0

        if A1.cmf_check(cmf, index) == 'sell':
            selling_signal += 1

        if A1.ichimoku_check(conversion_line, base_line, leading_span_a, leading_span_b, lagging_span, index) == 'sell':
            selling_signal += 1

        if A1.ao_check(ao, index) == 'sell':
            selling_signal += 1

        if selling_signal >= 2:
            return True
        else:
            return False

    @staticmethod
    def __validation_selling_check(macd_line, signal_line, macd_histogram, rsi, full_k_percent, full_d_percent, adx,
                                   index):
        selling_validation = 0

        if A1.macd_check(macd_line, signal_line, macd_histogram, index) == 'sell':
            selling_validation += 1

        if A1.rsi_check(rsi, index) == 'sell':
            selling_validation += 1

        if A1.stochastic_check(full_k_percent, full_d_percent, index) == 'sell':
            selling_validation += 1

        if A1.adx_check(adx, index) == 'Trending':
            selling_validation += 1

        if selling_validation >= 2:
            return True
        else:
            return False

    @staticmethod
    def ao_check(ao, index):
        starting_index = 0
        for i in range(index, 0, -1):
            if ao[i] * ao[i - 1] < 0:
                starting_index = i
                break

        max_value = max(list(map(abs, ao[starting_index: index + 1])))

        if ao[index] > 0 > ao[index - 1]:
            return 'buy'
        elif ao[index] > ao[index - 1] and abs(ao[index]) > max_value * 0.2:
            return 'buy'
        elif ao[index] < ao[index - 1] and abs(ao[index]) > max_value * 0.4:
            return 'sell'
        if ao[index] < 0 < ao[index - 1]:
            return 'sell'
        else:
            return 'Nothing'

    @staticmethod
    def ichimoku_check(conversion_line, base_line, leading_span_a, leading_span_b, lagging_span,
                       index):

        if abs(conversion_line[index] - conversion_line[index - 1]) < 0.02 * conversion_line[index]:
            conversion_flatness = True
        else:
            conversion_flatness = False

        if conversion_line[index] > conversion_line[index - 1]:
            return 'buy'
        elif conversion_flatness and base_line[index] > base_line[index - 1]:
            return 'sell'
        else:
            return 'Nothing'

    @staticmethod
    def cmf_check(cmf, index):
        if cmf[index] > cmf[index - 1]:
            return 'buy'
        elif cmf[index] < cmf[index - 1]:
            return 'sell'
        else:
            return 'Nothing'

    @staticmethod
    def rsi_check(rsi, index):
        if 40 > rsi[index] > rsi[index - 1] > 30:
            return 'buy'
        elif rsi[index] > 90:
            return 'sell'
        else:
            return 'Nothing'

    @staticmethod
    def macd_check(macd_line, signal_line, macd_histogram, index):
        if macd_line[index] > macd_line[index - 1] and signal_line[index] > signal_line[index - 1]:
            return 'buy'

        elif abs(macd_line[index]) < abs(macd_histogram[index]) and macd_line[index] > macd_line[index - 1]:
            return 'buy'

        elif macd_line[index] < macd_line[index - 1] and signal_line[index] < signal_line[index - 1]:
            return 'sell'

        else:
            return 'Nothing'

    @staticmethod
    def stochastic_check(full_k_percent, full_d_percent, index):
        if full_d_percent[index] > full_d_percent[index - 1] and full_k_percent[index] > full_k_percent[index - 1]:
            return 'buy'

        elif full_d_percent[index] < full_d_percent[index - 1] and full_k_percent[index] < full_k_percent[index - 1]:
            return 'sell'

        else:
            return 'Nothing'

    @staticmethod
    def adx_check(adx, index):
        if adx[index] > 25:
            return 'Trending'
        else:
            return 'Ranging'

    def get_required_candle_numbers(self):
        return self.maximum_candle_longs

    def get_prior_candle_count(self):
        return self.maximum_candle_longs

    def get_candle_length(self):
        return self.candle_length

    def get_portfolio_manager(self):
        return self.portfolio_manager
