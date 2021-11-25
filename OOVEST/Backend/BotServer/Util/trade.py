from Log.log import BotLog


class Trade(object):
    def __init__(self, coin_name, entry_amount, entry_price):
        self.coin_name = coin_name
        self.status = "Open"
        self.amount = entry_amount
        self.entry_price = entry_price
        self.exit_price = None
        self.price_variations = [entry_price]
        self.profit = None

    def include_new_candle(self, close_price):
        self.price_variations.append(close_price)

    def close(self, exit_price):
        self.status = "Close"
        self.exit_price = exit_price
        self.profit = (self.exit_price / self.entry_price - 1) * 100

    def add(self, amount):
        self.amount += amount
        return True

    def reduce(self, amount):
        if self.amount < amount:
            return False
        else:
            self.amount -= amount
            return True

    def get_price_variations(self):
        return self.price_variations

    def get_coin_name(self):
        return self.coin_name
