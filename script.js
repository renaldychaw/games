// ===== JKT48 GEN 12 FITNESS JOURNEY RPG =====
// Game JavaScript - FIXED VERSION with proper stat progression

// JKT48 Gen 12 Members Data
const jkt48Gen12 = [
    { id: 1, name: 'Abigail Rachel', nickname: 'Aralie', trait: 'energetic', photo: 'images/aralie.jpeg', color: '#FF6B9D', emoji: '' },
    { id: 2, name: 'Adeline Wijaya', nickname: 'Delyn', trait: 'gentle', photo: 'images/delyn.jpeg', color: '#FFA8E2', emoji: '' },
    { id: 3, name: 'Aisa Maharani', nickname: 'Shasa', trait: 'mysterious', photo: 'images/shasa.jpeg', color: '#C06C84', emoji: '' },
    { id: 4, name: 'Aurhel Alana', nickname: 'Lana', trait: 'cheerful', photo: 'images/lana.jpeg', color: '#FF85A1', emoji: '' },
    { id: 5, name: 'Catherina Vallencia', nickname: 'Erine', trait: 'elegant', photo: 'images/erine.jpeg', color: '#FFB3BA', emoji: '' },
    { id: 6, name: 'Fritzy Rosmerian', nickname: 'Fritzy', trait: 'quirky', photo: 'images/fritzy.jpeg', color: '#FF9AA2', emoji: '' },
    { id: 7, name: 'Hillary Abigail', nickname: 'Lily', trait: 'artistic', photo: 'images/lily_.jpeg', color: '#FFDAB9', emoji: '' },
    { id: 8, name: 'Jazzlyn Trisha', nickname: 'Trisha', trait: 'passionate', photo: 'images/trisha.jpeg', color: '#FF1744', emoji: '' },
    { id: 9, name: 'Michelle Levia', nickname: 'Levi', trait: 'sweet', photo: 'images/levi.jpeg', color: '#FFB6C1', emoji: '' },
    { id: 10, name: 'Nayla Suji', nickname: 'Nayla', trait: 'thoughtful', photo: 'images/nayla.jpeg', color: '#FFC0CB', emoji: '' },
    { id: 11, name: 'Nina Tutachia', nickname: 'Nachia', trait: 'caring', photo: 'images/nachia.jpeg', color: '#E91E63', emoji: '' },
    { id: 12, name: 'Oline Manuel', nickname: 'Oline', trait: 'playful', photo: 'images/oline.jpeg', color: '#F50057', emoji: '' },
    { id: 13, name: 'Regina Wilian', nickname: 'Regie', trait: 'confident', photo: 'images/regie.jpeg', color: '#C2185B', emoji: '' },
    { id: 14, name: 'Ribka Budiman', nickname: 'Ribka', trait: 'mature', photo: 'images/ribka.jpeg', color: '#AD1457', emoji: '' },
    { id: 15, name: 'Shabilqis Naila', nickname: 'Nala', trait: 'bright', photo: 'images/nala.jpeg', color: '#FFE082', emoji: '' },
    { id: 16, name: 'Victoria Kimberly', nickname: 'Kimmy', trait: 'graceful', photo: 'images/kimmy.jpeg', color: '#F8BBD0', emoji: '' },
    { id: 17, name: 'Letycia Moreen', nickname: 'Moreen', trait: 'dreamy', photo: 'images/moreen.jpeg', color: '#E1BEE7', emoji: '' }
];

// FIXED: Game State dengan kondisi awal yang buruk (overweight, unfit)
let gameState = {
    playerName: '',
    selectedOshi: null,
    muscle: 5,           // FIXED: Very low (was 20)
    fat: 85,             // FIXED: High/overweight (was 50)
    weight: 120,         // FIXED: Overweight (unchanged but correct)
    energy: 80,          // FIXED: Low energy (was 100)
    confidence: 10,      // FIXED: Very low (was 30)
    knowledge: 5,        // FIXED: Minimal (was 20)
    day: 1,
    currentChapter: 0,
    currentScene: 0,
    relationshipPoints: 0,
    inventory: [],
    flags: {
        joinedGym: false,
        metOshiTwice: false,
        attendedShow: false,
        gotPersonalTrainer: false,
        learnedNutrition: false,
        wonCompetition: false,
        gotOshiLineID: false,
        savedOshi: false,
        collaboratedWithOshi: false,
        motivated: false,
        stalker: false,
        procrastinator: false,
        nightOwl: false,
        interviewSuccess: false,
        humbleInterview: false,
        gotVIPTicket: false,
        familyFirst: false,
        specialMoment: false,
        balancedLife: false
    },
    choices: [],
    randomEvents: []
};

// Create stars animation
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Initialize Oshi Selection with Photos
function initOshiSelection() {
    const oshiGrid = document.getElementById('oshi-grid');
    jkt48Gen12.forEach(member => {
        const card = document.createElement('div');
        card.className = 'oshi-card';
        
        // Create with photo OR emoji fallback
        const lighterColor = member.color + '40';
        card.innerHTML = `
            <div style="width: 100%; height: 180px; background: linear-gradient(135deg, ${member.color} 0%, ${lighterColor} 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 12px 12px 0 0; position: relative; overflow: hidden;">
                <img src="${member.photo}" alt="${member.name}" class="photo" style="position: absolute; width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none';">
                <div style="font-size: 90px; position: absolute; opacity: 0.3;">${member.emoji}</div>
                <div style="background: rgba(255,255,255,0.9); padding: 4px 12px; border-radius: 12px; font-size: 0.8em; font-weight: 600; color: ${member.color}; text-transform: uppercase; letter-spacing: 1px; position: absolute; bottom: 10px; z-index: 2;">${member.trait}</div>
            </div>
            <div class="name">${member.nickname}</div>
        `;
        card.onclick = () => selectOshi(member, card);
        oshiGrid.appendChild(card);
    });
}

function selectOshi(member, cardElement) {
    document.querySelectorAll('.oshi-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    cardElement.classList.add('selected');
    gameState.selectedOshi = member;
    
    document.getElementById('start-game-btn').disabled = false;
}

// Start Game
document.getElementById('start-game-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('player-name').value.trim();
    
    if (!nameInput) {
        alert('Tolong masukkan nama kamu! 😊');
        return;
    }
    
    if (!gameState.selectedOshi) {
        alert('Tolong pilih oshi kamu dulu! 💕');
        return;
    }
    
    gameState.playerName = nameInput;
    
    document.getElementById('splash-screen').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        initGame();
    }, 500);
});


