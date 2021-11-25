import time

from Log.log import BotLog


class BotCandlestick(object):
    def __init__(self, period=300, open_price=None, close_price=None, high_price=None, low_price=None,
                 price_average=None):
        self.current = None
        self.open = open_price
        self.close = close_price
        self.high = high_price
        self.low = low_price
        self.startTime = time.time()
        self.volume = None
        self.period = period
        self.output = BotLog()
        self.priceAverage = price_average

    def tick(self, price):
        self.current = float(price)
        if self.open is None:
            self.open = self.current

        if (self.high is None) or (self.current > self.high):
            self.high = self.current

        if (self.low is None) or (self.current < self.low):
            self.low = self.current

        if time.time() >= (self.startTime + self.period):
            self.close = self.current
            self.priceAverage = (self.high + self.low + self.close) / float(3)

        self.output.log(
            "Open: " + str(self.open) + " Close: " + str(self.close) + " High: " + str(self.high) + " Low: " + str(
                self.low) + " Current: " + str(self.current))

    def set_volume(self, volume):
        self.volume = volume

    def is_closed(self):
        if self.close is not None:
            return True
        else:
            return False
