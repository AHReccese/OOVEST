class Portfolio(object):
    def __init__(self):
        self.portfolio = {}
        self.inventory = 0

    def buy_coin(self, coin_name, amount):
        if coin_name in self.portfolio:
            self.portfolio[coin_name] += amount
        else:
            self.portfolio[coin_name] = amount

        return True

    def sell_coin(self, coin_name, amount):
        if coin_name not in self.portfolio:
            return False
        elif self.portfolio[coin_name] < amount:
            return False
        else:
            self.portfolio[coin_name] -= amount

    def remove_coin(self, coin_name):
        if coin_name in self.portfolio:
            del self.portfolio[coin_name]
            return True
        else:
            return False

    def increase_inventory(self, amount):
        self.inventory += amount
        return True

    def decrease_inventory(self, amount):
        if self.inventory < amount:
            return False
        else:
            self.inventory -= amount
            return True

    def get_coin_amount(self, coin_name):
        if coin_name in self.portfolio:
            return self.portfolio[coin_name]
        else:
            return None

    def get_current_inventory(self):
        return self.inventory

    def get_all_assets(self, market_prices):
        all_assets = 0
        for coin in self.portfolio:
            print("Port" + str(self.portfolio[coin]))
            print("market" + str(market_prices[coin]))
            all_assets += float(market_prices[coin]) * self.portfolio[coin]
        all_assets += self.inventory
        return all_assets
