// Realistic 3D phones and a monitor that show the real Azix screens.
// mountDevices() returns a dispose function, or null when WebGL is unavailable.
import * as T from 'three';

function roundedRect(w, h, r) {
  const s = new T.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

function screenGeometry(w, h, r) {
  const g = new T.ShapeGeometry(roundedRect(w, h, r), 12), p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / w + 0.5, p.getY(i) / h + 0.5);
  return g;
}

function glossTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 512;
  const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 256, 512);
  g.addColorStop(0, 'rgba(255,255,255,.26)'); g.addColorStop(0.32, 'rgba(255,255,255,.07)'); g.addColorStop(0.34, 'rgba(255,255,255,0)');
  g.addColorStop(0.7, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,.1)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 512);
  return new T.CanvasTexture(c);
}

function environmentMap(renderer) {
  const pm = new T.PMREMGenerator(renderer), env = new T.Scene();
  env.add(new T.Mesh(new T.SphereGeometry(10, 32, 16), new T.MeshBasicMaterial({ side: T.BackSide, color: 0x9fb0cc })));
  const panel = (w, h, x, y, z, k) => {
    const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(k, k, k), side: T.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  };
  panel(8, 3, -4, 6, 5, 5); panel(2, 9, 8, 0, 2, 4); panel(6, 2, 0, -7, 3, 1.6); panel(3, 6, -9, 0, -2, 2);
  const tex = pm.fromScene(env, 0.03).texture; pm.dispose();
  return tex;
}

function makeFactory(renderer, gloss, disposables) {
  const loader = new T.TextureLoader();
  const load = (url) => {
    const t = loader.load(url); t.encoding = T.sRGBEncoding;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy(); t.minFilter = T.LinearMipmapLinearFilter;
    disposables.push(t); return t;
  };

  const phone = (url) => {
    const g = new T.Group(), depth = 0.08, bt = 0.02, W = 1, H = 2.164;
    const body = new T.ExtrudeGeometry(roundedRect(1.06, 2.22, 0.2), { depth, bevelEnabled: true, bevelThickness: bt, bevelSize: bt, bevelSegments: 6, curveSegments: 20 });
    body.translate(0, 0, -depth / 2);
    const metal = new T.MeshStandardMaterial({ color: 0x4a5160, metalness: 0.92, roughness: 0.26, envMapIntensity: 1.25 });
    g.add(new T.Mesh(body, metal));
    const front = depth / 2 + bt;
    const bezel = new T.Mesh(screenGeometry(1.05, 2.205, 0.175), new T.MeshBasicMaterial({ color: 0x05070b })); bezel.position.z = front + 0.0006; g.add(bezel);
    const screen = new T.Mesh(screenGeometry(W, H, 0.15), new T.MeshBasicMaterial({ map: load(url), toneMapped: false })); screen.position.z = front + 0.0014; g.add(screen);
    const glass = new T.Mesh(screenGeometry(W, H, 0.15), new T.MeshBasicMaterial({ map: gloss, transparent: true, depthWrite: false })); glass.position.z = front + 0.0022; g.add(glass);
    const button = (x, y, h) => { const b = new T.Mesh(new T.BoxGeometry(0.035, h, 0.05), metal); b.position.set(x, y, 0); g.add(b); };
    button(0.555, 0.42, 0.38); button(-0.555, 0.62, 0.2); button(-0.555, 0.3, 0.2);
    disposables.push(body, metal);
    return g;
  };

  const monitor = (url, aspect = 1.639) => {
    const g = new T.Group(), W = 3.4, H = W / aspect, depth = 0.07, bt = 0.015;
    const frame = new T.ExtrudeGeometry(roundedRect(W + 0.22, H + 0.22, 0.08), { depth, bevelEnabled: true, bevelThickness: bt, bevelSize: bt, bevelSegments: 4, curveSegments: 12 });
    frame.translate(0, 0, -depth / 2);
    const metal = new T.MeshStandardMaterial({ color: 0x20252f, metalness: 0.85, roughness: 0.32, envMapIntensity: 1.1 });
    g.add(new T.Mesh(frame, metal));
    const front = depth / 2 + bt;
    const screen = new T.Mesh(screenGeometry(W, H, 0.03), new T.MeshBasicMaterial({ map: load(url), toneMapped: false })); screen.position.z = front + 0.001; g.add(screen);
    const glass = new T.Mesh(screenGeometry(W, H, 0.03), new T.MeshBasicMaterial({ map: gloss, transparent: true, depthWrite: false, opacity: 0.8 })); glass.position.z = front + 0.002; g.add(glass);
    const neck = new T.Mesh(new T.BoxGeometry(0.34, 0.8, 0.08), metal); neck.position.set(0, -H / 2 - 0.45, -0.05); g.add(neck);
    const base = new T.Mesh(new T.CylinderGeometry(0.9, 1, 0.07, 48), metal); base.position.set(0, -H / 2 - 0.86, 0.05); g.add(base);
    disposables.push(frame, metal);
    return g;
  };
  return { phone, monitor };
}

const tilt = (root, s, k) => { root.rotation.y = -s.p * k + s.mx * 0.35; root.rotation.x = s.my * 0.14; };

