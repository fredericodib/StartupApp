import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TouchableHighlight,
  TextInput,
  Picker,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import TopBar from './TopBar';

 
class CronometerHistoric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfHistoric: []
    };
  }

  formatData(fullDate) {
    let date = new Date(fullDate);
    let today = new Date();
    let timePassed = today - date;
    timePassed = parseInt(timePassed / (1000 * 3600 * 24));

    if (timePassed == 0) {
      return 'Hoje';
    }
    if (timePassed == 1) {
      return 'Ontem';
    }
    if (timePassed > 1) {
      let day = date.getDate()+1;
      let month = date.getMonth()+1;
      let year = date.getFullYear();

      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }

      return day + '/' + month + '/' + year;
    }

    return null;
  }

  organizeList() {
    let date;
    let list = [];
    let totalTime = 0;
    this.props.timeHistoric.map(obj => {
      if (!date) {
        date = obj.date;
      }
      if (obj.date == date) {
        list.push(obj);
        totalTime = totalTime + Number(obj.time / 1000);
      }
      else {
        this.setState({listOfHistoric: this.state.listOfHistoric.push({date: date, list: list, totalTime: totalTime}) });
        list = [];
        totalTime = 0;
        list.push(obj);
        totalTime = totalTime + Number(obj.time / 1000);
        date = obj.date;
      }
    });
    if (list.length > 0) {
      this.setState({listOfHistoric: this.state.listOfHistoric.push({date: date, list: list, totalTime: totalTime}) });
    }
  }

  componentWillMount() {
    this.organizeList();
    this.setState({listOfHistoric: this.state.listOfHistoric });
  }
 

  render() {
    const { listOfHistoric } = this.state;

    return (
      <View style={styles.section}>
        <TopBar name='Histórico de tempo' goBack={this.props.navigation.goBack}/>
        <ScrollView style={styles.container}>
        { listOfHistoric.map(group => (
          <View key={ group.date }>
            <View>
              <Text>{this.formatData(group.date)}</Text>
              <Text>{group.totalTime}</Text>
            </View>
          </View>
        ))}
        </ScrollView>
      </View>
    );
  }
  
}


const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  input: {
    height: 45, 
    marginBottom: 20
  },
  marginBottom: {
    marginBottom: 20,
    color: '#000',
    fontSize: 20,
    textAlign: 'center'
  },
  cronContainer: {
    alignItems: 'center'
  }
});

const mapStateToProps = state => (
  {
    timeHistoric: state.CronometerReducer.timeHistoric
  }
);

export default connect(mapStateToProps, { })(CronometerHistoric);