# Snackbar-Popup

This component is built on top of the Material UI Snackbar and implemented using a custom hook and React Context provider for reusability. Material UI, as well as many other public front-end libraries, is exceptionally developed and well documented, but whenever we go to implement a component, a snackbar in this case, the developer needs to write too much boilerplate to make it work every single time.

## The solution

The premise of this snackbar is to reduce the code necessary to implement the same Material UI Snackbar you know and love by defining a global provider using just a base React Context, so we can link snackbars and trigger notifications with simple function call.

Example:

```
// index.js
import React from 'react'
import { SnackbarProvider } from 'snackbar-popup'

import App from './components/App'

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// App.js
import React from 'react'
import { useSnackbar } from 'snackbar-popup'

const App = () => {
    const snackbar = useSnackbar()

    return (
        <div>
            <button onClick={() => snackbar({type: 'success', message: 'Successfully completed'})} />
            <button onClick={() => snackbar({type: 'error', message: 'There was an error when updating'})} />
        </div>
    )
}
```

As you can see in the example above, once your app has been wrapped with `<SnackbarProvder />` you can use the useSnackbar hook anywhere in order to implement the function call to render the success or error notification.

<br />

# Getting Started

This is a React component (built for hooks) and it is built on top of the Material UI Dialog so it uses the following dependencies:

1. React 16.8 or higher.
2. Material UI (latest).

To install, make sure your .npm config file is pointing to the Genesis Professional Group artifact registry so that Yarn/NPM know to look there before going to the public NPM registry.

In your cli run:

Using yarn<br />
`yarn add snackbar-popup`

Using npm<br />
`npm i snackbar-popup`

<br />

# Features

The snackbar will simply display a 3-second notification at the bottom center of the screen. When passing a `type` success or error it will toggle the color green or red and allow you to send in a custom message.

## Overriding the default icons

To have the snackbar override the default success and error icons, all you need to do is define the specified className in the useSnackbar hook (first argument is for the success and second is for the error):

```
const Component = () => {
  const snackbar = useSnackBar("fas fa-thumbs-up", "fas fa-times")
/*...*/
```

The code above will simply override the default fontawesome icon, that is originally set.

Original classNames set by default are: "fas fa-check-circle" and "fas fa-exclamation-circle"

<br />

# Options

- useSnackBar returns a function that allows you to render the snackbar notification. The function takes in an objects wil the following keys:

  - `type` string: Passing "success" will render the snackbar green with the success icon and error will render the snackbar red and error icon.
  - `message` string: Passing a custom message to render inside of the snackbar when rendered.
  - `autoHideDuration` number: Option to override the original auto hide duration of 3 seconds.

<br />

# Contribute

All committed code must be 100% covered by unit tests and it's subject to review and approval by David Colatti.
