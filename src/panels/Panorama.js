import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
  HeaderButton,
  platform,
  IOS,
} from '@vkontakte/vkui';
import './Panorama.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import ft from '../img/texture_ft.jpg';
import bk from '../img/texture_bk.jpg';
import up from '../img/texture_up.jpg';
import dn from '../img/texture_dn.jpg';
import rt from '../img/texture_rt.jpg';
import lf from '../img/texture_lf.jpg';

const osname = platform();

const Panorama = props => {
  const mounter = React.createRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      45,
      30000,
    );
    camera.position.set(-900, -200, -900);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mounter.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera);
    controls.minDistance = 500;
    controls.maxDistance = 1500;

    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load(ft);
    const texture_bk = new THREE.TextureLoader().load(bk);
    const texture_up = new THREE.TextureLoader().load(up);
    const texture_dn = new THREE.TextureLoader().load(dn);
    const texture_rt = new THREE.TextureLoader().load(rt);
    const texture_lf = new THREE.TextureLoader().load(lf);

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={
          <HeaderButton onClick={props.go} data-to="home">
            {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </HeaderButton>
        }
      >
        Skybox Panorama
      </PanelHeader>
      <div style={{ position: 'fixed' }} ref={mounter} />
    </Panel>
  );
};

Panorama.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Panorama;
