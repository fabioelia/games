import * as THREE from 'three';

// 3-step toon gradient ramp shared by all toon materials.
const ramp = new Uint8Array([125,125,125,255, 190,190,190,255, 255,255,255,255]); // lifted shadow band: platforms stay readable in shade
const gradientMap = new THREE.DataTexture(ramp, 3, 1, THREE.RGBAFormat);
gradientMap.minFilter = THREE.NearestFilter;
gradientMap.magFilter = THREE.NearestFilter;
gradientMap.needsUpdate = true;

export function toonMat(color) {
  return new THREE.MeshToonMaterial({ color, gradientMap });
}

const OUTLINE_COLOR = 0x241a2e;

// Build a toon mesh with a cheap inflated back-face silhouette outline.
export function part(geo, color, outline = 0.08) {
  const m = new THREE.Mesh(geo, toonMat(color));
  m.castShadow = true;
  if (outline > 0) {
    const o = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: OUTLINE_COLOR, side: THREE.BackSide })
    );
    o.scale.setScalar(1 + outline);
    m.add(o);
  }
  return m;
}
