/* =====================================================
   PROMEIA · 普罗米娅
   交互脚本：自定义光标 / 时钟 / 数据流 / 进度条
              3D Coverflow 画廊 / 滚动激活
   ===================================================== */

(function () {
  'use strict';

  /* --------- 自定义光标 --------- */
  const outer = document.getElementById('cursorOuter');
  const inner = document.getElementById('cursorInner');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let ox = mx, oy = my;

  if (window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      inner.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      ox += (mx - ox) * 0.18;
      oy += (my - oy) * 0.18;
      outer.style.transform = `translate(${ox}px, ${oy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('mouseover', (e) => {
      const t = e.target;
      if (t.closest('a, button, .cover-card, .charm-card, .gal-btn')) {
        outer.classList.add('active');
      }
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target;
      if (t.closest('a, button, .cover-card, .charm-card, .gal-btn')) {
        outer.classList.remove('active');
      }
    });
  }

  /* --------- HUD 时钟 --------- */
  const clockEl = document.getElementById('liveClock');
  const tick = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  };
  tick(); setInterval(tick, 1000);

  /* --------- 随机编号 --------- */
  document.querySelectorAll('.rand').forEach((el) => {
    const num = Math.floor(Math.random() * 9000 + 1000);
    const letters = 'ΑΒΓΔΕΖΗΘΙΚΛΞΟΠΡΣΤΦΧΨΩ';
    el.textContent = `${num}-${letters[Math.floor(Math.random() * letters.length)]}`;
  });

  /* --------- HERO 数据流 --------- */
  const stream = document.getElementById('dataStream');
  if (stream) {
    const snippets = [
      'KRAMPUS://SCAN_OK',
      'PMA-274 // ACTIVE',
      '> CRYO ANOMALY +96',
      'CHAIN_LOCK :: RELEASED',
      'VERDICT-FLAG ▸▸ ON',
      'OUTER_RING > CLEAR',
      '0xCAFEBABE',
      'JUDICATOR.SIG',
      '⌬ ICE INDEX 0.96',
      'AUTH: COMPLIANCE',
      'RUN /verdict.exe',
      '∇ FROST_BURST',
    ];
    const count = 22;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'data-bit';
      s.textContent = snippets[Math.floor(Math.random() * snippets.length)];
      s.style.left = (Math.random() * 100) + 'vw';
      s.style.animationDuration = (8 + Math.random() * 10) + 's';
      s.style.animationDelay = (-Math.random() * 12) + 's';
      s.style.fontSize = (10 + Math.random() * 4) + 'px';
      stream.appendChild(s);
    }
  }

  /* --------- 进度条触发 --------- */
  const fills = document.querySelectorAll('.fill');
  const fillObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const target = en.target;
        const v = target.getAttribute('data-fill');
        target.style.width = v + '%';
        fillObs.unobserve(target);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach((f) => fillObs.observe(f));

  /* --------- 滚动激活导航 --------- */
  const sections = ['hero', 'dossier', 'charm', 'gallery', 'verdict']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navTop = document.querySelectorAll('.hud-nav a');
  const navSide = document.querySelectorAll('.side-item');
  const setActive = (id) => {
    navTop.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    navSide.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  };
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) setActive(en.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => navObs.observe(s));

  /* =====================================================
     3D COVERFLOW 画廊
  ===================================================== */
  const coverflow = document.getElementById('coverflow');
  const prevBtn = document.getElementById('galPrev');
  const nextBtn = document.getElementById('galNext');
  const galIndex = document.getElementById('galIndex');
  const galName = document.getElementById('galName');

  // 画廊图片清单（避开档案/charm/verdict 已使用的主图，以保留差异感）
  const images = [
    { src: 'images/142618475_p0.jpg',  name: 'FROST_ARCHIVE / 0142618475' },
    { src: 'images/142755332_p1.png',  name: 'CRYO_LOG / 0142755332' },
    { src: 'images/142762083_p0.PNG',  name: 'JUDICATOR / 0142762083' },
    { src: 'images/142867265_p0.PNG',  name: 'CHAIN_BREAK / 0142867265' },
    { src: 'images/143178523_p0.JPG',  name: 'VERDICT_PROOF / 0143178523-A' },
    { src: 'images/143178523_p1.JPG',  name: 'VERDICT_PROOF / 0143178523-B' },
    { src: 'images/143422080_p1.jpg',  name: 'OUTER_RING / 0143422080' },
    { src: 'images/144461959_p0.jpg',  name: 'STREET_SHADOW / 0144461959' },
    { src: 'images/IMG_6557.WEBP',     name: 'PROMEIA / FIELD-6557' },
    { src: 'images/IMG_7192.jpg',      name: 'PROMEIA / FIELD-7192' },
    { src: 'images/Kaeru AI.png',      name: 'KAERU // SUBJECT' },
    { src: 'images/LOALO.jpg',         name: 'LOALO // ARCHIVE' },
    { src: 'images/MY WIFE.jpg',       name: 'TRUSTED-FILE / 1' },
    { src: 'images/丽都夜话.png',       name: 'NIGHT WHISPER · 丽都夜话' },
    { src: 'images/头像.jpg',          name: 'AVATAR / PROFILE' },
    { src: 'images/抖音 WEBP.webp',    name: 'SOCIAL FRAME' },
    { src: 'images/踢腿.jpg',          name: 'COMBAT KICK / FRAME-K' },
  ];

  let index = 0;
  const cards = [];

  // 预加载，避免抖动
  const preload = (arr) => Promise.all(
    arr.map((it) => new Promise((res) => {
      const img = new Image();
      img.onload = img.onerror = () => res();
      img.src = it.src;
    }))
  );

  // 构建卡片
  const buildCards = () => {
    images.forEach((it, i) => {
      const card = document.createElement('div');
      card.className = 'cover-card';
      card.setAttribute('data-index', i);
      card.innerHTML = `
        <div class="cover-inner">
          <img src="${it.src}" alt="" loading="${i < 5 ? 'eager' : 'lazy'}" decoding="async" />
          <span class="cover-frame-tl"></span>
          <span class="cover-frame-tr"></span>
          <span class="cover-frame-bl"></span>
          <span class="cover-frame-br"></span>
          <div class="cover-tag">FRAME ${String(i + 1).padStart(2, '0')} // ${it.name}</div>
        </div>`;
      coverflow.appendChild(card);
      cards.push(card);
      card.addEventListener('click', () => {
        // 拖拽过则不触发
        if (Math.abs(dragMoved) > 8) return;
        if (i !== index) {
          index = i;
          layout();
        } else {
          openLightbox(i);
        }
      });
    });
  };

  // 排列布局（去掉 blur 与 brightness filter，改用纯 transform + 透明度，提升性能）
  const layout = () => {
    const total = cards.length;
    const isMobile = window.innerWidth <= 820;
    const stepX = isMobile ? 130 : 200;
    const stepZ = isMobile ? 100 : 150;
    const maxRot = 42;
    const visible = 3; // 只保留中心 ±3 张参与渲染

    cards.forEach((c, i) => {
      let offset = i - index;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const absOff = Math.abs(offset);

      // 超出可视范围直接隐藏，避免重绘
      if (absOff > visible) {
        c.style.opacity = '0';
        c.style.visibility = 'hidden';
        c.classList.remove('center','dim');
        return;
      }
      c.style.visibility = 'visible';

      const x = offset * stepX;
      const z = -absOff * stepZ;
      const rotY = Math.max(-maxRot, Math.min(maxRot, -offset * 22));
      const scale = absOff === 0 ? 1.03 : 1 - Math.min(absOff * 0.07, 0.22);

      c.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
      c.style.zIndex = String(100 - absOff);
      c.style.opacity = absOff >= visible ? '0.25' : '1';
      c.classList.toggle('center', absOff === 0);
      c.classList.toggle('dim', absOff !== 0);
    });

    galIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    galName.textContent = images[index].name;
  };

  const next = () => { index = (index + 1) % cards.length; layout(); };
  const prev = () => { index = (index - 1 + cards.length) % cards.length; layout(); };

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  // 键盘
  document.addEventListener('keydown', (e) => {
    const inView = document.getElementById('gallery').getBoundingClientRect();
    if (inView.top < window.innerHeight && inView.bottom > 0) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
  });

  // 滚轮（仅在 hover 画廊时拦截）
  let wheelLock = false;
  if (coverflow) {
    coverflow.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      if (e.deltaY > 0 || e.deltaX > 0) next(); else prev();
      setTimeout(() => (wheelLock = false), 380);
    }, { passive: false });
  }

  // 触控拖拽
  let dragStartX = 0, dragging = false, dragMoved = 0;
  const onDown = (e) => {
    dragging = true;
    dragStartX = (e.touches ? e.touches[0].clientX : e.clientX);
    dragMoved = 0;
  };
  const onMove = (e) => {
    if (!dragging) return;
    const cx = (e.touches ? e.touches[0].clientX : e.clientX);
    dragMoved = cx - dragStartX;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(dragMoved) > 50) {
      if (dragMoved < 0) next(); else prev();
    }
  };
  if (coverflow) {
    coverflow.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    coverflow.addEventListener('touchstart', onDown, { passive: true });
    coverflow.addEventListener('touchmove', onMove, { passive: true });
    coverflow.addEventListener('touchend', onUp);
  }

  // 自动轮播（hover 暂停 / 离开视口暂停）
  let autoTimer = null;
  let inViewport = false;
  const startAuto = () => {
    if (autoTimer) return;
    if (!inViewport) return;
    autoTimer = setInterval(next, 5200);
  };
  const stopAuto = () => {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  };
  if (coverflow) {
    coverflow.addEventListener('mouseenter', stopAuto);
    coverflow.addEventListener('mouseleave', startAuto);
  }
  // IntersectionObserver：画廊不在视口时完全停止
  const galSection = document.getElementById('gallery');
  if (galSection) {
    const galObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        inViewport = en.isIntersecting;
        if (inViewport) startAuto(); else stopAuto();
      });
    }, { threshold: 0.2 });
    galObs.observe(galSection);
  }

  window.addEventListener('resize', layout);

  // 启动
  preload(images).then(() => {
    buildCards();
    layout();
  });

  /* --------- 视频播放兜底（如启用本地视频背景）--------- */
  const v = document.querySelector('video.hero-video');
  if (v) {
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });

    // 离开视口时暂停，节省大量解码开销
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const vo = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) tryPlay(); else v.pause();
        });
      }, { threshold: 0.05 });
      vo.observe(heroEl);
    }
  }

  /* =====================================================
     LIGHTBOX 灯箱
  ===================================================== */
  const lb = document.getElementById('lightbox');
  const lbTrack = document.getElementById('lbTrack');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbClose = document.getElementById('lbClose');
  const lbIndex = document.getElementById('lbIndex');
  const lbName = document.getElementById('lbName');

  let lbActive = false;
  let lbIdx = 0;
  let lbSlides = [];
  let lbBusy = false;

  // 构建空 slide 占位
  const buildLbSlides = () => {
    images.forEach((it, i) => {
      const s = document.createElement('div');
      s.className = 'lb-slide';
      s.setAttribute('data-index', i);
      const img = document.createElement('img');
      img.alt = it.name;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.dataset.src = it.src;
      s.appendChild(img);
      lbTrack.appendChild(s);
      lbSlides.push(s);
    });
  };
  buildLbSlides();

  const setLbContent = (i) => {
    const img = lbSlides[i].querySelector('img');
    if (!img.src) img.src = img.dataset.src;
    lbIndex.textContent = `${String(i + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    lbName.textContent = images[i].name;
  };

  // 预加载相邻
  const preloadNeighbors = (i) => {
    [i - 1, i + 1].forEach((k) => {
      const idx = (k + images.length) % images.length;
      const img = lbSlides[idx].querySelector('img');
      if (!img.src) img.src = img.dataset.src;
    });
  };

  const openLightbox = (i) => {
    lbIdx = i;
    lbSlides.forEach((s, k) => s.classList.toggle('active', k === i));
    setLbContent(i);
    preloadNeighbors(i);
    lb.classList.add('active');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lb-open');
    lbActive = true;
    stopAuto();
  };

  const closeLightbox = () => {
    lb.classList.remove('active');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lb-open');
    lbActive = false;
    startAuto();
  };

  const lbGo = (dir) => {
    if (lbBusy) return;
    lbBusy = true;
    const prevIdx = lbIdx;
    const nextIdx = (lbIdx + dir + images.length) % images.length;
    const oldSlide = lbSlides[prevIdx];
    const newSlide = lbSlides[nextIdx];

    setLbContent(nextIdx);
    preloadNeighbors(nextIdx);

    oldSlide.classList.remove('active');
    oldSlide.classList.add(dir > 0 ? 'exit-left' : 'exit-right');
    // 入场起点
    newSlide.classList.remove('exit-left','exit-right');
    newSlide.style.transition = 'none';
    newSlide.style.transform = dir > 0 ? 'translateX(40px) scale(.98)' : 'translateX(-40px) scale(.98)';
    newSlide.style.opacity = '0';
    // 强制 reflow 后启用过渡
    void newSlide.offsetWidth;
    newSlide.style.transition = '';
    newSlide.style.transform = '';
    newSlide.style.opacity = '';
    newSlide.classList.add('active');

    lbIdx = nextIdx;
    setTimeout(() => {
      oldSlide.classList.remove('exit-left','exit-right');
      lbBusy = false;
    }, 450);

    // 同步外层 coverflow 索引
    index = nextIdx;
    layout();
  };

  lbPrev && lbPrev.addEventListener('click', (e) => { e.stopPropagation(); lbGo(-1); });
  lbNext && lbNext.addEventListener('click', (e) => { e.stopPropagation(); lbGo(1); });
  lbClose && lbClose.addEventListener('click', closeLightbox);

  // 点击背景或图片以外的空白区域关闭（按钮、图片不响应）
  lb.addEventListener('click', (e) => {
    if (e.target.closest('.lb-btn, .lb-close, img')) return;
    closeLightbox();
  });

  // 键盘
  document.addEventListener('keydown', (e) => {
    if (!lbActive) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') lbGo(1);
    else if (e.key === 'ArrowLeft') lbGo(-1);
  });

  // 触控/鼠标 滑动
  let lbDownX = 0, lbDownY = 0, lbDragging = false, lbMoved = 0;
  const lbDown = (e) => {
    lbDragging = true;
    const p = e.touches ? e.touches[0] : e;
    lbDownX = p.clientX; lbDownY = p.clientY; lbMoved = 0;
  };
  const lbMove = (e) => {
    if (!lbDragging) return;
    const p = e.touches ? e.touches[0] : e;
    lbMoved = p.clientX - lbDownX;
  };
  const lbUp = () => {
    if (!lbDragging) return;
    lbDragging = false;
    if (Math.abs(lbMoved) > 60) {
      lbGo(lbMoved < 0 ? 1 : -1);
    }
  };
  lb.addEventListener('mousedown', lbDown);
  window.addEventListener('mousemove', lbMove);
  window.addEventListener('mouseup', lbUp);
  lb.addEventListener('touchstart', lbDown, { passive: true });
  lb.addEventListener('touchmove', lbMove, { passive: true });
  lb.addEventListener('touchend', lbUp);
})();
