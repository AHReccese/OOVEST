class StopLoss(object):
    def __init__(self, model, threshold, ban_days):
        self.model = model
        self.threshold = threshold
        self.ban_days = ban_days

    def check_stop_loss_crossing(self, price_variations):
        if self.model == 'normal':
            return self.check_normal_crossing(price_variations)

        if self.model == 'fibonacci':
            return self.check_fibonacci_crossing(price_variations)

        if self.model == 'res_sup':
            return self.check_res_sup_crossing(price_variations)

    def check_normal_crossing(self, price_variations):
        if price_variations[-1] < (100 - self.threshold) / 100 * max(price_variations):
            return True
        else:
            return False

    def check_fibonacci_crossing(self, price_variations):
        pass

    def check_res_sup_crossing(self):
        pass

    def get_model(self):
        return self.model

    def get_threshold(self):
        return self.threshold

    def get_ban_days(self):
        return self.ban_days
