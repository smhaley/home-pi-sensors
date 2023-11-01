class DataHandler:
    def __init__(self, connection_data, handleMeasure):
        self.io_location = connection_data
        self.handleMeasure = handleMeasure

    def getData(self):
        return self.handleMeasure(self.connection_data)
    
