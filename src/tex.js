import * as THREE from './cxy/build/three.module.js'
import { OrbitControls } from './cxy/examples/jsm/controls/OrbitControls.js'
import {GUI} from 'dat.gui'

import './tex.less'
const MaterialSelect = ()=>{
  var that = {
    init(){
      this.domElement.className = 'material-select'
      this.domElement.innerHTML = `
        <div class="material-select-title"></div>
        <div class="material-select-menu">
          <div class="material-select-opt" data-val="0">0</div>
          <div class="material-select-opt" data-val="1">1</div>
          <div class="material-select-opt" data-val="2">2</div>
        </div>
      `

    },
    domElement:document.createElement('div'),
    add(){

    },
    onChange(){

    }
  }
  that.init()
  return  that
}

export default {
  init($el){
    this.$el = $el

    let [width,height] = [
      this.$el.offsetWidth,
      this.$el.offsetHeight
    ]
    // width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    let camera = new THREE.OrthographicCamera(  width / - 2, width / 2, height / 2, height / - 2, 1, 1000 )
    camera.position.set(0,0,500)
		camera.lookAt(new THREE.Vector3(0,0,0))

    let scene = new THREE.Scene()
    scene.background = new THREE.Color( 0xf0f0f0 )

    let renderer = new THREE.WebGLRenderer()
		renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( width, height )
    this.$el.appendChild(renderer.domElement)

    Object.assign(renderer.domElement.style,{
      outline:'none'
    })

    let controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    controls.enableRotate  = false
    //controls.enablePan = true
    

    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.resize()

    addEventListener('resize',()=>{
      this.resize()
    })

    requestAnimationFrame(function animate(){
      requestAnimationFrame(animate)
      renderer.render( scene, camera )
      controls.update()
    })

  },
  showTexture(mode,textures){
    

    let domElement = this.renderer.domElement
    let [width,height]  = [domElement.width,domElement.height]
    
    console.log('showTexture:',mode,textures,width,height)

    if(this.planes.length){
      this.planes.forEach(plane=>{
        this.scene.remove(plane)
      })
      this.planes = []
    }

    if(this.gui){
      //console.log('remove',this.gui.domElement)

      this.$el.removeChild(this.gui.domElement)
      this.gui = null
     
    } 

    if(!textures) return console.warn('owo')

    let textures_arr = Object.keys(textures)

    if(!textures_arr.length) return console.warn('ovo')

    if(textures_arr){

      textures_arr.forEach((k,i)=>{
        //if(i!=0) return
        // textures[uuid]
        let map = textures[k]

        let plane = new THREE.Mesh(
          new THREE.PlaneGeometry(width*.8,width*.8),
          new THREE.MeshBasicMaterial({
            //wireframe:true,
            // map
            side:THREE.DoubleSide,
            //color:0xff00ff,
            //map,
            map,
            wireframe:false
          })
        )
        
        plane.visible = false
        plane.position.copy(
          new THREE.Vector3(0,0,10)
        )
        this.scene.add(plane)
        this.planes.push(plane)
        
      })
    }


    {
      
      // this.gui = MaterialSelect()
      // Object.assign(this.gui.domElement.style,{
      //   position: 'absolute',
      //   right: '0',
      //   top: '0'
      // })
      // this.$el.appendChild(this.gui.domElement)

      // // let vals = []
      // textures_arr.forEach((k,i)=>{
      //   //if(i!=0) return
      //   // textures[uuid]
      //   let map = textures[k]
      //   let name = map.name
      //   // console.log(map,map.generateMipmaps)
      //   // console.dir(map.image)
      //   //console.log(map,name)
      //   vals.push(i)
      // })
  
      // this.gui.add(  {
      //   Textures: '0',
      // }, 'Textures', [...vals] ).onChange(  (val) =>{
  
      //  this.planes.forEach(plane=>plane.visible=false)
      //  this.planes[val].visible = true
      // })

      // this.planes[0]&&(this.planes[0].visible = true)

  
      this.gui = new GUI()
      Object.assign(this.gui.domElement.style,{
        position: 'absolute',
        right: '0',
        top: '0'
      })
      this.$el.appendChild(this.gui.domElement)

  
      let vals = []
      textures_arr.forEach((k,i)=>{
        //if(i!=0) return
        // textures[uuid]
        let map = textures[k]
        let name = map.name
        // console.log(map,map.generateMipmaps)
        // console.dir(map.image)
        //console.log(map,name)
        vals.push(i)
      })
  
      this.gui.add(  {
        Textures: '0',
      }, 'Textures', [...vals] ).onChange(  (val) =>{
  
       this.planes.forEach(plane=>plane.visible=false)
       this.planes[val].visible = true
      })

      this.planes[0]&&(this.planes[0].visible = true)
    }
    

  },
  resize(){
    let [width,height] = [
      this.$el.offsetWidth,
      this.$el.offsetHeight
    ]
    // width / - 2, width / 2, height / 2, height / - 2
    this.camera.left = width/-2
    this.camera.right = width/2
    this.camera.top = height/2
    this.camera.bottom = height/-2
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( this.$el.offsetWidth, this.$el.offsetHeight )
  },
  planes:[],
  gui:null,
  maps:[]
}