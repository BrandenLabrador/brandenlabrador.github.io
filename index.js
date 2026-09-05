const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const dialog = document.querySelector('[data-dialog]');
const dialogContent = document.querySelector('[data-dialog-content]');

const savedTheme = localStorage.getItem('portfolio-theme');
const preferredTheme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
root.dataset.theme = savedTheme || preferredTheme;

function updateThemeLabel() {
  themeButton.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} mode`);
}
updateThemeLabel();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  updateThemeLabel();
});

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

addEventListener('scroll', () => document.querySelector('[data-header]').classList.toggle('scrolled', scrollY > 20), { passive: true });
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const cases = {
  gold: {
    type: 'Machine learning · Case study',
    title: 'Gold Price Predictor',
    lede: 'A compact machine-learning pipeline for exploring historical price patterns and making a next-period estimate from monthly gold data.',
    tags: ['Python', 'pandas', 'scikit-learn', 'Random Forest', 'Matplotlib'],
    sections: [
      ['Problem', 'Turn a supplied historical CSV into a repeatable workflow that loads and cleans data, trains a regression model, evaluates it, and produces an understandable visual output.'],
      ['Approach', 'I parsed dates, converted price values to numeric data, removed incomplete rows, and engineered year, month, and sequential time-index features. A Random Forest regressor trains on 80% of the rows and predicts the remaining 20%.'],
      ['Evaluation', 'The program calculates mean absolute error and R², then plots the fitted series against actual prices. The latest run produced an MAE of 5.60; the very high R² should be interpreted cautiously because the current random split does not preserve time order.'],
      ['Limitations & next step', 'Calendar features alone do not explain market movement, and a random split can leak long-term trend information. I would replace it with walk-forward validation, add economic features, compare against a naive baseline, and report uncertainty rather than a single-point forecast.']
    ],
    repo: 'https://github.com/BrandenLabrador/Developing-a-Machine-Learning-App'
  },
  rag: {
    type: 'Applied AI · Case study', title: 'AirPods FAQ Chatbot',
    lede: 'A retrieval-augmented question-answering system designed to stay grounded in a small, structured support knowledge base.',
    tags: ['Python', 'LangChain', 'Chroma', 'Gemini 2.5 Flash', 'Embeddings'],
    sections: [
      ['Problem', 'Answer product-support questions conversationally without letting the model invent information beyond the approved FAQ dataset.'],
      ['Architecture', 'Each CSV row becomes a LangChain document with product, category, question, answer, and source metadata. Gemini embeddings index the documents in a local Chroma store; the retriever returns the three closest records for the final prompt.'],
      ['Safety decision', 'The prompt explicitly limits answers to retrieved context and defines a refusal response when the FAQ does not contain enough information. The API key stays in an environment variable and is never stored in the repository or browser.'],
      ['Next step', 'I would create a labeled evaluation set, measure retrieval hit rate and answer faithfulness, add citations to source records, and test adversarial or ambiguous questions before production use.']
    ], repo: 'https://github.com/BrandenLabrador/Developing-an-FAQ-Chatbot-Using-LangChain-and-LLM-APIs'
  },
  sql: {
    type: 'Data analytics · Case study', title: 'COVID-19 Data Exploration',
    lede: 'A sequenced MySQL analysis that turns raw global health data into consistent KPIs and reusable analytical views.',
    tags: ['SQL', 'MySQL', 'CTEs', 'Window functions', 'Views'],
    sections: [
      ['Problem', 'Analyze cases, deaths, testing, and vaccination data while keeping the workflow understandable and repeatable from initial checks through final reporting views.'],
      ['Implementation', 'Eight ordered scripts cover data-quality checks, exploration, KPI calculations, time-series trends, country rankings, vaccination progress, testing insights, and reusable views.'],
      ['Technical decisions', 'Population-adjusted metrics complement raw totals, minimum thresholds reduce misleading low-volume outliers, and joins connect case and vaccination records by location and date.'],
      ['Result & limitation', 'The workflow surfaces pandemic waves, differences between raw and population-adjusted impact, uneven early vaccination progress, and possible testing gaps. These are descriptive observations from reporting data, not causal claims.']
    ], repo: 'https://github.com/BrandenLabrador/BL-covid-sql-analysis'
  },
  rl: {
    type: 'Reinforcement learning · Case study', title: 'GridWorld Q-Learning Agent',
    lede: 'A from-scratch Q-learning implementation that makes state, action, reward, and exploration behavior easy to inspect.',
    tags: ['Python', 'NumPy', 'Q-learning', 'Epsilon-greedy', 'Matplotlib'],
    sections: [
      ['Problem', 'Train an agent to cross a 4×4 environment, avoid four terminal hole states, and reach the bottom-right goal with no pre-programmed path.'],
      ['Implementation', 'The agent learns a 16×4 Q-table over 800 episodes. Epsilon-greedy action selection starts with exploration and decays toward a 0.05 minimum, while the Bellman update combines immediate reward and discounted future value.'],
      ['Evaluation', 'A greedy test episode follows the learned table from start to goal. The latest run reached the goal in six moves with a total reward of 5 and saved both the Q-table and reward history for inspection.'],
      ['Next step', 'I would seed randomness for repeatable comparisons, run multiple trials, chart a rolling reward average, and compare sensitivity across learning-rate, discount, and decay settings.']
    ], repo: 'https://github.com/BrandenLabrador/Developing-a-Reinforcement-Learning-Agent'
  }
};

document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  const item = cases[button.dataset.case];
  dialogContent.innerHTML = `<article class="case-content"><p class="kicker">${item.type}</p><h2>${item.title}</h2><p class="case-lede">${item.lede}</p><div class="case-tags">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>${item.sections.map(([title, copy]) => `<section><h3>${title}</h3><p>${copy}</p></section>`).join('')}<a class="button primary" href="${item.repo}" target="_blank" rel="noreferrer">View repository <span>↗</span></a></article>`;
  dialog.showModal();
}));
document.querySelector('[data-dialog-close]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
