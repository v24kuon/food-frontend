import THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera;
let scene;
let renderer;
let model;

init();
animate();

function init() {
  //シーンの作成
  scene = new THREE.Scene();

  //カメラの作成
  camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 2000);
  //カメラセット
  camera.position.set(-20, 30, 50);
  camera.lookAt(new THREE.Vector3(0, 10, 0));

  // 滑らかにカメラコントローラーを制御する
  const controls = new OrbitControls(camera, document.body);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  //光源
  const dirLight = new THREE.SpotLight(0xffffff, 1.5); //color,強度
  dirLight.position.set(-20, 30, 30);
  scene.add(dirLight);
  const light = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(light);

  //レンダラー
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(window.innerWidth, window.innerHeight);

  //glbファイルの読み込み
  const loader = new GLTFLoader();

  loader.load(
    'https://gtgshare006.xsrv.jp/3d/wallet.glb',
    function (gltf) {
      model = gltf.scene;
      model.traverse((object) => {
        //モデルの構成要素
        if (object.isMesh) {
          //その構成要素がメッシュだったら
          object.material.trasparent = true; //透明許可
          object.material.opacity = 0.8; //透過
          object.material.depthTest = true; //陰影で消える部分
        }
      });
      scene.add(model);
    },
    undefined,
    function (e) {
      console.error(e);
    }
  );

  document.getElementById('WebGL-output').appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
document.body.addEventListener(
  'touchmove',
  (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  { passive: false }
);

const Home = () => <div style={{ width: '100vw', height: '100vh' }} id='WebGL-output'></div>;
export default Home;
