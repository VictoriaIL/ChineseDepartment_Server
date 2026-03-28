const { Router } = require('express');
const { Pages } = require('../models/page.model');
const router = Router();

const pagesData = [
  {
    page: 'main',
    label: '',
    heading: 'КАФЕДРА ТЕОРИИ И ПРАКТИКИ КИТАЙСКОГО ЯЗЫКА',
    mainDescription: 'Факультет китайского языка и культуры, Минский Государственный Лингвистический Университет',
    featuresTitle: '',
    featuresInfo: '',
    detailsTitle: '',
    detailsInfo: '',
    addressPlace: '',
    addressRoom: '',
    mailName: '',
    email: '',
  },
  {
    page: 'about',
    label: 'О кафедре',
    heading: 'Кафедра китайского языка',
    mainDescription: 'Кафедра китайского языка была основана в 2005 году. Мы готовим специалистов в области китайского языка и культуры.',
    featuresTitle: 'Направления подготовки',
    featuresInfo: '• Перевод и переводоведение\n• Международные отношения\n• Китайский язык для бизнеса',
    detailsTitle: 'Заведующий кафедрой',
    detailsInfo: 'Профессор Иванов И.И.',
    addressPlace: 'Москва, ул. Ленина, д. 1',
    addressRoom: 'Аудитория 301',
    mailName: 'Email:',
    email: 'china-dept@university.ru',
  },
  {
    page: 'teachers',
    label: 'Преподаватели',
    heading: 'Наши преподаватели',
    mainDescription: 'На кафедре работают высококвалифицированные специалисты.',
    featuresTitle: '',
    featuresInfo: '',
    detailsTitle: '',
    detailsInfo: '',
    addressPlace: '',
    addressRoom: '',
    mailName: '',
    email: '',
  },
  {
    page: 'study',
    label: 'Учебный процесс',
    heading: 'Учебный процесс',
    mainDescription: 'Кафедра предлагает современные методики обучения китайскому языку.',
    featuresTitle: 'Программы обучения',
    featuresInfo: '• Бакалавриат\n• Магистратура\n• Дополнительное образование',
    detailsTitle: '',
    detailsInfo: '',
  },
  {
    page: 'science',
    label: 'Научная работа',
    heading: 'Научная деятельность',
    mainDescription: 'Преподаватели кафедры ведут активную научную работу.',
    featuresTitle: 'Направления исследований',
    featuresInfo: '• Лингвистика китайского языка\n• Межкультурная коммуникация\n• Переводоведение',
    detailsTitle: '',
    detailsInfo: '',
  },
  {
    page: 'contacts',
    label: 'Контакты',
    heading: 'Контакты кафедры',
    mainDescription: 'Свяжитесь с нами:',
    featuresTitle: '',
    featuresInfo: '',
    detailsTitle: '',
    detailsInfo: '',
    addressPlace: 'Адрес: Москва, ул. Ленина, д. 1',
    addressRoom: 'Аудитория 301',
    mailName: 'Email:',
    email: 'china-dept@university.ru',
    mobile: 'Телефон: +7 (495) 123-45-67',
  },
];

router.post('/init', async (req, res) => {
  try {
    const results = [];
    for (const pageData of pagesData) {
      const existing = await Pages.findOne({ page: pageData.page });
      if (existing) {
        results.push({ page: pageData.page, status: 'exists' });
      } else {
        await Pages.create(pageData);
        results.push({ page: pageData.page, status: 'created' });
      }
    }
    res.json({ message: 'Pages initialized', results });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
