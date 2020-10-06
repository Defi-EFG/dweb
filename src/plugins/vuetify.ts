import Vue from 'vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const MY_ICONS = {
  close: 'mdi-close',
  leftarrow: 'mdi-arrow-left',
  rightarrow: 'mdi-arrow-right',
  upload:'mdi-upload',

}

Vue.use(Vuetify)

export default new Vuetify({
  rtl: false,
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: '#21CFF3',
        accent: '#FF4081',
        secondary: '#ffe18d',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
        white:'#FFFFFF',
        lightgray:'#D3D3D3',
      
  
      },
      light: {
        primary: '#44096B',
        accent: '#CDDC39',
        secondary: '#42A5F5',
        success: '#81C784',
        info: '#81D4FA',
        warning: '#FFB74D',
        error: '#FF8A65',
        lightgray: '#929292',
        white: '#FFFFFF',
        transparent: 'transparent'
      },
    
    }
  },
  icons: {
    iconfont: 'mdi',
    values: MY_ICONS
  }
})
