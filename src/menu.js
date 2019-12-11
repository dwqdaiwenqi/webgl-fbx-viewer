import { EventEmitter } from 'events'

// import { GUI } from './cxy/examples/jsm/libs/dat.gui.module.js';
import {GUI} from 'dat.gui'
import { TetrahedronGeometry } from './cxy/build/three.module.js';
const Select = ($el)=>{
  var that = {
    $el: typeof $el==='string'? [...document.querySelectorAll($el)]:[$el],
    init(){
      this.$el.forEach($node=>{
      
       $node.onclick = ()=>{
         
          this.handle_change({
            $node,
            $elements:this.$el,
            val: $node.getAttribute('data-val')
          })

       }
      })
    },
    onChange(fn){
      this.handle_change = fn
    }
  }
  that.init()
  return that
}

const Switch = ($el,active_cls,b=false)=>{
  var that = {
    $el: typeof $el==='string'? [...document.querySelectorAll($el)]:[$el],
    i:0,
    init(){
      this.$el.forEach($node=>{
       
        $node.onclick = ()=>{
          if(++this.i%2!=0){
            $node.classList.add(active_cls)

            this.handle_change({$node,val:true})

            
          }else{
            $node.classList.remove(active_cls)
            this.handle_change({$node,val:false})
          }
        }

      })

      if(b){
        this.i = 1
        this.$el[0].classList.add(active_cls)
      }
    },
    onChange(fn){
      this.handle_change = fn
    }
  }
  that.init()
  return that
}


export default function Menu($parent){
 
  var that = {
    ev : new EventEmitter()
    
  }

  // var gui = new GUI()
  // console.log(gui.domElement)
  // Object.assign(gui.domElement.style,{
  //   position: 'absolute',
  //   left: '0',
  //   top: '0'
  // })
  // $parent.appendChild(gui.domElement)


  // gui.close()

  // gui.add( {'Single Sided':false}, 'Single Sided' ).onChange(val=>{
  //   that.ev.emit('single-sided',{val})
  // })
  // gui.add( {'Skybox':true}, 'Skybox' ).onChange(val=>{
  //   that.ev.emit('skybox',{val})
  // })

  // gui.addColor( {'WIREFRAME':0xffffff}, 'WIREFRAME' ).onChange(  ( val )=> {
   
  //   that.ev.emit('wireframe',{val})

  // } )

  // gui.add(  {
  //   VIEWPORT: '3d',
  // }, 'VIEWPORT', ['3d', '3d+2d', '2d'] ).onChange(  (val) =>{
  //   that.ev.emit('viewport',{val})
   
  // })

  // // gui.add(  {RENDER: 'not-post-processing'}, 'RENDER', ['not-post-processing'] ).onChange(  (val) =>{

  // //   console.log(val) 
  // //   //that.ev.emit('render',{val:'not-post-processing'})
  // // })

  // gui.add(  {'MATERIAL CHANNELS': 'Standard',}, 'MATERIAL CHANNELS',
  // ['Base Color','Standard','Emission','Bump Map','Normal','Opacity','Ao Map','LightMap'] ).onChange(  (val) =>{

  //   // base-color
  //   // emission
  //   // bump-map
  //   // normal
  //   // opacity
  //   // ao-map
  //   // lightmap

   
  //   let mp ={
  //     'Standard': 'standard',
  //     'Base Color':'base-color',
  //     'Emission':'emission',
  //     'Bump Map':'bump-map',
  //     'Normal': 'normal',
  //     'Opacity' : 'opacity',
  //     'Ao Map': 'ao-map',
  //     'LightMap': 'lightmap'
  //   }

  //   that.ev.emit('material-channels',{val:mp[val]})
  // })

  // gui.add(  {
  //   GEOMETRY: 'Matcap',
  // }, 'GEOMETRY', ['Matcap','Wireframe','Vertex Normals','Uv'] ).onChange(  (val) =>{

  //   let mp = {
  //     'Matcap': 'matcap',
  //     'Wireframe':  'wireframe',
  //     'Vertex Normals': 'vertex-normals',
  //     'Uv':'uv'
  //   }
    
  //   //console.log(mp[val])
  //   that.ev.emit('geometry',{val:mp[val]})
  //   // console.log(val) 
  // })



  {
    let $header = $parent.querySelector('header')
    let $inspector_modes = $parent.querySelector('.inspector-modes')
    let $down = $parent.querySelector('.icon_down')
    let i = 0
    $header.addEventListener('click',e=>{
      if(++i%2!=0){

        $down.classList.add('icon_down--active')
        $inspector_modes.style.display = 'block'
      }else{
        $down.classList.remove('icon_down--active')
        $inspector_modes.style.display = 'none'
      }
    })
    // wireframe
    Select('.inspector-wireframe-color>div').onChange(prop=>{
      //console.log(prop.$node, prop.val)
      prop.$elements.forEach($node=>{
        $node.classList.remove('wireframe--active')
      })
      prop.$node.classList.add('wireframe--active')

      that.ev.emit('wireframe',{...prop})
    })

    // viewprot
    Select('.inspector-viewport-toggle-button>div').onChange(prop=>{
      //console.log(prop.$node, prop.val)
      // viewport
      prop.$elements.forEach($node=>{
        $node.classList.remove('switch-active')
      })
      prop.$node.classList.add('switch-active')
      
      that.ev.emit('viewport',{...prop})
    })

    //material
    Select('.inspector-material-channels-inner>div').onChange(prop=>{
      // console.log(prop.$node, prop.val)


      prop.$elements.forEach($node=>{
        $node.classList.remove('opt--active')
      })
      prop.$node.classList.add('opt--active')

      that.ev.emit('material-channels',{...prop})
    })

    //geometry
    Select('.inspector-geometry-inner>div').onChange(prop=>{
      //console.log(prop.$node, prop.val)
      prop.$elements.forEach($node=>{
        $node.classList.remove('opt--active')
      })
      prop.$node.classList.add('opt--active')

      that.ev.emit('geometry',{...prop})
    })

    //uv
    Select('.inspector-uv-inner>div').onChange(prop=>{
      console.log(prop.$node, prop.val)
      
    })

    //single sided
    Switch('.inspector-single-sided-switch','inspector-single-sided-switch--active').onChange(prop=>{
      console.log(prop.$node, prop.val)
      that.ev.emit('single-sided',{val:prop.val})
      
    })

    //skybox
    Switch('.inspector-skybox-switch','inspector-skybox-switch--active',true).onChange(prop=>{
      console.log(prop.$node, prop.val)
      that.ev.emit('skybox',{val:prop.val})
      
    })

  }


  //setTimeout(()=>{

  // that.ev.emit('viewport-2d',{name:'viewport-2d....'}) 
  //})
  // that.ev.on('aaa', (value, context) => {
  //  console.log(value)

  // })
  // that.ev.trigger('aaa',{name:'aaa',attr:{a:'a',b:'b'}})

  // console.log(that.ev.on  ,that.ev.emit)
  
  return that
}