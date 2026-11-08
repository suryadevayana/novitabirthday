# Website Ulang Tahun Florence

Proyek website ulang tahun dengan tema burgundy, bunga, kue, surat, galeri foto Polaroid, timeline kenangan, playlist, dan tombol alasan untuk bersyukur.

## Menjalankan di Visual Studio Code

1. Ekstrak ZIP ini.
2. Buka folder `birthday_website_vscode` di Visual Studio Code.
3. Pasang ekstensi **Live Server** (oleh Ritwick Dey), jika belum ada.
4. Klik kanan `index.html` → **Open with Live Server**.

Bisa juga membuka `index.html` langsung di browser, tetapi Live Server lebih nyaman saat mengedit.

## Password halaman pembuka

Buka `script.js`, cari:

```js
const PASSWORD = "14022000";
```

Ganti `14022000` dengan tanggal/password milikmu (format `DDMMYYYY`).

## Mengganti foto

Masukkan foto milik kalian ke folder `assets`, lalu beri nama:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`
- `photo6.jpg`

Nama file harus sama persis. Format JPG paling mudah digunakan. Kalau ingin memakai nama file lain, ubah nilai `data-photo` pada setiap tombol `.polaroid` di `index.html`.

## Menambahkan musik

1. Salin file MP3 ke folder `assets`, misalnya `our-song.mp3`.
2. Di `index.html`, ubah elemen audio menjadi:

```html
<audio id="background-music" src="assets/our-song.mp3" loop></audio>
```

Gunakan musik yang kamu punya hak untuk menggunakannya.

## Catatan

Ini adalah implementasi ulang berdasarkan tampilan video yang dikirim, bukan salinan source code asli dari kreator. Foto dan musik personal perlu ditambahkan sendiri. Teks, tanggal, dan kenangan dapat kamu edit langsung di `index.html` atau `script.js`.
