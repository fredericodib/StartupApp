import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import QuizList from '../components/QuizList';
import QuizQuestions from '../components/QuizQuestions';

export default QuizNavigation = StackNavigator({
	QuizList: { screen: QuizList },
  	QuizQuestions: { screen: QuizQuestions }
}, {
  	headerMode: 'none'
});