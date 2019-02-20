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
  
      return Object.keys(state).map(key => (
        <ReactJson key={key} src={state[key]} name={key} />
      ));
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
  