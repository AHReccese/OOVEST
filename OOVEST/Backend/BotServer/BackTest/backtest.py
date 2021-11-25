from Analysis.backtest_strategy import BackTestStrategy


class BackTest(object):
    def __init__(self, coin_name, strategy='simple_macd'):
        self.coin_name = coin_name
        self.strategy = strategy

    def run(self, start_time, end_time, market):
        backtest_module = BackTestStrategy(self.strategy)

        return backtest_module.backtest(start_time, end_time, market, self.coin_name)


if __name__ == "__main__":
    main = BackTest("BTC")
