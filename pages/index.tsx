import { useEffect } from 'react';
import {
  Scene,
  WebGL1Renderer,
  PerspectiveCamera,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  SphereGeometry,
  TextureLoader,
  BackSide,
  MeshPhongMaterial,
  DirectionalLight,
  HemisphereLight,
  AmbientLight,
} from 'three';

const HomePage = () => {
  useEffect(() => {
    // Crea la escena
    const scene = new Scene();

    // Crea el renderizador WebGL y lo asocia al canvas
    const renderer = new WebGL1Renderer({
      antialias: true,
      canvas: document.getElementById('bg'),
    });

    // Crea la cámara de perspectiva
    const camera = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Configura la posición de la cámara
    camera.position.z = 6;

    // Crea la geometría de un cubo
    const geometry = new BoxGeometry(1, 1, 1);

    // Crea el material básico para el cubo
    const material = new MeshBasicMaterial({ color: 0xffffff });

    // Crea un objeto Mesh utilizando la geometría y el material
    const cube = new Mesh(geometry, material);

    // Agrega el cubo a la escena
    scene.add(cube);

    //! Skybox
    const Skygeometry = new SphereGeometry(360, 25, 25);
    const loader = new TextureLoader();
    const texture = loader.load('/custom-sky.png');

    const material2 = new MeshPhongMaterial({ map: texture });
    const skybox = new Mesh(Skygeometry, material2);

    scene.add(skybox);
    skybox.material.side = BackSide;

    // iluminación skybox
    scene.add(new AmbientLight(0xffffff, 0.8));
    scene.add(new HemisphereLight(0xffffff, 0.8));

    // Configura el tamaño del renderizador para que coincida con el tamaño de la ventana
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Función de animación
    const animate = () => {
      // Rota el cubo en el eje X e Y
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Renderiza la escena con la cámara actual
      renderer.render(scene, camera);

      // Solicita el siguiente cuadro de animación
      requestAnimationFrame(animate);
    };

    // Inicia la animación
    animate();
  }, []);

  return (
    <>
      <canvas id='bg' />
    </>
  );
};

export default HomePage;
