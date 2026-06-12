// Mengambil elemen yang dibutuhkan
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// 1. Fungsi saat ikon hamburger diklik (muncul/hilang menu)
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); // Mengubah ikon garis tiga menjadi silang (X)
    navbar.classList.toggle('active'); // Memunculkan atau menyembunyikan menu
};

// 2. Fungsi menghilangkan menu otomatis saat salah satu menu diklik (di mode HP)
navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    }
});

// 3. Fungsi menyalakan menu yang sedang aktif saat halaman di-scroll
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Mengatur jarak deteksi section
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active'); // Menghapus warna merah dari semua menu
                // Menambahkan warna merah hanya pada menu yang sedang dilihat
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};



// --- Fungsi Kirim Pesan Formspree Tanpa Pindah Halaman ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah browser pindah ke halaman Formspree

        // Mengambil data dari form
        const formData = new FormData(contactForm);

        // Mengirim data ke Formspree di "belakang layar"
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Jika berhasil terkirim
                alert("Yeay! Pesan kamu berhasil terkirim."); 
                contactForm.reset(); // Mengosongkan semua tulisan di form
            } else {
                // Jika ada error (misal format email salah)
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert("Oops! " + data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Ups! Ada masalah saat mengirim pesan.");
                    }
                });
            }
        }).catch(error => {
            alert("Ups! Gagal mengirim pesan. Silakan periksa koneksi internetmu.");
        });
    });
}