
 // Website Ulang Tahun Novita

// =====================================
// 1. MENGHUBUNGKAN ELEMEN HTML
// =====================================

const $ = (selector) => document.querySelector(selector);

const gate = $("#gate");
const giftScreen = $("#gift-screen");
const dashboard = $("#main-dashboard");
const toast = $("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}


// =====================================
// 2. PASSWORD
// =====================================

const PASSWORD = "08112004";


// =====================================
// 3. PLAYLIST MUSIK
// =====================================

const audio = $("#background-music");
const musicButton = $("#music-toggle");
const songTitle = $("#song-title");
const songDescription = $("#song-description");

// DAFTAR LAGU
const playlist = [
  {
    title: "happy birthday",
    description: "Lagu Perayaan 🎂",
    src: "Music/leberch - happy birthday.mp3"
  },

];

let currentSong = 0;


// Fungsi memutar lagu
async function playSong(index) {

  currentSong = index;

  audio.src = playlist[currentSong].src;

  songTitle.textContent = playlist[currentSong].title;

  songDescription.textContent =
    playlist[currentSong].description;

  try {

    await audio.play();

    musicButton.textContent = "Ⅱ";

  } catch (error) {

    musicButton.textContent = "▶";

    showToast("Musik tidak bisa diputar. Periksa file lagu.");

    console.error(error);
  }
}


// =====================================
// 4. PASSWORD BENAR = MUSIK OTOMATIS
// =====================================

$("#password-form").addEventListener("submit", (event) => {

  event.preventDefault();

  const inputPassword = $("#password").value.trim();

  if (inputPassword === PASSWORD) {

    // Tutup halaman password
    gate.classList.add("hidden");

    // Tampilkan halaman hadiah
    giftScreen.classList.remove("hidden");

    // Putar lagu pertama
    playSong(0);

  } else {

    // Jika password salah
    $("#password-hint").textContent =
      "Belum tepat ♡ Coba tanggal spesial lainnya.";

    $("#password").value = "";

    $("#password").focus();
  }

});


// =====================================
// 5. OTOMATIS PINDAH KE LAGU BERIKUTNYA
// =====================================

audio.addEventListener("ended", () => {

  const nextSong = (currentSong + 1) % playlist.length;

  playSong(nextSong);

});


// =====================================
// 6. TOMBOL PLAY DAN PAUSE
// =====================================

musicButton.addEventListener("click", async () => {

  if (audio.paused) {

    if (!audio.src) {

      playSong(currentSong);

    } else {

      try {

        await audio.play();

        musicButton.textContent = "Ⅱ";

      } catch (error) {

        showToast("Musik tidak bisa diputar.");

      }

    }

  } else {

    audio.pause();

    musicButton.textContent = "▶";

  }

});


// =====================================
// 7. MEMBUKA HADIAH
// =====================================

$("#open-gift").addEventListener("click", () => {

  giftScreen.classList.add("hidden");

  dashboard.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  burstConfetti();

});


// =====================================
// 8. ANIMASI CONFETTI
// =====================================

function burstConfetti() {

  const colors = [
    "#f4a7c4",
    "#f6d5df",
    "#d87ba2",
    "#f5c46c",
    "#b7a0d8"
  ];

  for (let i = 0; i < 65; i++) {

    const bit = document.createElement("span");

    bit.className = "confetti";

    bit.style.cssText =
      `position:fixed;z-index:25;top:-12px;left:${Math.random()*100}vw;width:6px;height:10px;background:${colors[i%colors.length]};border-radius:2px;pointer-events:none;`;

    document.body.appendChild(bit);

    const x = (Math.random() - .5) * 300;

    const duration = 1800 + Math.random() * 1700;

    bit.animate(
      [
        {
          transform: "translate(0,0) rotate(0deg)",
          opacity: 1
        },
        {
          transform: `translate(${x}px,105vh) rotate(${Math.random()*900}deg)`,
          opacity: .2
        }
      ],
      {
        duration,
        easing: "cubic-bezier(.2,.7,.4,1)"
      }
    ).onfinish = () => bit.remove();

  }

}


// =====================================
// 9. ANIMASI BINTANG
// =====================================

const sparkles = $("#sparkles");

for (let i = 0; i < 34; i++) {

  const star = document.createElement("span");

  star.className = "sparkle";

  star.textContent = ["✦", "✧", "·", "♡"][i % 4];

  star.style.left = `${Math.random()*100}%`;

  star.style.top = `${Math.random()*100}%`;

  star.style.fontSize = `${8 + Math.random()*12}px`;

  star.style.animationDelay = `${Math.random()*8}s`;

  star.style.animationDuration = `${7 + Math.random()*9}s`;

  sparkles.appendChild(star);

}



// =====================================
// 10. GALERI FOTO & LIGHTBOX
// =====================================

const polaroids = document.querySelectorAll(".polaroid");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxCaption = document.getElementById("lightbox-caption");

const lightboxClose = document.getElementById("lightbox-close");


// MEMERIKSA ELEMEN LIGHTBOX
if (
    lightbox &&
    lightboxImage &&
    lightboxCaption &&
    lightboxClose
) {

    // =====================================
    // MEMUAT FOTO GALERI
    // =====================================

    polaroids.forEach((card) => {

        const path = card.dataset.photo;

        const existingImage = card.querySelector("img");

        // Jika foto belum ada di HTML, buat otomatis
        if (!existingImage && path) {

            const img = document.createElement("img");

            img.src = path;

            img.alt = card.querySelector(".caption")?.textContent || "Foto Kenangan";

            img.onerror = () => {
                console.error("Foto tidak ditemukan:", path);
            };

            const placeholder = card.querySelector(".photo-placeholder");

            if (placeholder) {
                placeholder.replaceWith(img);
            } else {
                card.prepend(img);
            }

        }

        // =====================================
        // KLIK FOTO UNTUK MEMBUKA LIGHTBOX
        // =====================================

        card.addEventListener("click", () => {

            const photo = card.dataset.photo;

            const caption = card.querySelector(".caption");

            if (!photo) {
                showToast("Lokasi foto belum tersedia.");
                return;
            }

            // Tampilkan foto
            lightboxImage.src = photo;

            // Tampilkan caption
            lightboxCaption.textContent = caption
                ? caption.textContent
                : "";

            // Tampilkan lightbox
            lightbox.classList.remove("hidden");

            // Kunci scroll halaman
            document.body.style.overflow = "hidden";

        });

    });


    // =====================================
    // FUNGSI MENUTUP LIGHTBOX
    // =====================================

    function closeLightbox() {

        lightbox.classList.add("hidden");

        lightboxImage.src = "";

        document.body.style.overflow = "";

    }


    // =====================================
    // TOMBOL CLOSE
    // =====================================

    lightboxClose.addEventListener("click", closeLightbox);


    // =====================================
    // KLIK AREA GELAP
    // =====================================

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // =====================================
    // TOMBOL ESCAPE
    // =====================================

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            !lightbox.classList.contains("hidden")
        ) {

            closeLightbox();

        }

    });


    // =====================================
    // JIKA FOTO GAGAL DIMUAT
    // =====================================

    lightboxImage.addEventListener("error", () => {

        lightboxCaption.textContent =
            "Foto tidak ditemukan. Periksa nama dan lokasi file.";

        console.error("Gagal memuat foto:", lightboxImage.src);

    });

} else {

    console.error("Elemen HTML lightbox belum lengkap!");

}
