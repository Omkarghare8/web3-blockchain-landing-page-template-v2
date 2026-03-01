/* COPYRIGHT SIGNATURE: Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026 */

// Runtime integrity check — verifies signature exists in key files and shows a persistent overlay if missing.
;(async function pageIntegrityCheck(){
    const token = 'Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026';
    const files = ['index.html', 'css/style.css', 'js/script.js'];
    try {
        const texts = await Promise.all(files.map(f => fetch(f).then(r => r.ok ? r.text() : '')));
        const missing = files.filter((f, i) => !texts[i] || !texts[i].includes(token));
        if (missing.length) {
            const overlay = document.createElement('div');
            overlay.id = 'integrity-overlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                inset: '0',
                background: 'rgba(10,10,15,0.95)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '2147483647',
                padding: '20px',
                textAlign: 'center',
                fontFamily: 'sans-serif',
                lineHeight: '1.4'
            });
            overlay.innerHTML = '<div><h2 style="margin-bottom:8px;">Integrity Check Failed</h2><p style="opacity:0.9;">This page has been modified and the required copyright signature is missing from: ' + missing.join(', ') + '.</p></div>';
            document.documentElement.appendChild(overlay);
            console.error('Integrity check failed. Missing signature in: ', missing);
            document.documentElement.style.pointerEvents = 'none';
            overlay.style.pointerEvents = 'auto';
        }
    } catch (e) {
        console.warn('Integrity check error', e);
    }
})();

        // ==================== PRELOADER ====================
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hidden');
            }, 2500);
        });

        // ==================== THEME TOGGLE ====================
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // ==================== NAVIGATION ====================
        const navbar = document.getElementById('navbar');
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // ==================== SCROLL TO TOP ====================
        const scrollTop = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ==================== SCROLL ANIMATIONS ====================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // ==================== FAQ ACCORDION ====================
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close all other items
                document.querySelectorAll('.faq-item').forEach(faq => {
                    faq.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // ==================== COUNTER ANIMATION ====================
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            
            updateCounter();
        }

        // ==================== 3D HERO ANIMATION ====================
        function initHero3D() {
            const canvas = document.getElementById('hero-canvas');
            if (!canvas) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Create blockchain-like structure
            const group = new THREE.Group();

            // Central icosahedron
            const geometry = new THREE.IcosahedronGeometry(2, 0);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00f5ff,
                wireframe: true,
                transparent: true,
                opacity: 0.8
            });
            const icosahedron = new THREE.Mesh(geometry, material);
            group.add(icosahedron);

            // Inner glow
            const glowGeometry = new THREE.IcosahedronGeometry(1.5, 1);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0x7b2cbf,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            group.add(glow);

            // Orbiting particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particleCount = 200;
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                const radius = 3 + Math.random() * 3;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                
                positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = radius * Math.cos(phi);
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                color: 0x00f5ff,
                size: 0.05,
                transparent: true,
                opacity: 0.8
            });
            
            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            group.add(particles);

            scene.add(group);
            camera.position.z = 6;

            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                icosahedron.rotation.x += 0.003;
                icosahedron.rotation.y += 0.005;
                
                glow.rotation.x -= 0.002;
                glow.rotation.y -= 0.003;
                
                particles.rotation.y += 0.001;
                
                renderer.render(scene, camera);
            }

            animate();

            // Resize handler
            window.addEventListener('resize', () => {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            });
        }

        // ==================== 3D ABOUT ANIMATION ====================
        function initAbout3D() {
            const canvas = document.getElementById('about-canvas');
            if (!canvas) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Create network nodes
            const nodes = [];
            const lines = [];

            for (let i = 0; i < 12; i++) {
                const geometry = new THREE.OctahedronGeometry(0.3, 0);
                const material = new THREE.MeshBasicMaterial({
                    color: i % 3 === 0 ? 0x00f5ff : i % 3 === 1 ? 0x7b2cbf : 0xff006e,
                    wireframe: true
                });
                const node = new THREE.Mesh(geometry, material);
                
                const angle = (i / 12) * Math.PI * 2;
                const radius = 2.5 + Math.sin(i) * 0.5;
                node.position.x = Math.cos(angle) * radius;
                node.position.y = Math.sin(angle) * radius;
                node.position.z = Math.sin(i * 0.5) * 1.5;
                
                nodes.push(node);
                scene.add(node);
            }

            // Connect nodes with lines
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x00f5ff,
                transparent: true,
                opacity: 0.3
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    if (Math.random() > 0.6) {
                        const points = [nodes[i].position, nodes[j].position];
                        const geometry = new THREE.BufferGeometry().setFromPoints(points);
                        const line = new THREE.Line(geometry, lineMaterial);
                        lines.push({ line, start: i, end: j });
                        scene.add(line);
                    }
                }
            }

            camera.position.z = 6;

            function animate() {
                requestAnimationFrame(animate);
                
                nodes.forEach((node, i) => {
                    node.rotation.x += 0.01;
                    node.rotation.y += 0.01;
                    node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
                });

                // Update lines
                lines.forEach(({ line, start, end }) => {
                    const positions = line.geometry.attributes.position.array;
                    positions[0] = nodes[start].position.x;
                    positions[1] = nodes[start].position.y;
                    positions[2] = nodes[start].position.z;
                    positions[3] = nodes[end].position.x;
                    positions[4] = nodes[end].position.y;
                    positions[5] = nodes[end].position.z;
                    line.geometry.attributes.position.needsUpdate = true;
                });
                
                renderer.render(scene, camera);
            }

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            });
        }

        // ==================== FORM HANDLING ====================
        document.getElementById('ctaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            // Show success message (you can replace with actual API call)
            alert(`Thank you! We'll contact you at ${email}`);
            e.target.reset();
        });

        // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ==================== INITIALIZE ====================
        document.addEventListener('DOMContentLoaded', () => {
            initHero3D();
            initAbout3D();
        });

        // ==================== PERFORMANCE OPTIMIZATION ====================
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }