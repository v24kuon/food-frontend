import { useEffect } from 'react';
import * as THREE from 'three';

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
    const loader = new GLTFLoader();

    loader.load(
      'http://gtgshare006.xsrv.jp/3d/wallet.glb',
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.2);
    pointLight.position.set(1, 2, 3);
    scene.add(pointLight);

    // アニメーション
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      box.rotation.x = elapsedTime;
      box.rotation.y = elapsedTime;
      window.requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

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
      <canvas id='canvas'></canvas>
    </>
  );
};

export default Home;
