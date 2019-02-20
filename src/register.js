
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import addons from '@storybook/addons';


export const register = () => {
  
    const StatePanel = ({ channel, api }) => {
      const [state, updateState] = useState({});
  
      const handleStateUpdate = ({ key, value }) => {
        updateState({ ...state, [key]: value });
      };
  
      const resetState = () => updateState({});
  
      useEffect(() => {
        channel.on('SHOW_STATE/set_state', handleStateUpdate);
        const stopListeningOnStory = api.onStory(resetState);
  
        return () => {
          channel.removeListener('SHOW_STATE/set_state', handleStateUpdate);
          stopListeningOnStory();
        };
      });
  
      return <ReactJson src={state} name={false} />;
    };
  
    // Register the addon with a unique name.
    addons.register('SHOW_STATE', api => {
      // Also need to set a unique name to the panel.
  
      addons.addPanel('SHOW_STATE/panel', {
        title: 'State',
        render: <StatePanel channel={addons.getChannel()} api={api} />,
      });
    });
  };
  