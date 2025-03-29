import React, { Component, useState } from 'react';
import { THREE, AmmoPhysics, PhysicsLoader } from 'enable3d'
import {default as Ammo } from 'ammo.js/builds/ammo'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Helper from './helper'
import Modal from './modal'
import './componentsStyle.css'
import _ from 'lodash'
import { Vector3 } from 'three';
import { resolveModuleName } from 'typescript';

class GameScene extends Component {
  constructor() {
    super();
    this.state = {
      pickedObject: null,
      currentCamera: null,
      orbit: null,
      mode: 'constructor',
      lookAtCoords: []
    }
  }

  componentDidMount(){
    this.main()
  }

  componentWillReceiveProps(nextProps) {
  }

  main = () => {
    Ammo().then(async (done) => {
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
      const far = 1000
      const cameraPerspective = new THREE.PerspectiveCamera(fov, aspect, near, far)
      //const cameraOrthographic = new THREE.OrthographicCamera(-600 * aspect, 600 * aspect, 600, -600, 0.01, 30000)
      const camera = cameraPerspective

      //let sceneLoader = new THREE.SceneLoader()
      let scene = new THREE.ObjectLoader().parse(_.get(this.props, 'scene'))//new THREE.Scene()
      //sceneLoader.parse(JSON.parse(_.get(this.props, 'scene')), function (e) {scene = e.scene;}, '.')
      this.renderer = renderer
      this.camera = camera
      this.setState({ currentCamera: camera })
      this.scene = scene
      scene.children.map(ch => {
        //console.log('CH->', ch)
        console.log('MASS->', ch.id, ch.name, ch.mass, ch)
        if(ch.name !== 'land') ch.mass = 1
        if(ch.name === 'land') ch.mass = 0
        if(['sphere', 'box', 'land'].indexOf(ch.name) >= 0) {
          //ch.mass = ch.name === 'sphere' ? 1 : 0//ch.mass = 1
          let transform = new done.btTransform()
          transform.setIdentity()
          transform.setOrigin(new done.btVector3(ch.position.x, ch.position.y, ch.position.z))
          transform.setRotation(new done.btQuaternion(ch.quaternion.x, ch.quaternion.y, ch.quaternion.z, ch.quaternion.w))
          let motionState = new done.btDefaultMotionState( transform )
          let colShape = ch.name === 'sphere' ? new done.btSphereShape(0.8) : new done.btBoxShape(new done.btVector3(ch.scale.x * 0.8, ch.scale.y * 0.8, ch.scale.z * 0.8))
          colShape.setMargin( 0 )
          let localInertia = new done.btVector3( 0, 0, 0 )
          colShape.calculateLocalInertia( ch.mass, localInertia )
          let rbInfo = new done.btRigidBodyConstructionInfo( ch.mass, motionState, colShape, localInertia )
          let body = new done.btRigidBody( rbInfo )
          physicsWorld.addRigidBody( body )
          ch.userData.physicsBody = body
          rigidBodies.push(ch)
        }
      })
      const controls = new OrbitControls(camera, canvas)
      //HERO
      const gltfLoader = new GLTFLoader()
      let hero = await loadModel('/robottest1.glb')
      if(hero && hero.id) {
        scene.add(hero)
        hero.mass = 1
        let herotransform = new done.btTransform()
        herotransform.setIdentity()
        herotransform.setOrigin(new done.btVector3(hero.position.x, hero.position.y, hero.position.z))
        herotransform.setRotation(new done.btQuaternion(hero.quaternion._x, hero.quaternion._y, hero.quaternion._z, hero.quaternion._w))
        let heromotionState = new done.btDefaultMotionState( herotransform )
        let herocolShape = new done.btBoxShape(new done.btVector3(1, 0.8, 1))//new done.btSphereShape(1) 
        herocolShape.setMargin( 0 )
        let herolocalInertia = new done.btVector3( 0, 0, 0 )
        herocolShape.calculateLocalInertia( hero.mass, herolocalInertia )
        let herorbInfo = new done.btRigidBodyConstructionInfo( hero.mass, heromotionState, herocolShape, herolocalInertia )
        let herobody = new done.btRigidBody( herorbInfo )
        physicsWorld.addRigidBody( herobody )
        hero.userData.physicsBody = herobody
        rigidBodies.push(hero)
        camera.position.set( hero.position.x + 1, hero.position.y + 3, hero.position.z + 1 )
        camera.lookAt( hero.position.x, hero.position.y, hero.position.z )
        controls.target.set(hero.position.x, hero.position.y, hero.position.z)
        controls.update()
      }
      

      //const loader = new THREE.CubeTextureLoader()
      //skybox
      // const skybox = loader.load([
      //   '/textures/clouds1_east.bmp',
      //   '/textures/clouds1_west.bmp',
      //   '/textures/clouds1_up.bmp',
      //   '/textures/clouds1_down.bmp',
      //   '/textures/clouds1_north.bmp',
      //   '/textures/clouds1_south.bmp',
      // ])
      // scene.background = skybox

      function loadModel(name) {
        return new Promise((resolve, reject) => {
          gltfLoader.load('/dummy2.gltf', data => {
            data.scene.animations = data.animations
            data.scene.castShadow = true
            data.scene.receiveShadow = true
            data.scene.name = 'hero'
            data.scene.scale.set(1, 1, 1)
            data.scene.position.set(0, 20, 0)
            console.log('ANIME->', data.scene.animations)
            resolve(data.scene)
          }, null, reject)
        })
      }

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

      // function moveHero(deltaTime, impulse, clipname) {
      //   if(!hero) return
      //   let imp =  new done.btVector3(impulse.x, impulse.y, impulse.z)
      //   const clip = THREE.AnimationClip.findByName( clips, clipname)
      //     const action = mixer.clipAction( clip )
      //     if(clip && action) {
      //       console.log('CLIP->', clip, action)
      //       action.play()  
      //       mixer.update(deltaTime)
      //     }
      //   if(imp) {
      //     imp.op_mul(8)
      //     let heroPhysicsBody = hero.userData.physicsBody
      //     heroPhysicsBody.setLinearVelocity(imp)
          
      //   }
      // }

      function render(time) {
        let deltaTime = clock.getDelta()
        time *= 0.001
        updatePhysics(deltaTime)
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
        controls.target = hero ? new THREE.Vector3(hero.position.x, hero.position.y, hero.position.z) : new THREE.Vector3(0,0,0)
        controls.minDistance = 4
        controls.maxDistance = 6
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(render)
        const mixer = new THREE.AnimationMixer( hero )
        const clips = hero.animations
        let clip = THREE.AnimationClip.findByName( clips, 'Idle')
        let heroPhysicsBody = hero.userData.physicsBody
        window.addEventListener('keypress', (e) => {
          console.log('W0->', e.key, e.repeat)
          if(e.key === ' ') {
            // let lookAtVector = new THREE.Vector3()
            // camera.getWorldDirection(lookAtVector)
            // let impulse = new done.btVector3(0, 1, 0)
            //moveHero(deltaTime, {x: 0, y: 1, z: 0}, 'one_step_r')
            clip = THREE.AnimationClip.findByName( clips, 'one_step_r')
            let impulse = new done.btVector3(0, 1, 0)
            impulse.op_mul(8)
            heroPhysicsBody.setLinearVelocity(impulse)
          }
          if(e.key === 'w') {
            let lookAtVector = new THREE.Vector3()
            camera.getWorldDirection(lookAtVector)
            let px = camera.position.x + lookAtVector.x * 10
            let py = camera.position.y + lookAtVector.y * 10
            let pz = camera.position.z + lookAtVector.z * 10
            //moveHero(deltaTime, {x: px, y: py, z: pz}, 'walk_test')
            clip = THREE.AnimationClip.findByName( clips, 'walk_test')
            let impulse = new done.btVector3(px, py, pz)
            impulse.op_mul(8)
            heroPhysicsBody.setLinearVelocity(impulse)
          }
          e.stopImmediatePropagation()
          e.stopPropagation()
        })
        window.addEventListener('keyup', (e) => {
          console.log('W1->', e.key, e.repeat)
          //68S 65A 83S 32space 69E 16shift 17ctrlleft
          if(['w', ' '].indexOf(e.key) >= 0) {
            heroPhysicsBody.setLinearVelocity(null)
            //moveHero(deltaTime, {x: 0, y: -1, z: 0}, 'Idle')
          }
          e.stopImmediatePropagation()
          e.stopPropagation()
        })
        let action = mixer.clipAction( clip )
        if(clip && action) {
          console.log('ACT->', action)
          action.play()  
          mixer.update(deltaTime)
        }
      }
      requestAnimationFrame(render)
    })
  }

  getCanvasRelativePosition = (event) => {
    const rect = document.getElementById("webgl").getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * document.getElementById("webgl").width  / rect.width,
      y: (event.clientY - rect.top ) * document.getElementById("webgl").height / rect.height,
    };
  }

  modalButtonClickHandler = (event) => {
      console.log('WORKS SAVE EVENT->', event)
      //let sceneToSave = this.scene.toJSON()
      //console.log('SCENE JSON->', sceneToSave)
      //и дальше джейсон сохраняем в профиль игрока в БД, пока что в стейт
      this.setState({ savedScene: this.scene, openModal: false }, () => {
        this.main('game')
      })
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
    return (
      <div>
        {this.state.openModal && <Modal text='Save Scene?' buttons={modalButtons}/>}
        {this.state.pickedObject && <Helper text={this.state.helperText}/>}
        <canvas className='main_canvas' width={window.innerWidth} height={window.innerHeight} id='webgl'></canvas>
      </div>
    )
  }
}
export default GameScene