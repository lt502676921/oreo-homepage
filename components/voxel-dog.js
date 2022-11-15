import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { DogSpinner, DogContainer } from './voxel-dog-loader'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelDog = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()
  // const urlDogGLB = '/dog.glb'
  const GLBUrls = [
    'Lynkco09_EXT_d.glb',
    'Lynkco09_INT_d.glb',
    'Lynkco09_Sunproof_d.glb',
    'Lynkco09_Trunk_d.glb',
    'Lynkco09_Tires_d.glb',
    'Lynkco09_LBDoor_d.glb',
    'Lynkco09_LFDoor_d.glb',
    'Lynkco09_RFDoor_d.glb',
    'Lynkco09_RBDoor_d.glb'
  ]

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer
      const scene = new THREE.Scene()

      const target = new THREE.Vector3(-0.5, 1.2, 0)
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )

      // 640 -> 240
      // 8   -> 6
      const scale = scH * 0.005 + 4.8
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      const ambientLight = new THREE.AmbientLight(0xcccccc, 1)
      scene.add(ambientLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target

      // 添加灯光
      const light1 = new THREE.DirectionalLight(0xffffff, 1)
      light1.position.set(0, 0, 10)
      scene.add(light1)
      const light2 = new THREE.DirectionalLight(0xffffff, 1)
      light1.position.set(0, 0, -10)
      scene.add(light2)
      const light3 = new THREE.DirectionalLight(0xffffff, 1)
      light1.position.set(10, 0, 0)
      scene.add(light3)
      const light4 = new THREE.DirectionalLight(0xffffff, 1)
      light1.position.set(-10, 0, 0)
      scene.add(light4)
      const light5 = new THREE.DirectionalLight(0xffffff, 1)
      light1.position.set(0, 10, 0)
      scene.add(light5)
      const light6 = new THREE.DirectionalLight(0xffffff, 0.3)
      light1.position.set(5, 10, 0)
      scene.add(light6)
      const light7 = new THREE.DirectionalLight(0xffffff, 0.3)
      light1.position.set(0, 10, 5)
      scene.add(light7)
      const light8 = new THREE.DirectionalLight(0xffffff, 0.3)
      light1.position.set(0, 10, -5)
      scene.add(light8)
      const light9 = new THREE.DirectionalLight(0xffffff, 0.3)
      light1.position.set(-5, 10, 0)
      scene.add(light9)

      let loadPromises = []
      for (let i = 0; i < GLBUrls.length; i++) {
        loadPromises.push(
          loadGLTFModel(scene, GLBUrls[i], {
            receiveShadow: false,
            castShadow: false
          })
        )
      }
      Promise.all(loadPromises).then(() => {
        animate()
        setLoading(false)
      })

      // loadGLTFModel(scene, urlDogGLB, {
      //   receiveShadow: false,
      //   castShadow: false
      // }).then(() => {
      //   animate()
      //   setLoading(false)
      // })

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req)
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  return (
    <DogContainer ref={refContainer}>{loading && <DogSpinner />}</DogContainer>
  )
}

export default VoxelDog
