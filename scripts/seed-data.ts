import type { EducationInput } from '../shared/schemas/education'
import type { ExperienceInput } from '../shared/schemas/experience'
import type { ProfileInput } from '../shared/schemas/profile'
import type { ProjectInput } from '../shared/schemas/project'
import type { SkillInput } from '../shared/schemas/skill'

// Content migrated from the legacy React portfolio (DataProject.js, DataResume.js,
// AboutCard.js, Techstack.js, Toolstack.js, Resume.js, Home2.js).

const monthStart = (year: number, month: number) => new Date(Date.UTC(year, month - 1, 1))

export const profileSeed: ProfileInput = {
  fullName: 'Rofiqur Rohman',
  roles: ['Software Developer'],
  bio: [
    'Hi everyone, I am Rofiqur Rohman from Indonesia.',
    'I am a software developer whose expertise leans toward frontend development, with experience on the backend as well. I build web and mobile applications with JavaScript and have created several applications for different organizations.',
    'I am currently learning blockchain technology and web3 development. I love learning new things and am always looking for challenges in the world of programming and IT.',
  ],
  location: { country: 'Indonesia' },
  activities: ['Travelling', 'Hiking', 'Volleyball', 'Badminton'],
  quote: 'Risk more than other think is safe!',
  socialLinks: [
    { platform: 'github', url: 'https://github.com/rofiqurrohman', icon: 'simple-icons:github' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/rofiqurrohman/', icon: 'simple-icons:linkedin' },
    { platform: 'instagram', url: 'https://www.instagram.com/rofiqurrohmn/', icon: 'simple-icons:instagram' },
  ],
  githubUsername: 'rofiqurrohman',
  resumeUrl: '/resume_rofiqurrohman.pdf',
}

export const projectSeeds: ProjectInput[] = [
  {
    title: 'Chainfund',
    slug: 'chainfund',
    summary: 'Chainfund adalah platform investasi yang mendukung UMKM indonesia dan mendapatkan keuntungan yang transparan berbasis technology blockchain.',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1783187204/chainfund_wobk5u.png',
    category: 'personal',
    liveUrl: 'https://chainfund-beta.vercel.app/',
    techStack: [],
    sortOrder: 1,
  },
  {
    title: 'Paydrip',
    slug: 'paydrip',
    summary: 'Paydrip adalah Penggajian yang menghasilkan keuntungan per detik bagi karyawan melalui stablecoin yang di dukung oleh obligasi dengan technology blockchain.',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1783187350/paydrip_v3tfoo.png',
    category: 'personal',
    liveUrl: 'https://paydrip.vercel.app/',
    techStack: [],
    sortOrder: 2,
  },
  {
    title: 'Fleet Uzzeet',
    slug: 'fleet-uzzeet',
    summary: 'Fleet Uzzeet adalah web app dari perusahaan untuk melacak dan memantau kendaraan, saya terlibat dalam pembuatan beberapa fitur.',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1750733071/project-portfolio/hndqffgdl4hkgrmjlurh.png',
    category: 'professional',
    liveUrl: null,
    techStack: [],
    sortOrder: 3,
  },
  {
    title: 'Runner',
    slug: 'runner',
    summary: 'Runner adalah sebuah web app yang berbasis GPS Tracking yang di buat oleh perusahaan yang dimana saya juga ikut terlibat dalam pembuatan beberapa fitur.',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1750733060/project-portfolio/p3049px2pkxb2atb0imb.png',
    category: 'professional',
    liveUrl: null,
    techStack: [],
    sortOrder: 4,
  },
  {
    title: 'Trip Management',
    slug: 'trip-management',
    summary: 'Trip Management adalah sebuah web app untuk monitoring kendaraan dan di buat oleh perusahaan yang dimana saya juga ikut terlibat dalam pembuatan beberapa fitur.',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1750733066/project-portfolio/nj1a65bdm4etrhfvaxya.png',
    category: 'professional',
    liveUrl: null,
    techStack: [],
    sortOrder: 5,
  },
  {
    title: 'Sistem Informasi Harga dan Produksi Komoditi',
    slug: 'sistem-informasi-harga-dan-produksi-komoditi',
    summary: 'Sistem informasi Harga dan Produksi inflasi Jawa Tengah (Vue.js, Tailwindcss, Rest API).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1659948970/project-portfolio/hargajateng_qu7r3v.png',
    category: 'professional',
    liveUrl: 'https://hargajateng.org/',
    techStack: [],
    sortOrder: 6,
  },
  {
    title: 'Learning Management System Amikom Center',
    slug: 'learning-management-system-amikom-center',
    summary: 'Learning management system ini mempunyai fitur Course online, presensi dan pembayaran otomatis yang terintegrasi dengan duitku.com (Vue.js, Vuex, Tailwindcss, Rest API).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1659948971/project-portfolio/lms_s0qap3.png',
    category: 'professional',
    liveUrl: 'https://amikomcenter.com',
    techStack: [],
    sortOrder: 7,
  },
  {
    title: 'Money Changer',
    slug: 'money-changer',
    summary: 'Aplikasi money changer (Ionic, TypeScript, Vue.js).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1661512188/project-portfolio/ionic_zcs0jr.png',
    category: 'professional',
    liveUrl: null,
    techStack: [],
    sortOrder: 8,
  },
  {
    title: 'Dashboard Admin',
    slug: 'dashboard-admin',
    summary: 'Dashboard admin untuk management sebuah website. (React.js, Redux, Tailwindcss, TypeScript).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1659948967/project-portfolio/Dashboard_sliidn.png',
    category: 'professional',
    liveUrl: null,
    techStack: [],
    sortOrder: 9,
  },
  {
    title: 'Sekolahan ID',
    slug: 'sekolahan-id',
    summary: 'Sekolahan ID adalah aplikasi yang memberikan data-data sekolah yang ada di Indonesia. (React.js, Recoil.js).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1659948967/project-portfolio/sekolah_nmh3ik.png',
    category: 'personal',
    liveUrl: 'https://sekolahanid.herokuapp.com/',
    techStack: [],
    sortOrder: 10,
  },
  {
    title: 'Extion.go Landing Page',
    slug: 'extion-go-landing-page',
    summary: 'landing page untuk aplikasi extion.go. (Vue.js, Bootstrap).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1660036655/project-portfolio/extion_o7i9bm.png',
    category: 'personal',
    liveUrl: 'https://extion.vercel.app/',
    techStack: [],
    sortOrder: 11,
  },
  {
    title: 'Warung Apps',
    slug: 'warung-apps',
    summary: 'Project Aplikasi Warung submission Dicoding Front-End Web Developer Expert (HTML, SCSS, JS, Webpack, PWA).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1659948973/project-portfolio/warungapp_us5iyj.png',
    category: 'personal',
    liveUrl: 'https://rofiqurrohman.github.io/',
    techStack: [],
    sortOrder: 12,
  },
  {
    title: 'Inventory Management',
    slug: 'inventory-management',
    summary: 'Project Aplikasi Perpustakaan akhir tahun event Developer Student Club Jogja (HTML, SCSS, JS).',
    imageUrl: 'https://res.cloudinary.com/rofiqurrohman/image/upload/v1659948967/project-portfolio/inventory_v5xrqu.png',
    category: 'personal',
    liveUrl: 'https://github.com/rofiqurrohman/dscjogfest-inventory-management',
    techStack: [],
    sortOrder: 13,
  },
]

export const experienceSeeds: ExperienceInput[] = [
  {
    company: 'PT Telto Telematis Indonesia',
    companyUrl: null,
    logoUrl: null,
    location: { city: 'Yogyakarta', country: 'Indonesia' },
    workMode: 'hybrid',
    positions: [
      {
        title: 'Frontend Developer',
        employmentType: 'full-time',
        startDate: monthStart(2022, 12),
        endDate: null,
        highlights: [
          'Developing, collaborating, code reviewing frontend features in different teams.',
          'Developing the GPS Tracking web app feature with other teams.',
          'Build some website landing page and CMS.',
          'Work with scrum application development method.',
        ],
        projects: [],
        techStack: ['Vue.js', 'Quasar', 'Leaflet.js', 'Socket.IO', 'REST API'],
      },
    ],
    sortOrder: 1,
  },
  {
    company: 'PT GIT Solution',
    companyUrl: null,
    logoUrl: null,
    location: { city: 'Yogyakarta', country: 'Indonesia' },
    workMode: null,
    positions: [
      {
        title: 'Frontend Engineer (MBKM)',
        employmentType: 'internship',
        startDate: monthStart(2022, 3),
        endDate: monthStart(2022, 12),
        highlights: [
          'Collaborated with a Senior and Lead Engineer to build Sistem informasi harga dan produksi komoditi Jawa Tengah.',
          'Build a web app Learning Management System (LMS) and integrated it with a payment gateway.',
          'Developing, collaborating, code reviewing, debugging, and deploying frontend features in different teams.',
          'Build some website landing page.',
          'Work with scrum application development method.',
        ],
        projects: [],
        techStack: ['Vue.js', 'Vuex', 'Tailwind CSS', 'Bootstrap', 'REST API', 'Payment Gateway', 'GitLab CI/CD'],
      },
    ],
    sortOrder: 2,
  },
  {
    company: 'Freedom FinTech',
    companyUrl: null,
    logoUrl: null,
    location: { country: 'Singapore' },
    workMode: null,
    positions: [
      {
        title: 'Frontend Developer',
        employmentType: 'freelance',
        startDate: monthStart(2022, 2),
        endDate: monthStart(2022, 4),
        highlights: [
          'Build web app dashboard admin and collaborate with different teams.',
          'Research and build web personality.',
          'Created and set up a linter and formatter for the existing frontend codebase to improve code consistency.',
        ],
        projects: [],
        techStack: ['React', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS', 'GitHub', 'ESLint', 'Prettier'],
      },
    ],
    sortOrder: 3,
  },
  {
    company: 'PT Manggala Teknologi Nusantara',
    companyUrl: null,
    logoUrl: null,
    location: { city: 'Kediri', country: 'Indonesia' },
    workMode: null,
    positions: [
      {
        title: 'Frontend Developer',
        employmentType: 'internship',
        startDate: monthStart(2021, 7),
        endDate: monthStart(2021, 12),
        highlights: [
          'Build app Money Changer.',
          'Work with scrum application development method.',
          'Implemented front-end engineering best practices and patterns and presented them to other engineers.',
          'Learned and practiced frontend engineering with attention to code quality and web performance.',
        ],
        projects: [],
        techStack: ['Ionic', 'Vue.js', 'Vuex', 'TypeScript'],
      },
    ],
    sortOrder: 4,
  },
]

export const educationSeeds: EducationInput[] = [
  {
    institution: 'Universitas Amikom Yogyakarta',
    fieldOfStudy: 'Informatika',
    graduationYear: 2023,
    highlights: [],
    sortOrder: 1,
  },
  {
    institution: 'SMK PGRI 1 Ngawi',
    fieldOfStudy: 'Teknik Komputer dan Jaringan',
    graduationYear: 2018,
    highlights: [],
    sortOrder: 2,
  },
]

// [name, simple-icons slug] per Stack row, in display order.
const stack: Array<[category: SkillInput['category'], skills: Array<[name: string, icon: string]>]> = [
  ['language', [['JavaScript', 'javascript'], ['TypeScript', 'typescript']]],
  ['frontend', [
    ['React', 'react'],
    ['Vue.js', 'vuedotjs'],
    ['Next.js', 'nextdotjs'],
    ['Nuxt', 'nuxt'],
    ['Tailwind CSS', 'tailwindcss'],
    ['Bootstrap', 'bootstrap'],
    ['Quasar', 'quasar'],
    ['Sass', 'sass'],
  ]],
  ['backend', [['Node.js', 'nodedotjs'], ['Express', 'express'], ['NestJS', 'nestjs'], ['Firebase', 'firebase']]],
  ['web3', [['Ethereum', 'ethereum']]],
  ['workflow', [
    ['Visual Studio Code', 'visualstudiocode'],
    ['Git', 'git'],
    ['GitHub', 'github'],
    ['Docker', 'docker'],
    ['Postman', 'postman'],
    ['Linux', 'linux'],
  ]],
  ['ai', [
    ['Claude', 'claude'],
    ['ChatGPT', 'openai'],
    ['Gemini', 'googlegemini'],
    ['Cursor', 'cursor'],
    ['GitHub Copilot', 'githubcopilot'],
  ]],
]

export const skillSeeds: SkillInput[] = stack.flatMap(([category, skills]) =>
  skills.map(([name, icon], index): SkillInput => ({
    name,
    icon: `simple-icons:${icon}`,
    category,
    sortOrder: index + 1,
  })),
)
