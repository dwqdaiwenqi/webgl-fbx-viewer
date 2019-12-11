import './index.less'
//   https://sketchfab.com/3d-models/low-poly-angel-female-0d92f3223693446ea17e7fd612a58b2a
import Menu from './menu'

import Gl from './cxy'

import Tex from './tex'


export default {
  $el:null,
  $stage_gl:null,
  $stage_texture:null,
  currentMode:'base-color',
  init($el,param={}){

    this.$el = typeof $el==='string'?document.querySelector($el):$el

    this.$stage_gl = this.$el.querySelector('.webgl-stage-scene')
    this.$stage_texture = this.$el.querySelector('.webgl-stage-texture')
    this.$stage_complete = this.$el.querySelector('.webgl-stage-complete')

    let menu = Menu(
      document.querySelector('.webgl-gui')
    )
    
    menu.ev.on('wireframe',prop=>{
      //Gl.setColor(prop.val)

      //menu.reset()

      console.log('wireframe:', prop)
      Gl.setColor(prop.val)

      this.drawMode('wireframe')
      
     
    })
    menu.ev.on('single-sided',prop=>{
      console.log(prop)
      Gl.setMaterialSide(prop.val)
    })
    menu.ev.on('viewport',prop=>{
      // console.log('viewport...', prop)

      let action = {
        '2d'(obj){
          obj.scene2d()
          // console.log(Gl.textures)
        },
        '3d'(obj){
          obj.scene3d()
        },
        '3d+2d'(obj){
          obj.scene3d2d()
        }
      }


      action[prop.val](this)
      setTimeout(()=>{ Gl.resize() })
    })
    menu.ev.on('render',e=>{

    })
    menu.ev.on('skybox',prop=>{
      //console.log('skybox:', prop)
      Gl.switchSkyBox(prop.val)
    })

    menu.ev.on('material-channels',prop=>{
      //console.log('material-channels...',prop)
      this.drawMode(prop.val)
      
    })
    menu.ev.on('geometry',prop=>{

      //console.log(prop)
      this.drawMode(prop.val)
    })

    Gl.init(this.$stage_gl)

    Gl.onProgress(prop=>{
      // this.progress(prop)
      this.$el.querySelector('.webgl-stage-loading-rect').style.width = prop+'%'
    },()=>{
      this.$el.querySelector('.webgl-stage-loading').classList.add('webgl-stage-loading--hide')

      this.$stage_complete.style.visibility = 'visible'
    })
    //console.log(Gl.textures)
    Tex.init(this.$stage_texture)

    return this
  },
  progress(prop,fn){

  },
  scene2d(){
    Object.assign(this.$stage_gl.style,{
      display:'none'
    })
    Object.assign(this.$stage_texture.style,{
      display:'block',
      width:'100%',
      left:'0'
    })

    Tex.resize()

    Tex.showTexture(this.currentMode, Gl.textures[this.mode])
  },
  scene3d(){
    Object.assign(this.$stage_texture.style,{display:'none'})
    Object.assign(this.$stage_gl.style,{
      display:'block',
      left:'0',
      width:'100%'
    })

  },
  scene3d2d(){
    Object.assign(this.$stage_texture.style,{
      display:'block',
      left:'50%',
      width:'50%'
    })
    Object.assign(this.$stage_gl.style,{
      display:'block',
      left:'0',
      width:'50%'
    })

    Tex.resize()
    
    console.log(Gl.textures, this.currentMode, this.mode)

    Tex.showTexture(this.currentMode, Gl.textures[this.mode])
  },
  get mode(){
    let mode = {
      // material - channels
      // 'base-color':'standard',
      'standard': 'standard',
      'not-post-processing':'standard',
      'base-color':'color',
      'matalness':'metallic',
      'emission':'emissive',
      'bump-map':'bump',
      'normal':'normal',
      'opacity':'alpha',
      'ao-map':'ao',
      'lightmap':'lightmap',
  
      // geometry
      'matcap': 'matcap',
      'wireframe': 'wireframe',
      'vertex-normals': 'vertexNormal',
      'uv':'uv'
    }

    return mode[this.currentMode]
  },
  drawMode(val){
    this.currentMode = val

    console.log(Gl.textures, this.currentMode, this.mode)


    Tex.showTexture(this.currentMode, Gl.textures[this.mode])
    //Tex.showTexture(this.currentMode, Gl.textures[this.currentMode])
    //debugger
    Gl.drawMaterialMode(this.mode)
  }
}


