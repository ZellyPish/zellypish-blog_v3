module.exports = {
  title: `zellypish.dev`,
  description: `심해생존기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.zellypish.dev`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-4R3W1H1M6J', // Google Analytics Tracking ID
  author: {
    name: `김종찬`,
    bio: {
      role: `서비스 개발자`,
      description: ['우아하고 싶은', '끈기있는', '조금은 게으른'],
      thumbnail: 'memoji.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/zellypish`, // `https://github.com/zoomKoding`,
      linkedIn: `https://www.linkedin.com/in/jongchan-kim-95608a1bb`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `ehxhfl21@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.03 ~',
        activity: '씨브이쓰리 개발자',
        links: {
          post: 'https://datalab.labangba.com',
          demo: 'https://labangba.com'
        },
      },
      
      {
        date: '2020.09 ~ 2020.12',
        activity: '상록에스 교육용 컨텐츠 퍼블리싱',
      },
      {
        date: '2007',
        activity: '정보올림피아드 중등부 지역본선 은상',
      },
      {
        date: '2005',
        activity: '정보올림피아드 초등부 지역본선 최우수상',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      // {
      //   title: '라방바 데이터랩',
      //   description: ''
      // },
      // {
      //   title: '라방바',
      //   description:
      //     '애플리케이션 iOS파트와 백오피스 프론트엔드 개발을 전담하였고, express.js 백엔드 개발에도 참여하였습니다.',
      //   techStack: ['swift', 'react', 'nodejs'],
      //   thumbnailUrl: 'labangba.png',
      //   links: {
      //     appStore: 'https://apps.apple.com/kr/app/id1486264417',
      //   },
      // },
    ],
  },
};
