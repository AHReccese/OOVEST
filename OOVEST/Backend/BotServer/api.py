from flask import Flask, request, abort, jsonify
import threading
from BackTest.backtest import BackTest
from GUI.repeatkernel import RepeatKernel
from Main.robot import Robot
import time

app = Flask(__name__)


@app.route('/getBackTestResult', methods=['POST'])
def get_back_test_result():
    if not request.json or 'from' not in request.json:
        abort(400)

    if not request.json or 'to' not in request.json:
        abort(400)

    if not request.json or 'coin' not in request.json:
        abort(400)

    _from = request.json['from']
    _fy, _fm, _fd = _from.split('-')

    _to = request.json['to']
    _ty, _tm, _td = _to.split('-')

    _coin = request.json['coin']
    backtest = BackTest(_coin, 'strategy_a1')
    output = backtest.run((int(_fy), int(_fm), int(_fd), 0, 0), (int(_ty), int(_tm), int(_td), 0, 0),
                          _coin.lower() + 'usd')

    return jsonify({"priceValue": output})


def live_bot_creator(coin):
    robot = Robot(coin.upper(), 'MARKET', 15, 10)
    RepeatKernel(robot)


@app.before_first_request
def initialize():
    print("Called only once, when the first request comes in")


if __name__ == '__main__':
    BTC = threading.Thread(target=live_bot_creator, args=('BTC',))
    BTC.start()

    time.sleep(5)  # avoid bursting.

    ETH = threading.Thread(target=live_bot_creator, args=('ETH',))
    ETH.start()

    app.run(host='localhost', port=8081, debug=True, use_reloader=False)

# todo(Solved) -> ask first ticker then OHLC candles are you sure?
