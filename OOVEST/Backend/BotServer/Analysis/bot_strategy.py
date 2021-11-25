from Log.log import BotLog
from Indicators import moving_average
from Util.trade import Trade


class BotStrategy(object):
    def __init__(self):
        self.output = BotLog()
        self.prices = []
        self.closes = []  # Needed for Momentum Indicator
        self.trades = []
        self.open_trades = []
        self.current_price = ""
        self.current_close = ""
        self.num_simul_trades = 1

    def tick(self, candlestick):
        self.current_price = float(candlestick.priceAverage)
        self.prices.append(self.current_price)

        self.output.log("Price: " + str(candlestick.priceAverage) + "\tMoving Average: " + str(
            moving_average.MovingAverage.moving_average(self.prices, 15)))

        self.evaluate_positions()
        self.tick_open_trades()
        self.show_positions()

    def evaluate_positions(self):
        self.update_open_trades()

        if len(self.open_trades) < self.num_simul_trades:

            if not moving_average.MovingAverage.moving_average(self.prices, 15):
                pass
            elif self.current_price < moving_average.MovingAverage.moving_average(self.prices, 15):
                self.trades.append(BotTrade(self.current_price, stop_loss=.0001))

        for trade in self.open_trades:
            if self.current_price > moving_average.MovingAverage.moving_average(self.prices, 15):
                trade.close(self.current_price)

    def update_open_trades(self):
        self.open_trades = []
        for trade in self.trades:
            if trade.status == "OPEN":
                self.open_trades.append(trade)

    def tick_open_trades(self):
        for trade in self.trades:
            if trade.status == "OPEN":
                trade.tick(self.current_price)

    def show_positions(self):
        for trade in self.trades:
            trade.show_trade()

    def get_trades(self):
        return self.trades
