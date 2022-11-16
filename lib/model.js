import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export function loadGLTFModel(
  scene,
  glbPath,
  options = { receiveShadow: true, castShadow: true }
) {
  const { receiveShadow, castShadow } = options
  let name = glbPath.split('_')[1]

  //Function to load texture corrected
  function LoadTextureCorrected(_loader, _path) {
    //Load the texture
    var texture = _loader.load(_path)
    //Set repeat wrapping
    texture.wrapT = texture.wrapS = THREE.RepeatWrapping
    //Flip texture vertically
    texture.repeat.y = -1
    //Return the corrected texture
    return texture
  }

  //Function to convert webcolor to hex color
  function webColorToHex(color) {
    return parseInt(color.replace('#', '0x'))
  }

  const config = {
    body_colors: {
      colors: [
        {
          name: 'Arancio Atlas',
          value: '#F77F21'
        },
        {
          name: 'Arancio Argos',
          value: '#FC4705'
        },
        {
          name: 'Blu Cepheus',
          value: '#4393E6'
        },
        {
          name: 'Rosso Mars',
          value: '#BF0012'
        },
        {
          name: 'Bianco Monocerus',
          value: '#F2F3F5'
        }
      ],
      target: 'Mt_Body'
    },
    mirror_colors: {
      colors: [
        {
          name: 'Black',
          value: '#121212'
        }
      ],
      target: 'Mt_MirrorCover'
    },
    wheel_designs: {
      designs: [
        {
          name: 'Type A',
          value: 'Obj_Rim_T0A',
          thumb: 'Render_Tyre_0A.png'
        },
        {
          name: 'Type B',
          value: 'Obj_Rim_T0B',
          thumb: 'Render_Tyre_0B.png'
        }
      ]
    },
    wheel_colors: {
      colors: [
        {
          name: 'Black',
          value: '#000000'
        },
        {
          name: 'Grey',
          value: '#4C5457'
        },
        {
          name: 'Metalic',
          value: '#dddddd'
        }
      ],
      target: 'Mt_AlloyWheels'
    },

    caliper_colors: {
      colors: [
        {
          name: 'Red',
          value: '#990000'
        },
        {
          name: 'Yellow',
          value: '#E9A435'
        },
        {
          name: 'Black',
          value: '#000000'
        },
        {
          name: 'White',
          value: '#F1F7F7'
        }
      ],
      target: 'Mt_BrakeCaliper'
    }
  }

  //The Cubemap path
  var r = '/data/env/cubemap/'
  //The cubemap file urls
  var urls = [
    r + 'posx.jpg',
    r + 'negx.jpg',
    r + 'posy.jpg',
    r + 'negy.jpg',
    r + 'posz.jpg',
    r + 'negz.jpg'
  ]
  //The Cubemap object
  var mCubeMap

  //The texture loader
  var mTextureLoader

  //The loader manager
  var mManager

  //Load the environmet cubemap from file
  mCubeMap = new THREE.CubeTextureLoader().load(urls)
  mCubeMap.format = THREE.RGBAFormat
  mCubeMap.mapping = THREE.CubeReflectionMapping

  //Create a loader manager
  mManager = new THREE.LoadingManager()

  //Creat the texture loader
  mTextureLoader = new THREE.TextureLoader(mManager)

  //Get the startup colors for configurables
  var dfCol_Body = webColorToHex(config.body_colors.colors[1].value)
  var dfCol_Mirror = webColorToHex(config.mirror_colors.colors[0].value)
  var dfCol_Alloys = webColorToHex(config.wheel_colors.colors[2].value)
  var dfCol_Caliper = webColorToHex(config.caliper_colors.colors[0].value)

  var AventadorAtlas_Albedo = LoadTextureCorrected(
    mTextureLoader,
    'data/aventador/AventadorAtlas_Albedo.png'
  )
  var AventadorAtlas_Normal = LoadTextureCorrected(
    mTextureLoader,
    'data/aventador/AventadorAtlas_Normal.png'
  )
  var LR_Brake_Albedo = LoadTextureCorrected(
    mTextureLoader,
    'data/aventador/LR_Brake_Albedo.png'
  )
  var LR_Turn_Albedo = LoadTextureCorrected(
    mTextureLoader,
    'data/aventador/LR_Turn_Albedo.png'
  )
  var LR_Reverse_Albedo = LoadTextureCorrected(
    mTextureLoader,
    'data/aventador/LR_Reverse_Albedo.png'
  )
  var LR_Generic_Normal = LoadTextureCorrected(
    mTextureLoader,
    'data/aventador/LR_Generic_Normal.png'
  )

  //Create the necessary materials
  var Mt_Abs_Black_Gloss = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.0,
    metalness: 0.0,
    envMap: mCubeMap
  })
  var Mt_ABS_Black_Mat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.5,
    metalness: 0.5,
    envMap: mCubeMap
  })
  var Mt_Abs_White_Mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.0,
    metalness: 0.0,
    envMap: mCubeMap
  })
  var Mt_AlloyWheels = new THREE.MeshStandardMaterial({
    name: 'Mt_AlloyWheels',
    color: dfCol_Alloys,
    roughness: 0.1,
    metalness: 0.5,
    envMap: mCubeMap
  })

  var Mt_AventadorAtlas = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5,
    envMap: mCubeMap,
    map: AventadorAtlas_Albedo,
    transparent: true
  })

  var Mt_Body = new THREE.MeshStandardMaterial({
    name: 'Mt_Body',
    color: dfCol_Body,
    roughness: 0.0,
    metalness: 0.0,
    envMap: mCubeMap
  })
  var Mt_BrakeCaliper = new THREE.MeshStandardMaterial({
    name: 'Mt_BrakeCaliper',
    color: dfCol_Caliper,
    roughness: 0.5,
    metalness: 0.5,
    envMap: mCubeMap
  })
  var Mt_Chrome = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.0,
    metalness: 1.0,
    envMap: mCubeMap
  })
  var Mt_Glass_Lens = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.0,
    metalness: 0.25,
    envMap: mCubeMap
  })

  var Mt_Glass_Translucent = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.0,
    metalness: 1.0,
    envMap: mCubeMap,
    transparent: true,
    opacity: 0.25
  })

  var Mt_Interior_Black = new THREE.MeshStandardMaterial({
    color: 0x525252,
    roughness: 0.5,
    metalness: 0.5,
    envMap: mCubeMap
  })
  var Mt_Metal_Black_Glossy = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.1,
    metalness: 0.5,
    envMap: mCubeMap
  })
  var Mt_Metal_Brushed = new THREE.MeshStandardMaterial({
    color: 0x555555,
    roughness: 0.0,
    metalness: 1.0,
    envMap: mCubeMap
  })
  var Mt_Mirror = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.0,
    metalness: 1.0,
    envMap: mCubeMap
  })
  var Mt_MirrorCover = new THREE.MeshStandardMaterial({
    name: 'Mt_MirrorCover',
    color: dfCol_Body,
    roughness: 0.0,
    metalness: 0.0,
    envMap: mCubeMap
  })
  var Mt_Reflector_BL = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1.0,
    metalness: 0.0,
    envMap: mCubeMap,
    map: LR_Brake_Albedo,
    normalMap: LR_Generic_Normal
  })
  var Mt_Reflector_RL = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1.0,
    metalness: 0.0,
    envMap: mCubeMap,
    map: LR_Reverse_Albedo,
    normalMap: LR_Generic_Normal
  })
  var Mt_Reflector_TL = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1.0,
    metalness: 0.0,
    envMap: mCubeMap,
    map: LR_Turn_Albedo,
    normalMap: LR_Generic_Normal
  })
  var Mt_TurnLights = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5,
    envMap: mCubeMap
  })
  var Mt_Tyres = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5,
    envMap: mCubeMap,
    map: AventadorAtlas_Albedo,
    normalMap: AventadorAtlas_Normal
  })
  var Mt_WindScreens = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.0,
    metalness: 0.0,
    envMap: mCubeMap,
    transparent: true,
    opacity: 0.7
  })

  var testMaterial = new THREE.MeshStandardMaterial({
    color: 0x9e1068
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
        obj.name = name
        obj.position.y = 0
        obj.position.x = 0
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        scene.add(obj)

        obj.traverse(function (child) {
          if (child.isMesh) {
            if (child.name.includes('EXT')) {
              switch (child.name) {
                case 'EXT_04':
                case 'EXT_05':
                case 'EXT_08':
                case 'EXT_10':
                case 'EXT_22':
                case 'EXT_23':
                case 'EXT_24':
                case 'EXT_25':
                case 'EXT_28':
                case 'EXT_35':
                case 'EXT_36':
                case 'EXT_37':
                case 'EXT_38':
                case 'EXT_39':
                case 'EXT_40':
                case 'EXT_42':
                case 'EXT_43':
                case 'EXT_44':
                case 'EXT_45':
                case 'EXT_46':
                case 'EXT_47':
                case 'EXT_52':
                  child.material = Mt_ABS_Black_Mat
                  break
                case 'EXT_06':
                case 'EXT_07':
                case 'EXT_34':
                  child.material = Mt_WindScreens
                  break
                case 'EXT_11':
                case 'EXT_21':
                case 'EXT_41':
                case 'EXT_48':
                  child.material = Mt_Abs_Black_Gloss
                  break
                case 'EXT_51':
                  child.material = Mt_Body
                  break
                case 'EXT_29':
                  break
                case 'EXT_01':
                case 'EXT_03':
                  child.material = Mt_Body
                  break

                default:
                  child.material = Mt_Body
                  break
              }
            }
            if (child.name.includes('Door')) {
              let doorname = child.name.slice(1)
              switch (doorname) {
                case 'BDoor_03':
                  child.material = Mt_WindScreens
                  break
                case 'BDoor_02':
                case 'BDoor_04':
                case 'BDoor_07':
                case 'BDoor_08':
                case 'BDoor_09':
                case 'BDoor_10':
                case 'BDoor_14':
                  child.material = Mt_ABS_Black_Mat
                  break
                case 'BDoor_05':
                  child.material = Mt_Body
                  break

                case 'FDoor_01':
                  child.material = Mt_Body
                  break
                case 'FDoor_02':
                case 'FDoor_04':
                case 'FDoor_05':
                  child.material = Mt_ABS_Black_Mat
                  break
                case 'FDoor_08':
                  child.material = Mt_WindScreens
                  break
                case 'FDoor_09':
                  child.material = Mt_Glass_Lens
                  break

                default:
                  child.material = Mt_ABS_Black_Mat
                  break
              }
            }
            if (child.name.includes('Sunproof')) {
              switch (child.name) {
                case 'Sunproof_01':
                case 'Sunproof_03':
                  child.material = Mt_WindScreens
                  break
                default:
                  child.material = Mt_ABS_Black_Mat
                  break
              }
            }
            if (child.name.includes('Trunk')) {
              switch (child.name) {
                case 'Trunk_03':
                case 'Trunk_04':
                  child.material = Mt_WindScreens
                  break
                case 'Trunk_05':
                case 'Trunk_08':
                case 'Trunk_09':
                case 'Trunk_15':
                case 'Trunk_19':
                case 'Trunk_22':
                case 'Trunk_17':
                  child.material = Mt_ABS_Black_Mat
                  break
                case 'Trunk_12':
                  break
                default:
                  child.material = Mt_Body
                  break
              }
            }
            if (child.name.includes('Tire')) {
              switch (child.name) {
                case 'Tire_01':
                  child.material = Mt_Body
                  break
                case 'Tire_03':
                  child.material = Mt_AlloyWheels
                  break
                default:
                  child.material = Mt_ABS_Black_Mat
                  break
              }
            }
            if (child.name.includes('INT')) {
              switch (child.name) {
                default:
                  child.material = Mt_ABS_Black_Mat
                  break
              }
            }

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
