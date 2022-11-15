import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export function loadGLTFModel(
  scene,
  glbPath,
  options = { receiveShadow: true, castShadow: true }
) {
  const { receiveShadow, castShadow } = options

  let INT = []

  // 创建材质
  const EXTMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0
  })
  const frontMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0
  })
  const hoodMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0
  })
  const wheelsMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 0.1
  })
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 1,
    transparent: true
  })

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    const DRACOloader = new DRACOLoader()

    DRACOloader.setDecoderPath('/draco/')
    loader.setDRACOLoader(DRACOloader)
    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = 'dog'
        obj.position.y = 0
        obj.position.x = 0
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        scene.add(obj)

        obj.traverse(function (child) {
          if (child.isMesh) {
            console.log(child.name, child)

            if (child.name.includes('EXT')) {
              switch (child.name) {
                case 'EXT_07':
                  child.material = glassMaterial
                  break
                case 'EXT_':
                  // console.log(child.name, child)
                  child.material = glassMaterial
                default:
                  child.material = EXTMaterial
                  break
              }
            }
            if (child.name.includes('Tire')) {
              child.material = wheelsMaterial
            }
            // if (child.name.includes('Door')) {
            //   child.material = EXTMaterial
            // }
            // if (child.name.includes('EXT')) {
            //   // child.material = EXTMaterial
            //   // INT.push(child)
            // }

            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
          }
        })
        resolve(obj)
      },
      undefined,
      function (error) {
        reject(error)
      }
    )
  })
}
