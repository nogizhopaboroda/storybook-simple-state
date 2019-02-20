import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import addons from '@storybook/addons';

const stateDecorator = (initial, key = 'default') => {
  const State = ({ children }) => children(useState(initial));
  const channel = addons.getChannel();

  return storyFn => (
    <State initial={initial}>
      {([state, updateState]) => {
        channel.emit('SHOW_STATE/set_state', { key, value: state });
        return storyFn({ [key]: [state, updateState] });
      }}
    </State>
  );
};

export default stateDecorator



