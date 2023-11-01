from secrets import Secrets
from machine import Pin
from sensor_to_mqtt_service import SensorToMQTTService
from data_handler import DataHandler
import ds18x20
from onewire import OneWire

MQTT_TOPIC = 'boiler_temp'
READING_DELAY = 3



def get_ds18x20_measure(sensor):
    ds_sensor = sensor['ds_sensor']
    rom = sensor['rom']
    
    reading = ds_sensor.read_temp(rom)
    ds_sensor.convert_temp()
    return {"temp": reading}


if __name__ == '__main__':
    
    ds_pin = Pin(16)
    ds_sensor = ds18x20.DS18X20(OneWire(ds_pin))
    roms = ds_sensor.scan()

    ds18x20_data_handler = DataHandler({'ds_sensor': ds_sensor, 'rom': roms[0]}, get_ds18x20_measure)

    service = SensorToMQTTService(MQTT_TOPIC, Secrets, READING_DELAY, ds18x20_data_handler)
    service.main()

    

