import { useState, useEffect } from "react";
import "./App.css";
import {
  getAvgSensorDataAfter,
  getAvgSensorDataBetween,
} from "./services/sensor-data-service";
import {
  AvgUpstairsEnvData,
  AvgBoilerTempData,
  AvgBoilerTempDataResponse,
  AvgUpstairsEnvDataResponse,
} from "./types/sensor-data";
import { SensorTopics } from "./constants/sensor-topics";
import AppBar from "./components/AppBar";
import DateSelectForm from "./components/DateSelectForm";
import { Intervals } from "./constants/sensor-data-intervals";
import { Container, Alert, Stack } from "@mui/material";
import DualAxisLineGraph from "./components/DualAxisLineGraph";
import { buildTempGraph } from "./utils/graphs/builders/temp-graph";
import { buildUpstairsEnvGraph } from "./utils/graphs/builders/upstairs-env";
import { subDays } from "date-fns";

enum PaletteMode {
  DARK = "dark",
  LIGHT = "light",
}

const tempData = {
  boilerTempData: [
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:00:00.000Z",
      temp: "18.3650000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:05:00.000Z",
      temp: "18.3454545454545455",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:10:00.000Z",
      temp: "18.3229000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:15:00.000Z",
      temp: "18.3050505050505051",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:20:00.000Z",
      temp: "18.2912121212121212",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:25:00.000Z",
      temp: "18.2584000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:30:00.000Z",
      temp: "18.2287878787878788",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:35:00.000Z",
      temp: "18.1966000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:40:00.000Z",
      temp: "18.1705050505050505",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:45:00.000Z",
      temp: "18.1420000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:50:00.000Z",
      temp: "18.1086868686868687",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-02T23:55:00.000Z",
      temp: "18.0692929292929293",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:00:00.000Z",
      temp: "18.0414000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:05:00.000Z",
      temp: "17.9981818181818182",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:10:00.000Z",
      temp: "17.9694000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:15:00.000Z",
      temp: "17.9424242424242424",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:20:00.000Z",
      temp: "17.8987878787878788",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:25:00.000Z",
      temp: "17.8730000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:30:00.000Z",
      temp: "17.8355555555555556",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:35:00.000Z",
      temp: "17.7897000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:40:00.000Z",
      temp: "17.7596969696969697",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:45:00.000Z",
      temp: "17.7609090909090909",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:50:00.000Z",
      temp: "17.7914000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T00:55:00.000Z",
      temp: "17.8236363636363636",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:00:00.000Z",
      temp: "17.8747000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:05:00.000Z",
      temp: "17.9266666666666667",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:10:00.000Z",
      temp: "17.9700000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:15:00.000Z",
      temp: "17.9915151515151515",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:20:00.000Z",
      temp: "17.9957575757575758",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:25:00.000Z",
      temp: "18.0024000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:30:00.000Z",
      temp: "17.9981818181818182",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:35:00.000Z",
      temp: "17.9970000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:40:00.000Z",
      temp: "18.0000000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:45:00.000Z",
      temp: "18.0354545454545455",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:50:00.000Z",
      temp: "18.0692000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T01:55:00.000Z",
      temp: "18.0904040404040404",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:00:00.000Z",
      temp: "18.0908000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:05:00.000Z",
      temp: "18.0805050505050505",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:10:00.000Z",
      temp: "18.0713131313131313",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:15:00.000Z",
      temp: "18.0638000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:20:00.000Z",
      temp: "18.0484848484848485",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:25:00.000Z",
      temp: "18.0475000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:30:00.000Z",
      temp: "18.0639393939393939",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:35:00.000Z",
      temp: "18.0390000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:40:00.000Z",
      temp: "17.9836363636363636",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:45:00.000Z",
      temp: "20.1063636363636364",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:50:00.000Z",
      temp: "22.0486000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T02:55:00.000Z",
      temp: "22.0168686868686869",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:00:00.000Z",
      temp: "23.5259000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:05:00.000Z",
      temp: "24.9871717171717172",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:10:00.000Z",
      temp: "26.1576767676767677",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:15:00.000Z",
      temp: "26.9285000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:20:00.000Z",
      temp: "26.8395959595959596",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:25:00.000Z",
      temp: "26.4432000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:30:00.000Z",
      temp: "25.9448484848484848",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:35:00.000Z",
      temp: "25.4048484848484848",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:40:00.000Z",
      temp: "24.8273000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:45:00.000Z",
      temp: "24.0966666666666667",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:50:00.000Z",
      temp: "23.3680000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T03:55:00.000Z",
      temp: "22.7604040404040404",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:00:00.000Z",
      temp: "22.2082000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:05:00.000Z",
      temp: "21.7527272727272727",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:10:00.000Z",
      temp: "21.4220202020202020",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:15:00.000Z",
      temp: "21.0301000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:20:00.000Z",
      temp: "20.7502020202020202",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:25:00.000Z",
      temp: "20.4838000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:30:00.000Z",
      temp: "20.2433333333333333",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:35:00.000Z",
      temp: "20.0266666666666667",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:40:00.000Z",
      temp: "19.8318000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:45:00.000Z",
      temp: "19.6556565656565657",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T04:50:00.000Z",
      temp: "20.1523188405797101",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:20:00.000Z",
      temp: "28.6900000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:25:00.000Z",
      temp: "28.8865000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:30:00.000Z",
      temp: "28.5021212121212121",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:35:00.000Z",
      temp: "27.9050505050505051",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:40:00.000Z",
      temp: "27.0724000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:45:00.000Z",
      temp: "26.2368686868686869",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:50:00.000Z",
      temp: "25.4673000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T11:55:00.000Z",
      temp: "24.6721212121212121",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:00:00.000Z",
      temp: "23.9511111111111111",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:05:00.000Z",
      temp: "23.2747000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:10:00.000Z",
      temp: "22.8087878787878788",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:15:00.000Z",
      temp: "22.1086000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:20:00.000Z",
      temp: "21.5043434343434343",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:25:00.000Z",
      temp: "21.5102000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:30:00.000Z",
      temp: "21.6833333333333333",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:35:00.000Z",
      temp: "21.5086868686868687",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:40:00.000Z",
      temp: "21.3064000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:45:00.000Z",
      temp: "21.0896969696969697",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:50:00.000Z",
      temp: "20.9646000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T12:55:00.000Z",
      temp: "20.8395959595959596",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:00:00.000Z",
      temp: "20.6679797979797980",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:05:00.000Z",
      temp: "20.4458000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:10:00.000Z",
      temp: "20.2606060606060606",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:15:00.000Z",
      temp: "20.0868000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:20:00.000Z",
      temp: "19.9206060606060606",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:25:00.000Z",
      temp: "19.8027272727272727",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:30:00.000Z",
      temp: "19.6858000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:35:00.000Z",
      temp: "19.5918181818181818",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:40:00.000Z",
      temp: "19.5304000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:45:00.000Z",
      temp: "19.3877777777777778",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:50:00.000Z",
      temp: "19.3007000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T13:55:00.000Z",
      temp: "19.2075757575757576",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:00:00.000Z",
      temp: "19.1225252525252525",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:05:00.000Z",
      temp: "19.1020000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:10:00.000Z",
      temp: "19.0701010101010101",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:15:00.000Z",
      temp: "19.0516000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:20:00.000Z",
      temp: "19.0616161616161616",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:25:00.000Z",
      temp: "19.0179797979797980",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:30:00.000Z",
      temp: "18.8781000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:35:00.000Z",
      temp: "18.7778787878787879",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:40:00.000Z",
      temp: "18.8036000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:45:00.000Z",
      temp: "18.7989898989898990",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:50:00.000Z",
      temp: "18.8723232323232323",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T14:55:00.000Z",
      temp: "18.9262000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:00:00.000Z",
      temp: "18.9084848484848485",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:05:00.000Z",
      temp: "18.8443000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:10:00.000Z",
      temp: "18.7909090909090909",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:15:00.000Z",
      temp: "18.7494000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:20:00.000Z",
      temp: "18.7190909090909091",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:25:00.000Z",
      temp: "18.7518181818181818",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:30:00.000Z",
      temp: "18.7446000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:35:00.000Z",
      temp: "18.7615151515151515",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:40:00.000Z",
      temp: "18.6882000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:45:00.000Z",
      temp: "18.6863636363636364",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:50:00.000Z",
      temp: "18.7263636363636364",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T15:55:00.000Z",
      temp: "18.6490000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:00:00.000Z",
      temp: "18.5670707070707071",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:05:00.000Z",
      temp: "18.5210000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:10:00.000Z",
      temp: "18.5157575757575758",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:15:00.000Z",
      temp: "18.5133333333333333",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:20:00.000Z",
      temp: "18.5108000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:25:00.000Z",
      temp: "18.5163636363636364",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:30:00.000Z",
      temp: "18.4934000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:35:00.000Z",
      temp: "18.4624242424242424",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:40:00.000Z",
      temp: "18.4148000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:45:00.000Z",
      temp: "18.3503030303030303",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:50:00.000Z",
      temp: "18.3552525252525253",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T16:55:00.000Z",
      temp: "18.3191000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:00:00.000Z",
      temp: "18.3248484848484848",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:05:00.000Z",
      temp: "18.3625000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:10:00.000Z",
      temp: "18.3622222222222222",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:15:00.000Z",
      temp: "18.3436000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:20:00.000Z",
      temp: "18.3510101010101010",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:25:00.000Z",
      temp: "18.3706060606060606",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:30:00.000Z",
      temp: "18.3841000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:35:00.000Z",
      temp: "18.3963636363636364",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:40:00.000Z",
      temp: "18.4106000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:45:00.000Z",
      temp: "18.4157575757575758",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:50:00.000Z",
      temp: "18.4381818181818182",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T17:55:00.000Z",
      temp: "18.4862000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:00:00.000Z",
      temp: "18.4854545454545455",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:05:00.000Z",
      temp: "18.5360000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:10:00.000Z",
      temp: "18.5660606060606061",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:15:00.000Z",
      temp: "18.5798989898989899",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:20:00.000Z",
      temp: "18.5915000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:25:00.000Z",
      temp: "18.5420202020202020",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:30:00.000Z",
      temp: "18.5252000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:35:00.000Z",
      temp: "18.5272727272727273",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:40:00.000Z",
      temp: "18.4586000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:45:00.000Z",
      temp: "18.4315151515151515",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:50:00.000Z",
      temp: "18.4224242424242424",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T18:55:00.000Z",
      temp: "18.4166000000000000",
    },
    {
      topic: "boiler_temp",
      interval_beginning: "2023-11-03T19:00:00.000Z",
      temp: "18.4091666666666667",
    },
  ],
  upstairsEnvData: [
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:00:00.000Z",
      temp: "19.0977777777777778",
      pressure: "1018.2518518518518519",
      humidity: "47.9692592592592593",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:05:00.000Z",
      temp: "19.0712121212121212",
      pressure: "1018.2911111111111111",
      humidity: "47.7079797979797980",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:10:00.000Z",
      temp: "19.0370408163265306",
      pressure: "1018.2643877551020408",
      humidity: "47.3437755102040816",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:15:00.000Z",
      temp: "19.0054545454545455",
      pressure: "1018.2276767676767677",
      humidity: "47.1978787878787879",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:20:00.000Z",
      temp: "18.9463636363636364",
      pressure: "1018.2641414141414141",
      humidity: "46.8736363636363636",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:25:00.000Z",
      temp: "18.8973469387755102",
      pressure: "1018.3446938775510204",
      humidity: "46.6036734693877551",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:30:00.000Z",
      temp: "18.8188888888888889",
      pressure: "1018.3665656565656566",
      humidity: "46.4044444444444444",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:35:00.000Z",
      temp: "18.7468686868686869",
      pressure: "1018.3835353535353535",
      humidity: "46.4323232323232323",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:40:00.000Z",
      temp: "18.6677551020408163",
      pressure: "1018.4285714285714286",
      humidity: "46.6056122448979592",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:45:00.000Z",
      temp: "18.6052525252525253",
      pressure: "1018.4511111111111111",
      humidity: "46.6834343434343434",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:50:00.000Z",
      temp: "18.5614285714285714",
      pressure: "1018.5148979591836735",
      humidity: "46.6196938775510204",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-02T23:55:00.000Z",
      temp: "18.5214141414141414",
      pressure: "1018.5642424242424242",
      humidity: "46.5693939393939394",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:00:00.000Z",
      temp: "18.4753535353535354",
      pressure: "1018.6019191919191919",
      humidity: "46.6492929292929293",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:05:00.000Z",
      temp: "18.4384693877551020",
      pressure: "1018.6251020408163265",
      humidity: "46.6886734693877551",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:10:00.000Z",
      temp: "18.4160606060606061",
      pressure: "1018.6364646464646465",
      humidity: "46.8809090909090909",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:15:00.000Z",
      temp: "18.3757575757575758",
      pressure: "1018.6649494949494949",
      humidity: "47.0050505050505051",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:20:00.000Z",
      temp: "18.3229591836734694",
      pressure: "1018.6710204081632653",
      humidity: "46.9120408163265306",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:25:00.000Z",
      temp: "18.2772727272727273",
      pressure: "1018.6505050505050505",
      humidity: "46.8000000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:30:00.000Z",
      temp: "18.2009183673469388",
      pressure: "1018.6756122448979592",
      humidity: "46.6487755102040816",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:35:00.000Z",
      temp: "18.1473737373737374",
      pressure: "1018.6825252525252525",
      humidity: "46.5784848484848485",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:40:00.000Z",
      temp: "18.1109090909090909",
      pressure: "1018.7246464646464646",
      humidity: "46.4260606060606061",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:45:00.000Z",
      temp: "18.1813265306122449",
      pressure: "1018.7576530612244898",
      humidity: "46.2900000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:50:00.000Z",
      temp: "18.2369696969696970",
      pressure: "1018.7793939393939394",
      humidity: "46.0046464646464646",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T00:55:00.000Z",
      temp: "18.2828282828282828",
      pressure: "1018.7584848484848485",
      humidity: "45.7077777777777778",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:00:00.000Z",
      temp: "18.3397959183673469",
      pressure: "1018.7656122448979592",
      humidity: "45.5048979591836735",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:05:00.000Z",
      temp: "18.3982828282828283",
      pressure: "1018.7689898989898990",
      humidity: "45.3011111111111111",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:10:00.000Z",
      temp: "18.4570707070707071",
      pressure: "1018.7957575757575758",
      humidity: "45.0962626262626263",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:15:00.000Z",
      temp: "18.5112244897959184",
      pressure: "1018.8138775510204082",
      humidity: "44.8933673469387755",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:20:00.000Z",
      temp: "18.5460606060606061",
      pressure: "1018.8091919191919192",
      humidity: "44.6186868686868687",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:25:00.000Z",
      temp: "18.5565656565656566",
      pressure: "1018.8290909090909091",
      humidity: "44.4704040404040404",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:30:00.000Z",
      temp: "18.5602040816326531",
      pressure: "1018.8744897959183673",
      humidity: "44.4073469387755102",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:35:00.000Z",
      temp: "18.5558585858585859",
      pressure: "1018.8952525252525253",
      humidity: "44.2773737373737374",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:40:00.000Z",
      temp: "18.6077777777777778",
      pressure: "1018.8975757575757576",
      humidity: "44.7586868686868687",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:45:00.000Z",
      temp: "18.7743877551020408",
      pressure: "1018.8527551020408163",
      humidity: "44.6950000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:50:00.000Z",
      temp: "18.9027272727272727",
      pressure: "1018.8276767676767677",
      humidity: "44.9116161616161616",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T01:55:00.000Z",
      temp: "19.0444897959183673",
      pressure: "1018.8064285714285714",
      humidity: "46.8335714285714286",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:00:00.000Z",
      temp: "19.1105050505050505",
      pressure: "1018.7937373737373737",
      humidity: "45.5347474747474747",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:05:00.000Z",
      temp: "19.2245454545454545",
      pressure: "1018.7549494949494949",
      humidity: "44.0817171717171717",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:10:00.000Z",
      temp: "19.3332653061224490",
      pressure: "1018.7395918367346939",
      humidity: "43.7474489795918367",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:15:00.000Z",
      temp: "19.3729292929292929",
      pressure: "1018.7356565656565657",
      humidity: "43.8237373737373737",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:20:00.000Z",
      temp: "19.3007070707070707",
      pressure: "1018.7640404040404040",
      humidity: "44.0990909090909091",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:25:00.000Z",
      temp: "19.2593877551020408",
      pressure: "1018.8872448979591837",
      humidity: "43.9493877551020408",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:30:00.000Z",
      temp: "19.2866666666666667",
      pressure: "1018.9474747474747475",
      humidity: "43.5756565656565657",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:35:00.000Z",
      temp: "19.2506060606060606",
      pressure: "1018.9567676767676768",
      humidity: "43.4653535353535354",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:40:00.000Z",
      temp: "18.9942857142857143",
      pressure: "1018.9389795918367347",
      humidity: "43.8119387755102041",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:45:00.000Z",
      temp: "19.0686868686868687",
      pressure: "1018.9410101010101010",
      humidity: "43.6128282828282828",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:50:00.000Z",
      temp: "19.0356122448979592",
      pressure: "1018.9805102040816327",
      humidity: "44.0374489795918367",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T02:55:00.000Z",
      temp: "19.0174747474747475",
      pressure: "1019.0058585858585859",
      humidity: "43.9432323232323232",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:00:00.000Z",
      temp: "19.0797979797979798",
      pressure: "1018.9962626262626263",
      humidity: "44.1297979797979798",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:05:00.000Z",
      temp: "19.2397959183673469",
      pressure: "1018.9790816326530612",
      humidity: "44.2133673469387755",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:10:00.000Z",
      temp: "19.3675757575757576",
      pressure: "1018.9875757575757576",
      humidity: "44.2940404040404040",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:15:00.000Z",
      temp: "19.4917171717171717",
      pressure: "1019.0143434343434343",
      humidity: "44.1252525252525253",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:20:00.000Z",
      temp: "19.6227551020408163",
      pressure: "1019.0589795918367347",
      humidity: "44.1550000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:25:00.000Z",
      temp: "19.6954545454545455",
      pressure: "1019.0217171717171717",
      humidity: "43.4192929292929293",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:30:00.000Z",
      temp: "19.7719191919191919",
      pressure: "1018.9006060606060606",
      humidity: "42.4945454545454545",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:35:00.000Z",
      temp: "19.8723469387755102",
      pressure: "1018.8745918367346939",
      humidity: "42.2639795918367347",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:40:00.000Z",
      temp: "19.8607070707070707",
      pressure: "1018.8689898989898990",
      humidity: "42.0775757575757576",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:45:00.000Z",
      temp: "19.8685858585858586",
      pressure: "1018.8989898989898990",
      humidity: "42.7644444444444444",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:50:00.000Z",
      temp: "19.8491836734693878",
      pressure: "1018.9160204081632653",
      humidity: "43.3131632653061224",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T03:55:00.000Z",
      temp: "19.8155555555555556",
      pressure: "1018.9060606060606061",
      humidity: "43.0339393939393939",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:00:00.000Z",
      temp: "19.7894949494949495",
      pressure: "1018.8800000000000000",
      humidity: "42.8373737373737374",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:05:00.000Z",
      temp: "19.7853061224489796",
      pressure: "1018.9286734693877551",
      humidity: "43.0725510204081633",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:10:00.000Z",
      temp: "19.6582828282828283",
      pressure: "1018.8757575757575758",
      humidity: "42.6798989898989899",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:15:00.000Z",
      temp: "19.6030612244897959",
      pressure: "1018.8486734693877551",
      humidity: "43.5016326530612245",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:20:00.000Z",
      temp: "19.5809090909090909",
      pressure: "1018.8684848484848485",
      humidity: "43.1957575757575758",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:25:00.000Z",
      temp: "19.5777777777777778",
      pressure: "1018.8910101010101010",
      humidity: "42.8458585858585859",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:30:00.000Z",
      temp: "19.5136734693877551",
      pressure: "1018.9263265306122449",
      humidity: "42.5018367346938776",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:35:00.000Z",
      temp: "19.3278787878787879",
      pressure: "1018.9220202020202020",
      humidity: "42.0575757575757576",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:40:00.000Z",
      temp: "19.1492929292929293",
      pressure: "1018.9214141414141414",
      humidity: "42.2483838383838384",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:45:00.000Z",
      temp: "19.0134693877551020",
      pressure: "1018.9958163265306122",
      humidity: "42.3586734693877551",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T04:50:00.000Z",
      temp: "18.9357352941176471",
      pressure: "1018.9944117647058824",
      humidity: "42.4129411764705882",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:20:00.000Z",
      temp: "18.6400000000000000",
      pressure: "946.1300000000000000",
      humidity: "47.7100000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:25:00.000Z",
      temp: "17.9122222222222222",
      pressure: "1018.9403030303030303",
      humidity: "42.2280808080808081",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:30:00.000Z",
      temp: "18.1137373737373737",
      pressure: "1018.9700000000000000",
      humidity: "42.0355555555555556",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:35:00.000Z",
      temp: "18.3606122448979592",
      pressure: "1018.9235714285714286",
      humidity: "41.7067346938775510",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:40:00.000Z",
      temp: "18.5734343434343434",
      pressure: "1018.9107070707070707",
      humidity: "41.3761616161616162",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:45:00.000Z",
      temp: "18.7353061224489796",
      pressure: "1018.8788775510204082",
      humidity: "41.3380612244897959",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:50:00.000Z",
      temp: "18.8572727272727273",
      pressure: "1018.8304040404040404",
      humidity: "41.3143434343434343",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T11:55:00.000Z",
      temp: "18.9412121212121212",
      pressure: "1018.8600000000000000",
      humidity: "41.1234343434343434",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:00:00.000Z",
      temp: "19.0133673469387755",
      pressure: "1018.8731632653061224",
      humidity: "41.3761224489795918",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:05:00.000Z",
      temp: "19.0716666666666667",
      pressure: "1015.0767708333333333",
      humidity: "41.5920833333333333",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:10:00.000Z",
      temp: "19.0932323232323232",
      pressure: "1018.8865656565656566",
      humidity: "41.4947474747474747",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:15:00.000Z",
      temp: "19.0543877551020408",
      pressure: "1018.9652040816326531",
      humidity: "41.8435714285714286",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:20:00.000Z",
      temp: "19.0049494949494949",
      pressure: "1019.0055555555555556",
      humidity: "41.9952525252525253",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:25:00.000Z",
      temp: "18.9677777777777778",
      pressure: "1018.9901010101010101",
      humidity: "42.0874747474747475",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:30:00.000Z",
      temp: "18.9804081632653061",
      pressure: "1019.0221428571428571",
      humidity: "42.5737755102040816",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:35:00.000Z",
      temp: "19.0513131313131313",
      pressure: "1019.0373737373737374",
      humidity: "43.1786868686868687",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:40:00.000Z",
      temp: "19.0825252525252525",
      pressure: "1018.8964646464646465",
      humidity: "43.1528282828282828",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:45:00.000Z",
      temp: "19.1689795918367347",
      pressure: "1018.8085714285714286",
      humidity: "43.0057142857142857",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:50:00.000Z",
      temp: "19.3464646464646465",
      pressure: "1018.7858585858585859",
      humidity: "42.4386868686868687",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T12:55:00.000Z",
      temp: "19.5706060606060606",
      pressure: "1018.7750505050505051",
      humidity: "42.1462626262626263",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:00:00.000Z",
      temp: "19.6375510204081633",
      pressure: "1018.7758163265306122",
      humidity: "41.9861224489795918",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:05:00.000Z",
      temp: "19.7771717171717172",
      pressure: "1018.7436363636363636",
      humidity: "42.0776767676767677",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:10:00.000Z",
      temp: "20.2043877551020408",
      pressure: "1018.6992857142857143",
      humidity: "41.2124489795918367",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:15:00.000Z",
      temp: "20.4154545454545455",
      pressure: "1018.6594949494949495",
      humidity: "41.0900000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:20:00.000Z",
      temp: "20.4412121212121212",
      pressure: "1018.6391919191919192",
      humidity: "40.8000000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:25:00.000Z",
      temp: "20.3433673469387755",
      pressure: "1018.6007142857142857",
      humidity: "40.9268367346938776",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:30:00.000Z",
      temp: "20.1908080808080808",
      pressure: "1018.4945454545454545",
      humidity: "41.0536363636363636",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:35:00.000Z",
      temp: "20.2163636363636364",
      pressure: "1018.4465656565656566",
      humidity: "41.0144444444444444",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:40:00.000Z",
      temp: "20.3463265306122449",
      pressure: "1018.4346938775510204",
      humidity: "41.2550000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:45:00.000Z",
      temp: "20.5258585858585859",
      pressure: "1018.4428282828282828",
      humidity: "41.2887878787878788",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:50:00.000Z",
      temp: "20.3544444444444444",
      pressure: "1018.4571717171717172",
      humidity: "41.5682828282828283",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T13:55:00.000Z",
      temp: "20.1621428571428571",
      pressure: "1018.4598979591836735",
      humidity: "41.6118367346938776",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:00:00.000Z",
      temp: "20.1058585858585859",
      pressure: "1018.4475757575757576",
      humidity: "41.4756565656565657",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:05:00.000Z",
      temp: "20.0634343434343434",
      pressure: "1018.4896969696969697",
      humidity: "41.3592929292929293",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:10:00.000Z",
      temp: "20.0489795918367347",
      pressure: "1018.4834693877551020",
      humidity: "41.1990816326530612",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:15:00.000Z",
      temp: "20.0448484848484848",
      pressure: "1018.4291919191919192",
      humidity: "41.1052525252525253",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:20:00.000Z",
      temp: "20.0552525252525253",
      pressure: "1018.4539393939393939",
      humidity: "41.2480808080808081",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:25:00.000Z",
      temp: "20.0638775510204082",
      pressure: "1018.3444897959183673",
      humidity: "41.5530612244897959",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:30:00.000Z",
      temp: "20.0635353535353535",
      pressure: "1018.2716161616161616",
      humidity: "41.7945454545454545",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:35:00.000Z",
      temp: "20.0872448979591837",
      pressure: "1018.2292857142857143",
      humidity: "42.4280612244897959",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:40:00.000Z",
      temp: "20.0575757575757576",
      pressure: "1018.2171717171717172",
      humidity: "42.8717171717171717",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:45:00.000Z",
      temp: "20.0312121212121212",
      pressure: "1018.1168686868686869",
      humidity: "43.1317171717171717",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:50:00.000Z",
      temp: "20.0293877551020408",
      pressure: "1018.0441836734693878",
      humidity: "43.2239795918367347",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T14:55:00.000Z",
      temp: "19.9977777777777778",
      pressure: "1018.0215151515151515",
      humidity: "43.2118181818181818",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:00:00.000Z",
      temp: "19.9625252525252525",
      pressure: "1017.9925252525252525",
      humidity: "43.7215151515151515",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:05:00.000Z",
      temp: "19.9163265306122449",
      pressure: "1017.9820408163265306",
      humidity: "43.8322448979591837",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:10:00.000Z",
      temp: "19.8925252525252525",
      pressure: "1017.8945454545454545",
      humidity: "43.9030303030303030",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:15:00.000Z",
      temp: "19.8693877551020408",
      pressure: "1017.7811224489795918",
      humidity: "43.9959183673469388",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:20:00.000Z",
      temp: "19.9094949494949495",
      pressure: "1017.7457575757575758",
      humidity: "43.8980808080808081",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:25:00.000Z",
      temp: "20.0603030303030303",
      pressure: "1017.6284848484848485",
      humidity: "45.6014141414141414",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:30:00.000Z",
      temp: "20.2879591836734694",
      pressure: "1017.5428571428571429",
      humidity: "46.0910204081632653",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:35:00.000Z",
      temp: "20.3702020202020202",
      pressure: "1017.4310101010101010",
      humidity: "44.8923232323232323",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:40:00.000Z",
      temp: "20.6544444444444444",
      pressure: "1017.2355555555555556",
      humidity: "45.1914141414141414",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:45:00.000Z",
      temp: "20.7513265306122449",
      pressure: "1017.1594897959183673",
      humidity: "44.6544897959183673",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:50:00.000Z",
      temp: "20.5990909090909091",
      pressure: "1017.0792929292929293",
      humidity: "43.6496969696969697",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T15:55:00.000Z",
      temp: "20.3870707070707071",
      pressure: "1017.0575757575757576",
      humidity: "42.8274747474747475",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:00:00.000Z",
      temp: "20.2884693877551020",
      pressure: "1017.0308163265306122",
      humidity: "42.4917346938775510",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:05:00.000Z",
      temp: "20.2337373737373737",
      pressure: "1016.8998989898989899",
      humidity: "42.7890909090909091",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:10:00.000Z",
      temp: "20.1995959595959596",
      pressure: "1016.8321212121212121",
      humidity: "43.3132323232323232",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:15:00.000Z",
      temp: "20.1940816326530612",
      pressure: "1016.6955102040816327",
      humidity: "43.4745918367346939",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:20:00.000Z",
      temp: "20.1777777777777778",
      pressure: "1016.5529292929292929",
      humidity: "43.5797979797979798",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:25:00.000Z",
      temp: "20.1546464646464646",
      pressure: "1016.5016161616161616",
      humidity: "43.6406060606060606",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:30:00.000Z",
      temp: "20.1300000000000000",
      pressure: "1016.4978571428571429",
      humidity: "43.6360204081632653",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:35:00.000Z",
      temp: "20.0919191919191919",
      pressure: "1016.4740404040404040",
      humidity: "43.6743434343434343",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:40:00.000Z",
      temp: "20.0639795918367347",
      pressure: "1016.4028571428571429",
      humidity: "43.7300000000000000",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:45:00.000Z",
      temp: "20.0219191919191919",
      pressure: "1016.2588888888888889",
      humidity: "43.7406060606060606",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:50:00.000Z",
      temp: "19.9794949494949495",
      pressure: "1016.1176767676767677",
      humidity: "43.9226262626262626",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T16:55:00.000Z",
      temp: "19.9316326530612245",
      pressure: "1016.0932653061224490",
      humidity: "43.9870408163265306",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:00:00.000Z",
      temp: "19.9207070707070707",
      pressure: "1016.0532323232323232",
      humidity: "43.9723232323232323",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:05:00.000Z",
      temp: "19.9431313131313131",
      pressure: "1015.9139393939393939",
      humidity: "43.4032323232323232",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:10:00.000Z",
      temp: "19.9793877551020408",
      pressure: "1015.8018367346938776",
      humidity: "43.3096938775510204",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:15:00.000Z",
      temp: "20.0141414141414141",
      pressure: "1015.6549494949494949",
      humidity: "43.7969696969696970",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:20:00.000Z",
      temp: "20.0842857142857143",
      pressure: "1015.4916326530612245",
      humidity: "43.8309183673469388",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:25:00.000Z",
      temp: "20.1065656565656566",
      pressure: "1015.4280808080808081",
      humidity: "43.9687878787878788",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:30:00.000Z",
      temp: "20.1841414141414141",
      pressure: "1015.3474747474747475",
      humidity: "43.9531313131313131",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:35:00.000Z",
      temp: "20.2006122448979592",
      pressure: "1015.2746938775510204",
      humidity: "44.5486734693877551",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:40:00.000Z",
      temp: "20.3580808080808081",
      pressure: "1015.0902020202020202",
      humidity: "45.3596969696969697",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:45:00.000Z",
      temp: "20.4995959595959596",
      pressure: "1014.9738383838383838",
      humidity: "45.5237373737373737",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:50:00.000Z",
      temp: "20.6185714285714286",
      pressure: "1014.8081632653061224",
      humidity: "44.5513265306122449",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T17:55:00.000Z",
      temp: "20.7125252525252525",
      pressure: "1014.6560606060606061",
      humidity: "44.8134343434343434",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:00:00.000Z",
      temp: "20.7967676767676768",
      pressure: "1014.5605050505050505",
      humidity: "44.1959595959595960",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:05:00.000Z",
      temp: "20.8135714285714286",
      pressure: "1014.5171428571428571",
      humidity: "44.0704081632653061",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:10:00.000Z",
      temp: "20.8820202020202020",
      pressure: "1014.4658585858585859",
      humidity: "43.7354545454545455",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:15:00.000Z",
      temp: "21.0000000000000000",
      pressure: "1014.3527272727272727",
      humidity: "43.4819191919191919",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:20:00.000Z",
      temp: "21.0072448979591837",
      pressure: "1014.3130612244897959",
      humidity: "43.1858163265306122",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:25:00.000Z",
      temp: "21.0340404040404040",
      pressure: "1014.2504040404040404",
      humidity: "43.2874747474747475",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:30:00.000Z",
      temp: "21.0539393939393939",
      pressure: "1014.1411111111111111",
      humidity: "43.2129292929292929",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:35:00.000Z",
      temp: "21.0794897959183673",
      pressure: "1014.0780612244897959",
      humidity: "42.5728571428571429",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:40:00.000Z",
      temp: "20.9608080808080808",
      pressure: "1014.0583838383838384",
      humidity: "42.6376767676767677",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:45:00.000Z",
      temp: "20.7995918367346939",
      pressure: "1014.0079591836734694",
      humidity: "43.0390816326530612",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:50:00.000Z",
      temp: "20.7567676767676768",
      pressure: "1013.9443434343434343",
      humidity: "43.4487878787878788",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T18:55:00.000Z",
      temp: "20.7626262626262626",
      pressure: "1013.8691919191919192",
      humidity: "42.3351515151515152",
    },
    {
      topic: "upstairs_env",
      interval_beginning: "2023-11-03T19:00:00.000Z",
      temp: "20.7187323943661972",
      pressure: "1013.8108450704225352",
      humidity: "42.7363380281690141",
    },
  ],
};

