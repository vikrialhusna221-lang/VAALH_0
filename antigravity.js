/**
 * Antigravity 3D Visual Effect (Programmer QWERTY Keyboard + Code & Numbers Edition)
 * Three.js + GSAP ScrollTrigger
 * Optimized for startup structured layouts and scroll-driven zero-gravity scattering
 */
(function () {
    'use strict';

    // Full 42-key mechanical keyboard layout coordinates in 3D space
    const KEYBOARD_LAYOUT = [
        // Row -1: Coding Keywords & Binary (9 keys, above number row at y = 3.8) - Symmetrically Spaced to avoid collisions
        { char: 'const', x: -6.2, y: 3.8 },
        { char: 'let', x: -4.6, y: 3.8 },
        { char: '01', x: -3.1, y: 3.8 },
        { char: 'if', x: -1.6, y: 3.8 },
        { char: 'async', x: 0.0, y: 3.8 },
        { char: 'await', x: 1.6, y: 3.8 },
        { char: '10', x: 3.1, y: 3.8 },
        { char: 'try', x: 4.6, y: 3.8 },
        { char: 'catch', x: 6.2, y: 3.8 },

        // Row 0: Numbers & Symbols (10 keys)
        { char: '1', x: -4.5, y: 2.8 },
        { char: '2', x: -3.5, y: 2.8 },
        { char: '3', x: -2.5, y: 2.8 },
        { char: '4', x: -1.5, y: 2.8 },
        { char: '5', x: -0.5, y: 2.8 },
        { char: '6', x: 0.5, y: 2.8 },
        { char: '7', x: 1.5, y: 2.8 },
        { char: '8', x: 2.5, y: 2.8 },
        { char: '9', x: 3.5, y: 2.8 },
        { char: '0', x: 4.5, y: 2.8 },

        // Row 1: QWERTY Letters (10 keys)
        { char: 'Q', x: -4.5, y: 1.8 },
        { char: 'W', x: -3.5, y: 1.8 },
        { char: 'E', x: -2.5, y: 1.8 },
        { char: 'R', x: -1.5, y: 1.8 },
        { char: 'T', x: -0.5, y: 1.8 },
        { char: 'Y', x: 0.5, y: 1.8 },
        { char: 'U', x: 1.5, y: 1.8 },
        { char: 'I', x: 2.5, y: 1.8 },
        { char: 'O', x: 3.5, y: 1.8 },
        { char: 'P', x: 4.5, y: 1.8 },

        // Row 2: ASDFGHJKL + Coding Brackets (11 keys)
        { char: '{', x: -5.0, y: 0.8 },
        { char: 'A', x: -4.0, y: 0.8 },
        { char: 'S', x: -3.0, y: 0.8 },
        { char: 'D', x: -2.0, y: 0.8 },
        { char: 'F', x: -1.0, y: 0.8 },
        { char: 'G', x: 0.0, y: 0.8 },
        { char: 'H', x: 1.0, y: 0.8 },
        { char: 'J', x: 2.0, y: 0.8 },
        { char: 'K', x: 3.0, y: 0.8 },
        { char: 'L', x: 4.0, y: 0.8 },
        { char: '}', x: 5.0, y: 0.8 },

        // Row 3: ZXCVBNM + Operators (10 keys)
        { char: '<', x: -4.0, y: -0.2 },
        { char: 'Z', x: -3.0, y: -0.2 },
        { char: 'X', x: -2.0, y: -0.2 },
        { char: 'C', x: -1.0, y: -0.2 },
        { char: 'V', x: 0.0, y: -0.2 },
        { char: 'B', x: 1.0, y: -0.2 },
        { char: 'N', x: 2.0, y: -0.2 },
        { char: 'M', x: 3.0, y: -0.2 },
        { char: '>', x: 4.0, y: -0.2 },
        { char: '/', x: 5.0, y: -0.2 },

        // Row 4: Spacebar (1 key)
        { char: 'DEVELOPER', x: 0.0, y: -1.2, isSpacebar: true },

        // Row 5: Coding tags & Hex (6 keys, flanking spacebar below Row 4 at y = -2.2) - Perfectly distributed
        { char: '<div>', x: -5.8, y: -2.2 },
        { char: '</div>', x: -4.0, y: -2.2 },
        { char: 'class', x: -2.2, y: -2.2 },
        { char: 'export', x: 2.2, y: -2.2 },
        { char: '0x7F', x: 4.0, y: -2.2 },
        { char: '404', x: 5.8, y: -2.2 },

        // Left Column: Flanking items (5 keys, left side moved out to x = -7.6 to prevent collisions)
        { char: 'p{}', x: -7.6, y: 2.8 },
        { char: 'flex', x: -7.6, y: 1.8 },
        { char: 'grid', x: -7.6, y: 0.8 },
        { char: '00', x: -7.6, y: -0.2 },
        { char: '#id', x: -7.6, y: -1.2 },

        // Right Column: Flanking items (5 keys, right side moved out to x = 7.6 to prevent collisions)
        { char: '!=', x: 7.6, y: 2.8 },
        { char: '===', x: 7.6, y: 1.8 },
        { char: '&&', x: 7.6, y: 0.8 },
        { char: '||', x: 7.6, y: -0.2 },
        { char: '++', x: 7.6, y: -1.2 }
    ];

    // Symmetrical 3D Signature layout resting flat on the digital grid floor
    const SIGNATURE_LAYOUT = [
        { char: 'V', x: -2.7 },
        { char: 'A', x: -1.8 },
        { char: 'A', x: -0.9 },
        { char: 'L', x: 0.0 },
        { char: 'H', x: 0.9 },
        { char: '_', x: 1.8 },
        { char: '0', x: 2.7 }
    ];

    function init() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js is not loaded! 3D background visual disabled.');
            return;
        }
        if (typeof gsap === 'undefined') {
            console.warn('GSAP is not loaded! 3D background visual disabled.');
            return;
        }
        if (typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ScrollTrigger is not loaded! 3D scroll interaction disabled.');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const container = document.getElementById('antigravity-canvas');
        if (!container) return;

        // Detect mobile or touch-based devices for custom adaptive lightweight performance rules
        const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // ====== INTERACTIVE MOUSE STATE ======
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        
        window.addEventListener('mousemove', function (e) {
            mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // ====== THEME COLOR CONFIGURATION ======
        const THEME_COLORS = {
            red: {
                accent1: 0xff3366,   // Crimson
                accent2: 0xffa07a,   // Salmon
                hemiSky: 0x2a1a3e,   // Deep warm violet
                hemiGround: 0x0a0a12, // Deep dark base
                mouseColor: 0xff3366  // Interactive spotlight tint
            },
            dark: {
                accent1: 0x00f3ff,   // Cyan
                accent2: 0x00ff66,   // Green
                hemiSky: 0x0f2b48,   // Deep cool blue
                hemiGround: 0x05050d, // Deep dark base
                mouseColor: 0x00f3ff  // Interactive spotlight tint
            }
        };

        const isRedInitial = document.body.classList.contains('theme-red');
        const activeTheme = isRedInitial ? THEME_COLORS.red : THEME_COLORS.dark;

        // ====== SCENE ======
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.024);

        // ====== CAMERA ======
        const camera = new THREE.PerspectiveCamera(
            52, 
            window.innerWidth / window.innerHeight,
            0.1,
            120
        );
        camera.position.set(0, 3, 15);
        camera.lookAt(0, 0, -2);

        // ====== RENDERER ======
        const renderer = new THREE.WebGLRenderer({
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.35));
        renderer.shadowMap.enabled = !isMobile;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        
        if (renderer.outputEncoding !== undefined) {
            renderer.outputEncoding = THREE.sRGBEncoding;
        } else if (renderer.outputColorSpace !== undefined) {
            renderer.outputColorSpace = 'srgb';
        }

        container.appendChild(renderer.domElement);

        // ====== LIGHTING ======
        const ambientLight = new THREE.AmbientLight(0x131324, 0.45);
        scene.add(ambientLight);
 
        const hemiLight = new THREE.HemisphereLight(activeTheme.hemiSky, activeTheme.hemiGround, 0.35);
        scene.add(hemiLight);
 
        const spotLight = new THREE.SpotLight(activeTheme.accent1, 12.0);
        spotLight.position.set(8, 18, 8);
        spotLight.angle = Math.PI / 4.0;
        spotLight.penumbra = 0.85;
        spotLight.decay = 1.25;
        spotLight.distance = 70;
        spotLight.castShadow = false; // Disabled to save 33% GPU fill-rate (shadow map rendering)
        scene.add(spotLight);
 
        const dirLight = new THREE.DirectionalLight(activeTheme.accent2, 3.5);
        dirLight.position.set(-8, 12, 4);
        dirLight.castShadow = false; // Disabled to save 33% GPU fill-rate (shadow map rendering)
        scene.add(dirLight);
 
        const mouseLight = new THREE.PointLight(activeTheme.mouseColor, 3.0, 30);
        mouseLight.position.set(0, 0, 5);
        scene.add(mouseLight);
 
        const rimLight = new THREE.PointLight(0xb446ff, 1.8, 35);
        rimLight.position.set(0, -3, -12);
        scene.add(rimLight);

        // Dedicated Top-Down Shadow Projection Light (projects perfect keycap layout shadows directly beneath)
        const topShadowLight = new THREE.DirectionalLight(0xffffff, 3.8);
        topShadowLight.position.set(0, 12, -2.5);
        topShadowLight.castShadow = !isMobile;
        const shadowSize = isMobile ? 512 : 2048; // Responsive shadow map size
        topShadowLight.shadow.mapSize.width = shadowSize;
        topShadowLight.shadow.mapSize.height = shadowSize;
        topShadowLight.shadow.bias = -0.00015;
        topShadowLight.shadow.camera.near = 0.5;
        topShadowLight.shadow.camera.far = 18;
        topShadowLight.shadow.camera.left = -9;
        topShadowLight.shadow.camera.right = 9;
        topShadowLight.shadow.camera.top = 9;
        topShadowLight.shadow.camera.bottom = -9;
        scene.add(topShadowLight);

        // ====== FLOOR ======
        const floorGeo = new THREE.PlaneGeometry(80, 80);
        const floorMat = new THREE.MeshStandardMaterial({
            color: 0x04040a,
            roughness: 0.8,
            metalness: 0.3,
            transparent: true,
            opacity: 0.65
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -3.2;
        floor.receiveShadow = !isMobile;
        scene.add(floor);

        // Cyber Grid Helper (glows with active theme's accent color)
        const gridHelper = new THREE.GridHelper(80, 40, activeTheme.accent1, activeTheme.accent1);
        gridHelper.position.y = -3.19;
        gridHelper.material.opacity = 0.28;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // ====== DYNAMIC 2D CANVAS KEYCAP TEXTURE GENERATOR ======
        function createLetterTexture(char, colorHex, canvasWidth, fontSize) {
            const canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            
            ctx.clearRect(0, 0, canvas.width, 128);
            
            // Draw a high-tech rounded mechanical keycap border
            ctx.strokeStyle = colorHex;
            ctx.lineWidth = 6;
            const r = 18;
            ctx.beginPath();
            ctx.moveTo(6 + r, 6);
            ctx.lineTo(canvas.width - 6 - r, 6);
            ctx.quadraticCurveTo(canvas.width - 6, 6, canvas.width - 6, 6 + r);
            ctx.lineTo(canvas.width - 6, 122 - r);
            ctx.quadraticCurveTo(canvas.width - 6, 122, canvas.width - 6 - r, 122);
            ctx.lineTo(6 + r, 122);
            ctx.quadraticCurveTo(6, 122, 6, 122 - r);
            ctx.lineTo(6, 6 + r);
            ctx.quadraticCurveTo(6, 6, 6 + r, 6);
            ctx.closePath();
            ctx.stroke();
            
            // Draw character
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold ' + fontSize + 'px Montserrat, "Space Grotesk", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Ambient neon shadow glow inside texture
            ctx.shadowColor = colorHex;
            ctx.shadowBlur = 20;
            ctx.fillText(char, canvas.width / 2, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        }

        // ====== 3D KEYBOARD BUILDING ======
        const objects = [];
        const isThemeRed = document.body.classList.contains('theme-red');
        const colorHexStr = isThemeRed ? '#ff3366' : '#00f3ff';

        // Pre-create shared geometries to optimize WebGL memory allocation
        const GEOMETRIES = {
            standard: new THREE.BoxGeometry(0.75, 0.75, 0.22),
            short: new THREE.BoxGeometry(1.1, 0.75, 0.22),
            medium: new THREE.BoxGeometry(1.6, 0.75, 0.22),
            long: new THREE.BoxGeometry(2.4, 0.75, 0.22),
            spacebar: new THREE.BoxGeometry(4.5, 0.75, 0.22)
        };

        // Shared metallic side material to save 67 distinct standard materials in WebGL memory
        const sideMat = new THREE.MeshStandardMaterial({
            color: isThemeRed ? 0x1f0b12 : 0x071b26, // theme-tinted dark chrome
            roughness: 0.12,
            metalness: 0.9,
            transparent: true,
            opacity: 0.95
        });

        // Shared holographic wireframe outline material
        const wireMat = new THREE.MeshBasicMaterial({
            color: isThemeRed ? 0xff3366 : 0x00f3ff,
            wireframe: true,
            transparent: true,
            opacity: 0.22, 
        });

        KEYBOARD_LAYOUT.forEach((keyInfo, idx) => {
            const charLen = keyInfo.char.length;
            let geo = GEOMETRIES.standard;
            let canvasWidth = 128;
            let fontSize = 74;

            if (keyInfo.isSpacebar) {
                geo = GEOMETRIES.spacebar;
                canvasWidth = 512;
                fontSize = 44;
            } else if (charLen > 6) {
                geo = GEOMETRIES.long;
                canvasWidth = 384;
                fontSize = 32;
            } else if (charLen > 3) {
                geo = GEOMETRIES.medium;
                canvasWidth = 256;
                fontSize = 42;
            } else if (charLen > 1) {
                geo = GEOMETRIES.short;
                canvasWidth = 192;
                fontSize = 52;
            }

            const letterTex = createLetterTexture(keyInfo.char, colorHexStr, canvasWidth, fontSize);
            
            const frontMat = new THREE.MeshStandardMaterial({
                map: letterTex,
                roughness: 0.08,
                metalness: 0.8,
                transparent: true,
                opacity: 0.95,
                emissive: isThemeRed ? 0xff3366 : 0x00f3ff,
                emissiveIntensity: 0.18
            });
            
            // Apply materials array (4 index is Front face which displays letter)
            const materials = [
                sideMat, // right (shared)
                sideMat, // left (shared)
                sideMat, // top (shared)
                sideMat, // bottom (shared)
                frontMat, // front (displays the glowing siber letter/number/operator)
                sideMat  // back (shared)
            ];

            const mesh = new THREE.Mesh(geo, materials);

            // ====== NEAT KEYBOARD POSITION ON Page Load (p = 0) ======
            const gridX = keyInfo.x;
            const gridY = keyInfo.y - 0.7; // perfectly centers it in the hero header!
            const gridZ = -2.5;

            mesh.position.set(gridX, gridY, gridZ);
            mesh.rotation.set(0, 0, 0);

            mesh.castShadow = !isMobile;
            mesh.receiveShadow = !isMobile;

            // Holographic Wireframe shell outline (using shared wireMat and shared geo)
            if (!isMobile && idx % 3 === 0) {
                const wireMesh = new THREE.Mesh(geo, wireMat);
                wireMesh.scale.setScalar(1.15); 
                mesh.add(wireMesh); 
            }

            scene.add(mesh);

            // ====== PRE-CALCULATE ZERO-GRAVITY SCATTER TARGETS ======
            const angle = (idx / KEYBOARD_LAYOUT.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.7;
            const radiusX = 4.5 + Math.random() * 8.5;
            const radiusZ = 3.5 + Math.random() * 6.5;

            objects.push({
                mesh,
                gridX,
                gridY,
                gridZ,
                scatterX: Math.cos(angle) * radiusX,
                scatterY: -3.0 + Math.random() * 4.0, 
                scatterZ: Math.sin(angle) * radiusZ - 3,
                floatHeight: (idx % 2 === 0) ? (5 + Math.random() * 10) : (1.5 + Math.random() * 4.0),
                floatDelay: (idx / KEYBOARD_LAYOUT.length) * 0.35, 
                microRot: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.015,
                },
                wobblePhase: Math.random() * Math.PI * 2,
                wobbleAmpX: 0.4 + Math.random() * 0.5, 
                wobbleAmpZ: 0.3 + Math.random() * 0.4,
                frontMat,
                sideMat
            });
        });

        // ====== 3D BRAND SIGNATURE "VAALH_0" BUILDING ======
        const sigObjects = [];
        SIGNATURE_LAYOUT.forEach((sigInfo) => {
            const geo = GEOMETRIES.standard; // Share geometry
            
            // Generate glowing canvas texture for the letters
            const letterTex = createLetterTexture(sigInfo.char, colorHexStr, 128, 74);
            
            const frontMat = new THREE.MeshStandardMaterial({
                map: letterTex,
                roughness: 0.08,
                metalness: 0.8,
                transparent: true,
                opacity: 0.95,
                emissive: isThemeRed ? 0xff3366 : 0x00f3ff,
                emissiveIntensity: 0.28 // Glow slightly brighter for signature logo!
            });
            
            const materials = [
                sideMat, // right (shared)
                sideMat, // left (shared)
                sideMat, // top (shared)
                sideMat, // bottom (shared)
                frontMat, // front face (glowing neon letter)
                sideMat  // back (shared)
            ];

            const mesh = new THREE.Mesh(geo, materials);
            
            // Position flat on floor (y = -3.09) and recessed (z = -4.5)
            mesh.position.set(sigInfo.x, -3.09, -4.5);
            mesh.rotation.set(-Math.PI / 2, 0, 0); // Laid flat facing upward
            
            mesh.castShadow = !isMobile;
            mesh.receiveShadow = !isMobile;
            
            scene.add(mesh);
            
            sigObjects.push({
                mesh,
                frontMat,
                sideMat
            });
        });

        // ====== BACKGROUND PARTICLES ======
        const PARTICLE_COUNT = isMobile ? 50 : 130; 
        const pPositions = new Float32Array(PARTICLE_COUNT * 3);
        const pOriginal = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * 75; 
            const y = (Math.random() - 0.5) * 40 - 5;
            const z = (Math.random() - 0.5) * 55 - 12; 
            pPositions[i * 3] = x;
            pPositions[i * 3 + 1] = y;
            pPositions[i * 3 + 2] = z;
            pOriginal[i * 3] = x;
            pOriginal[i * 3 + 1] = y;
            pOriginal[i * 3 + 2] = z;
        }

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

        const pMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.07,
            transparent: true,
            opacity: 0.35, 
            sizeAttenuation: true,
        });

        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // ====== SCROLL PROGRESS ======
        const scrollState = { progress: 0 };

        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2.5,
            onUpdate: function (self) {
                scrollState.progress = self.progress;
            }
        });

        // ====== SMOOTHSTEP HELPER ======
        function smoothstep(edge0, edge1, x) {
            var t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
            return t * t * (3 - 2 * t);
        }

        // ====== REAL-TIME THEME MORPHING EVENT ======
        document.addEventListener('themeChanged', function (e) {
            const isRedTheme = e.detail.isRed;
            const targetTheme = isRedTheme ? THEME_COLORS.red : THEME_COLORS.dark;

            // 1. Smoothly morph spotLight color
            gsap.to(spotLight.color, {
                r: ((targetTheme.accent1 >> 16) & 255) / 255,
                g: ((targetTheme.accent1 >> 8) & 255) / 255,
                b: (targetTheme.accent1 & 255) / 255,
                duration: 0.9,
                ease: 'power2.out'
            });

            // 2. Smoothly morph dirLight color
            gsap.to(dirLight.color, {
                r: ((targetTheme.accent2 >> 16) & 255) / 255,
                g: ((targetTheme.accent2 >> 8) & 255) / 255,
                b: (targetTheme.accent2 & 255) / 255,
                duration: 0.9,
                ease: 'power2.out'
            });

            // Smoothly morph topShadowLight color temperature (warm white vs cool white)
            const topShadowTarget = isRedTheme ? 0xfff2f5 : 0xf0faff;
            gsap.to(topShadowLight.color, {
                r: ((topShadowTarget >> 16) & 255) / 255,
                g: ((topShadowTarget >> 8) & 255) / 255,
                b: (topShadowTarget & 255) / 255,
                duration: 0.9,
                ease: 'power2.out'
            });

            // 3. Smoothly morph hemiLight colors
            gsap.to(hemiLight.color, {
                r: ((targetTheme.hemiSky >> 16) & 255) / 255,
                g: ((targetTheme.hemiSky >> 8) & 255) / 255,
                b: (targetTheme.hemiSky & 255) / 255,
                duration: 0.9,
                ease: 'power2.out'
            });

            gsap.to(hemiLight.groundColor, {
                r: ((targetTheme.hemiGround >> 16) & 255) / 255,
                g: ((targetTheme.hemiGround >> 8) & 255) / 255,
                b: (targetTheme.hemiGround & 255) / 255,
                duration: 0.9,
                ease: 'power2.out'
            });

            // 5. Smoothly morph interactive mouse light tint
            gsap.to(mouseLight.color, {
                r: ((targetTheme.mouseColor >> 16) & 255) / 255,
                g: ((targetTheme.mouseColor >> 8) & 255) / 255,
                b: (targetTheme.mouseColor & 255) / 255,
                duration: 0.8,
                ease: 'power2.out'
            });

            // Smoothly morph Cyber Grid grid lines color
            gsap.to(gridHelper.material.color, {
                r: ((targetTheme.accent1 >> 16) & 255) / 255,
                g: ((targetTheme.accent1 >> 8) & 255) / 255,
                b: (targetTheme.accent1 & 255) / 255,
                duration: 0.9,
                ease: 'power2.out'
            });

            // 6. Smoothly morph mechanical keycaps
            const targetColorHex = isRedTheme ? 0xff3366 : 0x00f3ff;
            const sideColorHex = isRedTheme ? 0x1f0b12 : 0x071b26;
            
            const rSide = ((sideColorHex >> 16) & 255) / 255;
            const gSide = ((sideColorHex >> 8) & 255) / 255;
            const bSide = (sideColorHex & 255) / 255;
            
            objects.forEach((obj) => {
                gsap.to(obj.frontMat.emissive, {
                    r: ((targetColorHex >> 16) & 255) / 255,
                    g: ((targetColorHex >> 8) & 255) / 255,
                    b: (targetColorHex & 255) / 255,
                    duration: 0.9,
                    ease: 'power2.out'
                });

                gsap.to(obj.sideMat.color, {
                    r: rSide,
                    g: gSide,
                    b: bSide,
                    duration: 0.9,
                    ease: 'power2.out'
                });

                obj.mesh.children.forEach((child) => {
                    if (child.material) {
                        gsap.to(child.material.color, {
                            r: ((targetColorHex >> 16) & 255) / 255,
                            g: ((targetColorHex >> 8) & 255) / 255,
                            b: (targetColorHex & 255) / 255,
                            duration: 0.9,
                            ease: 'power2.out'
                        });
                    }
                });
            });

            // 7. Smoothly morph 3D Brand Signature flat floor embedded letters
            sigObjects.forEach((obj) => {
                gsap.to(obj.frontMat.emissive, {
                    r: ((targetColorHex >> 16) & 255) / 255,
                    g: ((targetColorHex >> 8) & 255) / 255,
                    b: (targetColorHex & 255) / 255,
                    duration: 0.9,
                    ease: 'power2.out'
                });

                gsap.to(obj.sideMat.color, {
                    r: rSide,
                    g: gSide,
                    b: bSide,
                    duration: 0.9,
                    ease: 'power2.out'
                });
            });
        });

        // ====== RENDER LOOP ======
        let time = 0;
        let isVisible = true;

        document.addEventListener('visibilitychange', function () {
            isVisible = !document.hidden;
        });

        function animate() {
            requestAnimationFrame(animate);

            if (!isVisible) return;

            time += 0.007; 
            const p = scrollState.progress;

            // ---- Interpolate interactive mouse position ----
            mouse.x += (mouse.targetX - mouse.x) * 0.045;
            mouse.y += (mouse.targetY - mouse.y) * 0.045;

            // Keyboard starts scattering dynamically on scroll
            const scatterP = smoothstep(0.02, 0.85, p);

            // ---- Animate objects ----
            for (let i = 0; i < objects.length; i++) {
                var obj = objects[i];

                var effectiveP = smoothstep(obj.floatDelay, 0.85, p);

                // Pre-calculated target position in haptic space
                var targetX = obj.scatterX;
                var targetY = obj.scatterY + effectiveP * obj.floatHeight;
                var targetZ = obj.scatterZ;

                // Elliptical wobble drift when scattered
                var wobbleX = Math.sin(time * 0.5 + obj.wobblePhase) * obj.wobbleAmpX * effectiveP;
                var wobbleZ = Math.cos(time * 0.4 + obj.wobblePhase * 1.35) * obj.wobbleAmpZ * effectiveP;
                
                targetX += wobbleX;
                targetZ += wobbleZ;

                // LERP: Smoothly blend between neat keyboard coordinates (grid) and haptic scattered path
                var currentX = THREE.MathUtils.lerp(obj.gridX, targetX, scatterP);
                var currentY = THREE.MathUtils.lerp(obj.gridY, targetY, scatterP);
                var currentZ = THREE.MathUtils.lerp(obj.gridZ, targetZ, scatterP);

                obj.mesh.position.set(currentX, currentY, currentZ);

                // ---- RETAIN KEYBOARD ORIENTATION AT START, SPIN WHEN SCATTERED ----
                var rotIntensity = 0.18 + effectiveP * 1.6;
                
                var targetRotX = obj.mesh.rotation.x + obj.microRot.x * rotIntensity;
                var targetRotY = obj.mesh.rotation.y + obj.microRot.y * rotIntensity;
                var targetRotZ = obj.mesh.rotation.z + obj.microRot.z * rotIntensity;

                // Lerp rotations: perfectly straight facing camera at top (p=0), spins on scroll
                obj.mesh.rotation.x = THREE.MathUtils.lerp(0, targetRotX, scatterP);
                obj.mesh.rotation.y = THREE.MathUtils.lerp(0, targetRotY, scatterP);
                obj.mesh.rotation.z = THREE.MathUtils.lerp(0, targetRotZ, scatterP);

                // Constant high opacity for permanent visibility
                let opacity = 0.95; 
                obj.mesh.material.forEach((mat) => {
                    if (mat) mat.opacity = opacity;
                });

                obj.mesh.children.forEach((child) => {
                    if (child.material) {
                        child.material.opacity = opacity * 0.22; 
                    }
                });
            }

            // ---- Parallax particles ----
            var posArr = particles.geometry.attributes.position.array;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                var depth = (i / PARTICLE_COUNT);
                posArr[i * 3 + 1] = pOriginal[i * 3 + 1] + p * (7 + depth * 10);
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y = time * 0.012;

            // Particles stay visible
            let pOpacity = 0.35;
            pMat.opacity = pOpacity;

            // ---- Spotlight orbiting ----
            var lightAngle = time * 0.2 + p * Math.PI * 1.6;
            spotLight.position.x = Math.sin(lightAngle) * 11;
            spotLight.position.z = Math.cos(lightAngle) * 11;
            spotLight.position.y = 15 + p * 6;
            spotLight.target.position.set(0, p * 4, -2);
            spotLight.target.updateMatrixWorld();

            // Directional light slow drift
            dirLight.position.x = Math.cos(time * 0.12) * 9;
            dirLight.position.y = 8 + Math.sin(time * 0.08) * 3 + p * 4;

            // Rim light chases mouse smoothly
            mouseLight.position.x = mouse.x * 12;
            mouseLight.position.y = mouse.y * 8 + p * 4;
            mouseLight.intensity = 3.0;

            // Base rim light
            rimLight.intensity = 0.5 + p * 1.5;
            rimLight.position.y = -3 + p * 6;

            // Dynamic camera perspective parallax with smart mobile aspect-ratio zoom helper
            const aspectFactor = window.innerWidth < 768 ? Math.max(1.0, 0.72 / (window.innerWidth / window.innerHeight)) : 1.0;
            camera.position.x = Math.sin(time * 0.06) * 1.6 + mouse.x * 2.8; 
            camera.position.y = 3.0 + p * 5.0 + mouse.y * 1.8;
            camera.position.z = (15.0 - p * 3.5) * aspectFactor;
            camera.lookAt(mouse.x * 1.4, p * 3.6 + mouse.y * 0.4, -2);

            // Floor glass surface and holographic grid lines fade slowly on scroll but remain visible at base
            floorMat.opacity = Math.max(0.22, 0.65 - p * 0.45);
            gridHelper.material.opacity = Math.max(0.08, 0.28 - p * 0.20);

            renderer.render(scene, camera);
        }

        animate();

        // ====== RESPONSIVE RESIZE ======
        var resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, 150);
        });
    }

    // Start after window has fully loaded all assets for best LCP performance
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();
