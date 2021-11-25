from Util.trade import Trade


class PortfolioManager(object):
    minimum_inventory_money = 1
    minimum_coin_amount = 0.00001

    def __init__(self, stop_loss=None, take_profit=None):
        self.stop_loss = stop_loss
        self.take_profit = take_profit
        self.active_trades = {}
        self.trades_history = []
        self.ban_days = {}

    def manage(self, coin_name, new_candle, new_signal, portfolio):
        if coin_name in self.ban_days:
            if self.ban_days[coin_name] > 0:
                self.ban_days[coin_name] -= 1
                return
            else:
                del self.ban_days[coin_name]

        market_prices = {coin_name: new_candle[2]}
        self.handler(new_signal, portfolio, coin_name, market_prices)

        if coin_name in self.active_trades:
            self.active_trades[coin_name].include_new_candle(new_candle[2])
            if self.stop_loss is not None:
                if self.stop_loss.check_stop_loss_crossing(self.active_trades[coin_name].get_price_variations()):
                    self.__empty_request(portfolio, coin_name, market_prices)
                    self.ban_days[coin_name] = self.stop_loss.get_ban_days()

    def handler(self, signal, portfolio, coin_name, market_prices):
        if signal is None:
            return

        if signal.get_signal_type() == 'buy':
            if portfolio.get_current_inventory() > PortfolioManager.minimum_inventory_money * 3:
                allocated_money = portfolio.get_current_inventory() - PortfolioManager.minimum_inventory_money
                self.__buying_request(portfolio, coin_name, allocated_money, market_prices)

        if signal.get_signal_type() == 'sell':
            if portfolio.get_coin_amount(coin_name) is not None:
                self.__empty_request(portfolio, coin_name, market_prices)

    def __buying_request(self, portfolio, coin_name, allocated_money, market_prices):
        buy_amount = allocated_money / market_prices[coin_name]
        if portfolio.decrease_inventory(allocated_money):
            portfolio.buy_coin(coin_name, buy_amount)

            if coin_name in self.active_trades:
                self.__update_trade(self.active_trades[coin_name], 'add', buy_amount, market_prices[coin_name])
            else:
                self.active_trades[coin_name] = Trade(coin_name, buy_amount, market_prices[coin_name])

            return True

        return False

    def __selling_request(self, portfolio, coin_name, amount, market_prices):
        if portfolio.sell_coin(coin_name, amount):
            portfolio.increase_inventory(portfolio.get_coin_amount(coin_name) * market_prices[coin_name])

            self.__update_trade(self.active_trades[coin_name], 'reduce', amount, market_prices[coin_name])

            return True
        return False

    @staticmethod
    def __empty_request(portfolio, coin_name, market_prices):
        if portfolio.get_coin_amount(coin_name) is not None:
            portfolio.increase_inventory(portfolio.get_coin_amount(coin_name) * market_prices[coin_name])
            portfolio.remove_coin(coin_name)
            return True
        return False

    def __update_trade(self, trade, direction, amount, price):
        if direction == 'add':
            trade.add(amount)
            return True

        elif direction == 'reduce':
            if trade.reduce(amount):
                return True
            return False

        elif direction == 'empty':
            trade.include_new_candle(price)
            trade.close(price)
            self.trades_history.append(trade)
            del self.active_trades[trade.get_coin_name()]
            return True

        elif direction == 'hold':
            return True

        else:
            return False
