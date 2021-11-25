from API.nobitex import Bitfinex
from GUI.visualize_backtest import VisualizeBackTest
from Portfolio_Management.Portfolio_Status.portfolio import Portfolio
from Strategies.Simples.simple_ao import SimpleAO
from Strategies.Simples.simple_cmf import SimpleCMF
from Strategies.Simples.simple_mfi import SimpleMFI
from Strategies.Simples.simple_stochastic import SimpleStochastic
from Strategies.Simples.simple_ichimoku import SimpleIchimoku
from Strategies.Simples.simple_mac import SimpleMAC
from Strategies.Simples.simple_macd import SimpleMACD
from Strategies.Simples.simple_rsi import SimpleRSI
from Strategies.Simples.simple_sma import SimpleSMA
from Strategies.strategy_a1 import A1


class SimpleSMI(object):
    pass


class BackTestStrategy(object):
    def __init__(self, strategy):
        self.strategy = strategy
        self.strategy_module = None
        self.candle_prior = None
        self.candle_length = None
        self.initialize()
        self.api = Bitfinex()
        self.coin = None

    def backtest(self, start_time, end_time, market, coin_name):

        self.coin = coin_name
        candles = self.__request_candles(start_time, end_time, market)
        if candles == 'failed':
            return 'failed'

        # candles.reverse()

        signal_vector = self.__sweep_whole_period(candles)

        portfolio_manager = self.strategy_module.get_portfolio_manager()
        portfolio = Portfolio()
        portfolio.increase_inventory(100)
        money_vector = self.__result_calculator(signal_vector, candles, portfolio, portfolio_manager, coin_name)

        # todo send to mainServer.
        return money_vector
        # VisualizeBackTest.visualize_money_vector(money_vector)

    def initialize(self):
        if self.strategy == 'simple_mac':
            self.strategy_module = SimpleMAC()
        elif self.strategy == 'simple_macd':
            self.strategy_module = SimpleMACD()
        elif self.strategy == 'simple_rsi':
            self.strategy_module = SimpleRSI()
        elif self.strategy == 'simple_sma':
            self.strategy_module = SimpleSMA()
        elif self.strategy == 'simple_ao':
            self.strategy_module = SimpleAO()
        elif self.strategy == 'simple_cmf':
            self.strategy_module = SimpleCMF()
        elif self.strategy == 'simple_ichimoku':
            self.strategy_module = SimpleIchimoku()
        elif self.strategy == 'simple_stochastic':
            self.strategy_module = SimpleStochastic()
        elif self.strategy == 'simple_mfi':
            self.strategy_module = SimpleMFI()
        elif self.strategy == 'strategy_a1':
            self.strategy_module = A1()

        self.candle_prior = self.strategy_module.get_prior_candle_count()
        self.candle_length = self.strategy_module.get_candle_length()

    def __request_candles(self, start_time, end_time, market):
        candles = self.api.request_candles(self.coin, market, start_time, end_time, self.candle_length,
                                           self.candle_prior)
        return candles

    def __sweep_whole_period(self, candles):
        signal_vector = self.strategy_module.analysis(candles)
        return signal_vector

    @staticmethod
    def __result_calculator(signal_vector, candles, portfolio, portfolio_manager, coin_name):
        close_prices = [candle[2] for candle in candles]
        money_vector = [None for i in range(len(signal_vector))]

        for i in range(len(signal_vector)):
            market_prices = {coin_name: close_prices[i]}
            total_assets = portfolio.get_all_assets(market_prices)
            portfolio_manager.manage(coin_name, candles[i], signal_vector[i], portfolio)
            money_vector[i] = total_assets

        # for i in range(1, len(money_vector)):
        #     percent_change = (close_prices[i] - close_prices[i-1]) / close_prices[i-1]
        #     new_percent = percent_change + 1/1000 + random.gauss(0, 1/1800)
        #     money_vector[i] = money_vector[i-1] * (1 + new_percent)

        return money_vector
