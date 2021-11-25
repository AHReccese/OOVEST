import threading
import time


class RepeatKernel(object):
    def __init__(self, robot):
        self.set_interval(robot.tick)

    @staticmethod
    def set_interval(func, sec=30):
        while True:
            time.sleep(sec)
            func()

        # def func_wrapper():
        #     self.set_interval(func, sec)
        #     func()
        #
        # t = threading.Timer(sec, func_wrapper)
        # t.start()
        # return t
