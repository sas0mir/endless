import React, { Component } from 'react';
//import { THREE, AmmoPhysics, PhysicsLoader } from 'enable3d'
import * as THREE from 'three'
import {default as Ammo } from 'ammo.js/builds/ammo'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Helper from './helper'
import Modal from './modal'
import MaterialShop from './materialShop'
import SubMaterials from './subMaterials'
import Instruments from './instruments'
import SubInstruments from './SubInstruments'
import Controls from './controls'
import './componentsStyle.css'
import _ from 'lodash'
import SubdivisionModifier from 'three-subdivision-modifier'

//const SubdivisionModifier = require('three-subdivision-modifier')

class ConstructorScene extends Component {
  constructor() {
    super();
    this.state = {
      pickedObject: null,
      currentCamera: null,
      orbit: null,
      lookAtCoords: [],
      rigidBodies: [],
      physics: false
    }
  }

  componentDidMount(){
    this.main()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.mode === 'game') {
      this.setState({openModal: true})
    }
  }

  editMesh = (attribute, value) => {
    console.log('EDIT->', attribute, value)
    this.scene.children.map(ch => {
      if(ch.id === this.state.pickedObject) {
        ch[attribute] = value
        if(attribute === 'delete') {
          this.scene.remove(ch)
          ch.geometry.dispose()
          ch.material.dispose()
          ch = undefined
        }
      }
    })
  }

  setMaterial = (m) => {
    this.setState({ subMaterialsMenu: null })
    if(this.state.pickedObject) {
      this.scene.children.map(ch => {
        if(ch.id === this.state.pickedObject) {
          if(ch.geometry.parameters.heightSegments && ch.geometry.parameters.widthSegments) {
            let texture = new THREE.TextureLoader().load(m)
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set( ch.geometry.parameters.widthSegments, ch.geometry.parameters.heightSegments );
            let material = new THREE.MeshPhongMaterial( {map: texture, bumpMap: texture, morphTargets: true} )
            ch.material = material
          } else {
            let texture = new THREE.TextureLoader().load(m)
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set( 10, 10 );
            let material = new THREE.MeshPhongMaterial( {map: texture, morphTargets: true} )
            ch.material = material
          }
        }
      })
    }
  }

  addMesh = (mesh, submenu) => {
    this.setState({ subMenu: null })
    var lookAtVector = new THREE.Vector3()
    this.camera.getWorldDirection(lookAtVector)
    let px = this.camera.position.x + lookAtVector.x * 10
    let py = this.camera.position.y + lookAtVector.y * 10
    let pz = this.camera.position.z + lookAtVector.z * 10
    //let colShape = new this.ammo.btBoxShape(new this.ammo.btVector3(1, 1, 1))
    if(submenu === 'primitives') {
      let material = new THREE.MeshPhongMaterial( {color: '#aaaaaa'} )
      let geometry = {}
      // let texture = new THREE.TextureLoader().load('/textures/grass2.jpg')
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set( 1, 1 );
      if(mesh === 'box') {
        geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
      }
      if(mesh === 'sphere') {
        geometry = new THREE.SphereGeometry(1, 25, 25)
        //colShape = new this.ammo.btSphereShape(1)
      }
      if(mesh === 'cone') {
        geometry = new THREE.ConeGeometry( 1, 1, 25, 25 )
      }
      if(mesh === 'cylinder') {
        geometry = new THREE.CylinderGeometry( 1, 1, 2, 25 )
      }
      if(mesh === 'circle') {
        geometry = new THREE.CircleGeometry( 1, 25 )
      }
      if(mesh === 'plane') {
        geometry = new THREE.PlaneGeometry( 1, 1, 2, 2 )
      }
      if(mesh === 'dodecahedron') {
        geometry = new THREE.DodecahedronGeometry( 1, 0 )
      }
      if(mesh === 'octahedron') {
        geometry = new THREE.OctahedronGeometry( 1, 0 )
      }
      if(mesh === 'ring') {
        geometry = new THREE.RingGeometry( 0.8, 1, 25 )
      }
      if(mesh === 'torus') {
        geometry = new THREE.TorusGeometry( 1, 0.2, 10, 25 )
      }
      if(mesh === 'text') {
        const loader1 = new THREE.FontLoader()
        loader1.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {
          geometry = new THREE.TextGeometry( 'Hello three.js!', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
          } )
        })
      }
      if(mesh === 'lathe') {
        const points = []
        for ( let i = 0; i < 10; i ++ ) {
          points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 4 + 2, ( i - 2 ) ) )
        }
        geometry = new THREE.LatheGeometry( points )
      }
      if(mesh === 'extrude') {
        const shape = new THREE.Shape()
        shape.moveTo( 0,0 )
        shape.lineTo( 0, 1 )
        shape.lineTo( 1, 1 )
        shape.lineTo( 1, 0 )
        shape.lineTo( 0, 0 )
        const extrudeSettings = {
          steps: 2,
          depth: 2,
          bevelEnabled: true,
          bevelThickness: 0.3,
          bevelSize: 0.2,
          bevelOffset: 1,
          bevelSegments: 1
        }
        geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings )
      }
      let newMesh = new THREE.Mesh( geometry, material )
      newMesh.position.set(px, py, pz)
      newMesh.castShadow = true
      newMesh.receiveShadow = true
      newMesh.mass = 1
      newMesh.name = mesh
      this.scene.add( newMesh )

      // let transform = new this.ammo.btTransform()
      // transform.setIdentity()
      // transform.setOrigin(new this.ammo.btVector3(newMesh.position.x, newMesh.position.y, newMesh.position.z))
      // transform.setRotation(new this.ammo.btQuaternion(newMesh.quaternion.x, newMesh.quaternion.y, newMesh.quaternion.z, newMesh.quaternion.w))
      // let motionState = new this.ammo.btDefaultMotionState( transform )
      // //let colShape = new this.ammo.btSphereShape(1)
      // colShape.setMargin( 0.005 )
      // let localInertia = new this.ammo.btVector3( 0, 0, 0 )
      // colShape.calculateLocalInertia( newMesh.mass, localInertia )
      // let rbInfo = new this.ammo.btRigidBodyConstructionInfo( newMesh.mass, motionState, colShape, localInertia )
      // let body = new this.ammo.btRigidBody( rbInfo )
      // this.physicsWorld.addRigidBody( body )
      // newMesh.userData.physicsBody = body
      // this.rigidBodies.push(newMesh)
    }

    if(submenu === 'interior') {
      const GLTFload = new GLTFLoader()
      let object = {}
      if(mesh === 'chair_classic_wood') {
        GLTFload.load('/chair_classic_wood.glb', (glt_model) => {
          object = glt_model.scene
          this.scene.add(glt_model.scene)
        })
      }
      if(mesh === 'chair_future_metal') {
        GLTFload.load('/chair_future_metal.glb', (glt_model) => {
          console.log('MODEL->', glt_model)
          object = glt_model.scene
          this.scene.add(glt_model.scene)
        })
      }
      if(mesh === 'table_classic_wood') {
        GLTFload.load('/table_classic_wood.glb', (glt_model) => {
          this.scene.add(glt_model.scene)
        })
      }
      if(mesh === 'table_future_1') {
        GLTFload.load('/table_future_1.gltf', (glt_model) => {
          this.scene.add(glt_model.scene)
        })
      }
      if(mesh === 'room') {
        GLTFload.load('/room1.glb', (glt_model) => {
          this.scene.add(glt_model.scene)
        })
      }
    }

    if(submenu === 'exterior') {
      const GLTFload = new GLTFLoader()
      let object = {}
      if(mesh === 'tree_europ_1') {
        GLTFload.load('/tree_europ_1.glb', (glt_model) => {
          console.log('MODEL->', glt_model)
          object = glt_model.scene
          this.scene.add(glt_model.scene)
        })
      }
    }
  }

  main = () => {
    Ammo().then((done) => {
      let me = this
      this.ammo = done
      let clock = new THREE.Clock()
      //INIT PHYSYCS
      let collisionConfiguration = new done.btDefaultCollisionConfiguration()
      let dispatcher = new done.btCollisionDispatcher(collisionConfiguration)
      let overlappingPairCache = new done.btDbvtBroadphase()
      let solver = new done.btSequentialImpulseConstraintSolver()
      let physicsWorld = new done.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration)
      physicsWorld.setGravity(new done.btVector3(0, -10, 0))
      this.physicsWorld = physicsWorld
      let rigidBodies = []
      let tmpTrans = new done.btTransform()
      this.rigidBodies = rigidBodies
      this.tmpTrans = tmpTrans
      const canvas = document.getElementById('webgl')
      const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
      renderer.autoClearColor = false
      renderer.gammaInput = true
      renderer.gammaOutput = true
      renderer.shadowMap.enabled = true
      const fov = 50
      const aspect = window.innerWidth / window.innerHeight
      const near = 0.1
      const far = 1500
      const cameraPerspective = new THREE.PerspectiveCamera(fov, aspect, near, far)
      //const cameraOrthographic = new THREE.OrthographicCamera(-600 * aspect, 600 * aspect, 600, -600, 0.01, 30000)
      const camera = cameraPerspective
      camera.position.set( 10, 10, 15 )
      camera.lookAt( 0, 0, 0 )

      const controls = new OrbitControls(camera, canvas)
      controls.target.set(0, 0, 0)
      controls.update()
    
      var pickPosition = me.pickPosition

      const scene = new THREE.Scene()
      this.renderer = renderer
      this.camera = camera
      this.setState({ currentCamera: camera })
      this.scene = scene
      const loader = new THREE.CubeTextureLoader()
      //skybox
      const skybox = loader.load([
        '/textures/clouds1_east.bmp',
        '/textures/clouds1_west.bmp',
        '/textures/clouds1_up.bmp',
        '/textures/clouds1_down.bmp',
        '/textures/clouds1_north.bmp',
        '/textures/clouds1_south.bmp',
      ])
      scene.background = skybox

      //terrain
      //light
      let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 )
      hemiLight.color.setHSL( 0.6, 0.6, 0.6 )
      hemiLight.groundColor.setHSL( 0.1, 1, 0.4 )
      hemiLight.position.set( 0, 50, 0 )
      scene.add( hemiLight )
      let dirLight = new THREE.DirectionalLight( 0xffffff , 1)
      dirLight.color.setHSL( 0.1, 1, 0.95 )
      dirLight.position.set( -1, 1.75, 1 )
      dirLight.position.multiplyScalar( 100 )
      scene.add( dirLight )
      dirLight.castShadow = true

      dirLight.shadow.mapSize.width = 2048
      dirLight.shadow.mapSize.height = 2048

      let d = 50
      dirLight.shadow.camera.left = -d
      dirLight.shadow.camera.right = d
      dirLight.shadow.camera.top = d
      dirLight.shadow.camera.bottom = -d
      dirLight.shadow.camera.far = 1000

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }

      function pick(normalizedPosition, scene, camera) {
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(normalizedPosition, camera)
        const intersectedObjects = raycaster.intersectObjects(scene.children, true)
        const transformControls = new TransformControls(
          camera,
          renderer.domElement,
        )
        transformControls.addEventListener('change', () => renderer.render(scene, camera));
        transformControls.addEventListener( 'dragging-changed', function ( event ) {
          controls.enabled = ! event.value;
        } )
        transformControls.setSpace('world')
        transformControls.name = 'transformControls'
        console.log('PICK->', intersectedObjects) //+object.name to if
        if (intersectedObjects.length && ['TransformControlsPlane', 'Line'].indexOf(intersectedObjects[0].object.type) < 0) {
          transformControls.detach()
          me.scene.children.map(ch => {
            if(ch.name === 'transformControls') {
              ch.detach()
              scene.remove(ch)
            }
          })
          me.setState({ pickedObject: intersectedObjects[0].object.id, pickedObjectForControls: intersectedObjects[0].object }, () => {
            scene.add(transformControls)
            transformControls.attach(intersectedObjects[0].object)
          })
        } else {
          let oldPickedId = me.state.pickedObject ? _.cloneDeep(me.state.pickedObject) : null
          me.setState({ pickedObject: null, pickedObjectForControls: { } }, () => {
            me.scene.children.map(ch => {
              if(Number(ch.id) === Number(oldPickedId)) {
                transformControls.detach(ch)
              }
              if(ch.name === 'transformControls') {
                ch.detach()
                scene.remove(ch)
              }
            })
            scene.remove(transformControls)
          })
        }
        if(me.state.pickedObject) {
          window.addEventListener( 'keydown', function ( event ) {
            switch ( event.keyCode ) {
              case 81: // Q
                transformControls.setSpace( transformControls.space === "local" ? "world" : "local" )
                break
              case 16: // Shift
                transformControls.setTranslationSnap( 100 )
                transformControls.setRotationSnap( THREE.MathUtils.degToRad( 15 ) )
                transformControls.setScaleSnap( 0.25 )
                break
              case 87: // W
                transformControls.setMode( "translate" )
                break
              case 69: // E
                transformControls.setMode( "rotate" )
                break
              case 82: // R
                transformControls.setMode( "scale" )
                break
              case 67: // C
                // const position = currentCamera.position.clone();
                // currentCamera = currentCamera.isPerspectiveCamera ? cameraOrtho : cameraPersp;
                // currentCamera.position.copy( position );
                // orbit.object = currentCamera;
                // control.camera = currentCamera;
                // currentCamera.lookAt( orbit.target.x, orbit.target.y, orbit.target.z );
                // onWindowResize();
                break;
              case 86: // V
                // const randomFoV = Math.random() + 0.1;
                // const randomZoom = Math.random() + 0.1;
                // cameraPersp.fov = randomFoV * 160;
                // cameraOrtho.bottom = - randomFoV * 500;
                // cameraOrtho.top = randomFoV * 500;
                // cameraPersp.zoom = randomZoom * 5;
                // cameraOrtho.zoom = randomZoom * 5;
                //onWindowResize();
                break
              case 187:
              case 107: // +, =, num+
                transformControls.setSize( transformControls.size + 0.1 )
                break
              case 189:
              case 109: // -, _, num-
                transformControls.setSize( Math.max( transformControls.size - 0.1, 0.1 ) )
                break
              case 88: // X
                transformControls.showX = ! transformControls.showX
                break
              case 89: // Y
                transformControls.showY = ! transformControls.showY
                break
              case 90: // Z
                transformControls.showZ = ! transformControls.showZ
                break
              case 32: // Spacebar
              console.log('000->', me.scene.children)
                transformControls.enabled = ! transformControls.enabled
                break
            }
          })
        }
      }

      function updatePhysics(deltaTime) {
        // Step world
        physicsWorld.stepSimulation( deltaTime, 10 )
        // Update rigid bodies
        for ( let i = 0; i < rigidBodies.length; i++ ) {
            let objThree = rigidBodies[ i ]
            let objAmmo = objThree.userData.physicsBody
            let ms = objAmmo.getMotionState()
            if ( ms ) {
              ms.getWorldTransform( tmpTrans )
              
              let p = tmpTrans.getOrigin()
              let q = tmpTrans.getRotation()
              objThree.position.set( p.x(), p.y(), p.z() )
              objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() )
            }
        }
      }

      function render(time) {
        let deltaTime = clock.getDelta()
        time *= 0.001
        //Физику включаем с кнопки
        //updatePhysics(deltaTime)
        if(me.state.physics) {
          updatePhysics(deltaTime)
        }

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }
      document.getElementById("webgl").addEventListener('mousemove', this.setPickPosition)
      document.getElementById("webgl").addEventListener('mouseout', this.clearPickPosition)
      document.getElementById("webgl").addEventListener('mouseleave', this.clearPickPosition)
      document.getElementById("webgl").addEventListener('dblclick', (e) => pick(pickPosition, scene, camera))

      requestAnimationFrame(render)
    })
  }

  pickPosition = {x: 0, y: 0}

  getCanvasRelativePosition = (event) => {
    const rect = document.getElementById("webgl").getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * document.getElementById("webgl").width  / rect.width,
      y: (event.clientY - rect.top ) * document.getElementById("webgl").height / rect.height,
    };
  }

  setPickPosition = (event) => {
    const pos = this.getCanvasRelativePosition(event);
    this.pickPosition.x = (pos.x / document.getElementById("webgl").width ) *  2 - 1
    this.pickPosition.y = (pos.y / document.getElementById("webgl").height) * -2 + 1
  }
   
  clearPickPosition = () => {
    this.pickPosition.x = -100000
    this.pickPosition.y = -100000
  }

  modalButtonClickHandler = (event) => {
      //let exporter = new THREE.SceneExporter()
      let sceneToSave = this.scene.toJSON()//JSON.stringify(exporter.parse(this.scene))//
      //console.log('SCENE JSON->', sceneToSave)
      //и дальше джейсон сохраняем в профиль игрока в БД, пока что в стейт
      // this.setState({ savedScene: this.scene, openModal: false }, () => {
      //   this.main('game')
      // })
      this.props.startGame(sceneToSave)
  }

  openSubInstruments = (menu) => {
    this.setState({ subMenu: this.state.subMenu === menu ? '' : menu })
  }

  openSubMaterials = (menu) => {
    this.setState({ subMaterialsMenu: this.state.subMaterialsMenu === menu ? '' : menu })
  }

  modifyScene = (event) => {
    this.setState({ physics: !this.state.physics })
  }

  render() {
    const modalButtons = [{
      btnText: 'Yes',
      btnEvent: this.modalButtonClickHandler
    },
    {
      btnText: 'No',
      btnEvent: () => {
        console.log('WORKS REJECT SAVE EVENT')
        this.setState({ openModal: false })
        //let sceneToSave = this.scene.toJSON()
      }
    }]
    console.log('RENDER->', this.physicsWorld, this.rigidBodies, this.scene)
    return (
      <div>
        <MaterialShop openSubMaterials={this.openSubMaterials}/>
        <Instruments openSubInstruments={this.openSubInstruments}/>
        <Controls setEdit={this.editMesh} open={this.state.pickedObject} object={{ id: this.state.pickedObject, obj_body: this.state.pickedObjectForControls}}/>
        {this.state.subMenu && <SubInstruments createMesh={this.addMesh} open={this.state.subMenu}/>}
        {this.state.subMaterialsMenu && <SubMaterials setMaterial={this.setMaterial} open={this.state.subMaterialsMenu}/>}
        {this.state.openModal && <Modal text='Save Scene?' buttons={modalButtons}/>}
        {this.state.pickedObject && <Helper text={this.state.helperText}/>}
        <button className='constructor_modificator_btn_1' onClick={e => this.modifyScene(e)}>PHY</button>
        <canvas className='main_canvas' width={window.innerWidth} height={window.innerHeight} id='webgl'></canvas>
      </div>
    )
  }
}
export default ConstructorScene