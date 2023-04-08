import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


import sass from 'sass';


export default defineConfig({
  plugins: 
  [
    react(),
    {
      name: 'sass',
      // .scss 파일을 .css 파일로 변환합니다.
      transform: (code:any, id:any) => {
        if (id.endsWith('.scss')) {
          return sass.renderSync({ data : code }).css.toString();
        }
      }
    }
  ]
})
