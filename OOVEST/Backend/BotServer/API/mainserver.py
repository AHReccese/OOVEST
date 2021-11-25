import time

import requests


class MainServer(object):

    # backTest process.
    @staticmethod
    def get_backtest_candles(coin, fromTime, toTime):

        print(toTime)
        print("ALARM -> BackTest HISTORY.")
        url = 'http://localhost:1337/robot/getBackTestDataSet?coin=' + coin + '&candlesize=' + 'D' + \
              '&from=' + fromTime + '&to=' + toTime

        print("URL")
        print(url)
        r = requests.get(url)
        if r.status_code / 100 == 2:
            response = r.json()
            time = response['time']
            o = response['open']
            h = response['high']
            l = response['low']
            c = response['close']
            v = response['volume']

            output = []
            for i in range(len(time)):
                output.append([int(time[i] * 1000),
                               int(o[i]),
                               int(c[i]),
                               int(h[i]),
                               int(l[i]),
                               int(v[i])])
            return output

        else:
            print("getting OHLC failed.")
            print(r.json())  # todo prevent recursion
            return 'failed'
            # MainServer.get_backtest_candles(coin, fromTime, toTime)

    # realtime Process.
    @staticmethod
    def send_to_server(coin, current_balance, signals):

        lock = True
        while lock:
            url = 'http://localhost:1337/robot/sendSignals'
            output = {'signals': signals, 'balance': current_balance, 'coin': coin}

            response = requests.post(url, data=output)
            response = response.json()
            if not (response['status']):
                print("Failed")  # todo prevent recursion
                time.sleep(1)
                # MainServer.send_to_server(coin, current_balance, signals)
            else:
                lock = False

    @staticmethod
    def get_candle_history(coin, candle_size):

        lock = True
        while lock:
            print("ALARM -> OHLC HISTORY.")
            url = 'http://localhost:1337/robot/getOHLC?coin=' + coin + '&candlesize=' + candle_size

            r = requests.get(url)
            if r.status_code / 100 == 2:
                response = r.json()
                _time = response['time']
                o = response['open']
                h = response['high']
                l = response['low']
                c = response['close']
                v = response['volume']

                output = []
                for i in range(len(_time)):
                    output.append([int(_time[i] * 1000),
                                   int(o[i]),
                                   int(c[i]),
                                   int(h[i]),
                                   int(l[i]),
                                   int(v[i])])
                print(output)
                lock = False
                return output

            else:
                print(r.json())  # todo prevent recursion
                time.sleep(1)  # breath
                # MainServer.get_candle_history(coin, candle_size)

    @staticmethod
    def get_last_candle_volume(coin):

        lock = True
        while lock:
            url = 'http://localhost:1337/robot/getLastCandleVolume?coin=' + coin.upper()

            r = requests.get(url)
            if r.status_code / 100 == 2:
                response = r.json()
                lock = False
                return response['volume']
            else:
                print(r.json())  # todo prevent recursion
                time.sleep(1)  # breath
                # MainServer.get_last_candle_volume(coin)

    @staticmethod
    def get_nobitex_ticker(coin):

        lock = True
        while lock:
            r = requests.get('http://localhost:1337/robot/ticker?coin=' + coin)
            if r.status_code / 100 == 2:
                latest = r.json()['latest']
                print(latest)
                lock = False
                return latest
            else:
                print(r.json())  # todo prevent recursion
                time.sleep(1)  # breath
                # return MainServer.get_nobitex_ticker(coin)

    def __init__(self):
        pass

    @staticmethod
    def get_history(coin, candle_size):
        return MainServer.get_candle_history(coin, candle_size)

    @staticmethod
    def get_ticker(coin_name):
        return MainServer.get_nobitex_ticker(coin_name)
