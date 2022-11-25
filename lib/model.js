import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { addMaterialAndAction } from './MaterialAndAction'

export function loadGLTFModel(
  scene,
  glbPath,
  options = { receiveShadow: true, castShadow: true }
) {
  let name = glbPath.split('Lynkco09')[1]
  console.log(name)

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    const DRACOloader = new DRACOLoader()

    DRACOloader.setDecoderPath('/draco/')
    loader.setDRACOLoader(DRACOloader)
    loader.load(
      glbPath,
      gltf => {
        const { outer, obj } = addMaterialAndAction(gltf, name, options)
        outer ? scene.add(outer) : scene.add(obj)
        resolve(obj)
      },
      undefined,
      function (error) {
        reject(error)
      }
    )
  })
}
