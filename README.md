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
import { stateDecorator } from '@jdachtera/storybook-simple-state';

import MyComponent from './MyComponent';

 storiesOf('<MyComponent>', module)
  .addDecorator(stateDecorator('Hello World'))
  .add('default', ({ default: [value, updateValue] }) => (
    <MyComponent
      value={value}
      onChange={updateValue}
    />
  ));
```

*.storybook/addons.js*
```
import { register as registerSimpleState } from '@jdachtera/storybook-simple-state';

registerSimpleState();
```

