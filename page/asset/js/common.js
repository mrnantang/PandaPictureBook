import * as THREE from "./three.module.js";
import { FBXLoader } from "./FBXLoader.js";
let camera, scene, renderer;
let mixer;
let actions = []; //所有的动画数组;
let asd = [0, 2.2]; //动画开始播放前的等待时长单位s
const clock = new THREE.Clock();
let init = function init() {
  // 插入标签
  const container = document.getElementById("models");
  // 相机
  camera = new THREE.PerspectiveCamera(55,window.innerWidth / window.innerHeight,1,2000);
  camera.position.set(100, 200, 800);
  // 场景
  scene = new THREE.Scene();
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  // hemiLight.position.set(0, 200, 0);
  scene.add(hemiLight);
  // 光源
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
  scene.add(dirLight);
  // 渲染
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  loadFbxInScence();
};
// 加载模型
function loadFbxInScence() {
  // 模型
  const loader = new FBXLoader();
  const url = "https://lz06-1301325388.cos.ap-chengdu.myqcloud.com/temp/ar/";

  // 导入模型
  const getTexture = new THREE.TextureLoader().load(
    // 导入贴图
    url +  "xiongmao03.png"
  );
  const getNTexture = new THREE.TextureLoader().load(
    // 导入贴图
    url + "DrF_DefaultMaterial_Normal.png"
  );
  // 导入模型
  loader.load(
    url + "xiongmao.fbx",
    // url + "xiongmao1.fbx",
     
    (object) => {
      
      mixer = new THREE.AnimationMixer(object);
      for (let i = 0; i < object.animations.length; i++) {
        actions[i] = mixer.clipAction(object.animations[i]);
        // 加载并播放默认动画
        actions[i].time = asd[i];
      }
      // actions[1].setLoop(THREE.LoopOnce);
      mixer.addEventListener("finished", function (e) {
        actions[1].reset();
        actions[1].time = asd[1];
        actions[1].play();
      });
      actions[0].play();

      object.traverse((child) => {
        let material = new THREE.MeshPhongMaterial({
          map: getTexture,
          normalMap: getNTexture,
          transparent: true,
        });
        child.material = material;
      });
      // 模型向左旋转15度
      object.rotation.y = -Math.PI / 9;
      object.rotation.x = -Math.PI / -19;
      object.scale.setScalar(0.4);
      // object.scale.setScalar(4);
      // object.position.set(0, 0, 0);
      object.position.set(450, 50, -200);
      scene.add(object);
    },
    (p) => {
      const val = Math.ceil((p.loaded / p.total) * 100);
      if (val >= 100) {
        document.getElementById("loadings").style.display = "none"; //none
        // setTimeout(() => {
          document.getElementById("app").style.display = "block"; //block
        // }, 2000);
      }
    }
  );
}
let animate = function animate() {
  requestAnimationFrame(animate);
  // 让模型动起来
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.clear();
  renderer.render(scene, camera);
};
export { animate, init, actions, asd,camera };
