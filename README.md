Simple State for React-Storybook
================================

This project adds a simple way to add some state to your react based stories.
It provides a decorator to provide the state + an (optional) addon pane to inspect the state in realtime.

USAGE:
------

*MyComponent.story.jsx*

```
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState, State } from '@jdachtera/storybook-simple-state';

import MyComponent from './MyComponent';


 storiesOf('<MyComponent>', module)
  .addDecorator(withState('Hello World'))
  .add('default', ({ default: [value, updateValue] }) => (
    <MyComponent
      value={value}
      onChange={updateValue}
    />
  ))
  .add('another one', ({ value, setValue }) => (
    <MyComponent
      value={value}
      onChange={setValue}
    />
  ))
  .add('with individual state', withState('Another value', ({ value, setValue }) => (
    <MyComponent
      value={value}
      onChange={setValue}
    />
  )))
  .add('use as a component', () => (
    <State initial="Hello" render={({ value, setValue }) => (
     <MyComponent
       value={value}
       onChange={setValue}
     />
    )}>
    </State>
  ))
```


*.storybook/addons.js*
```
import { register as registerSimpleState } from '@jdachtera/storybook-simple-state';

registerSimpleState();
```

