import '../css/styles.scss';

import {BoxGeometry, Color, CubeCamera, Geometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer,} from 'three';

export class App {
  private canvas = document.getElementById('main-canvas')! as HTMLCanvasElement;


  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
      45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: this.canvas,
  });

  private geoCube = new BoxGeometry(1, 1, 1);
  private matCube = new MeshBasicMaterial({
    color: 0x00ff00,
  });
  private meshCube = new Mesh(this.geoCube, this.matCube);

  constructor() {
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setClearColor(new Color('rgb(0,0,0)'));

    this.scene.add(this.meshCube);

    this.render();
  }

  private resizeRendererToDisplaySize() {
    const rendererDom = this.renderer.domElement;
    const canvasWidth = this.canvas.clientWidth;
    const canvasHeight = this.canvas.clientHeight;

    const needResize = rendererDom.width !== canvasWidth ||
        rendererDom.height !== canvasHeight;
    if (needResize) {
      console.log('needs resize');
      this.renderer.setSize(canvasWidth, canvasHeight, false);
    }
    return needResize;
  }

  private adjustCanvasSize() {
    if (this.resizeRendererToDisplaySize()) {
      const rendererDom = this.renderer.domElement;
      this.camera.aspect = rendererDom.clientWidth / rendererDom.clientHeight;
      this.camera.updateProjectionMatrix();
    }
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());

    this.meshCube.rotation.y += 0.1;

    this.adjustCanvasSize();
  }
}
