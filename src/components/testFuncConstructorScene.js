import React, { useEffect, useState } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import './componentsStyle.css'

const ConstructionScene = (props) => {

  const [pickedObject, setPickedObject] = useState(null)
  const [currentCamera, setCurrentCamera] = useState(null)
  const [currentOrbit, setCurrentOrbit] = useState(null)
  const [pickPosition, setPickPosition] = useState({x: 0, y: 0})
  const [canvas, setCanvas] = useState(document.getElementById('webjl'))
  const [scene, setScene] = useState(null)
  const [renderer, setRenderer] = useState(null)
  const [camera, setCamera] = useState(null)
  
  useEffect(() => {
    if(document.getElementById('webjl')) {
      console.log('WORKS->', document)
      setCanvas(document.getElementById('webjl'), () => {
        renderScene()
      })
    }
    console.log('1111')
  }, [])
  

  const renderScene = () => {
    setRenderer(new THREE.WebGLRenderer({canvas}))
    renderer.autoClearColor = false
    const fov = 50
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 1000
    const cameraPerspective = new THREE.PerspectiveCamera(fov, aspect, near, far)
    const cameraOrthographic = new THREE.OrthographicCamera(-600 * aspect, 600 * aspect, 600, -600, 0.01, 30000)
    setCamera(cameraPerspective)
    camera.position.set( 50, 50, 30 );
    camera.lookAt( 0, 0, 0 );
    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 0, 0)
    controls.update()
    setScene(new THREE.Scene()) 
    const loader = new THREE.CubeTextureLoader()
    //skybox
    const texture = loader.load([
      '/textures/clouds1_east.bmp',
      '/textures/clouds1_west.bmp',
      '/textures/clouds1_up.bmp',
      '/textures/clouds1_down.bmp',
      '/textures/clouds1_north.bmp',
      '/textures/clouds1_south.bmp',
    ])
    scene.background = texture
    let textureForPlane = new THREE.TextureLoader().load('/textures/ground2.jpg')
    textureForPlane.wrapS = THREE.RepeatWrapping
    textureForPlane.wrapT = THREE.RepeatWrapping
    textureForPlane.repeat.set( 10, 10 )
    var geometry = new THREE.PlaneGeometry( 100, 100, 100, 100 )
    var material = new THREE.MeshPhongMaterial( {map: textureForPlane, morphTargets: true} )
    var plane = new THREE.Mesh( geometry, material )
    plane.position.set(0, 0, 0)
    plane.rotateX(-(Math.PI / 2))
    plane.receiveShadow = true
    plane.castShadow = true
    scene.add( plane )
    //light
    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(0, 20, 0)
    scene.add(light)
    canvas.addEventListener('mousemove', (event) => preSetPickPosition(event.touches[0]))
    canvas.addEventListener('mouseout', setPickPosition(null))
    canvas.addEventListener('mouseleave', setPickPosition(null))
    canvas.addEventListener('click', (e) => pick(pickPosition, scene, camera))
    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault();
      preSetPickPosition(event.touches[0])
    }, {passive: false})
    canvas.addEventListener('touchmove', (event) => {
      preSetPickPosition(event.touches[0])
    })
    canvas.addEventListener('touchend', setPickPosition(null))

    const resizeRendererToDisplaySize = () => {
      //const canvas = renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    const render = (time) => {
      time *= 0.001;
      if (resizeRendererToDisplaySize()) {
        //const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        setCamera(camera)
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render)
  }
  
  
  
  const getCanvasRelativePosition = (event) => {
    const rect = document.getElementById("webgl").getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * document.getElementById("webgl").width  / rect.width,
      y: (event.clientY - rect.top ) * document.getElementById("webgl").height / rect.height
    }
  }
  const preSetPickPosition = (event) => {
    const pos = getCanvasRelativePosition(event);
    setPickPosition({
      x: (pos.x / document.getElementById("webgl").width ) *  2 - 1,
      y: (pos.y / document.getElementById("webgl").height) * -2 + 1
    })
  }

  useEffect(() => {
    //выполнится только если props.addMesh изменился (если указан 2ой параметр [])
    addMesh(props.addMesh)
  }, [props.addMesh])

  useEffect(() => {
    setNewMaterial(props.setNewMaterial)
  }, [props.setNewMaterial])

  useEffect(() => {
    console.log('00000')
    if(props.editMesh.dimension) {
      editMesh(props.editMesh.dimension, props.editMesh.step)
    }
    
  }, [props.editMesh])

  

  const pick = (normalizedPosition, scene, camera) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(normalizedPosition, camera);
    const intersectedObjects = raycaster.intersectObjects(scene.children);
    const transformControls1 = new TransformControls(
      camera,
      renderer.domElement,
    );
    transformControls1.addEventListener('change', () => renderer.render(scene, camera));
    transformControls1.setSpace('world');
    transformControls1.name = 'transformControls'
    if (intersectedObjects.length) {
      if(!pickedObject && intersectedObjects[0].object && intersectedObjects[0].object.name !== 'transformControls' || pickedObject && intersectedObjects[0].object && pickedObject !== intersectedObjects[0].object.id && intersectedObjects[0].object.name !== 'transformControls') {
        setPickedObject(intersectedObjects[0].object.id)
        scene.children.map(ch => {
          if(ch.id === pickedObject) {
            scene.add(transformControls1);
            transformControls1.attach(ch)
          } else if(ch.material && ch.id !== pickedObject && ch.name !== 'transformControls') {
            console.log('REMOVE PICKED ANOTHER OBJECT', ch, scene)
            transformControls1.detach(ch)
            scene.remove(transformControls1)
          }
        })
        
      }
    } else {
      setPickedObject(null)
      scene.children.map(ch => {
        if(ch.name === 'transformControls') {
          console.log('REMOVE NO OBJECT INTERSECTED')
          scene.remove(ch)
        }
      })
    }
  }

  const editMesh = (dim, step) => {
    scene.children.map(ch => {
      if(ch.id === pickedObject) {
        let pos = ch.position
        let scale = ch.scale
        let rotation = ch.rotation
        if(['x', 'y', 'z'].indexOf(dim) >= 0) {
          ch.position.set(
            dim === 'x' ? pos.x + step : pos.x, 
            dim === 'y' ? pos.y + step : pos.y, 
            dim === 'z' ? pos.z + step : pos.z
          )
        }
        if(['sx', 'sy', 'sz'].indexOf(dim) >= 0) {
          ch.scale.set(
            dim === 'sx' ? scale.x + step : scale.x, 
            dim === 'sy' ? scale.y + step : scale.y, 
            dim === 'sz' ? scale.z + step : scale.z
          )
        }
        if(dim === 'rx') {
          ch.rotateX(step)
        }
        if(dim === 'ry') {
          ch.rotateY(step)
        }
        if(dim === 'rz') {
          ch.rotateZ(step)
        }
        if(dim === 'delete') {
          scene.remove(ch)
          ch.geometry.dispose()
          ch.material.dispose()
          ch = undefined
        }
      }
    })
  }

  const setNewMaterial = (m, segmentsCount) => {
    if(pickedObject) {
      scene.children.map(ch => {
        if(ch.id === pickedObject) {
          if(ch.geometry.parameters.heightSegments && ch.geometry.parameters.widthSegments) {
            let texture = new THREE.TextureLoader().load(m)
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set( ch.geometry.parameters.widthSegments, ch.geometry.parameters.heightSegments );
            let material = new THREE.MeshPhongMaterial( {map: texture, morphTargets: true} )
            ch.material = material
          } else {
            let texture = new THREE.TextureLoader().load(m)
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set( segmentsCount, segmentsCount );
            let material = new THREE.MeshPhongMaterial( {map: texture, morphTargets: true} )
            ch.material = material
          }
        }
      })
    }
  }

  const addMesh = (mesh) => {
    if(mesh === 'box') {
      let texture = new THREE.TextureLoader().load('/textures/wood1.jpg')
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 1, 1 );
      let geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
      let material = new THREE.MeshPhongMaterial( {map: texture, morphTargets: true} );
      let box = new THREE.Mesh( geometry, material );
      box.position.set(0, 0, 0);
      box.castShadow = true
      box.receiveShadow = true
      scene.add( box );
    }
    if(mesh === 'sphere') {
      let texture = new THREE.TextureLoader().load('/textures/wall1.jpg')
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 1, 1 );
      let geometry = new THREE.SphereGeometry(2, 15, 15);
      let material = new THREE.MeshPhongMaterial( {map: texture, morphTargets: true} );
      let sphere = new THREE.Mesh( geometry, material );
      sphere.position.set(0, 0, 0);
      scene.add( sphere );
    }
    if(mesh === 'circle') {
      let geometry = new THREE.CircleGeometry( 5, 32 );
      let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      let circle = new THREE.Mesh( geometry, material );
      circle.position.set(0, 0, 0)
      scene.add( circle );
    }
    if(mesh === 'cone') {
      let geometry = new THREE.ConeGeometry( 5, 20, 32 );
      let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      let cone = new THREE.Mesh( geometry, material );
      cone.position.set(0, 0, 0)
      scene.add( cone );
    }
  }

  return <canvas className='main_canvas' width={window.innerWidth} height={window.innerHeight} id='webgl'></canvas>
}
export default ConstructionScene