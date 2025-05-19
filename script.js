document.addEventListener('DOMContentLoaded', function() {

    let remainingSlots = 100;

    const formBadge = document.querySelector('.form-badge');

    if (formBadge) {
        formBadge.textContent = `${remainingSlots} KUOTA PROMO TERSISA`;
    }
    // Toggle menu hp
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    const heroSection = document.querySelector('.hero .container');
    if (heroSection) {
        const countdownContainer = document.createElement('div');
        countdownContainer.classList.add('countdown-container');

        const countdownTitle = document.createElement('div');
        countdownTitle.classList.add('countdown-title');
        countdownTitle.textContent = 'WAKTU PROMO AKAN BERAKHIR DALAM:';
        countdownContainer.appendChild(countdownTitle);

        const countdownTimer = document.createElement('div');
        countdownTimer.classList.add('countdown-timer');

        const timeUnits = ['HARI',
            'JAM',
            'MENIT',
            'DETIK'];
        timeUnits.forEach(unit => {
            const countdownItem = document.createElement('div');
            countdownItem.classList.add('countdown-item');

            const countdownNumber = document.createElement('div');
            countdownNumber.classList.add('countdown-number');
            countdownNumber.id = `countdown-${unit.toLowerCase()}`;
            countdownNumber.textContent = '00';

            const countdownLabel = document.createElement('div');
            countdownLabel.classList.add('countdown-label');
            countdownLabel.textContent = unit;

            countdownItem.appendChild(countdownNumber);
            countdownItem.appendChild(countdownLabel);
            countdownTimer.appendChild(countdownItem);
        });

        countdownContainer.appendChild(countdownTimer);

        const promoEvent = heroSection.querySelector('.promo-event');
        if (promoEvent) {
            promoEvent.after(countdownContainer);
        } else {
            const ctaButton = heroSection.querySelector('.cta-button');
            if (ctaButton) {
                ctaButton.before(countdownContainer);
            }
        }

        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 30);

        updateCountdown();
        setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('countdown-hari').textContent = days.toString().padStart(2, '0');
            document.getElementById('countdown-jam').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdown-menit').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('countdown-detik').textContent = seconds.toString().padStart(2, '0');
        }
    }

    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Mengambil nilai dari form
            const fullName = document.getElementById('fullName').value;
            const nisn = document.getElementById('nisn').value;
            const birthPlace = document.getElementById('birthPlace').value;
            const birthDate = document.getElementById('birthDate').value;
            const gender = document.getElementById('gender').value;
            const address = document.getElementById('address').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const email = document.getElementById('email').value || '-';
            const parentName = document.getElementById('parentName').value;
            const parentPhone = document.getElementById('parentPhone').value;
            const school = document.getElementById('school').value;
            const competency = document.getElementById('competency').value;
            const referral = document.getElementById('referral').value || '-';
            const referralName = document.getElementById('referralName').value || '-';

            // Validasi form
            if (!fullName || !nisn || !phoneNumber || !birthPlace || !birthDate || !gender || !address || !parentName || !parentPhone || !school || !competency) {
                alert('Mohon lengkapi data pendaftaran yang wajib diisi!');
                return;
            }

            // Format gender untuk WhatsApp
            const genderText = gender === 'male' ? 'Laki-laki': 'Perempuan';

            // Format pilihan jurusan untuk WhatsApp
            let competencyText = '';
            switch (competency) {
                case 'TKJ': competencyText = 'Teknik Komputer dan Jaringan (TKJ)'; break;
                case 'RPL': competencyText = 'Rekayasa Perangkat Lunak (RPL)'; break;
                case 'PKM': competencyText = 'Perbankan dan Keuangan Makro (PKM)'; break;
                case 'OTKP': competencyText = 'Otomatisasi dan Tata Kelola Perkantoran (OTKP)'; break;
                case 'MM': competencyText = 'Multimedia (MM)'; break;
                default: competencyText = competency;
                }

                // Format pesan WhatsApp
                const whatsappMessage =
                `*FORMULIR PENDAFTARAN SMK BINA INFORMATIKA*

*DATA SISWA*
Nama Lengkap: ${fullName}
NISN: ${nisn}
Tempat Lahir: ${birthPlace}
Tanggal Lahir: ${birthDate}
Jenis Kelamin: ${genderText}
Alamat: ${address}
No. HP/WA: ${phoneNumber}
Email: ${email}

*DATA ORANG TUA/WALI*
Nama Orang Tua/Wali: ${parentName}
No. HP Orang Tua/Wali: ${parentPhone}

*DATA PENDAFTARAN*
Asal Sekolah: ${school}
Pilihan Jurusan: ${competencyText}
Sumber Informasi: ${referral}
Nama Referensi: ${referralName}
                `;

                // Encode pesan untuk URL WhatsApp
                const encodedMessage = encodeURIComponent(whatsappMessage);

                // Nomor WhatsApp Bu Ari
                const whatsappNumber = '6289617354862';

                // Membuat URL WhatsApp
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

                const submitButton = document.querySelector('.submit-button');
                submitButton.textContent = 'MEMPROSES...';
                submitButton.disabled = true;

                // Tampilkan popup konfirmasi sebelum dialihkan ke WhatsApp
                const confirmRedirect = confirm('Anda akan diarahkan ke WhatsApp untuk mengirimkan formulir pendaftaran. Lanjutkan?');

                if (confirmRedirect) {
                    // Update kuota yang tersisa
                    remainingSlots--;
                    if (formBadge) {
                        formBadge.textContent = `${remainingSlots} KUOTA PROMO TERSISA`;

                        if (remainingSlots < 20) {
                            formBadge.style.backgroundColor = '#ff3a3a';
                            formBadge.style.color = 'white';
                        }
                    }

                    // Buka WhatsApp di tab baru
                    window.open(whatsappURL, '_blank');

                    // Reset form dan tombol
                    setTimeout(function() {
                        registrationForm.reset();
                        submitButton.textContent = 'DAFTAR SEKARANG';
                        submitButton.disabled = false;

                        showSuccessPopup();
                    }, 1000);
                } else {
                    submitButton.textContent = 'DAFTAR SEKARANG';
                    submitButton.disabled = false;
                }
            });
        }

        function showSuccessPopup() {
            const popup = document.createElement('div');
            popup.classList.add('success-popup');

            const popupContent = document.createElement('div');
            popupContent.classList.add('popup-content');

            const popupIcon = document.createElement('div');
            popupIcon.classList.add('popup-icon');
            popupIcon.innerHTML = '✅';

            const popupTitle = document.createElement('h3');
            popupTitle.textContent = 'Pendaftaran Berhasil!';

            const popupMessage = document.createElement('p');
            popupMessage.textContent = 'Selamat! Anda berhasil mendaftar dan mendapatkan PROMO GRATIS DSP. Tim kami akan menghubungi Anda dalam 1x24 jam.';

            const closeButton = document.createElement('button');
            closeButton.classList.add('popup-button');
            closeButton.textContent = 'Tutup';
            closeButton.addEventListener('click',
                function() {
                    document.body.removeChild(popup);
                });

            popupContent.appendChild(popupIcon);
            popupContent.appendChild(popupTitle);
            popupContent.appendChild(popupMessage);
            popupContent.appendChild(closeButton);
            popup.appendChild(popupContent);

            popup.style.position = 'fixed';
            popup.style.top = '0';
            popup.style.left = '0';
            popup.style.width = '100%';
            popup.style.height = '100%';
            popup.style.backgroundColor = 'rgba(0,0,0,0.7)';
            popup.style.display = 'flex';
            popup.style.justifyContent = 'center';
            popup.style.alignItems = 'center';
            popup.style.zIndex = '1000';

            popupContent.style.backgroundColor = 'white';
            popupContent.style.padding = '30px';
            popupContent.style.borderRadius = '10px';
            popupContent.style.textAlign = 'center';
            popupContent.style.maxWidth = '500px';
            popupContent.style.width = '90%';

            popupIcon.style.fontSize = '4rem';
            popupIcon.style.marginBottom = '20px';

            popupTitle.style.marginBottom = '15px';
            popupTitle.style.color = 'var(--primary)';

            popupMessage.style.marginBottom = '20px';
            popupMessage.style.lineHeight = '1.6';

            closeButton.style.backgroundColor = 'var(--primary)';
            closeButton.style.color = 'white';
            closeButton.style.border = 'none';
            closeButton.style.padding = '10px 30px';
            closeButton.style.borderRadius = '50px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontWeight = 'bold';

            document.body.appendChild(popup);
        }

        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });