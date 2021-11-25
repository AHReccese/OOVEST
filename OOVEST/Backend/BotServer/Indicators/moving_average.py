class MovingAverage(object):
    def __init__(self):
        pass

    @staticmethod
    def moving_average(data_points, period):
        if len(data_points) > 1:
            return sum(data_points[-period:]) / float(len(data_points[-period:]))
