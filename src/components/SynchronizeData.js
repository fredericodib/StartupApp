import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

import { refrashStudent } from '../actions/AutenticationActions';
import { GetDisciplines } from '../actions/DisciplinesActions';
import { SendData } from '../actions/ProductivityActions';
import { RefrashTimeData } from '../actions/CronometerActions';

class SynchronizeData extends Component {

  synchronize() {
    this.props.refrashStudent();
    this.props.GetDisciplines();
    this.props.SendData();
    this.props.RefrashTimeData();
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.synchronize();
      }
      else {
        NetInfo.isConnected.addEventListener(
          'change',
          () => this.synchronize()
        );
      }
    });
  }

  render() {
    
    if (this.props.disciplines.length < 1) {
      return(
        <Spinner visible={true} textContent={"Baixando dados iniciais..."} textStyle={{color: '#FFF'}} />
      );
    }
    return null;
  }
} 


const mapStateToProps = state => (
  {
    disciplines: state.DisciplinesReducer.disciplines
  }
);

export default connect(mapStateToProps, { refrashStudent, GetDisciplines, SendData, RefrashTimeData })(SynchronizeData);