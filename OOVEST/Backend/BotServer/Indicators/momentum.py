class Momentum(object):
    def __init__(self):
        pass

    @staticmethod
    def momentum(data_points, period=14):
        if len(data_points) > period - 1:
            return data_points[-1] * 100 / data_points[-period]
