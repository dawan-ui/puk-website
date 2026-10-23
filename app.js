/* Audio Anthem Play/Pause */
let isPlaying = false;
const audio = document.getElementById(‘pukAudio’);
const dot = document.getElementById(‘musicDot’);
const audioBtn = document.getElementById(‘audioToggleBtn’);

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    dot.classList.remove(‘active’);
    audioBtn.innerText = ‘لێدان ▶’;
    isPlaying = false;
  } else {
    audio.play().then(() => {
      dot.classList.add(‘active’);
      audioBtn.innerText = ‘ڕاگرتن ⏸’;
      isPlaying = true;
    }).catch(() => {
      alert(“تکایە پەنجە لەسەر شاشە بدە بۆ لێدانی سرودەکە.”);
    });
  }
}

/* Screen Navigation */
function showForm() {
  document.getElementById(‘screenHome’).style.display = ‘none’;
  document.getElementById(‘screenBio’).style.display = ‘none’;
  document.getElementById(‘screenCard’).style.display = ‘none’;
  document.getElementById(‘screenForm’).style.display = ‘block’;
}

function showBio() {
  document.getElementById(‘screenHome’).style.display = ‘none’;
  document.getElementById(‘screenForm’).style.display = ‘none’;
  document.getElementById(‘screenCard’).style.display = ‘none’;
  document.getElementById(‘screenBio’).style.display = ‘block’;
}

function resetToHome() {
  document.getElementById(‘screenHome’).style.display = ‘block’;
  document.getElementById(‘screenForm’).style.display = ‘none’;
  document.getElementById(‘screenBio’).style.display = ‘none’;
  document.getElementById(‘screenCard’).style.display = ‘none’;
}

/* Language Toggle */
function setLanguage(lang) {
  const isKu = (lang === ‘ku’);
  document.documentElement.setAttribute(‘dir’, isKu ? ‘rtl’ : ‘ltr’);
  document.getElementById(‘btnKu’).classList.toggle(‘active’, isKu);
  document.getElementById(‘btnEn’).classList.toggle(‘active’, !isKu);

  document.getElementById(‘txtTitle’).innerText = “Patriotic Union of Kurdistan”;
  document.getElementById(‘txtSub’).innerText = isKu ? “یەکێتیی نیشتمانیی کوردستان” : “Patriotic Union of Kurdistan”;
  document.getElementById(‘txtQuestion’).innerText = isKu ? “ئایا دەتەوێت ببیت بە ئەندام؟” : “Do you want to become a member?”;
  document.getElementById(‘txtDesc’).innerText = isKu ? “پەیوەندی بکە بە یەکێتییەوە و ببە بەشێک لە حیزبەکە.” : “Join the Union and be part of the movement.”;
  document.getElementById(‘btnYes’).innerText = isKu ? “بەڵێ، دەمەوێت ببم بە ئەندام” : “Yes, I want to become a member”;
}

/* Membership Registration & VIP Card Draw */
function processMembership(e) {
  e.preventDefault();

  const name = document.getElementById(‘inpName’).value.trim();
  const phone = document.getElementById(‘inpPhone’).value.trim();
  const city = document.getElementById(‘inpCity’).value;
  const serial = ‘PUK-‘ + Math.floor(100000 + Math.random() * 900000);

  // Save in local storage
  const saved = JSON.parse(localStorage.getItem(‘puk_members’) || ‘[]’);
  saved.push({ name, phone, city, serial });
  localStorage.setItem(‘puk_members’, JSON.stringify(saved));

  document.getElementById(‘liveBadge’).innerText = 🟢 ${1429 + saved.length} هەڤاڵ تا ئێستا تۆمارکراون لە داتابەیس;

  // Confetti effect
  confetti({ particleCount: 90, spread: 60 });

  // Draw Card
  drawCard(name, city, serial);

  document.getElementById(‘screenForm’).style.display = ‘none’;
  document.getElementById(‘screenCard’).style.display = ‘block’;
}

/* Draw Green VIP Membership Card */
function drawCard(name, city, serial) {
  const canvas = document.getElementById(‘membershipCardCanvas’);
  const ctx = canvas.getContext(‘2d’);

  // Background
  const grad = ctx.createLinearGradient(0, 0, 800, 480);
  grad.addColorStop(0, ‘#062612’);
  grad.addColorStop(0.5, ‘#0d401e’);
  grad.addColorStop(1, ‘#05190c’);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 480);

  // Gold border
  ctx.strokeStyle = ‘#f1c40f’;
  ctx.lineWidth = 6;
  ctx.strokeRect(15, 15, 770, 450);

  // Card text
  ctx.fillStyle = ‘#f1c40f’;
  ctx.font = ‘bold 26px Tahoma’;
  ctx.textAlign = ‘right’;
  ctx.fillText(‘یەکێتیی نیشتمانیی کوردستان’, 740, 70);

  ctx.fillStyle = ‘#ffffff’;
  ctx.font = ‘bold 18px sans-serif’;
  ctx.fillText(‘PATRIOTIC UNION OF KURDISTAN’, 740, 100);

  ctx.fillStyle = ‘#ffffff’;
  ctx.font = ‘bold 24px Tahoma’;
  ctx.fillText(name, 740, 230);

  ctx.fillStyle = ‘#9fd4b2’;
  ctx.font = ‘16px Tahoma’;
  ctx.fillText(city, 740, 290);

  ctx.fillStyle = ‘#f1c40f’;
  ctx.font = ‘bold 22px monospace’;
  ctx.fillText(serial, 740, 360);

  // Quote
  ctx.textAlign = ‘left’;
  ctx.fillStyle = ‘#d4eddc’;
  ctx.font = ‘italic 16px Tahoma’;
  ctx.fillText(‘”سەفین لەبن بێت، یەکێتی لەبن نایەت”’, 60, 420);
}

function downloadCard() {
  const canvas = document.getElementById(‘membershipCardCanvas’);
  const link = document.createElement(‘a’);
  link.download = ‘PUK-Card.png’;
  link.href = canvas.toDataURL(‘image/png’);
  link.click();
}

function shareWebsite() {
  if (navigator.share) {
    navigator.share({ title: ‘PUK Portal’, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert(‘لینک کۆپی کرا!’);
  }
}