import network
import time
from umqtt.simple import MQTTClient
import ubinascii
from machine import reset, unique_id, Pin
import json

class SensorToMQTTService:
  def __init__(self, mqtt_topic, secrets, reading_delay, data_handler):
    self.mqtt_topic = mqtt_topic
    self.secrets = secrets
    self.reading_delay = reading_delay
    self.data_handler = data_handler
    self.wlan = self.connect_wlan()
    self.mqtt_client = self.connect_mqtt()
    
  def connect_wlan(self):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(self.secrets.SSID, self.secrets.WIFI_PASSWORD)

    while wlan.isconnected() == False:
        print('waiting for connection')
        time.sleep(1)
    print('wifi connected')
    return wlan
  
  def connect_mqtt(self):
    mqtt_client_id = ubinascii.hexlify(unique_id())
    mqtt_client = MQTTClient(
            client_id=mqtt_client_id,
            server=self.secrets.MQTT_HOST,
            user=self.secrets.MQTT_USERNAME,
            password=self.secrets.MQTT_PASSWORD)
    try:
      mqtt_client.connect()
      print('mqtt broker connected')
      return mqtt_client
    except OSError as e:
      self.restart_and_reconnect()


  def restart_and_reconnect(self):
    print('Failed to connect to MQTT broker. Reconnecting...')
    time.sleep(10)
    reset()

  def main(self):
     try:
        led = Pin("LED", Pin.OUT)
        led.value(0)
        
        queue = []

        while True:
            payload = self.data_handler.getData()
            queue.append(payload)
              
            if self.wlan.isconnected():
                if led.value() == 0:
                    led.value(1)
                self.mqtt_client.publish(self.mqtt_topic, json.dumps({"topic": self.mqtt_topic, "data": queue, "reading_delay": self.reading_delay}))
                print(payload)
                queue = []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            else:
                led.value(0)
            time.sleep(self.reading_delay)
    
     except Exception as e:
        print(f'Failed to publish message: {e}')
        self.restart_and_reconnect()



