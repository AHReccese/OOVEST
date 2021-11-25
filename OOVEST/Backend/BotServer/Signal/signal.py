class Signal(object):

    strength_vector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Default']

    def __init__(self, signal_type, strength='Default'):
        if signal_type == 'buy':
            self.signal_type = 'buy'
        elif signal_type == 'sell':
            self.signal_type = 'sell'
        elif signal_type == 'hold':
            self.signal_type = 'hold'
        else:
            self.signal_type = 'Nothing'

        if strength in Signal.strength_vector:
            self.strength = strength
        else:
            self.strength = 'Default'

    def get_signal_type(self):
        return self.signal_type

    def get_strength(self):
        return self.strength
