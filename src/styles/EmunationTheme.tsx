/* ******************************************** */
/*  Global overrides of Material UI Components  */
/* ******************************************** */
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export default createMuiTheme({
    palette: {
        primary: {
            main: '#236092',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
            contrastText: '#000',
        },
    },
    typography: {
        fontFamily: 'Ubuntu, Verdana, Arial, sans-serif',
    },
})

export const colors = {
    primary: '#236092',
    secondaryBlue: '#58c9e7',
    secondaryBlueHalf: '#58c9e780',
    indigo600: '#2a9ad1',
    magenta: '#e54360',
    error: '#ce0e2d',
    green: '#78be20',
    secondaryGreen: '#9acf58',
    darkSurface: '#1c1b1b', // Fill Color
    background: '#6f6e6e',
    darkGrey: '#666666',
    darkGrey2: '#4A545D',
    darkGrey3: '#373939',
    midGrey: '#9e9e9e',
    offWhite: '#d8d8d8',
    white: '#ffffff',
    hoverBackground: '#42b4e399', // 42b4e3 @ 60%opacity
    fillColor: '#165788',
}
