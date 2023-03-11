import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  box-shadow: 0 0 0 0;
  background: none;
  text-decoration: none;
  list-style: none;
  color: black;
  border: 0 none;
  outline: 0;
}

html {
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Roboto', sans-serif;
}
`

export default GlobalStyle
