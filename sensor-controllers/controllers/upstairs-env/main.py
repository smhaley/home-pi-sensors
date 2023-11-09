from secrets import Secrets
import bme280
from machine import I2C, Pin
from data_handler import DataHandler
from sensor_to_mqtt_service import SensorToMQTTService


MQTT_TOPIC = 'upstairs_env'
READING_DELAY = 3

def get_bme280_measure(io_location):
    bme=bme280.BME280(i2c=io_location)
    vals=bme.values
    return {
       'temp': float(vals[0][:-1]),
       'pressure': float(vals[1][:-3]),
       'humidity': float(vals[2][:-1])
    }


if __name__ == '__main__':
    
    bme280_location = I2C(0, sda=Pin(0), scl=Pin(1), freq=40000)
    bme280_data_handler = DataHandler(bme280_location, get_bme280_measure)

    service = SensorToMQTTService(MQTT_TOPIC, Secrets, READING_DELAY, bme280_data_handler)
    service.main()

    
