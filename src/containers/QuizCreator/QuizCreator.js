import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import * as actions from '../../store/actions/create';
import { CREATE_QUIZ } from '../../store/actions/actionTypes';

const createOptionControl = number => (
  createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number,
  }, { required: true })
);

const createFormControls = () => ({
  question: createControl({
    label: 'Введите вопрос',
    errorMessage: 'Вопрос не может быть пустым',
  }, { required: true }),
  option1: createOptionControl(1),
  option2: createOptionControl(2),
  option3: createOptionControl(3),
  option4: createOptionControl(4),
});

export class QuizCreator extends Component {
  state = {
    formControls: createFormControls(),
    rightAnswerId: 1,
    isFormValid: false,
  };

  submitHandler = event => event.preventDefault();

  addQuestionHandler = (event) => {
    event.preventDefault();

    const { formControls, rightAnswerId } = this.state;
    const { question, option1, option2, option3, option4 } = formControls;
    const { quiz, createQuizItem } = this.props;

    const questionItem = {
      id: quiz.length + 1,
      question: question.value,
      rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    createQuizItem(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  }

  createQuizHandler = (event) => {
    event.preventDefault();
    const { createQuiz } = this.props;
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
    createQuiz();
  }

  selectChangeHandler = event => this.setState({ rightAnswerId: +event.target.value });

  onChangeHandler = (value, controlName) => {
    const { formControls } = this.state;
    const formControlss = { ...formControls };
    const control = { ...formControlss[controlName] };
    control.touched = true;
    control.value = value;
    control.valid = validate(value, control.validation);
    formControlss[controlName] = control;
    this.setState({
      formControls: formControlss,
      isFormValid: validateForm(formControlss),
    });
  }

  render() {
    const { formControls, rightAnswerId, isFormValid } = this.state;
    const { quiz } = this.props;

    const inputs = Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Auxillary key={controlName + 1}>
          <Input
            label={control.label}
            value={control.value}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={control.validation}
            onChange={event => this.onChangeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Auxillary>
      );
    });

    const select = (
      <Select
        label="Выберите правильный ответ"
        value={rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {inputs}
            {select}
            <Button type="primary" onClick={this.addQuestionHandler} disabled={!isFormValid}>
              Добавить вопрос
            </Button>
            {quiz.map(item => <li key={item.id}>{item.question}</li>)}
            <Button type="success" onClick={this.createQuizHandler} disabled={quiz.length === 0}>
              Создать тест
            </Button>
          </form>
          <hr />
        </div>
      </div>
    );
  }
}

QuizCreator.propTypes = {
  quiz: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    rightAnswerId: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })),
  })),
  createQuizItem: PropTypes.func.isRequired,
  createQuiz: PropTypes.func.isRequired,
};

QuizCreator.defaultProps = { quiz: [] };

export const mapStateToProps = state => ({ quiz: state.create.quiz });

export const mapDispatchToProps = dispatch => ({
  createQuizItem: item => dispatch(actions.createQuizItem(item)),
  createQuiz: () => dispatch({ type: CREATE_QUIZ }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
