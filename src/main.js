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
    this.param = param
    //debugger
    this.createNodes()

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

    Gl.init(this.$stage_gl,{...this.param})

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
  onError(fn){
    this.handle_err = fn
  },
  createNodes(){
    this.$el.innerHTML = `
      <section class="webgl-stage-complete" style="visibility: hidden;">
          <section class="webgl-stage-scene"></section>
          <section class="webgl-stage-texture"></section>
          <section class="webgl-gui">
            <section class="webgl-menu">
              <header>
                <span class="icon_down"></span>
                <span style="padding-left:5px;">Model Inspector</span>
              </header>
              <div class="inspector-modes style-15" style="display:none;">
                <div class="inspector-wireframe">
                  <div class="inspector-wireframe-title x-title">WIREFRAME</div>
                  <div class="inspector-wireframe-color">
                    <div  class="color-transparent" data-val="black"></div>
                    <div style="background:purple;" data-val="purple"></div>
                    <div style="background:blue;" data-val="blue"></div>
                    <div style="background:gray;" data-val="gray"></div>
                    <div style="background:red;" data-val="red"></div>
                    <div style="background:yellow;" data-val="yellow"></div>
                    <div style="background:green;" data-val="green"></div>
                  </div>
                </div>
                <div class="inspector-single-sided">
                  <div class="inspector-single-sided-switch">
                    <div class="inspector-single-rect"></div>
                  </div>
                  <div class="inspector-single-sided-label">
                    Single Sided
                  </div>
                </div>
                <div class="inspector-skybox">
                  <div class="inspector-skybox-switch">
                    <div class="inspector-single-rect"></div>
                  </div>
                  <div class="inspector-skybox-label">
                    Skybox
                  </div>
                </div>
                <div class="inspector-viewport">
                  <div class="inspector-title x-title">VIEWPORT</div>
                  <div class="inspector-viewport-toggle-button">
                    <div data-val="3d">3D</div>
                    <div data-val="3d+2d">3D+2D</div>
                    <div data-val="2d">2D</div>
                  </div>
                </div>
                
  
                <div class="inspector-material-channels">
                  <div class="inspector-title x-title">MATERIAL CHANNELS</div>
                  <div class="inspector-material-channels-inner">
                    <div class="base-color" data-val="standar"><span>Standar</span></div>
                    <div class="base-color" data-val="base-color"><span>Base Color</span></div>
                    <div class="emission" data-val="emission"><span>Emission</span></div>
                    <div class="bump-map" data-val="bump-map"><span>Bump Map</span></div>
                    <div class="normal" data-val="normal"><span>normal</span></div>
                    <div class="opacity" data-val="opacity"><span>opacity</span></div>
                    <div class="ao-map" data-val="ao-map"><span>Ao Map</span></div>
                    <div class="lightmap" data-val="lightmap">LightMap</div>
                  </div>
                </div>
                <div class="inspector-geometry">
                  <div class="inspector-title x-title">GEOMETRY</div>
                  <div class="inspector-geometry-inner">
                    <div class="matcap" data-val="matcap"><span>Matcap</span></div>
                    <div class="wireframe"  data-val="wireframe"><span>Wireframe</span></div>
                    <div class="vertex-normals" data-val="vertex-normals"><span>Vertex Normals</span></div>
                    <div class="uv" data-val="uv"><span>Uv</span></div>
                  </div>
                </div>
              </div>
      
            </section>
            
            <section class="general-controls"></section>
          </section>

        </section>

        <section class="webgl-stage-loading" >
          <div class="webgl-stage-loading-poster" style="background-image:url(${this.param.poster})"></div>
          <div class="webgl-stage-loading-inner">
            <div class="webgl-stage-loading-text">Loading 3D Model</div>
            <div class="webgl-stage-loading-bar">
              <span class="webgl-stage-loading-rect"></span>
            </div>
          </div>
        </section>`
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


