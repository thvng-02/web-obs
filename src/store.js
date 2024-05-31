import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    piUrl: 'http://localhost:5000',
    measurements: {
      Xaxis:{
        name: 'Xaxis',
        data: [[new Date(), 4.1], [new Date(), 4.1]],
        unit: 'V/ms-1',
        icon: 'mdi-current-ac',
        trend: true
      },
      Yaxis:{
        name: 'Yaxis',
        data: [[new Date(), 3.2], [new Date(), 3.2]],
        unit: 'V/ms-1',
        icon: 'mdi-current-ac',
        trend: true
      },
      Zaxis:{
        name: 'Zaxis',
        data: [[new Date(), 25.8], [new Date(), 25.8]],
        unit: 'V/ms-1',
        icon: 'mdi-current-ac',
        trend: true
      },
      Pressure:{
        name: 'Pressure',
        data: [[new Date(), 159.23], [new Date(), 159.23]],
        unit: 'Pa',
        icon: 'mdi-current-ac',
        trend: true
      },
      Temparuture:{
        name: 'Temparuture',
        data: [[new Date(), 29.9], [new Date(), 29.9]],
        unit: 'oC',
        icon: 'mdi-current-ac',
        trend: true
      },
      Current:{
        name: 'Current',
        data: [[new Date(), 2], [new Date(), 2]],
        unit: 'mA',
        icon: 'mdi-current-ac',
        trend: true
      },
    }
  },
  getters: {
    measurementNames: state => {
      return Object.keys(state.measurements);
    },
    trendMeasurementNames: state => {
      return Object.entries(state.measurements).filter(el=>el[1].trend).map(el=>el[0]);
    },
    recentUpdates: state => {
      let result = [];
      for (const measurement of Object.values(state.measurements)) {
        measurement.data.forEach( dataPoint => {
          if (dataPoint.length < 1) return;
          try{
            result.push({
              name: measurement.name,
              dtime: dataPoint[0],
              value: dataPoint[1],
              time: `${dataPoint[0].getHours()}:${dataPoint[0].getMinutes()}:${dataPoint[0].getSeconds()}`,
              icon: measurement.icon,
            })
          }
          catch(e){
            dataPoint[0] = new Date(dataPoint[0]);
            result.push({
              name: measurement.name,
              dtime: dataPoint[0],
              value: dataPoint[1],
              time: `${dataPoint[0].getHours()}:${dataPoint[0].getMinutes()}:${dataPoint[0].getSeconds()}`,
              icon: measurement.icon,
            })
          }
        })
      }
      result.sort( (a, b) => {
        return  new Date(b.dtime) - new Date(a.dtime) ;
      });
      return result.slice(0, 20);
    },
    current_value_of_measurement: (state) => (name) =>{
      return state.measurements[name].data.slice(-1)[0][1];
    },
    mostRecentMeasurement: state => (name) => {
      let measurementInfo = state.measurements[name];
      if(measurementInfo.data.length > 0 && measurementInfo.data[0].length > 0){
        const data_point = measurementInfo.data.slice(-1)[0];
        return {time: data_point[0], value:data_point[1], unit: measurementInfo.unit, icon:measurementInfo.icon };
      }
    },
    gChartForMeasurements: (state) => (name) => {
      if (state.measurements[name].data.length > 1){
        return state.measurements[name].data.slice(1);
      }
    },

  },
  mutations: {
    updatePiUrl(state, piUrl){
      state.piUrl = piUrl;
      this._vm.$socket.close();
      this._vm.$socket.io.uri = piUrl
      this._vm.$socket.open();
    },
    addDataPoint(state, data){
      let measurementData;
      try {
        measurementData = state.measurements[data.name].data
      } catch (e) {
        console.log("ERROR: ", e)
        return
      }
      while(measurementData.length > 50){
        measurementData.shift();
      }
      measurementData.push(data.dataPoint);
    },
    updateMeasurements(state, data) {
      state.measurements.Xaxis.data = [[new Date(), parseFloat(data.X)], [new Date(), parseFloat(data.X)]]
      state.measurements.Yaxis.data = [[new Date(), parseFloat(data.Y)], [new Date(), parseFloat(data.Y)]]
      state.measurements.Zaxis.data = [[new Date(), parseFloat(data.Z)], [new Date(), parseFloat(data.Z)]]
      state.measurements.Pressure.data = [[new Date(), parseFloat(data.Pressure)], [new Date(), parseFloat(data.Pressure)]]
      state.measurements.Temparuture.data = [[new Date(), parseFloat(data.Temparuture)], [new Date(), parseFloat(data.Temparuture)]]
      state.measurements.Current.data = [[new Date(), parseFloat(data.Current)], [new Date(), parseFloat(data.Current)]]

    }
  },
  actions: {
    "SOCKET_buoy_measurement_update"({ commit }, data){
      const update = JSON.parse(data);
      const name = update.name;
      const value = name !== 'location' ? parseFloat(update.value): update.value;
      const time = new Date(update.time);
      const storeMeasurementName = name.replace(' ', '_');
      commit('addDataPoint', {
        name: storeMeasurementName,
        dataPoint: [time, value],
      });
    },
    updateDataMeasurements({ commit }, data){
      commit('updateMeasurements', data)
    },
  }
})
