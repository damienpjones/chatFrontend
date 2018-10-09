import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MessageForm from '../components/MessageForm';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('MessageForm />', () => {
  it('renders a message text area', () => {
    const form = shallow(<MessageForm />);
    expect(form.find('textarea').length).toEqual(1);
  });
  it('renders a username input', () => {
    const form = shallow(<MessageForm />);
    expect(form.find('input').length).toEqual(1);
  });
  it('clears msg after sending', () => {
    let socket = { emit: function (varOne, varTwo) {}}
    const form = mount(<MessageForm socket={socket} />);
    form.setState({msg: 'hello', username: 'hi@kth.se'})
    form.find('.submitButton').simulate('click');
    expect(form.state().msg).toEqual('');
  });
  it('clears msg after sending', () => {
    let socket = { emit: function (varOne, varTwo) {}}
    const form = mount(<MessageForm socket={socket} />);
    form.setState({msg: 'hello', username: 'hi@kth.se'})
    form.find('.submitButton').simulate('click');
    expect(form.state().msg).toEqual('');
  });
  it('checks that input is an email before sending', () => {
    let socket = { emit: function (varOne, varTwo) {}}
    const form = mount(<MessageForm socket={socket} />);
    form.setState({msg: 'hello', username: 'hith.se'});
    form.find('.submitButton').simulate('click');
    expect(form.state().usernameWarning).toEqual('Please enter a valid email address');
  });
  it('checks that msg is not empty before sending', () => {
    let socket = { emit: function (varOne, varTwo) {}}
    const form = mount(<MessageForm socket={socket} />);
    form.setState({msg: '', username: 'hit@h.se'});
    form.find('.submitButton').simulate('click');
    expect(form.state().msgWarning).toEqual('Please enter a msg');
  });

})

