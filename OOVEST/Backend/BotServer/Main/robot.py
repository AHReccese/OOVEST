from Util.candlestick import BotCandlestick
from Strategies.strategy_a1 import A1
from Strategies.Simples.simple_ao import SimpleAO
from Strategies.Simples.simple_ichimoku import SimpleIchimoku
from Strategies.Simples.simple_cmf import SimpleCMF
from Strategies.Simples.simple_macd import SimpleMACD
from Strategies.Simples.simple_mfi import SimpleMFI
from Strategies.Simples.simple_rsi import SimpleRSI
from Strategies.Simples.simple_stochastic import SimpleStochastic
from Strategies.Simples.simple_sma import SimpleSMA
from Portfolio_Management.Portfolio_Status.portfolio import Portfolio
from Signal.signal import Signal
import time
from API.mainserver import MainServer


class Robot(object):
    def __init__(self, coin_name, market, candle_length, ticker_interval):
        # self.chart = DataGetter("poloniex", market, ticker_interval, False)
        self.candle_length = candle_length
        self.current_price = MainServer.get_ticker(coin_name.lower())
        # print(self.current_price)
        self.portfolio = Portfolio()
        self.portfolio.increase_inventory(100)

        self.strategy_modules = {
            'strategy_a1': A1(),
            'simple_ao': SimpleAO(),
            'simple_ichimoku': SimpleIchimoku(),
            'simple_cmf': SimpleCMF(),
            'simple_macd': SimpleMACD(),
            'simple_mfi': SimpleMFI(),
            'simple_rsi': SimpleRSI(),
            'simple_stochastic': SimpleStochastic(),
            'simple_sma': SimpleSMA()
        }

        self.signals = {
            'strategy_a1': [],
            'simple_ao': [],
            'simple_ichimoku': [],
            'simple_cmf': [],
            'simple_macd': [],
            'simple_mfi': [],
            'simple_rsi': [],
            'simple_stochastic': [],
            'simple_sma': []
        }

        self.required_candles = self.strategy_modules['strategy_a1'].get_required_candle_numbers()
        self.portfolio_manager = self.strategy_modules['strategy_a1'].get_portfolio_manager()

        self.candlesticks = []
        self.money_vector = []
        self.developing_candlestick = BotCandlestick(period=self.candle_length)
        self.coin_name = coin_name
        self.get_history()

    def get_history(self):
        self.candlesticks = MainServer.get_history(self.coin_name, 'D')  # todo enhance.

    def tick(self):
        self.current_price = MainServer.get_ticker(self.coin_name.lower())
        self.developing_candlestick.tick(self.current_price)

        if self.developing_candlestick.is_closed():
            self.developing_candlestick.set_volume(MainServer.get_last_candle_volume(self.coin_name))
            current_candle = [time.time(),
                              self.developing_candlestick.open,
                              self.developing_candlestick.close,
                              self.developing_candlestick.high,
                              self.developing_candlestick.low,
                              self.developing_candlestick.volume
                              ]
            self.candlesticks.append(current_candle)

            if len(self.candlesticks) >= self.required_candles:
                for strategy in self.strategy_modules:
                    self.update_signal(strategy)

            else:
                for strategy in self.strategy_modules:
                    self.signals[strategy].append(Signal('Nothing'))

            self.manage_portfolio(self.signals['strategy_a1'][-1], current_candle, self.coin_name)

            self.developing_candlestick = BotCandlestick(period=self.candle_length)

            print(self.send_output_to_server())

    def manage_portfolio(self, signal, candle, coin_name):
        market_prices = {coin_name: self.get_current_price()}
        total_assets = self.portfolio.get_all_assets(market_prices)
        self.portfolio_manager.manage(coin_name, candle, signal, self.portfolio)
        self.money_vector.append(total_assets)

    def update_signal(self, strategy_name):
        new_signal = self.strategy_modules[strategy_name].analysis(
            self.candlesticks[-self.required_candles - 1:])

        self.signals[strategy_name].append(new_signal[-1])

    def get_current_price(self):
        return self.current_price

    def get_trades(self):
        return self.strategy.get_trades()

    def send_output_to_server(self):
        output = [None for i in range(9)]
        i = 0
        for strategy in self.signals:
            signal_vector = self.signals[strategy]
            current_signal = signal_vector[-1]
            if len(signal_vector) > 1:
                last_signal = signal_vector[-2]
            else:
                last_signal = None

            if current_signal.get_signal_type() == 'buy':
                if last_signal is not None and last_signal.get_signal_type() == 'buy':
                    output[i] = 2
                else:
                    output[i] = 1

            elif current_signal.get_signal_type() == 'sell':
                if last_signal is not None and last_signal.get_signal_type() == 'sell':
                    output[i] = -2
                else:
                    output[i] = -1

            else:
                output[i] = 0

            i += 1

        market_prices = {self.coin_name: self.get_current_price()}
        current_total_value = self.portfolio.get_all_assets(market_prices)
        MainServer.send_to_server(self.coin_name,current_total_value, output)
