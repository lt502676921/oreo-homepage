import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
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
      // controls.autoRotate = true
      controls.target = target

      // 添加灯光
      const light1 = new THREE.DirectionalLight(0xffffff, 1)
      light1.position.set(0, 0, 10)
      scene.add(light1)
      const light2 = new THREE.DirectionalLight(0xffffff, 1)
      light2.position.set(0, 0, -10)
      scene.add(light2)
      const light3 = new THREE.DirectionalLight(0xffffff, 1)
      light3.position.set(10, 0, 0)
      scene.add(light3)
      const light4 = new THREE.DirectionalLight(0xffffff, 1)
      light4.position.set(-10, 0, 0)
      scene.add(light4)
      const light5 = new THREE.DirectionalLight(0xffffff, 1)
      light5.position.set(0, 10, 0)
      scene.add(light5)
      const light6 = new THREE.DirectionalLight(0xffffff, 0.3)
      light6.position.set(5, 10, 0)
      scene.add(light6)
      const light7 = new THREE.DirectionalLight(0xffffff, 0.3)
      light7.position.set(0, 10, 5)
      scene.add(light7)
      const light8 = new THREE.DirectionalLight(0xffffff, 0.3)
      light8.position.set(0, 10, -5)
      scene.add(light8)
      const light9 = new THREE.DirectionalLight(0xffffff, 0.3)
      light9.position.set(-5, 10, 0)
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
      Promise.all(loadPromises).then(models => {
        animate()
        setLoading(false)

        function setupTweenDoor(source, target, mesh) {
          const carTween = new TWEEN.Tween(source)
            .to(target, 2000)
            .easing(TWEEN.Easing.Quadratic.Out)
          carTween.onUpdate(function (that) {
            mesh.rotation.y = that.y
          })
          carTween.start()
          TWEEN.update()
        }

        function carOpen(door, doors) {
          if (door.doorStatus == 'close') {
            door.doorStatus = 'open'
            for (let i = 0; i < doors.length; i++) {
              setupTweenDoor({ y: 0 }, { y: Math.PI * -0.8 }, doors[i])
            }
          }
        }

        // 拾取对象
        function pickupObjects(event) {
          // 点击屏幕创建一个向量
          var raycaster = new THREE.Raycaster()
          var c = document.getElementsByTagName('canvas')[0]
          // 将鼠标点击位置的屏幕坐标转成threejs中的标准坐标
          var vector = new THREE.Vector3(
            ((event.clientX - c.getBoundingClientRect().left) / c.offsetWidth) *
              2 -
              1,
            -(
              (event.clientY - c.getBoundingClientRect().top) /
              c.offsetHeight
            ) *
              2 +
              1,
            1
          ) // 标准设备坐标
          // 标准设备坐标转世界坐标
          let worldVector = vector.unproject(camera)
          // 射线投射方向单位向量(worldVector坐标减相机位置坐标)
          let ray = worldVector.sub(camera.position).normalize()
          raycaster = new THREE.Raycaster(camera.position, ray)
          // 从相机发射一条射线，经过鼠标点击位置
          // raycaster.setFromCamera(vector, camera)
          // 设置要获取的相交对象（数组）
          let intersects = raycaster.intersectObjects(scene.children, true)
          // console.log(intersects)
          let door = models.find(item => item.name == 'LBDoor')
          console.log(door)
          let doors = []
          door.traverse(function (v) {
            if (v.name.includes('LBDoor')) {
              doors.push(v)
            }
          })
          carOpen(door, doors)
        }
        document.addEventListener('click', pickupObjects, false) //监听单击拾取对象初始化球体
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
