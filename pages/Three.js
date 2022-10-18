import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '../lib/orbitcontrols';
import { GLTFLoader } from '../lib/gltf';

const Home = () => {
  let canvas;
  useEffect(() => {
    if (canvas) return;
    // canvasを取得
    canvas = document.getElementById('canvas');

    // シーン
    const scene = new THREE.Scene();

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    // カメラ
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 2000);
    //カメラセット
    camera.position.set(-20, 30, 50);
    camera.lookAt(new THREE.Vector3(0, 10, 0));

    // 滑らかにカメラコントローラーを制御する
    const controls = new OrbitControls(camera, document.body);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ボックスジオメトリー
    let model;
    const loader = new GLTFLoader();

    loader.load(
      '/wallet.glb',
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

    // ライト
    const dirLight = new THREE.SpotLight(0xffffff, 1.5); //color,強度
    dirLight.position.set(-20, 30, 30);
    scene.add(dirLight);
    const light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(light);

    // アニメーション
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // ブラウザのリサイズ処理
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }, []);
  return (
    <>
      <canvas id='canvas' style={{ width: '100%' }}></canvas>
    </>
  );
};

export default Home;
