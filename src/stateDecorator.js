import React, { useState } from 'react';
import addons from '@storybook/addons';

export const State = ({ render, initial, storeKey = 'default' }) => {
  const [value, setValue] = useState(initial);

  const channel = addons.getChannel();
  channel.emit('SHOW_STATE/set_state', { key: storeKey, value });

  return render({
    value, setValue,
    [storeKey]: [value, setValue], //keep crosscompatibility with old api
  });
}

export const withState = (...originalArgs) => (decoratedStory) => {
  const args = originalArgs.slice(); //copy original arguments due to mutation below
  const storyFn = typeof args[args.length - 1] === 'function' ? args.pop() : decoratedStory;
  const [initial, storeKey] = args;
  return <State storeKey={storeKey} initial={initial} render={storyFn} />
};

 /**
 *  keep old name for crosscompatibility
 *  @deprecated
 * */
const stateDecorator = withState;

export default stateDecorator;
