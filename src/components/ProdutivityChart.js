import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Bar, Pie } from 'react-native-pathjs-charts';

export default ProdutivityChart = props => {

  let pieOptions = {
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    width: 350,
    height: 350,
    color: '#2980B9',
    r: 50,
    R: 150,
    legendPosition: 'topLeft',
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3
    },
    label: {
      fontFamily: 'Arial',
      fontSize: 12,
      fontWeight: true,
      color: '#ECF0F1'
    }
  }

  let BarOptions = {
    width: 300,
    height: 300,
    margin: {
      top: 20,
      left: 25,
      bottom: 50,
      right: 20
    },
    color: '#2980B9',
    gutter: 20,
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3
    },
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        fill: '#34495E',
        rotate: 60,
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        fill: '#34495E'
      }
    }
  }

  if (props.data == -1) {
    return(
      <View style={styles.margin}>
        <Button 
          color="#1a4f94"
          title='Sair'
          onPress={() => props.onevent()}
        /> 
      </View>
    );
  }
  return(
    <View style={styles.container} >
      <Text style={styles.titleBig} >Relatorio de rendimento</Text>

      <Pie data={props.data.pieChartTotalData} options={pieOptions} accessorKey='data'/>
      <Text style={styles.text, styles.green} >Total de acertos: {props.data.pieChartTotalData[0].data}</Text>
      <Text style={styles.text, styles.red} >Total de erros: {props.data.pieChartTotalData[1].data}</Text>
      <Text style={styles.text, styles.blue} >Total de respostas: {props.data.totalQuestions}</Text>

      { (props.discipline == 'all') && 
        <View style={styles.container} >
          <Text style={styles.titleSmall} >Tempo gasto por disciplina:</Text>
          <Pie data={props.data.pieChartTotalTime} options={pieOptions} accessorKey='data'/>
          {props.data.pieChartTotalTime.map(elemen => (
            <Text style={styles.text} key={elemen.name} >{elemen.name}: {elemen.data}min</Text>
          ))} 
          <Text style={styles.text} >Total de tempo: {props.data.totalTime}min</Text>

          <Text style={styles.titleSmall} >Porcentagem de acerto por disciplina:</Text>
          <Bar data={props.data.BarChart} options={BarOptions} accessorKey='data'/>
          {props.data.BarChart.map(elemen => (
            <Text style={styles.text} key={elemen[0].name} >{elemen[0].name}: {elemen[0].data}%</Text>
          ))} 
        </View>
      }

      { (props.discipline != 'all') &&
        <Text style={styles.text} >Total de tempo: {props.data.totalTime}min</Text>
      }
      <View style={styles.margin}>
        <Button 
          color="#1a4f94"
          title='Sair'
          onPress={() => props.onevent()}
        /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  titleBig: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20
  },
  titleSmall: {
    textAlign: 'center',
    fontSize: 22  ,
    marginTop: 30,
    marginBottom: 10,
    color: 'black'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  margin: {
    marginTop: 25,
    marginBottom: 25
  },
  green: {
    color: '#5cb85c',
    fontSize: 20,
  },
  red: {
    color: '#d9534f',
    fontSize: 20,
  },
  blue: {
    color: '#0275d8',
    fontSize: 20,
  }
});