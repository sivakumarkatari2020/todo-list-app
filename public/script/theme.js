let chngTheme = () => {
    if(window.innerWidth > 450){
        chngColor();
    }else{
        chngColor();
    }
}
//function to change the colors for dark and bright mode
let chngColor = () => {

    //checking for theme
    if(getComputedStyle(document.documentElement).getPropertyValue('--main') == ' hsl(235,21%,11%)'){
        brightTheme();
    }else{
        darkTheme();
    }

}

let darkTheme = () => {

    document.documentElement.style.setProperty('--main',' hsl(235,21%,11%)');
    document.documentElement.style.setProperty('--card','hsl(235,24%,19%)');
    document.documentElement.style.setProperty('--text','hsl(234,39%,85%)');
    document.documentElement.style.setProperty('--fade-text','hsl(234,11%,52%)');
    document.documentElement.style.setProperty('--light-text','hsl(233,14%,35%)');
    document.documentElement.style.setProperty('--hover','hsl(236,33%,92%)');
    document.documentElement.style.setProperty('--blue','hsl(220,98%,61%)');
    document.documentElement.style.setProperty('--bg-desktop',"url('./images/bg-desktop-dark.jpg')");   
    document.documentElement.style.setProperty('--bg-mobile',"url('./images/bg-mobile-dark.jpg')");
    //For changing icon
    document.getElementById('theme-changer').setAttribute('src','./images/icon-sun.svg')

}

let brightTheme = () => {

    document.documentElement.style.setProperty('--main','hsl(236,32%,92%)');
    document.documentElement.style.setProperty('--card','hsl(0,0%,98%)');
    document.documentElement.style.setProperty('--text','hsl(235,19%,35%)');
    document.documentElement.style.setProperty('--fade-text','hsl(233,11%,84%)');
    document.documentElement.style.setProperty('--light-text','hsl(236,9%,61%)');
    document.documentElement.style.setProperty('--hover','hsl(236,32%,92%)');
    document.documentElement.style.setProperty('--blue','hsl(220,98%,61%)');
    document.documentElement.style.setProperty('--bg-desktop',"url('./images/bg-desktop-light.jpg')");   
    document.documentElement.style.setProperty('--bg-mobile',"url('./images/bg-mobile-light.jpg')");
    //For changing icon
    document.getElementById('theme-changer').setAttribute('src','./images/icon-moon.svg')

}