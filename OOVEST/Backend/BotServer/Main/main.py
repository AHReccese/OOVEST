from BackTest.backtest import BackTest
from GUI.repeatkernel import RepeatKernel
from Main.robot import Robot


class Main(object):
    def __init__(self, coin_name):
        self.coin_name = coin_name

    def robot(self):
        robot = Robot('BTC', 'USDT_BTC', 15, 10) # todo not to edit -> #3600*24,3600
        RepeatKernel(robot)

    def backtest(self):
        backtest = BackTest(self.coin_name, 'strategy_a1')
        backtest.run((2020, 1, 29, 0, 0), (2021, 2, 10, 0, 0), 'btcusd') # todo add spit.


if __name__ == "__main__":
    main = Main("BTC")
    main.backtest()
