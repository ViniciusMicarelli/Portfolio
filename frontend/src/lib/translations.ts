export type Language = "pt" | "en";

export interface StorySlide {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export interface Post {
  caption: string;
  likes: number;
  comments: number;
  image: string;
}

export interface TranslationData {
  username: string;
  fullName: string;
  bio: string;
  posts: string;
  followers: string;
  following: string;
  stories: {
    projects: string;
    technologies: string;
    aboutMe: string;
  };
  storyContents: {
    projects: StorySlide[];
    technologies: StorySlide[];
    aboutMe: StorySlide[];
  };
  postData: Post[];
}

const icons = {
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  streamlit: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  linkedin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
};

/* ── post images (imported here to be used in data) ── */
import postIlac from "@/assets/post-ilac.png"
import postMl from "@/assets/post-ml.jpg";
import postGraduation from "@/assets/post-graduation.jpg";

export const translations: Record<Language, TranslationData> = {
  pt: {
    username: "vinicius.micarelli",
    fullName: "Vinícius Ribeiro Micarelli",
    bio: "💻 Desenvolvedor Python · Qualiconsig\n🎓 Eng. de Computação — FIAP\n📚 Pós em ML Engineering — FIAP\n🌎 Fluente em Português & Inglês",
    posts: "publicações",
    followers: "seguidores",
    following: "seguindo",
    stories: {
      projects: "Projetos",
      technologies: "Tecnologias",
      aboutMe: "Sobre Mim",
    },
    storyContents: {
      projects: [
        {
          title: "🔀 Github Clone",
          description: "Clone funcional do GitHub construído com Vite + FastAPI. Inclui autenticação, criação e visualização de repositórios, navegação de arquivos, branches, pull requests e muito mais.",
          image: icons.github,
          link: "https://github.com/ViniciusMicarelli/ProcessVersioning.git",
        },
        {
          title: "⚡ API de Rifas",
          description: "API REST completa desenvolvida com FastAPI para gerenciamento de rifas automotivas. Sistema com endpoints para criação, listagem e sorteio, com documentação automática via Swagger.",
          image: icons.fastapi,
          link: "https://github.com/ViniciusMicarelli/Rifa-ClubeDoAuto",
        },
        {
          title: "🌐 Câmbio — React App",
          description: "Aplicação frontend em React para consulta e conversão de câmbio de moedas em tempo real. Interface limpa e responsiva com integração a APIs externas.",
          image: icons.react,
          link: "https://github.com/ViniciusMicarelli/Cambio-",
        },
        {
          title: "🐍 Estudos Django",
          description: "Repositório de aprendizado e experimentação com Django. Projetos práticos explorando models, views, templates, autenticação e o Django REST Framework.",
          image: icons.django,
          link: "https://github.com/ViniciusMicarelli/Estudos-Django",
        },
        {
          title: "📊 Agenda — Streamlit",
          description: "Aplicação interativa de agenda construída com Streamlit. Interface intuitiva para gerenciamento de contatos e eventos com visualização de dados.",
          image: icons.streamlit,
          link: "https://github.com/ViniciusMicarelli/Agenda",
        },
      ],
      technologies: [
        {
          title: "🐍 Python & Frameworks",
          description: "FastAPI, Django e Streamlit compõem meu stack principal. Desenvolvimento de APIs escaláveis, aplicações web robustas e dashboards interativos de dados.",
          image: icons.python,
        },
        {
          title: "⚛️ Frontend com React",
          description: "Construção de interfaces modernas e reativas. Experiência com componentização, hooks, gerenciamento de estado e integração com APIs REST.",
          image: icons.react,
        },
        {
          title: "🗄️ Bancos de Dados",
          description: "PostgreSQL para dados relacionais, MongoDB para documentos NoSQL. Modelagem, queries otimizadas, migrations e integração com ORMs como SQLAlchemy.",
          image: icons.postgresql,
        },
        {
          title: "🔧 DevOps & Ferramentas",
          description: "Git para versionamento, Docker para containerização, CI/CD para deploys automatizados. Automação de processos e boas práticas de desenvolvimento.",
          image: icons.git,
        },
      ],
      aboutMe: [
        {
          title: "👨‍💻 Quem sou eu?",
          description: "Engenheiro de Computação formado pela FIAP, apaixonado por tecnologia e desenvolvimento de software. Atuo como Desenvolvedor Python na Qualiconsig, criando soluções backend escaláveis.",
          link: "https://github.com/ViniciusMicarelli",
          image: icons.github,
        },
        {
          title: "🇨🇦 Intercâmbio no Canadá",
          description: "4 meses de inglês intensivo no ILAC Toronto (Nov/2023 – Fev/2024). Certificado High Advanced. Uma experiência que ampliou minha visão profissional e cultural.",
          link: "https://www.ilac.com",
        },
        {
          title: "🎓 Pós-graduação em ML",
          description: "Pós-graduando em Machine Learning Engineering pela FIAP, com início em Março/2026. Explorando IA, aprendizado de máquina, LLMs e aplicações inteligentes.",
          link: "https://www.fiap.com.br",
        },
        {
          title: "🎯 Objetivo",
          description: "Evoluir como desenvolvedor full-stack com foco em Python, contribuir em projetos open-source e aplicar Machine Learning em soluções reais. Sempre aprendendo, sempre construindo.",
        },
      ],
    },
    postData: [
      {
        caption: "🚀 Certificado High Advanced de inglês pelo ILAC Toronto! 4 meses de imersão total no Canadá que transformaram minha carreira e visão de mundo.\n\n#English #ILAC #Toronto #Canada #StudyAbroad #HighAdvanced",
        likes: 142,
        comments: 23,
        image: postIlac,
      },
      {
        caption: "🤖 Próximo passo desbloqueado: Pós-graduação em Machine Learning Engineering pela FIAP! Pronto para mergulhar no universo de IA, redes neurais e LLMs.\n\n#MachineLearning #AI #FIAP #PostGrad #DeepLearning #MLEngineering",
        likes: 198,
        comments: 31,
        image: postMl,
      },
      {
        caption: "🎓 Formado em Engenharia de Computação pela FIAP! 5 anos de dedicação, projetos desafiadores e muito crescimento profissional. Gratidão por cada aprendizado!\n\n#FIAP #Graduation #ComputerEngineering #Engineering #Formatura",
        likes: 356,
        comments: 67,
        image: postGraduation,
      },
    ],
  },
  en: {
    username: "vinicius.micarelli",
    fullName: "Vinícius Ribeiro Micarelli",
    bio: "💻 Python Developer · Qualiconsig\n🎓 Computer Engineering — FIAP\n📚 ML Engineering Postgrad — FIAP\n🌎 Fluent in Portuguese & English",
    posts: "posts",
    followers: "followers",
    following: "following",
    stories: {
      projects: "Projects",
      technologies: "Technologies",
      aboutMe: "About Me",
    },
    storyContents: {
      projects: [
        {
          title: "🔀 Github Clone",
          description: "A fully functional GitHub clone built with Vite + FastAPI. Features include authentication, repository management, file browsing, branches, pull requests, and more.",
          image: icons.github,
          link: "https://github.com/ViniciusMicarelli/ProcessVersioning.git",
        },
        {
          title: "⚡ Raffle API",
          description: "Complete REST API built with FastAPI for managing automotive raffles. Features endpoints for creation, listing, and drawing, with automatic Swagger documentation.",
          image: icons.fastapi,
          link: "https://github.com/ViniciusMicarelli/Rifa-ClubeDoAuto",
        },
        {
          title: "🌐 Currency Exchange — React",
          description: "React frontend application for real-time currency exchange rates and conversion. Clean, responsive interface integrated with external APIs.",
          image: icons.react,
          link: "https://github.com/ViniciusMicarelli/Cambio-",
        },
        {
          title: "🐍 Django Studies",
          description: "Learning and experimentation repository with Django. Hands-on projects exploring models, views, templates, authentication, and Django REST Framework.",
          image: icons.django,
          link: "https://github.com/ViniciusMicarelli/Estudos-Django",
        },
        {
          title: "📊 Agenda — Streamlit",
          description: "Interactive agenda app built with Streamlit. Intuitive interface for managing contacts and events with data visualization capabilities.",
          image: icons.streamlit,
          link: "https://github.com/ViniciusMicarelli/Agenda",
        },
      ],
      technologies: [
        {
          title: "🐍 Python & Frameworks",
          description: "FastAPI, Django, and Streamlit make up my core stack. Building scalable APIs, robust web apps, and interactive data dashboards.",
          image: icons.python,
        },
        {
          title: "⚛️ Frontend with React",
          description: "Building modern, reactive interfaces. Experience with componentization, hooks, state management, and REST API integration.",
          image: icons.react,
        },
        {
          title: "🗄️ Databases",
          description: "PostgreSQL for relational data, MongoDB for NoSQL documents. Data modeling, optimized queries, migrations, and ORM integration with SQLAlchemy.",
          image: icons.postgresql,
        },
        {
          title: "🔧 DevOps & Tools",
          description: "Git for version control, Docker for containerization, CI/CD for automated deployments. Process automation and development best practices.",
          image: icons.git,
        },
      ],
      aboutMe: [
        {
          title: "👨‍💻 Who am I?",
          description: "Computer Engineer graduated from FIAP, passionate about technology and software development. Currently working as a Python Developer at Qualiconsig, building scalable backend solutions.",
          link: "https://github.com/ViniciusMicarelli",
          image: icons.github,
        },
        {
          title: "🇨🇦 Exchange in Canada",
          description: "4 months of intensive English at ILAC Toronto (Nov/2023 – Feb/2024). High Advanced certificate. An experience that broadened my professional and cultural perspective.",
          link: "https://www.ilac.com",
        },
        {
          title: "🎓 ML Postgraduate",
          description: "Pursuing a postgraduate degree in Machine Learning Engineering at FIAP, starting March/2026. Exploring AI, machine learning, LLMs, and intelligent applications.",
          link: "https://www.fiap.com.br",
        },
        {
          title: "🎯 Goal",
          description: "Grow as a full-stack developer with a Python focus, contribute to open-source projects, and apply Machine Learning to real-world solutions. Always learning, always building.",
        },
      ],
    },
    postData: [
      {
        caption: "🚀 English High Advanced Certificate from ILAC Toronto! 4 months of full immersion in Canada that transformed my career and worldview.\n\n#English #ILAC #Toronto #Canada #StudyAbroad #HighAdvanced",
        likes: 142,
        comments: 23,
        image: postIlac,
      },
      {
        caption: "🤖 Next level unlocked: Postgraduate in Machine Learning Engineering at FIAP! Ready to dive into AI, neural networks, and LLMs.\n\n#MachineLearning #AI #FIAP #PostGrad #DeepLearning #MLEngineering",
        likes: 198,
        comments: 31,
        image: postMl,
      },
      {
        caption: "🎓 Graduated in Computer Engineering from FIAP! 5 years of dedication, challenging projects, and incredible professional growth. Grateful for every lesson learned!\n\n#FIAP #Graduation #ComputerEngineering #Engineering #Gratitude",
        likes: 356,
        comments: 67,
        image: postGraduation,
      },
    ],
  },
};
