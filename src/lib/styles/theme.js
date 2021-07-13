// import './fonts.css'

const size = {
  mobileS: "480px",
  mobileL: "770px",
  tabletS: "1023px",
  tabletL: "1280px",
  laptop: "1460px",
  desktop: "1700px",
}

const theme = {
  color: {
    primary: "#86A8E7",
    secondary: "#DE99A8",
    text: "#4F75BB",
    title: "#1A4188",
    white: "#FCFDFF",
    gray: "#B8C7E2",
    error: "#DE4D6C",
    highlight: "#7F7FD5",    
    gradationLeft: "#7F7FD5",
    gradationCenter: "#86A8E7",
    gradationRight: "#91EAE4",
  },
  size: {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tabletL: `(max-width: ${size.tabletL})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop})`,
  },
  font: {
    thin: "SpoqaHanSansNeo-Thin",
    light: "SpoqaHanSansNeo-Light",
    regular: "SpoqaHanSansNeo-Regular",
    medium: "SpoqaHanSansNeo-Medium",
    bold: "SpoqaHanSansNeo-Bold",
  },
  boxShadow: "0px 3px 6px #00000029",
}

export default theme