/**
 * Hành Trình Đức Tin - Light of Christmas (Phiên Bản Tươi Sáng Sủa Không Dùng Màu Tối)
 */

class FaithJourney {
  constructor() {
    this.milestones = {
      hero: false,
      advent: [false, false, false, false],
      starSteps: [false, false, false, false, false, false, false],
      giftOffered: null,
      prayerOffered: false,
      letterOffered: false,
      tiredMeditated: false,
      nativityAdored: false
    };

    this.prayersOfferedCount = 2024;
    this.currentTiredIndex = 0;
    this.tiredTimer = null;

    this.starStepDetails = [
      {
        id: 1,
        title: "CẦU NGUYỆN",
        icon: "🙏",
        message: "Dành 5 phút yên lặng hôm nay để trò chuyện cùng Chúa.",
        reflection: "Sự thinh lặng là nơi Chúa lắng nghe con thì thầm. Hãy nhắm mắt lại, thở đều và cảm nhận Chúa đang yêu thương con.",
        actionText: "Con sẽ dành 5 phút trò chuyện với Chúa"
      },
      {
        id: 2,
        title: "LỜI CHÚA",
        icon: "📖",
        message: "Để Lời Chúa soi sáng từng bước chân con đi.",
        reflection: "“Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi.” (Thánh Vịnh 119:105)",
        actionText: "Con mở lòng đón nhận Lời Ngài"
      },
      {
        id: 3,
        title: "THA THỨ",
        icon: "❤️",
        message: "Có ai con cần tha thứ và mỉm cười làm hòa hôm nay không?",
        reflection: "Tha thứ không làm thay đổi quá khứ, nhưng mở ra tương lai rạng ngời và giúp trái tim con nhẹ nhõm, vui tươi.",
        actionText: "Con chọn tha thứ và yêu thương"
      },
      {
        id: 4,
        title: "BÁC ÁI",
        icon: "🤝",
        message: "Làm một việc tốt hôm nay mà không mong nhận lại điều gì.",
        reflection: "“Mỗi lần các con làm như thế cho một trong những anh em bé mọn nhất của Thầy đây, là các con đã làm cho chính Thầy.” (Mt 25:40)",
        actionText: "Con sẽ giúp đỡ một người bạn nhỏ"
      },
      {
        id: 5,
        title: "BÌNH AN",
        icon: "🕊️",
        message: "Xin Chúa xua tan mọi nỗi sợ và ban bình an vào tâm hồn con.",
        reflection: "“Thầy để lại bình an cho các con, Thầy ban bình an của Thầy cho các con.” (Ga 14:27)",
        actionText: "Con đón nhận sự bình an của Chúa"
      },
      {
        id: 6,
        title: "TRI ÂN",
        icon: "🌹",
        message: "Cảm tạ Chúa vì những ơn lành lặng lẽ mỗi ngày.",
        reflection: "Từ hơi thở, nụ cười của cha mẹ, bữa cơm ấm áp đến những người bạn thân... tất cả đều là món quà từ Chúa.",
        actionText: "Tạ ơn Chúa vì muôn vàn hồng ân"
      },
      {
        id: 7,
        title: "ĐỨC TIN",
        icon: "⭐",
        message: "Vững bước tiến lên trong niềm tin cậy vào lời Chúa hứa.",
        reflection: "Như ba nhà đạo sĩ dõi theo ánh sao dẫn lối, con hãy tin tưởng Chúa luôn dẫn đường cho con.",
        actionText: "Lạy Chúa, con tin cậy nơi Ngài"
      }
    ];

    this.adventDetails = [
      {
        week: 1,
        title: "TUẦN 1 – HY VỌNG",
        color: "#c084fc",
        message: "Khi con đường phía trước còn mịt mờ, con hãy cứ hy vọng. Chúa luôn ở bên con.",
        reflection: "Hôm nay con muốn trao phó điều gì vào đôi bàn tay yêu thương của Chúa?",
        action: "DÀNH PHÚT GIÂY CẦU NGUYỆN"
      },
      {
        week: 2,
        title: "TUẦN 2 – ĐỨC TIN",
        color: "#c084fc",
        message: "Đức tin là tin tưởng Chúa ngay cả khi chúng ta chưa nhìn thấy trọn vẹn con đường.",
        reflection: "Con cần phó thác nỗi lo lắng nào cho Chúa hôm nay?",
        action: "MỞ RỘNG TÂM HỒN"
      },
      {
        week: 3,
        title: "TUẦN 3 – NIỀM VUI",
        color: "#f472b6",
        message: "Niềm vui Giáng Sinh bắt đầu khi con nhận ra mình được Chúa yêu thương vô ngần.",
        reflection: "Hôm nay con có thể mang một nụ cười hay niềm vui đến cho ai?",
        action: "LAN TỎA NIỀM VUI"
      },
      {
        week: 4,
        title: "TUẦN 4 – TÌNH YÊU",
        color: "#c084fc",
        message: "Thiên Chúa yêu thương chúng ta đến nỗi đã ban chính Con Một của Người.",
        reflection: "Hôm nay con có thể bày tỏ tình yêu qua một hành động nhỏ bé nào?",
        action: "CHỌN LỰA YÊU THƯƠNG"
      }
    ];

    this.init();
  }

