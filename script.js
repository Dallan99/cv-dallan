import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full">
        {/* Nome e Redes Sociais */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-400">Dallan Borgheresi</h1>
          <p className="text-gray-400 mt-2">São João do Rio Vermelho – Florianópolis - SC</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="mailto:dallanr@gmail.com" className="text-teal-300 hover:text-teal-500">E-mail</a>
            <a href="https://www.linkedin.com/in/dallan-borgheresi" className="text-teal-300 hover:text-teal-500">LinkedIn</a>
            <a href="https://github.com/Dallan99" className="text-teal-300 hover:text-teal-500">GitHub</a>
          </div>
        </header>

        {/* Resumo */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-teal-400">Resumo</h2>
          <p className="mt-2 text-gray-300">
            Em transição para a área de Tecnologia, com foco em Automação em diversas frentes. Possuo experiência com testes manuais e automatizados, além de programação em Python e JavaScript. Minha paixão pela automação vai além dos testes, abrangendo a otimização de processos e a integração de tecnologias para ganho de eficiência.
          </p>
          <p className="mt-2 text-gray-300">
            Sou formado em Testes de Software pela Iterasys e QA Experience pela Dio.me e atualmente curso Sistemas de Informação e Desenvolvimento Full Stack Python pela Faculdade Impacta. Tenho experiência prática com Selenium WebDriver, Behave, PyAutoGUI, Pandas, OpenCV (cv2) e EasyOCR, aplicando essas tecnologias para automação de testes e processos.
          </p>
          <p className="mt-2 text-gray-300">
            Minha experiência anterior em logística me proporcionou habilidades analíticas, foco em processos e melhoria contínua, competências que aplico na área de tecnologia para otimizar qualidade e eficiência nos projetos. Atualmente, busco minha primeira oportunidade como QA, automação, desenvolvimento Python ou Inteligência Artificial.
          </p>
        </section>

        {/* Formação Acadêmica */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-teal-400">Formação Acadêmica</h2>
          <ul className="mt-2 text-gray-300 list-disc list-inside">
            <li>Sistemas de Informação – Faculdade Impacta (Previsão: 06/2028)</li>
            <li>Full Stack Python – Faculdade Impacta (Previsão: 06/2026)</li>
            <li>Graduação em Logística – Faculdade Anhanguera (2014)</li>
          </ul>
        </section>

        {/* Habilidades */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-teal-400">Habilidades</h2>
          <ul className="mt-2 text-gray-300 list-disc list-inside">
            <li>Testes de Software: Manuais e Automatizados</li>
            <li>Automação: Selenium, Pytest, Cypress, Postman</li>
            <li>Programação: Python, JavaScript, HTML, CSS</li>
            <li>Versionamento: Git/GitHub</li>
            <li>Metodologias Ágeis: Scrum e Kanban</li>
          </ul>
        </section>

        {/* Botão de Contato */}
        <div className="text-center mt-8">
          <a
            href="mailto:dallanr@gmail.com"
            className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