export default function App() {
  // const [mode, setMode] = React.useState<PaletteMode>("light");
  const [upstairsEnvData, setUpstairsEnvData] = useState<AvgUpstairsEnvData[]>(
    []
  );
  const [boilerTempData, setBoilerTempData] = useState<AvgBoilerTempData[]>([]);
  const showAlert =
    boilerTempData.length >= 1000 || upstairsEnvData.length >= 1000;

  console.log({ boilerTempData, upstairsEnvData });
  const setNewSensorData = (
    sensorTopics: SensorTopics[],
    responses: (AvgUpstairsEnvDataResponse | AvgBoilerTempDataResponse)[]
  ) => {
    responses.forEach((response, index) => {
      if (sensorTopics[index] === SensorTopics.BOILER_TEMP) {
        setBoilerTempData((response as AvgBoilerTempDataResponse).data);
      } else if (sensorTopics[index] === SensorTopics.UPSTAIRS_ENV) {
        setUpstairsEnvData((response as AvgUpstairsEnvDataResponse).data);
      }
    });
  };

  useEffect(() => {
    const sensorTopics = [SensorTopics.BOILER_TEMP, SensorTopics.UPSTAIRS_ENV];
    const afterDate = subDays(new Date(), 1);
    Promise.all(
      sensorTopics.map((topic) =>
        getAvgSensorDataAfter(topic, afterDate.toISOString())
      )
    ).then(
      (
        responses: (AvgUpstairsEnvDataResponse | AvgBoilerTempDataResponse)[]
      ) => {
        setNewSensorData(sensorTopics, responses);
      }
    );
  }, []);

  const handleDateChange = async (dateRange: Date[], interval: Intervals) => {
    const transformedRange = dateRange.map((date) => date.toISOString());
    const sensorTopics = [SensorTopics.BOILER_TEMP, SensorTopics.UPSTAIRS_ENV];

    const promises: Promise<
      AvgUpstairsEnvDataResponse | AvgBoilerTempDataResponse
    >[] = [];

    if (dateRange.length === 1) {
      sensorTopics.forEach((topic) =>
        promises.push(
          getAvgSensorDataAfter(topic, transformedRange[0], interval)
        )
      );
    }
    if (dateRange.length === 2) {
      sensorTopics.forEach((topic) =>
        promises.push(
          getAvgSensorDataBetween(
            topic,
            transformedRange[0],
            transformedRange[1],
            interval
          )
        )
      );
    }
    const responses = await Promise.all(promises);
    setNewSensorData(sensorTopics, responses);
  };

  return (
    <>
      <AppBar />
      <Container role="main" sx={{ m: 5 }}>
        {showAlert && (
          <Container>
            <Stack spacing={2}>
              <Alert severity="error">
                The current data selection is truncated and only showing the
                first 1000 results.
              </Alert>
            </Stack>
          </Container>
        )}

        <DateSelectForm handleDateChange={handleDateChange} />

        {upstairsEnvData && boilerTempData && (
          <DualAxisLineGraph
            graph={buildTempGraph(upstairsEnvData, boilerTempData)}
          />
        )}
        {upstairsEnvData && (
          <DualAxisLineGraph graph={buildUpstairsEnvGraph(upstairsEnvData)} />
        )}
      </Container>
    </>
  );
}