// Enhanced Story Data with FIXED stat changes (3-4x larger)
function getStory() {
    const oshi = gameState.selectedOshi;
    const oshiName = oshi.nickname;
    const name = gameState.playerName;
    
    return {
        chapters: [
            // ===== CHAPTER 1: The Beginning =====
            {
                title: "Chapter 1: Titik Awal Perubahan 💫",
                scenes: [
                    {
                        id: 'start',
                        text: `Kamu, ${name}, adalah seorang fan JKT48 yang dedicated. Hari ini adalah hari spesial - kamu menang undian meet & greet dengan JKT48 Gen 12! Di venue, kamu akhirnya bertatap muka dengan ${oshiName}. Dia tersenyum hangat dan berkata, "Terima kasih sudah support kami!" Namun kamu terlalu nervous dan hanya bisa mengangguk kaku. Setelah sampai rumah, kamu melihat cermin. Berat badan 120 kg, kondisi fisik yang buruk... "Bagaimana aku bisa lebih dekat dengan ${oshiName} kalau aku seperti ini?" Tiba-tiba notifikasi Instagram: ${oshiName} posting story tentang healthy lifestyle!`,
                        choices: [
                            {
                                text: "💪 Langsung cari info tentang fitness dan gym!",
                                next: 'gym_research',
                                stats: { energy: -10, confidence: 8, knowledge: 15 },
                                flags: ['motivated']
                            },
                            {
                                text: "📱 Stalking social media ${oshiName} dulu untuk motivasi",
                                next: 'social_media',
                                stats: { confidence: 5, knowledge: 8 },
                                flags: ['stalker']
                            },
                            {
                                text: "🍕 Pesan makanan comfort food, besok mulai deh",
                                next: 'procrastinate',
                                stats: { fat: 8, weight: 3, energy: 10 },
                                flags: ['procrastinator']
                            }
                        ]
                    },
                    {
                        id: 'gym_research',
                        text: `Kamu serius mencari informasi! Kamu menemukan gym "FitLife" yang punya program khusus pemula dan sering di-endorse member JKT48. Ada promo special: "First Month Free Personal Trainer!" Tapi kamu juga baca artikel tentang home workout yang katanya lebih hemat. Tabunganmu terbatas, tapi ini investasi untuk masa depan...`,
                        choices: [
                            {
                                text: "🏋️ Daftar FitLife + Personal Trainer (Rp 500k/bulan)",
                                next: 'join_gym_pt',
                                stats: { muscle: 20, fat: -25, weight: -10, confidence: 20, knowledge: 30, energy: -15 },
                                flags: ['joinedGym', 'gotPersonalTrainer'],
                                items: ['Gym Membership', 'Personal Trainer Access'],
                                relationship: 5
                            },
                            {
                                text: "🏃 Daftar FitLife tanpa PT, belajar sendiri dulu",
                                next: 'join_gym_solo',
                                stats: { muscle: 12, fat: -15, weight: -6, confidence: 15, knowledge: 20 },
                                flags: ['joinedGym']
                            },
                            {
                                text: "📱 Download fitness app, workout di rumah dulu",
                                next: 'home_workout',
                                stats: { muscle: 8, fat: -10, weight: -4, confidence: 10, knowledge: 15 },
                                items: ['Fitness App']
                            }
                        ]
                    },
                    {
                        id: 'social_media',
                        text: `Kamu scroll Instagram ${oshiName} sampai post lama. Ternyata dia sharing journey-nya dari trainee sampai debut. Banyak post tentang latihan, diet, dan struggle. Satu quote-nya menohok: "Perubahan dimulai dari keputusan kecil hari ini." Kamu juga notice dia sering workout di FitLife Gym dan posting healthy meal prep. Hmmm...`,
                        choices: [
                            {
                                text: "✨ Termotivasi! Langsung daftar gym yang sama!",
                                next: 'join_gym_motivated',
                                stats: { muscle: 15, fat: -18, weight: -7, confidence: 15, knowledge: 18, energy: -10 },
                                flags: ['joinedGym', 'motivated'],
                                relationship: 8
                            },
                            {
                                text: "📚 Beli buku tentang fitness dan nutrition dulu",
                                next: 'buy_books',
                                stats: { knowledge: 30, confidence: 8 },
                                items: ['Fitness Encyclopedia', 'Nutrition Guide']
                            },
                            {
                                text: "💭 Masih ragu, lanjut scroll dulu...",
                                next: 'more_scrolling',
                                stats: { energy: -15, knowledge: 5 }
                            }
                        ]
                    },
                    {
                        id: 'procrastinate',
                        text: `Kamu order Indomie + ayam crispy. Sambil makan, kamu nonton video perform ${oshiName}. Dia begitu energetic dan sehat. Mie di mulutmu tiba-tiba terasa hambar. "Apa yang aku lakukan?" Kamu merasa guilty tapi masih melanjutkan makan.`,
                        choices: [
                            {
                                text: "🗑️ STOP! Buang makanan, mulai sekarang!",
                                next: 'sudden_motivation',
                                stats: { muscle: 5, fat: -8, confidence: 12, energy: -10 },
                                flags: ['motivated']
                            },
                            {
                                text: "😔 Habiskan makanan, janji besok mulai serius",
                                next: 'tomorrow_promise',
                                stats: { fat: 10, weight: 4, confidence: -8, energy: 12 }
                            }
                        ]
                    },
                    {
                        id: 'join_gym_pt',
                        text: `Hari pertama di FitLife! Personal Trainer-mu, Coach Rudi, adalah mantan atlet yang ramah. Dia assess kondisimu dan membuat program khusus. "Fokus kita: fat loss dan muscle building. Target 6 bulan transformasi total!" Saat istirahat, kamu lihat poster: "${oshiName} Special Guest at FitLife Next Month!" JACKPOT!`,
                        choices: [
                            {
                                text: "🔥 ALL IN! Latihan extra keras bulan ini!",
                                stats: { muscle: 40, fat: -40, weight: -18, energy: -35, confidence: 30, knowledge: 25 },
                                relationship: 15,
                                nextChapter: 1
                            },
                            {
                                text: "⚖️ Follow program standard, jangan overdo",
                                stats: { muscle: 25, fat: -25, weight: -12, energy: -20, confidence: 20, knowledge: 20 },
                                relationship: 10,
                                nextChapter: 1
                            }
                        ]
                    },
                    {
                        id: 'join_gym_solo',
                        text: `Kamu mulai latihan sendiri dengan bantuan YouTube tutorial. Progress lumayan tapi kadang form latihan salah. Setelah 2 minggu, Coach Rudi notice kamu. "Form squat-mu salah, bisa injury loh. Mau aku bantu?" Ternyata dia baik hati!`,
                        choices: [
                            {
                                text: "🙏 Terima bantuan Coach Rudi dengan senang hati",
                                stats: { muscle: 20, fat: -20, weight: -10, confidence: 18, knowledge: 25 },
                                relationship: 8,
                                nextChapter: 1
                            },
                            {
                                text: "📱 Terima tapi tetap fokus belajar sendiri",
                                stats: { muscle: 15, fat: -15, weight: -7, confidence: 20, knowledge: 30 },
                                nextChapter: 1
                            }
                        ]
                    },
                    {
                        id: 'home_workout',
                        text: `Kamu download app "FitHero" dan mulai workout di rumah. Day 1: Berhasil! Day 2: Berhasil! Day 3: ...kecapean. Tetangga komplain kamu lompat-lompat. Motivasi menurun. Tapi kamu notice ada fitur "Community Challenge" dengan hadiah meet & greet JKT48!`,
                        choices: [
                            {
                                text: "🏆 Ikut Challenge! Harus menang!",
                                stats: { muscle: 25, fat: -30, weight: -12, energy: -30, confidence: 30, knowledge: 20 },
                                relationship: 12,
                                nextChapter: 1
                            },
                            {
                                text: "🏋️ Sudahlah, mending daftar gym saja",
                                stats: { muscle: 12, fat: -12, weight: -5, confidence: 12, knowledge: 15 },
                                flags: ['joinedGym'],
                                nextChapter: 1
                            }
                        ]
                    },
                    {
                        id: 'join_gym_motivated',
                        text: `Kamu daftar FitLife dengan semangat tinggi! Bulan pertama kamu disiplin banget. Setiap lihat foto ${oshiName} workout, motivasimu naik. Progress bagus, tapi kamu belum punya personal trainer. One day, kamu lihat announcement: "${oshiName} akan datang bulan depan untuk shooting!"`,
                        choices: [
                            {
                                text: "💪 Training extra keras untuk impress dia!",
                                stats: { muscle: 30, fat: -30, weight: -15, energy: -25, confidence: 25 },
                                relationship: 12,
                                nextChapter: 1
                            }
                        ]
                    },
                    {
                        id: 'buy_books',
                        text: `Kamu beli 2 buku fitness best-seller. Seminggu kamu habiskan untuk baca dan buat notes. Pengetahuanmu meningkat drastis! Kamu paham tentang: macronutrients, progressive overload, recovery. Tapi... kamu belum mulai workout sama sekali. Knowledge tanpa action = 0!`,
                        choices: [
                            {
                                text: "💪 Saatnya ACTION! Buat workout plan dan mulai!",
                                stats: { muscle: 20, fat: -20, weight: -10, confidence: 20, energy: -20 },
                                relationship: 8,
                                nextChapter: 1
                            },
                            {
                                text: "📖 Baca buku lagi, biar lebih perfect",
                                stats: { knowledge: 20, confidence: -8, energy: -15 },
                                nextChapter: 1
                            }
                        ]
                    },
                    {
                        id: 'more_scrolling',
                        text: `Kamu lanjut scroll sampai tengah malam. Banyak baca success stories tapi tidak action. Besoknya bangun kesian, berat naik 1kg. Tapi kemudian kamu lihat ${oshiName} posting: "Starting is the hardest part, tapi kalau udah mulai, pasti bisa!" Ini sign!`,
                        choices: [
                            {
                                text: "✨ Oke, sekarang mulai beneran!",
                                stats: { muscle: 12, fat: -12, weight: -5, confidence: 12, knowledge: 12 },
                                nextChapter: 1
                            }
                        ]
                    },
                    {
                        id: 'sudden_motivation',
                        text: `Kamu langsung search "late night gym" dan nemuin 24-hour FitLife. Jam 10 malam kamu ke sana! Staff terkejut tapi kagum. "Motivasi tinggi ya!" Coach Rudi yang lagi shift malam bantu kamu. Malam itu workout keras, pulang pegal tapi puas!`,
                        choices: [
                            {
                                text: "🌙 Lanjutkan night workout routine!",
                                stats: { muscle: 25, fat: -25, weight: -15, confidence: 25, energy: -25 },
                                flags: ['joinedGym', 'nightOwl'],
                                relationship: 12,
                                nextChapter: 1
                            }
                        ]
                    },
                    {
                        id: 'tomorrow_promise',
                        text: `Besoknya... kamu bangun siang. Berat badan naik 1 kg. Tapi kamu buka Instagram, ada announcement: "JKT48 Gen 12 Healthy Lifestyle Campaign dimulai! Join challenge kami!" ${oshiName} jadi ambassador! Ini sign!`,
                        choices: [
                            {
                                text: "✨ JOIN! Ini kesempatan terakhir!",
                                stats: { muscle: 15, fat: -15, weight: -8, confidence: 18, knowledge: 15 },
                                relationship: 15,
                                nextChapter: 1
                            },
                            {
                                text: "😰 Masih belum siap, nanti aja...",
                                gameOver: 'early_quit'
                            }
                        ]
                    }
                ]
            },

            // ===== CHAPTER 2: Development & Encounters =====
            {
                title: "Chapter 2: Perkembangan & Pertemuan 💝",
                scenes: [
                    {
                        id: 'chapter2_start',
                        text: `Sebulan berlalu sejak kamu memulai journey. Transformasimu impressive: Berat ${gameState.weight}kg (turun ${120-gameState.weight}kg!), Otot ${gameState.muscle}%, Body fat ${gameState.fat}%. Hari ini adalah hari special: ${oshiName} datang ke FitLife untuk shooting konten healthy lifestyle! Kamu lihat production crew datang. Jantung berdebar!`,
                        choices: [
                            {
                                text: "😎 Tetap cool, lanjut latihan seperti biasa",
                                next: 'play_it_cool',
                                condition: { confidence: 40, muscle: 30 },
                                stats: { confidence: 15, muscle: 5 }
                            },
                            {
                                text: "😰 Grogi tapi coba tetap tenang...",
                                next: 'play_it_nervous',
                                stats: { confidence: 8, muscle: 3 }
                            },
                            {
                                text: "📸 Cari posisi strategis buat ketemu ${oshiName}",
                                next: 'strategic_position',
                                stats: { confidence: 10 }
                            },
                            {
                                text: "🏃 Kabur! Belum siap mental!",
                                next: 'run_away',
                                stats: { confidence: -15, energy: -10 }
                            }
                        ]
                    },
                    {
                        id: 'play_it_cool',
                        text: `Kamu fokus bench press dengan form perfect. Tiba-tiba, "${name}? Itu kamu kan?" Suara familiar! Kamu turn around - it's ${oshiName}! "Aku ingat kamu dari meet & greet! Wow, kamu berubah banget! Amazing progress!" Dia genuinely impressed. Crew notice interaksi kalian dan Director berkata, "Perfect! Boleh kita interview kamu berdua untuk konten?"`,
                        choices: [
                            {
                                text: "⭐ OF COURSE! This is my moment!",
                                next: 'interview_success',
                                stats: { confidence: 30, muscle: 8 },
                                relationship: 30,
                                flags: ['interviewSuccess']
                            },
                            {
                                text: "😊 Boleh, tapi aku masih pemula kok",
                                next: 'humble_interview',
                                stats: { confidence: 20, muscle: 5 },
                                relationship: 25,
                                flags: ['humbleInterview']
                            }
                        ]
                    },
                    {
                        id: 'play_it_nervous',
                        text: `Kamu mencoba tetap tenang tapi tangan gemetar. ${oshiName} notice kamu dari jauh dan wave. Kamu wave back awkwardly. Tapi at least dia notice you! Progress dari meet & greet pertama!`,
                        choices: [
                            {
                                text: "😊 Senang dia notice, lanjut workout",
                                stats: { confidence: 10, muscle: 5 },
                                relationship: 10,
                                nextChapter: 2
                            }
                        ]
                    },
                    {
                        id: 'interview_success',
                        text: `Interview berjalan lancar! Kamu cerita journey-mu dengan passionate. ${oshiName} join conversation, sharing tips dan motivasi. Chemistry kalian terlihat natural. Setelah shooting, ${oshiName} approach kamu privately. "Aku impressed banget sama dedication kamu. Boleh exchange contact? Aku mau support your journey!" She gives you her LINE ID! 🎉`,
                        choices: [
                            {
                                text: "💖 Add LINE-nya, mulai chat casual",
                                next: 'line_friendship',
                                stats: { confidence: 25 },
                                relationship: 30,
                                flags: ['gotOshiLineID']
                            },
                            {
                                text: "📱 Add LINE-nya, tapi tunggu dia chat duluan",
                                next: 'wait_for_message',
                                stats: { confidence: 15 },
                                relationship: 20,
                                flags: ['gotOshiLineID']
                            }
                        ]
                    },
                    {
                        id: 'humble_interview',
                        text: `Interview berjalan warm dan humble. ${oshiName} appreciate modesty-mu. "That's what I like - humble and hardworking!" Crew senang dengan chemistry kalian. Setelah shooting, ${oshiName} kasih signed photocard: "For ${name}, my fitness inspiration! Keep going! 💪 - ${oshiName}"`,
                        choices: [
                            {
                                text: "🙏 Thank you! Ini akan jadi motivasi!",
                                stats: { confidence: 18 },
                                relationship: 22,
                                nextChapter: 2
                            }
                        ]
                    },
                    {
                        id: 'line_friendship',
                        text: `Kamu chat ${oshiName} hari itu juga. Surprisingly, dia fast responder! Kalian chat tentang workout tips, healthy food, bahkan hal random. Over the next weeks, kalian sering exchange messages. Suatu hari dia bilang, "Btw ada theater show bulan depan, mau datang? Aku kasih VIP ticket untuk kamu." Your heart skip a beat!`,
                        choices: [
                            {
                                text: "🎭 YES! Aku pasti datang!",
                                stats: { confidence: 20, energy: -10 },
                                relationship: 30,
                                flags: ['attendedShow', 'gotVIPTicket'],
                                nextChapter: 2
                            },
                            {
                                text: "😰 Aku takut malah ganggu kamu...",
                                next: 'decline_ticket',
                                stats: { confidence: -8 },
                                relationship: 12
                            }
                        ]
                    },
                    {
                        id: 'wait_for_message',
                        text: `Kamu wait for her message tapi... nothing for a week. Kamu mulai overthink. Tapi then, ${oshiName} suddenly message: "Sorry baru bales! Schedule crazy! How's workout? Share progress dong!" Relief!`,
                        choices: [
                            {
                                text: "📸 Share progress photos excited!",
                                stats: { confidence: 15 },
                                relationship: 18,
                                nextChapter: 2
                            }
                        ]
                    },
                    {
                        id: 'decline_ticket',
                        text: `${oshiName}: "Ganggu? No way! Kamu teman aku kok. But I understand if you're not ready. The offer stands anytime!" Her understanding makes you feel worse but also grateful.`,
                        choices: [
                            {
                                text: "💭 Maybe next time...",
                                stats: { confidence: 8 },
                                relationship: 15,
                                nextChapter: 2
                            }
                        ]
                    },
                    {
                        id: 'strategic_position',
                        text: `Kamu workout di area yang visible dari lokasi shooting. ${oshiName} eventually notice you! Dia wave dan smile. Tapi... you panic dan hampir jatuh dari treadmill! Malu banget! Tapi ${oshiName} tertawa dan approach you. "Kamu okay? Hati-hati ya!" Dia helping you up. Awkward but memorable moment!`,
                        choices: [
                            {
                                text: "😅 Jadikan ini conversation starter!",
                                next: 'awkward_to_conversation',
                                stats: { confidence: 15, energy: -5 },
                                relationship: 18
                            },
                            {
                                text: "😳 Terlalu malu, just say thanks dan pergi",
                                next: 'missed_opportunity',
                                stats: { confidence: -8 },
                                relationship: 8
                            }
                        ]
                    },
                    {
                        id: 'awkward_to_conversation',
                        text: `Kamu: "Haha sorry, terlalu excited lihat idol..." ${oshiName} laugh: "Cute! At least you're dedicated workout! Boleh aku tanya workout routine kamu?" Conversation flows naturally dari situ!`,
                        choices: [
                            {
                                text: "💬 Share routine dan exchange tips!",
                                stats: { confidence: 20, knowledge: 15 },
                                relationship: 25,
                                nextChapter: 2
                            }
                        ]
                    },
                    {
                        id: 'missed_opportunity',
                        text: `Kamu miss the chance tapi ${oshiName} seems to understand. She waves goodbye with sweet smile. At least she noticed you! Progress dari meet & greet pertama!`,
                        choices: [
                            {
                                text: "😔 Focus back to workout...",
                                stats: { confidence: 5 },
                                relationship: 10,
                                nextChapter: 2
                            }
                        ]
                    },
                    {
                        id: 'run_away',
                        text: `Kamu cepat-cepat ke locker room. But you watch from distance through window. ${oshiName} looks so professional and happy. You feel regret. "Kenapa aku gini sih?" Suddenly, Coach Rudi tap your shoulder. "Itu idolamu kan? Kenapa gak say hi? Aku bisa introduce kamu loh!" He's friends with the production team!`,
                        choices: [
                            {
                                text: "🙏 Please Coach! Tolong introduce aku!",
                                next: 'coach_introduction',
                                stats: { confidence: 8 },
                                relationship: 18
                            },
                            {
                                text: "😔 Nggak usah Coach, aku masih belum siap",
                                next: 'stay_hidden',
                                stats: { confidence: -12 },
                                relationship: 0
                            }
                        ]
                    },
                    {
                        id: 'coach_introduction',
                        text: `Coach Rudi introduce you. ${oshiName} friendly dan welcoming. "Oh! One of Coach Rudi's student! How's the progress?" Coach Rudi proud sharing your transformation story. ${oshiName} impressed: "That's inspiring!"`,
                        choices: [
                            {
                                text: "😊 Thank you for the motivation!",
                                stats: { confidence: 15 },
                                relationship: 20,
                                nextChapter: 2
                            }
                        ]
                    },
                    {
                        id: 'stay_hidden',
                        text: `Kamu stay di locker room sampai shooting selesai. You feel disappointed with yourself. Tapi kamu promise: "Next time I'll be ready." At least transformation journey continues.`,
                        choices: [
                            {
                                text: "💪 Train harder for next opportunity!",
                                stats: { muscle: 15, confidence: 8 },
                                nextChapter: 2
                            }
                        ]
                    }
                ]
            },


            // ===== CHAPTER 3: Critical Moments & Endings =====
            {
                title: "Chapter 3: Momen Krusial & Pilihan Besar 🌟",
                scenes: [
                    {
                        id: 'chapter3_start',
                        text: `Tiga bulan sejak perjalananmu dimulai. Transformasimu incredible: Berat ${gameState.weight}kg (turun ${120-gameState.weight}kg!), Otot ${gameState.muscle}%, Body fat ${gameState.fat}%. Kamu sekarang confident dan healthy! Hari ini ada event penting: JKT48 Theater Show dimana ${oshiName} akan perform. Kamu punya chance untuk hadir! Tapi... hari yang sama, ada fitness competition dengan prize 50 juta rupiah!`,
                        choices: [
                            {
                                text: "🏆 Ikut competition - kesempatan emas!",
                                next: 'choose_competition',
                                condition: { muscle: 50, fat: 50, weight: 100 },
                                stats: { confidence: 25, muscle: 10 }
                            },
                            {
                                text: "😔 Belum memenuhi syarat competition...",
                                next: 'watch_competition',
                                stats: { confidence: -8 }
                            },
                            {
                                text: "🎭 Attend theater show - support ${oshiName}!",
                                next: 'choose_theater',
                                condition: { relationship: 25, confidence: 30 },
                                stats: { confidence: 18 }
                            }
                        ]
                    },
                    {
                        id: 'choose_competition',
                        text: `Kamu pilih competition. Training extra keras 2 minggu. Competition day: perform amazing! Final round - neck to neck dengan competitor lain. Tiba-tiba kamu lihat ${oshiName} di audience! Dia datang support kamu! Energy surge! Best performance ever. WINNER: "${name}!" KAMU MENANG! ${oshiName} rush ke stage!`,
                        choices: [
                            {
                                text: "🎉 Celebrate victory dengan ${oshiName}!",
                                next: 'victory_celebration',
                                stats: { confidence: 35, muscle: 20 },
                                relationship: 45,
                                flags: ['wonCompetition']
                            }
                        ]
                    },
                    {
                        id: 'victory_celebration',
                        text: `${oshiName}: "I'm SO proud of you! Aku skip rehearsal buat nonton kamu compete. You were AMAZING!" Hug warmly. Prize money 50 juta, champion title, dan most importantly - ${oshiName}'s genuine pride and support. This moment perfect.`,
                        choices: [
                            {
                                text: "💖 Express feelings yang sebenarnya...",
                                gameOver: 'champion_romance'
                            },
                            {
                                text: "🤝 Thank her as supportive friend",
                                gameOver: 'champion_friendship'
                            }
                        ]
                    },
                    {
                        id: 'watch_competition',
                        text: `Kamu nonton competition dari audience. Lihat athlete lain perform, kamu terinspirasi tapi juga menyesal. "Kalau aku latihan lebih keras..." Tapi ${oshiName} tiba-tiba duduk di sebelahmu! "Kamu juga nonton? Next year kita lihat kamu di atas stage, okay?" Dia percaya sama kamu!`,
                        choices: [
                            {
                                text: "💪 YES! Next year pasti!",
                                stats: { confidence: 15, muscle: 10 },
                                relationship: 20,
                                gameOver: 'almost_there'
                            }
                        ]
                    },
                    {
                        id: 'choose_theater',
                        text: `Kamu attend theater show. ${oshiName} spotted you dan smile. Perform incredible! After show, dia personally greet you backstage. "Thanks for coming! Your support means everything!" Private moment, just you two.`,
                        choices: [
                            {
                                text: "💕 'Actually, ada yang mau aku bilang...'",
                                next: 'backstage_confession',
                                stats: { confidence: 25 },
                                relationship: 35
                            },
                            {
                                text: "😊 'Performance was amazing!'",
                                next: 'casual_backstage',
                                stats: { confidence: 15 },
                                relationship: 25
                            }
                        ]
                    },
                    {
                        id: 'backstage_confession',
                        text: `${oshiName} looks at you curious. "What is it?" Kamu gathering courage... "These past months, you've been my biggest motivation. Tapi lebih dari itu... I think I've fallen for you. Not just as fan, tapi... as person who admires everything about you."`,
                        choices: [
                            {
                                text: "💓 Wait for response...",
                                gameOver: 'confession_response'
                            }
                        ]
                    },
                    {
                        id: 'casual_backstage',
                        text: `${oshiName} happy dengan compliment. "Thank you! Having supportive friends like you makes performing worth it!" She kasih you exclusive photocard dan hug. Warm friendship moment.`,
                        choices: [
                            {
                                text: "💝 Treasure this moment",
                                gameOver: 'supportive_fan'
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

// Initialize Game
function initGame() {
    document.getElementById('character-name').textContent = gameState.playerName;
    document.getElementById('oshi-display').textContent = `💕 Oshi: ${gameState.selectedOshi.nickname}`;
    updateStats();
    updateCharacter();
    updateDay();
    showScene('start');
}

// Update Stats Display
function updateStats() {
    // Clamp values
    gameState.muscle = Math.max(0, Math.min(100, gameState.muscle));
    gameState.fat = Math.max(0, Math.min(100, gameState.fat));
    gameState.energy = Math.max(0, Math.min(100, gameState.energy));
    gameState.confidence = Math.max(0, Math.min(100, gameState.confidence));
    gameState.knowledge = Math.max(0, Math.min(100, gameState.knowledge));
    gameState.weight = Math.max(60, Math.min(150, gameState.weight));

    // Update displays
    document.getElementById('muscle-value').textContent = Math.round(gameState.muscle);
    document.getElementById('fat-value').textContent = Math.round(gameState.fat);
    document.getElementById('weight-value').textContent = Math.round(gameState.weight) + ' kg';
    document.getElementById('energy-value').textContent = Math.round(gameState.energy);
    document.getElementById('confidence-value').textContent = Math.round(gameState.confidence);
    document.getElementById('knowledge-value').textContent = Math.round(gameState.knowledge);
    
    // Update bars
    document.getElementById('muscle-bar').style.width = gameState.muscle + '%';
    document.getElementById('fat-bar').style.width = gameState.fat + '%';
    document.getElementById('energy-bar').style.width = gameState.energy + '%';
    document.getElementById('confidence-bar').style.width = gameState.confidence + '%';
    document.getElementById('knowledge-bar').style.width = gameState.knowledge + '%';
    
    const weightPercent = ((gameState.weight - 60) / 60) * 100;
    document.getElementById('weight-bar').style.width = Math.max(0, Math.min(100, weightPercent)) + '%';
}

// Update Character Sprite based on weight
function updateCharacter() {
    const charElement = document.getElementById('character');
    
    if (gameState.weight > 110) {
        charElement.textContent = '🧑‍🦲';
    } else if (gameState.weight > 100) {
        charElement.textContent = '😐';
    } else if (gameState.weight > 90) {
        charElement.textContent = '🙂';
    } else if (gameState.weight > 80) {
        charElement.textContent = '😊';
    } else if (gameState.weight > 70) {
        charElement.textContent = '💪';
    } else {
        charElement.textContent = '🏆';
    }
}

// Update Day Counter
function updateDay() {
    document.getElementById('day-counter').textContent = `📅 Hari ke-${gameState.day}`;
}

// Update Inventory Display
function updateInventory() {
    const inventoryPanel = document.getElementById('inventory-panel');
    const inventoryItems = document.getElementById('inventory-items');
    
    if (gameState.inventory.length > 0) {
        inventoryPanel.style.display = 'block';
        inventoryItems.innerHTML = '';
        gameState.inventory.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            itemDiv.textContent = item;
            inventoryItems.appendChild(itemDiv);
        });
    } else {
        inventoryPanel.style.display = 'none';
    }
}

// Show Notification
function showNotification(text, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = text;
    notification.className = 'notification show ' + type;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3500);
}

// Find Scene by ID
function findScene(sceneId) {
    const story = getStory();
    for (let chapterIndex = 0; chapterIndex < story.chapters.length; chapterIndex++) {
        const chapter = story.chapters[chapterIndex];
        for (let sceneIndex = 0; sceneIndex < chapter.scenes.length; sceneIndex++) {
            const scene = chapter.scenes[sceneIndex];
            if (scene.id === sceneId) {
                return { scene, chapter, chapterIndex, sceneIndex };
            }
        }
    }
    console.error('Scene not found:', sceneId);
    return null;
}

// FIXED: Show Scene dengan conditional blocking
function showScene(sceneId = null) {
    const story = getStory();
    let scene, chapter;
    
    if (sceneId) {
        const result = findScene(sceneId);
        if (!result) {
            console.error('Could not find scene:', sceneId);
            return;
        }
        scene = result.scene;
        chapter = result.chapter;
        gameState.currentChapter = result.chapterIndex;
        gameState.currentScene = result.sceneIndex;
    } else {
        if (gameState.currentChapter >= story.chapters.length) {
            console.error('Chapter index out of bounds');
            return;
        }
        chapter = story.chapters[gameState.currentChapter];
        
        if (gameState.currentScene >= chapter.scenes.length) {
            console.error('Scene index out of bounds');
            return;
        }
        scene = chapter.scenes[gameState.currentScene];
    }
    
    if (!scene) {
        console.error('Scene is null or undefined');
        return;
    }
    
    document.getElementById('chapter-title').textContent = chapter.title;
    document.getElementById('story-text').textContent = scene.text;
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    
    if (!scene.choices || scene.choices.length === 0) {
        console.warn('No choices available for scene:', scene.id);
        return;
    }
    
    scene.choices.forEach((choice, index) => {
        // FIXED: Check conditions PROPERLY
        let meetsCondition = true;
        let failedStats = [];
        
        if (choice.condition) {
            for (let stat in choice.condition) {
                if (gameState[stat] < choice.condition[stat]) {
                    meetsCondition = false;
                    failedStats.push(`${stat}: ${gameState[stat]}/${choice.condition[stat]}`);
                }
            }
        }
        
        // Skip if doesn't meet condition
        if (!meetsCondition && choice.condition) {
            return; // This choice won't be shown
        }
        
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        
        // Determine button style
        if (choice.stats) {
            const totalGood = (choice.stats.muscle || 0) - (choice.stats.fat || 0) - (choice.stats.weight || 0) + (choice.stats.confidence || 0);
            if (totalGood > 10) {
                btn.classList.add('positive');
            } else if (totalGood < -5) {
                btn.classList.add('negative');
            } else {
                btn.classList.add('neutral');
            }
        }
        
        btn.innerHTML = choice.text;
        btn.onclick = () => makeChoice(choice);
        
        choicesDiv.appendChild(btn);
    });
}

// FIXED: Make Choice dengan stat changes yang diperbesar
function makeChoice(choice) {
    // Apply stat changes
    if (choice.stats) {
        let message = '';
        
        for (let stat in choice.stats) {
            const change = choice.stats[stat];
            
            if (stat === 'weight') {
                gameState.weight += change;
                gameState.weight = Math.max(60, Math.min(150, gameState.weight));
            } else {
                gameState[stat] += change;
                gameState[stat] = Math.max(0, Math.min(100, gameState[stat]));
            }
            
            // Create notification message
            const statEmoji = {
                muscle: '💪',
                fat: '🔥',
                weight: '⚖️',
                energy: '⚡',
                confidence: '😊',
                knowledge: '📚'
            };
            
            if (change !== 0) {
                message += `${statEmoji[stat] || ''} ${stat} ${change > 0 ? '+' : ''}${change} `;
            }
        }
        
        updateStats();
        updateCharacter();
        
        if (message) {
            const notifType = (choice.stats.weight && choice.stats.weight < 0) || (choice.stats.muscle && choice.stats.muscle > 0) ? 'success' : 
                             (choice.stats.fat && choice.stats.fat > 0) || (choice.stats.confidence && choice.stats.confidence < 0) ? 'warning' : 'info';
            showNotification(message.trim(), notifType);
        }
    }
    
    // Apply relationship changes
    if (choice.relationship) {
        gameState.relationshipPoints += choice.relationship;
        showNotification(`💕 Relationship dengan ${gameState.selectedOshi.nickname} +${choice.relationship}!`, 'success');
    }
    
    // Apply flags
    if (choice.flags) {
        choice.flags.forEach(flag => {
            gameState.flags[flag] = true;
        });
    }
    
    // Add items to inventory
    if (choice.items) {
        choice.items.forEach(item => {
            if (!gameState.inventory.includes(item)) {
                gameState.inventory.push(item);
                showNotification(`🎒 Item baru: ${item}`, 'info');
            }
        });
        updateInventory();
    }
    
    // Increment day
    gameState.day += Math.floor(Math.random() * 3) + 1;
    updateDay();
    
    // Record choice
    gameState.choices.push(choice.text);
    
    setTimeout(() => {
        if (choice.gameOver) {
            showGameOver(choice.gameOver);
        } else if (choice.nextChapter !== undefined) {
            gameState.currentChapter = choice.nextChapter;
            gameState.currentScene = 0;
            const story = getStory();
            if (gameState.currentChapter < story.chapters.length) {
                const newChapter = story.chapters[gameState.currentChapter];
                if (newChapter.scenes.length > 0) {
                    showScene(newChapter.scenes[0].id);
                }
            }
        } else if (choice.next) {
            showScene(choice.next);
        } else {
            gameState.currentScene++;
            const story = getStory();
            const currentChapter = story.chapters[gameState.currentChapter];
            if (gameState.currentScene < currentChapter.scenes.length) {
                showScene(currentChapter.scenes[gameState.currentScene].id);
            } else {
                showGameOver('chapter_complete');
            }
        }
    }, 500);
}


// FIXED: Show Game Over dengan MULTIPLE achievable romance paths
function showGameOver(endingType) {
    const storyPanel = document.getElementById('story-panel');
    const oshi = gameState.selectedOshi;
    const oshiName = oshi.nickname;
    const name = gameState.playerName;
    
    let ending = '';
    
    // FIXED: Check actual stats for romance possibilities
    if (endingType === 'champion_romance') {
        // Path 1: CHAMPION ROMANCE (High muscle + competition win)
        if (gameState.muscle >= 60 && gameState.weight <= 95 && gameState.relationshipPoints >= 40) {
            ending = `
                <div class="game-over">
                    <h2>🏆💖 ULTIMATE ENDING: Champion's Love 💖🏆</h2>
                    <p style="font-size: 1.5em; font-weight: 600;">Perfect Victory & Perfect Romance!</p>
                    
                    <div class="ending-card">
                        <h3>💑 The Perfect Love Story 💑</h3>
                        <p>
                            ${oshiName} hugs you tight after your victory. "You know what? Watching you transform, not just physically but as a person... I've fallen for you too. Your dedication, your kindness, your genuine heart - that's what won me over."
                            <br><br>
                            Kalian memulai relationship yang beautiful. As fitness champion dan JKT48 member, kalian jadi Indonesia's power couple. Together kalian inspire millions tentang self-improvement, perseverance, dan true love.
                            <br><br>
                            Your transformation story goes viral internationally. Prize money kamu invest di fitness business bersama ${oshiName}. Life couldn't be more perfect! 💖✨
                        </p>
                    </div>

                    ${generateFinalStats()}
                    <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FF1744; font-weight: 700;">CHAMPION & SOULMATE 💑🏆</span></div>
                    <button class="restart-btn" onclick="location.reload()">🔄 Play Different Route</button>
                </div>
            `;
        } 
        // Path 2: BALANCED ROMANCE (Good stats, maybe not champion)
        else if (gameState.muscle >= 45 && gameState.confidence >= 60 && gameState.relationshipPoints >= 45) {
            ending = `
                <div class="game-over">
                    <h2>💖 BALANCED LOVE ENDING 💖</h2>
                    <p style="font-size: 1.4em;">True Connection Through Balance!</p>
                    
                    <div class="ending-card">
                        <h3>💕 Perfect Balance 💕</h3>
                        <p>
                            ${oshiName} smiles warmly. "You know what I love most? You didn't just focus on one thing. You balanced everything - fitness, confidence, our relationship. That shows maturity and wisdom."
                            <br><br>
                            Your balanced approach to life wins her heart. Together kalian build a relationship based on mutual growth and support! 💖
                        </p>
                    </div>

                    ${generateFinalStats()}
                    <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FF1744; font-weight: 700;">BALANCED COUPLE 💕</span></div>
                    <button class="restart-btn" onclick="location.reload()">🔄 Play Again</button>
                </div>
            `;
        }
        // Not quite romance level
        else {
            ending = generateGenericEnding();
        }
    } 
    else if (endingType === 'confession_response') {
        // Path 1: PERFECT ROMANCE (Best stats)
        if (gameState.muscle >= 60 && gameState.weight <= 90 && gameState.relationshipPoints >= 45) {
            ending = `
                <div class="game-over">
                    <h2>💖 TRUE LOVE ENDING 💖</h2>
                    <p style="font-size: 1.5em;">Dreams Do Come True!</p>
                    
                    <div class="ending-card">
                        <h3>💕 Mutual Feelings 💕</h3>
                        <p>
                            ${oshiName} looks into your eyes, tears forming. "I... I've been wanting to tell you the same thing. But I was scared - scared of complications, scared of what people would say. Tapi kamu... you're worth any risk."
                            <br><br>
                            Kalian start dating secretly at first, then eventually public. Fan reaction mostly positive - your transformation story too inspiring to hate. Together kalian prove that true love combined with dedication can overcome anything.
                            <br><br>
                            Your story becomes legend: from overweight fan to fit partner of JKT48 member. You both continue growing together, in fitness, career, dan love! 💖✨
                        </p>
                    </div>

                    ${generateFinalStats()}
                    <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FF1744; font-weight: 700;">OFFICIAL COUPLE 💑</span></div>
                    <button class="restart-btn" onclick="location.reload()">🔄 Play Again</button>
                </div>
            `;
        } 
        // Path 2: SOCIAL ROMANCE (High confidence & relationship)
        else if (gameState.confidence >= 65 && gameState.relationshipPoints >= 50 && gameState.weight <= 100) {
            ending = `
                <div class="game-over">
                    <h2>😊💖 CHARISMA ENDING: Heart to Heart 💖😊</h2>
                    <p style="font-size: 1.4em;">True Connection Achieved!</p>
                    
                    <div class="ending-card">
                        <h3>💕 Personality Wins 💕</h3>
                        <p>
                            ${oshiName} smiles warmly. "You know, when I first met you, I saw someone dedicated. But over these months, I saw so much more - your kindness, your humor, your genuine heart. The transformation? Amazing. But who you ARE? That's what made me fall for you."
                            <br><br>
                            Sometimes, it's not about being perfect physically - it's about the connection, the personality, the heart. You proved that true love sees beyond the surface! 💖
                        </p>
                    </div>

                    ${generateFinalStats()}
                    <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FF1744; font-weight: 700;">SOULMATES 💕</span></div>
                    <button class="restart-btn" onclick="location.reload()">🔄 Try Different Path</button>
                </div>
            `;
        }
        // Path 3: BALANCED ROMANCE 
        else if (gameState.muscle >= 50 && gameState.confidence >= 55 && gameState.relationshipPoints >= 40 && gameState.weight <= 95) {
            ending = `
                <div class="game-over">
                    <h2>💖 SWEET ROMANCE ENDING 💖</h2>
                    <p style="font-size: 1.4em;">Love Blooms!</p>
                    
                    <div class="ending-card">
                        <h3>💕 Genuine Connection 💕</h3>
                        <p>
                            ${oshiName} takes your hand. "I've been feeling this too. You've shown me what real dedication looks like. Not just to fitness, but to becoming a better person. I want to be part of that journey... if you'll have me?"
                            <br><br>
                            Of course you say yes! Your relationship starts with a foundation of mutual respect, growth, and genuine affection. 💖
                        </p>
                    </div>

                    ${generateFinalStats()}
                    <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FF1744; font-weight: 700;">HAPPY COUPLE 💕</span></div>
                    <button class="restart-btn" onclick="location.reload()">🔄 Try Different Route</button>
                </div>
            `;
        }
        // Path 4: CLOSE BUT NOT QUITE (Good try!)
        else if (gameState.relationshipPoints >= 30 && gameState.weight <= 100) {
            ending = `
                <div class="game-over">
                    <h2>💙 SWEET REJECTION ENDING 💙</h2>
                    <p style="font-size: 1.3em;">Honest Heart, Different Paths</p>
                    
                    <div class="ending-card">
                        <h3>🌈 Courageous Confession 🌈</h3>
                        <p>
                            ${oshiName} holds your hands gently. "Thank you for being honest. I really appreciate you, tapi... I can't return those feelings right now. Not because there's anything wrong with you - you're amazing! But my heart just... needs more time."
                            <br><br>
                            It hurts, but you respect her honesty. Your transformation journey wasn't wasted - you gained confidence, health, dan valuable friendship. Sometimes love doesn't work out immediately, tapi that doesn't make the journey less meaningful.
                            <br><br>
                            She adds: "But who knows about the future? Keep being awesome, ${name}." 💙
                        </p>
                    </div>

                    ${generateFinalStats()}
                    <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #2196F3; font-weight: 700;">CHERISHED FRIEND (For Now) 💙</span></div>
                    <button class="restart-btn" onclick="location.reload()">🔄 Try Different Choices</button>
                </div>
            `;
        } 
        // Didn't meet any romance threshold
        else {
            ending = `
                <div class="game-over">
                    <h2>😔 FRIEND ZONE ENDING 😔</h2>
                    <p style="font-size: 1.3em;">Not This Time...</p>
                    
                    <div class="ending-card">
                        <h3>💭 Honest Response 💭</h3>
                        <p>
                            ${oshiName} looks surprised but gentle. "I... I'm really flattered, ${name}. You've made amazing progress and I'm proud of you. But I don't feel that way. I hope we can still be friends?"
                            <br><br>
                            It stings, but you understand. The journey made you better regardless. Maybe with more time, more growth, things could be different. 
                            <br><br>
                            <strong>Tip:</strong> Try building more relationship points and confidence for better outcomes!
                        </p>
                    </div>

                    ${generateFinalStats()}
                    <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #757575; font-weight: 700;">JUST FRIENDS 👥</span></div>
                    <button class="restart-btn" onclick="location.reload()">🔄 Try Again With Better Strategy</button>
                </div>
            `;
        }
    } else if (endingType === 'champion_friendship') {
        ending = `
            <div class="game-over">
                <h2>🏆⭐ CHAMPION ENDING: Victory & Friendship ⭐🏆</h2>
                <p style="font-size: 1.4em;">Ultimate Achievement & Lasting Bond!</p>
                
                <div class="ending-card">
                    <h3>👑 Champion's Path 👑</h3>
                    <p>
                        ${oshiName} so proud of you: "You're amazing! Not everyone can achieve what you did!" Kalian maintain close friendship. She becomes your biggest cheerleader, kamu jadi her fitness consultant.
                        <br><br>
                        With prize money dan ${oshiName}'s endorsement, kamu buka fitness center chain "FitDreams". Your transformation story inspire thousands. 🌟
                    </p>
                </div>

                ${generateFinalStats()}
                <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #4CAF50; font-weight: 700;">CHAMPION & BEST FRIEND 🏆👥</span></div>
                <button class="restart-btn" onclick="location.reload()">🔄 Try Another Path</button>
            </div>
        `;
    } else if (endingType === 'supportive_fan') {
        ending = `
            <div class="game-over">
                <h2>⭐ DEDICATED FAN ENDING ⭐</h2>
                <p style="font-size: 1.4em;">The Power of Support!</p>
                
                <div class="ending-card">
                    <h3>👥 True Supporter 👥</h3>
                    <p>
                        You decide to remain supportive fan. ${oshiName} appreciates your continued support. Your transformation inspire many other fans to also improve themselves! 🌟
                    </p>
                </div>

                ${generateFinalStats()}
                <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FFA726; font-weight: 700;">LEGENDARY FAN ⭐</span></div>
                <button class="restart-btn" onclick="location.reload()">🔄 Explore Other Endings</button>
            </div>
        `;
    } else if (endingType === 'early_quit') {
        ending = `
            <div class="game-over">
                <h2>😔 EARLY END: Not Ready Yet 😔</h2>
                <p style="font-size: 1.3em;">Maybe Next Time...</p>
                
                <div class="ending-card">
                    <h3>💭 Reflection Time 💭</h3>
                    <p>
                        Change is hard. You weren't ready this time, dan that's okay. When you're truly ready, you can start again. Remember: every champion started as beginner who refused to give up. 💙
                    </p>
                </div>

                ${generateFinalStats()}
                <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #9E9E9E; font-weight: 700;">NOT READY YET... 💭</span></div>
                <button class="restart-btn" onclick="location.reload()">🔄 Try Again - You Can Do It!</button>
            </div>
        `;
    } else if (endingType === 'almost_there') {
        ending = `
            <div class="game-over">
                <h2>💪 ALMOST THERE ENDING 💪</h2>
                <p style="font-size: 1.3em;">Great Progress, Keep Going!</p>
                
                <div class="ending-card">
                    <h3>🌟 The Journey Continues 🌟</h3>
                    <p>
                        You made amazing progress! ${oshiName} believes in you. "Next time, I'll be cheering you on from the front row!" Your transformation journey isn't over - it's just beginning! 💪
                    </p>
                </div>

                ${generateFinalStats()}
                <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FF9800; font-weight: 700;">RISING STAR 🌟</span></div>
                <button class="restart-btn" onclick="location.reload()">🔄 Try For Better Ending</button>
            </div>
        `;
    } else {
        ending = generateGenericEnding();
    }
    
    storyPanel.innerHTML = ending;
}

function generateGenericEnding() {
    const oshiName = gameState.selectedOshi.nickname;
    let title, desc, status;
    
    if (gameState.weight <= 75 && gameState.muscle >= 70) {
        title = '💪 FITNESS TRANSFORMATION ENDING';
        desc = 'Incredible Physical Achievement!';
        status = 'FITNESS INSPIRATION 💪';
    } else if (gameState.relationshipPoints >= 40) {
        title = '💝 CLOSE BOND ENDING';
        desc = 'Special Connection Achieved!';
        status = 'SPECIAL FRIEND 💝';
    } else if (gameState.confidence >= 70) {
        title = '😊 CONFIDENCE BOOST ENDING';
        desc = 'Self-Improvement Success!';
        status = 'CONFIDENT PERSON 😊';
    } else {
        title = '✨ PROGRESS MADE ENDING';
        desc = 'A Journey Worth Taking!';
        status = 'DEDICATED FAN ✨';
    }
    
    return `
        <div class="game-over">
            <h2>${title}</h2>
            <p style="font-size: 1.4em;">${desc}</p>
            
            <div class="ending-card">
                <h3>🌈 Your Achievement 🌈</h3>
                <p>
                    Your journey with ${oshiName} as inspiration brought real changes to your life. The progress you made is real and valuable! 🌟
                </p>
            </div>

            ${generateFinalStats()}
            <div class="stat-row"><span><strong>🎭 Final Status:</strong></span><span style="color: #FF1744; font-weight: 700;">${status}</span></div>
            <button class="restart-btn" onclick="location.reload()">🔄 Try Different Path</button>
        </div>
    `;
}

function generateFinalStats() {
    return `
        <div class="stats-final">
            <h3>📊 Final Statistics:</h3>
            <div class="stat-row"><span><strong>💪 Muscle:</strong></span><span>${Math.round(gameState.muscle)}%</span></div>
            <div class="stat-row"><span><strong>🔥 Body Fat:</strong></span><span>${Math.round(gameState.fat)}%</span></div>
            <div class="stat-row"><span><strong>⚖️ Weight:</strong></span><span>${Math.round(gameState.weight)} kg (${Math.round(120 - gameState.weight)} kg loss)</span></div>
            <div class="stat-row"><span><strong>⚡ Energy:</strong></span><span>${Math.round(gameState.energy)}/100</span></div>
            <div class="stat-row"><span><strong>😊 Confidence:</strong></span><span>${Math.round(gameState.confidence)}/100</span></div>
            <div class="stat-row"><span><strong>📚 Knowledge:</strong></span><span>${Math.round(gameState.knowledge)}/100</span></div>
            <div class="stat-row"><span><strong>💕 Relationship:</strong></span><span>${gameState.relationshipPoints} points</span></div>
            <div class="stat-row"><span><strong>📅 Days:</strong></span><span>${gameState.day}</span></div>
            <div class="stat-row"><span><strong>🎒 Items:</strong></span><span>${gameState.inventory.length}</span></div>
        </div>
    `;
}

// ===== MUSIC CONTROLS =====
let musicEnabled = false;
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

bgMusic.addEventListener('error', function(e) {
    console.log('Music loading error');
    if (!bgMusic.canPlayType('audio/mpeg')) {
        musicControl.style.display = 'none';
    }
});

function enableMusic() {
    musicEnabled = true;
    document.getElementById('audio-modal').classList.add('hidden');
    musicControl.classList.remove('hidden');
    playMusic();
}

function disableMusic() {
    musicEnabled = false;
    document.getElementById('audio-modal').classList.add('hidden');
    musicControl.classList.remove('hidden');
    bgMusic.pause();
    musicIcon.textContent = '🔇';
}

function playMusic() {
    if (musicEnabled) {
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicControl.classList.add('playing');
                musicIcon.textContent = '🔊';
            }).catch(err => {
                console.log('Auto-play prevented');
                musicIcon.textContent = '🔇';
            });
        }
    }
}

function toggleMusic() {
    if (bgMusic.paused) {
        musicEnabled = true;
        playMusic();
    } else {
        musicEnabled = false;
        bgMusic.pause();
        musicControl.classList.remove('playing');
        musicIcon.textContent = '🔇';
    }
}

bgMusic.volume = 0.25;

// ===== INITIALIZE ON PAGE LOAD =====
createStars();
initOshiSelection();

console.log('🎮 JKT48 Fitness Journey RPG Loaded!');
console.log('📊 Initial Stats - Muscle:', gameState.muscle, 'Fat:', gameState.fat, 'Weight:', gameState.weight);
console.log('✨ Ready to transform!');