  init() {
    this.updateProgressUI();
  }

  beginJourney(event) {
    if (window.sacredAudio) {
      window.sacredAudio.init();
      if (!window.sacredAudio.isPlaying) {
        window.sacredAudio.play();
      }
      window.sacredAudio.playChime('candle');
    }

    if (window.celestialSky && event) {
      window.celestialSky.addStardustBurst(event.clientX || window.innerWidth / 2, event.clientY || 300, 45);
    }

    this.milestones.hero = true;
    this.updateProgressUI();

    const target = document.getElementById('advent-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  lightAdventCandle(index, event) {
    this.milestones.advent[index] = true;
    if (window.sacredAudio) {
      window.sacredAudio.playChime('candle');
    }

    if (window.celestialSky && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      window.celestialSky.addStardustBurst(rect.left + rect.width / 2, rect.top + 30, 30);
    }

    const candleEl = document.getElementById(`advent-candle-${index}`);
    if (candleEl) {
      const flame = candleEl.querySelector('.candle-flame');
      const aura = candleEl.querySelector('.candle-aura');
      const statusPill = candleEl.querySelector('.candle-status');
      if (flame) flame.classList.remove('opacity-0', 'scale-0');
      if (aura) aura.classList.remove('opacity-0');
      if (statusPill) {
        statusPill.innerHTML = '<span class="text-amber-600 font-extrabold">✨ Đã Thắp Sáng</span>';
      }
    }

    this.openAdventModal(index);
    this.updateProgressUI();
  }

  openAdventModal(index) {
    const data = this.adventDetails[index];
    const modal = document.getElementById('advent-modal');
    if (!modal) return;

    document.getElementById('advent-modal-title').textContent = data.title;
    document.getElementById('advent-modal-msg').textContent = `“${data.message}”`;
    document.getElementById('advent-modal-reflection').textContent = data.reflection;
    document.getElementById('advent-modal-action-btn').textContent = `✨ ${data.action}`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeAdventModal() {
    const modal = document.getElementById('advent-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  selectStarStep(stepIndex, event) {
    this.milestones.starSteps[stepIndex] = true;
    if (window.sacredAudio) {
      window.sacredAudio.playChime('step');
    }

    if (window.celestialSky && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      window.celestialSky.addStardustBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
    }

    const stepCard = document.getElementById(`star-step-${stepIndex}`);
    if (stepCard) {
      stepCard.classList.remove('opacity-70', 'border-amber-200');
      stepCard.classList.add('opacity-100', 'border-amber-500', 'bg-amber-50', 'shadow-[0_8px_25px_rgba(245,158,11,0.25)]');
      const badge = stepCard.querySelector('.step-check');
      if (badge) badge.classList.remove('hidden');
    }

    this.updateStarOfBethlehem();
    this.showStepReflection(stepIndex);
    this.updateProgressUI();
  }

  showStepReflection(stepIndex) {
    const step = this.starStepDetails[stepIndex];
    const banner = document.getElementById('star-reflection-banner');
    if (banner) {
      banner.innerHTML = `
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 border-3 border-amber-400 text-slate-800 shadow-xl animate-fade-in">
          <div class="flex items-center gap-3 mb-2 text-amber-700 font-extrabold text-lg">
            <span class="text-3xl">${step.icon}</span>
            <span>BƯỚC ${step.id}: ${step.title}</span>
          </div>
          <p class="text-amber-900 font-black text-xl mb-2">“${step.message}”</p>
          <p class="text-slate-700 font-bold text-base mb-4 leading-relaxed">${step.reflection}</p>
          <div class="inline-flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 shadow-md">
            <span>🌟</span> ${step.actionText}
          </div>
        </div>
      `;
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  updateStarOfBethlehem() {
    const completedCount = this.milestones.starSteps.filter(Boolean).length;
    const starGlow = document.getElementById('journey-star-glow');
    const starCore = document.getElementById('journey-star-core');
    const progressPath = document.getElementById('star-progress-path');

    if (progressPath) {
      const percentage = (completedCount / 7) * 100;
      progressPath.style.width = `${percentage}%`;
    }

    if (starGlow && starCore) {
      const scale = 1 + completedCount * 0.14;
      const opacity = 0.5 + completedCount * 0.08;
      starCore.style.transform = `scale(${scale})`;
      starGlow.style.opacity = `${opacity}`;
    }

    if (completedCount === 7) {
      const completionNotice = document.getElementById('star-completed-celebration');
      if (completionNotice) completionNotice.classList.remove('hidden');
      if (window.sacredAudio) {
        window.sacredAudio.playChime('blessing');
      }
    }
  }

  offerGift(giftName, icon, element, event) {
    this.milestones.giftOffered = giftName;
    if (window.sacredAudio) {
      window.sacredAudio.playChime('blessing');
    }

    if (window.celestialSky && event) {
      const rect = element.getBoundingClientRect();
      window.celestialSky.addStardustBurst(rect.left + rect.width / 2, rect.top, 40);
    }

    document.querySelectorAll('.gift-btn').forEach(btn => {
      btn.classList.remove('border-amber-500', 'bg-amber-100', 'ring-4', 'ring-amber-300');
    });
    element.classList.add('border-amber-500', 'bg-amber-100', 'ring-4', 'ring-amber-300');

    const display = document.getElementById('gift-feedback-display');
    if (display) {
      display.innerHTML = `
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50 to-sky-50 border-3 border-amber-400 text-center max-w-xl mx-auto animate-fade-in shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
          <div class="text-5xl mb-2 animate-bounce">${icon}</div>
          <h4 class="text-amber-800 font-black text-2xl tracking-wide mb-2">Con Đã Dâng Chúa: ${giftName.toUpperCase()}</h4>
          <p class="text-slate-800 font-black text-lg sm:text-xl mb-3 leading-relaxed">
            “Món quà đẹp nhất không phải là thứ chúng ta mua được.<br/>Đó chính là tình yêu thương chúng ta trao ban.”
          </p>
          <p class="text-sm sm:text-base text-amber-900 font-bold">
            Chúa Hài Đồng mỉm cười đón nhận món quà thánh thiện và tràn đầy tình yêu từ trái tim con!
          </p>
        </div>
      `;
    }

    this.updateProgressUI();
  }

  offerPrayer(event) {
    const input = document.getElementById('prayer-input');
    const text = input ? input.value.trim() : '';
    if (!text) {
      alert("Bé hãy viết một lời nguyện cầu yêu thương trước khi dâng lên Chúa nhé!");
      return;
    }

    this.milestones.prayerOffered = true;
    this.prayersOfferedCount++;

    if (window.sacredAudio) {
      window.sacredAudio.playChime('prayer');
    }

    const container = document.getElementById('prayer-box-container');
    if (container) {
      const orb = document.createElement('div');
      orb.className = 'absolute w-8 h-8 rounded-full bg-yellow-400 shadow-[0_0_20px_#f59e0b] kids-prayer-orb pointer-events-none flex items-center justify-center text-xs';
      orb.textContent = '⭐';
      orb.style.left = '50%';
      orb.style.bottom = '40px';
      orb.style.setProperty('--rand-x', `${(Math.random() - 0.5) * 80}px`);
      container.appendChild(orb);
      setTimeout(() => orb.remove(), 2500);
    }

    if (window.celestialSky && event) {
      window.celestialSky.addStardustBurst(window.innerWidth / 2, window.innerHeight * 0.4, 40);
    }

    const resultBox = document.getElementById('prayer-result-box');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="p-6 rounded-3xl bg-amber-50 border-3 border-amber-400 text-center animate-fade-in shadow-lg">
          <div class="text-3xl mb-2">✨ 🕯️ ⭐</div>
          <p class="text-amber-800 text-xl font-black mb-1">Lời cầu nguyện của con đã bay lên cùng Ánh Sao Bêlem</p>
          <p class="text-slate-800 text-base italic mb-3 font-bold">“${text}”</p>
          <div class="text-xs sm:text-sm text-amber-900 font-extrabold bg-amber-200/70 py-2 px-5 rounded-full inline-block">
            Đã hòa chung cùng <strong>${this.prayersOfferedCount.toLocaleString()}</strong> lời nguyện ước dâng lên Chúa Hài Đồng
          </div>
        </div>
      `;
      if (input) input.value = '';
    }

    this.updateProgressUI();
  }

  sendLetter(event) {
    const gratitude = document.getElementById('letter-gratitude')?.value.trim() || '';
    const worry = document.getElementById('letter-worry')?.value.trim() || '';
    const prayFor = document.getElementById('letter-prayfor')?.value.trim() || '';
    const change = document.getElementById('letter-change')?.value.trim() || '';
    const hope = document.getElementById('letter-hope')?.value.trim() || '';

    this.milestones.letterOffered = true;

    if (window.sacredAudio) {
      window.sacredAudio.playChime('blessing');
    }

    const parchment = document.getElementById('parchment-letter-wrapper');
    if (parchment) {
      parchment.style.transition = 'all 1.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
      parchment.style.transform = 'translateY(-100px) scale(0.9)';
      parchment.style.opacity = '0';
      parchment.style.filter = 'blur(6px) brightness(1.3)';
    }

    if (window.celestialSky && event) {
      window.celestialSky.addStardustBurst(window.innerWidth / 2, window.innerHeight * 0.5, 50);
    }

    setTimeout(() => {
      const container = document.getElementById('letter-sent-container');
      if (container) {
        container.classList.remove('hidden');
        container.innerHTML = `
          <div class="p-8 rounded-3xl bg-gradient-to-b from-amber-50 via-white to-sky-50 border-3 border-amber-400 text-center max-w-2xl mx-auto animate-fade-in shadow-2xl">
            <div class="text-5xl mb-4 animate-bounce">🕊️ 💌 ❤️</div>
            <h3 class="text-3xl text-amber-800 font-black mb-3">Lá Thư Của Con Đã Được Trao Vào Tay Chúa</h3>
            <p class="text-xl font-black text-slate-800 mb-6 leading-relaxed">
              “Con không phải gánh vác mọi sự một mình.<br/>Hãy đặt trọn trái tim bé nhỏ vào đôi tay Chúa.”
            </p>
            <p class="text-slate-700 font-bold text-base mb-6 leading-relaxed">
              Chúa Giêsu đã đọc từng dòng chữ chân thành của con. Người mỉm cười chúc lành và ôm lấy con trong tình yêu dịu êm của Ngài.
            </p>
            <button onclick="window.faithJourney.resetLetter()" class="m3-kids-btn-tonal text-xs font-black">
              ✍️ Viết Thư Mới Cho Chúa
            </button>
          </div>
        `;
      }
    }, 1200);

    this.updateProgressUI();
  }

  resetLetter() {
    const parchment = document.getElementById('parchment-letter-wrapper');
    const container = document.getElementById('letter-sent-container');
    if (parchment) {
      parchment.style.transform = 'none';
      parchment.style.opacity = '1';
      parchment.style.filter = 'none';
    }
    if (container) {
      container.classList.add('hidden');
    }
  }

  startTiredMeditation() {
    const messages = [
      "Khi con sợ hãi, Chúa luôn ở cùng con.",
      "Khi con mệt mỏi, Chúa luôn ở cùng con.",
      "Khi con cảm thấy lạc lối, Chúa luôn ở cùng con.",
      "Khi con không còn thốt nên lời, Chúa vẫn luôn ở cùng con."
    ];

    const display = document.getElementById('tired-message-display');
    const emmanuelReveal = document.getElementById('emmanuel-reveal');
    const candleGlow = document.getElementById('tired-candle-aura');

    if (!display) return;
    this.milestones.tiredMeditated = true;
    this.updateProgressUI();

    if (window.sacredAudio) {
      window.sacredAudio.playChime('candle');
    }

    let idx = 0;
    display.classList.remove('opacity-0');

    const showNext = () => {
      if (idx < messages.length) {
        display.style.opacity = '0';
        setTimeout(() => {
          display.textContent = `“${messages[idx]}”`;
          display.style.opacity = '1';
          if (candleGlow) candleGlow.style.transform = `scale(${1 + idx * 0.25})`;
          if (window.sacredAudio) window.sacredAudio.playBellTone(392 + idx * 45, 2.0, 0.15);
          idx++;
          this.tiredTimer = setTimeout(showNext, 3200);
        }, 500);
      } else {
        setTimeout(() => {
          if (display) display.style.opacity = '0';
          if (emmanuelReveal) {
            emmanuelReveal.classList.remove('hidden');
            emmanuelReveal.classList.remove('opacity-0');
            emmanuelReveal.classList.add('opacity-100');
          }
          if (candleGlow) candleGlow.style.transform = 'scale(2.2)';
          if (window.sacredAudio) window.sacredAudio.playChime('blessing');
        }, 800);
      }
    };

    showNext();
  }

  keepTheLight(event) {
    this.milestones.nativityAdored = true;
    this.updateProgressUI();

    if (window.sacredAudio) {
      window.sacredAudio.playGrandGloria();
    }

    if (window.celestialSky && event) {
      window.celestialSky.addStardustBurst(window.innerWidth / 2, window.innerHeight / 2, 80);
    }

    const veil = document.getElementById('golden-climax-veil');
    const modal = document.getElementById('climax-modal');

    if (veil) {
      veil.classList.add('active');
    }

    setTimeout(() => {
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }, 1400);
  }

  dismissClimax() {
    const veil = document.getElementById('golden-climax-veil');
    const modal = document.getElementById('climax-modal');
    if (veil) veil.classList.remove('active');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  updateProgressUI() {
    let score = 0;
    if (this.milestones.hero) score += 10;
    const litAdvent = this.milestones.advent.filter(Boolean).length;
    score += litAdvent * 5;
    const completedSteps = this.milestones.starSteps.filter(Boolean).length;
    score += Math.round((completedSteps / 7) * 25);
    if (this.milestones.giftOffered) score += 15;
    if (this.milestones.prayerOffered) score += 10;
    if (this.milestones.letterOffered) score += 10;
    if (this.milestones.tiredMeditated) score += 5;
    if (this.milestones.nativityAdored) score += 5;

    if (score > 100) score = 100;

    const bar = document.getElementById('global-progress-bar');
    const pill = document.getElementById('global-progress-pill');

    if (bar) bar.style.width = `${score}%`;
    if (pill) {
      if (score === 100) {
        pill.innerHTML = `✨ <strong>Tràn Đầy Ơn Chúa (100%)</strong>`;
      } else {
        pill.innerHTML = `<span>⭐ Hành Trình: <strong>${score}%</strong></span>`;
      }
    }
  }
}

window.faithJourney = new FaithJourney();
