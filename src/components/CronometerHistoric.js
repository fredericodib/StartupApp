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
    console.log(listOfHistoric)
    return (
      <View style={styles.section}>
        <TopBar name='Histórico de tempo' goBack={this.props.navigation.goBack}/>
        <ScrollView style={styles.container}>
          { listOfHistoric.map(group => (
            <View key={ group.date } style={{marginBottom: 35}}>
              <View style={styles.groupContainer} >
                <View style={styles.group} >
                  <Text style={styles.groupText} >{this.formatData(group.date)}</Text>
                  <Text style={styles.groupText} >{group.totalTime} min</Text>
                </View>
              </View>
              { group.list.map(obj => (
                <View key={ obj.id } style={styles.itemContainer}>
                  <View style={styles.group} >
                    <Text style={styles.itemText} >{obj.discipline.name}</Text>
                    <Text style={styles.itemText} >{obj.time / 1000} min</Text>
                  </View>
                </View>
              ))}
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
  groupContainer: {
    height: 70, 
    justifyContent: 'center',
    backgroundColor: '#1a4f94',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20
  },
  group: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  groupText: {
    color: '#fff',
    fontSize: 18,
  },
  itemContainer: {
    height: 60, 
    justifyContent: 'center',
    borderColor: '#1a4f94',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    padding: 20
  },
  itemText: {
    color: '#000',
    fontSize: 16,
  },
});

const mapStateToProps = state => (
  {
    timeHistoric: state.CronometerReducer.timeHistoric
  }
);

export default connect(mapStateToProps, { })(CronometerHistoric);