// Scene presets: build() adds the models, frame() places the camera, update() animates each frame.
export const presets = {
  hero: () => ({
    fov: 26,
    build(root, { phone, monitor }) {
      const mon = monitor('/img/InsightsDesktop.png', 1405 / 857); mon.position.set(0.5, 0.62, -1.5); mon.rotation.y = -0.22; mon.scale.setScalar(0.92); root.add(mon);
      const a = phone('/img/Dashboard.png'); a.position.set(-1.4, -0.55, 0.5); a.rotation.set(0.04, 0.3, 0.06); root.add(a);
      const b = phone('/img/ApprovalInbox.png'); b.position.set(0.15, -0.8, 1.1); b.rotation.set(0.03, -0.1, -0.03); b.scale.setScalar(1.08); root.add(b);
      const c = phone('/img/NathanChat.png'); c.position.set(1.45, -0.5, 0.4); c.rotation.set(0.04, -0.34, -0.05); root.add(c);
      return { mon, a, b, c };
    },
    frame(cam, asp) { cam.position.set(0, 0.35, asp < 0.85 ? 13 : 11.2); cam.lookAt(0, -0.05, 0); },
    update(o, s) {
      s.root.rotation.y = s.mx * 0.5; s.root.rotation.x = s.my * 0.18;
      o.mon.position.y = 0.62 + Math.sin(s.t * 0.6) * 0.05; o.a.position.y = -0.55 + Math.sin(s.t * 0.8 + 1) * 0.08;
      o.b.position.y = -0.8 + Math.sin(s.t * 0.7 + 2) * 0.1; o.c.position.y = -0.5 + Math.sin(s.t * 0.9 + 3) * 0.08;
    }
  }),
  phones: (srcs) => ({
    fov: 26,
    build(root, { phone }) {
      const ps = srcs.map((u) => phone(u));
      if (ps.length === 1) { ps[0].position.set(0, 0, 0); ps[0].scale.setScalar(1.1); }
      else { ps[0].position.set(-0.85, 0, 0); ps[1].position.set(0.85, -0.1, 0.3); }
      ps.forEach((p) => root.add(p));
      return { ps };
    },
    frame(cam, asp) { cam.position.set(0, 0, asp < 0.9 ? 9.5 : 7.6); cam.lookAt(0, 0, 0); },
    update(o, s) { tilt(s.root, s, 0.75); o.ps.forEach((p, i) => { p.position.y = (i ? -0.1 : 0) + Math.sin(s.t * 0.8 + i * 1.6) * 0.06; }); }
  }),
  insights: ([desk, ph]) => ({
    fov: 26,
    build(root, { phone, monitor }) {
      const m = monitor(desk, 1405 / 957); m.position.set(-0.5, 0.25, 0); m.scale.setScalar(0.95); m.rotation.y = 0.1; root.add(m);
      const p = phone(ph); p.position.set(2.75, -0.55, 1.2); p.rotation.set(0.03, -0.28, -0.03); p.scale.setScalar(0.95); root.add(p);
      return { m, p };
    },
    frame(cam, asp) { cam.position.set(0, 0.1, asp < 0.9 ? 11 : 8.6); cam.lookAt(0.2, -0.1, 0); },
    update(o, s) { tilt(s.root, s, 0.35); o.m.position.y = 0.25 + Math.sin(s.t * 0.6) * 0.05; o.p.position.y = -0.55 + Math.sin(s.t * 0.8 + 1) * 0.08; }
  })
};

export function mountDevices(canvas, cfg) {
  let renderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setClearColor(0, 0);
  renderer.outputEncoding = T.sRGBEncoding; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;

  const scene = new T.Scene(), camera = new T.PerspectiveCamera(cfg.fov || 28, 1, 0.1, 100), disposables = [];
  const envTexture = environmentMap(renderer); scene.environment = envTexture; disposables.push(envTexture);
  scene.add(new T.HemisphereLight(0xffffff, 0xb9c6df, 0.35));
  const sun = new T.DirectionalLight(0xffffff, 0.8); sun.position.set(-3, 5, 6); scene.add(sun);
  const gloss = glossTexture(); disposables.push(gloss);
  const root = new T.Group(); scene.add(root);
  const parts = cfg.build(root, makeFactory(renderer, gloss, disposables));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mx = 0, my = 0, tx = 0, ty = 0, visible = true, alive = true, frameId = 0, w = 0, h = 0;
  const t0 = performance.now();

  const resize = () => {
    const r = canvas.getBoundingClientRect(), nw = Math.max(1, Math.round(r.width)), nh = Math.max(1, Math.round(r.height));
    if (nw === w && nh === h) return;
    w = nw; h = nh; renderer.setSize(w, h, false); camera.aspect = w / h; cfg.frame(camera, w / h); camera.updateProjectionMatrix();
  };
  const onMove = (e) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; };
  const tick = () => {
    if (!alive || !visible) { frameId = 0; return; }
    const t = (performance.now() - t0) / 1000, r = canvas.getBoundingClientRect();
    const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
    mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
    cfg.update(parts, { t: reduce ? 0 : t, mx: reduce ? 0 : mx, my: reduce ? 0 : my, p: reduce ? 0 : p, root });
    renderer.render(scene, camera);
    frameId = reduce ? 0 : requestAnimationFrame(tick);
  };
  const start = () => { if (!frameId) frameId = requestAnimationFrame(tick); };

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(canvas);
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });
  const io = typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible) start(); }, { rootMargin: '80px' })
    : null;
  if (io) io.observe(canvas);
  resize(); start();

  return () => {
    alive = false; if (frameId) cancelAnimationFrame(frameId);
    if (ro) ro.disconnect(); if (io) io.disconnect();
    window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove);
    disposables.forEach((d) => d.dispose && d.dispose());
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material && o.material.dispose) o.material.dispose(); });
    renderer.dispose();
  };
}
