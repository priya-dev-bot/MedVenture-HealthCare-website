import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import './Articles.css';
import Footer from './Footer';

const Articles = () => {
  const articles = [
    {
      name: "Skin Care Basics",
      description: "Analyse your skin type and choose a sunscreen accordingly. If you have oily skin, opt for a gel or spray-based one. People with dry skin should choose lotions or cream-based sunscreen as it will be effective in providing both sun block and moisture.",
      image: "/articlesImage/article1.jpg",
      link: "https://www.aad.org/public/everyday-care/skin-care-basics/care" // External link
    },
    {
      name: "Homeopathy Treatment for Piles",
      description: "Homeopathic medicines for piles or hemorrhoids may offer treatments which is temporary. Usually, homeopathic treatment for piles takes long which might result in further complications. These medicines only work at the physical level to provide relief from pain that has caused hemorrhoids in the first place.",
      image: "/articlesImage/article2.jpg",
      link: "https://www.pristyncare.com/blog/homeopathic-medicines-for-piles/"
    },
    {
      name: "Tips for maintaining healthy eyes",
      description: "Your eyes are an important part of your health. By keeping your eyes healthy, you keep your brain healthy – improving your overall quality of life. There are many things you can do to keep them healthy and make sure you are seeing your best. ",
      image: "/articlesImage/article3.jpg",
      link: "https://www.webmd.com/eye-health/good-eyesight" // Internal route
    }
  ];

  return (
    <div className="Articles">
      <div className="banner">
        <h1>Articles Related to Health</h1>
        <div className="banner-img">
          <img src="articles-banner.jpg" alt="Article-banner" />
        </div>
      </div>
      <main>
        <div className="articles-container">
          {articles.map((article, index) => (
            <div key={index} className="article-card">
              <img src={article.image} alt={article.name} className="article-image" />
              <h2 className="article-title">{article.name}</h2>
              <p className="article-description">{article.description}</p>
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="article-link"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Articles;
