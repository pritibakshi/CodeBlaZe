// Importing necessary modules and components for the application
import React, { useState } from 'react'; 
import Select from 'react-select'; 
import './Navbar.css'; 
import { SiCompilerexplorer } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { TbBrandCoinbase } from "react-icons/tb";


// Navbar component for selecting language, theme, and font size.
// Receives props to manage user preferences and icon styling.
const Navbar = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize, iconClassName, setIconClassName }) => {
  const [selectedIcon, setSelectedIcon] = useState(userLang);
    const languages = [
        { value: "c", icon: <TbBrandCoinbase />, label: "C" },
        { value: "cpp", icon: <TbBrandCpp />, label: "C++" },
        { value: "python", icon: <FaPython />, label: "Python" },
        { value: "java", icon: <FaJava />, label: "Java" },
    ];

    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    const handleLangChange = (lang) => {
      setUserLang(lang.value);
      setSelectedIcon(lang.value);
      console.log("Updated userLang in Navbar.js:", lang.value);
  };
  
    const handleThemeChange = (selectedTheme) => {
        setUserTheme(selectedTheme.value);
    };

    const handleFontSizeChange = (e) => {
        setFontSize(parseInt(e.target.value));
    };


  // JSX rendering
  return (
      <div className="navbar">
			  <div className='main2'>
			    <h1 className={`ic ${iconClassName}`}> CodeBlaZe </h1>
			    <h1 className={`icon1 ${iconClassName}`} onClick={() => setIconClassName(iconClassName === 'green' ? 'red' : 'green')}>
              <SiCompilerexplorer className='icon2' />
          </h1>
			  </div>
            
        <div className="icon-options">
          {languages.map(lang => (
            <div key={lang.value} className={`icon-option ${userLang === lang.value ? 'selected' : ''}`} onClick={() => handleLangChange(lang)}>
              {lang.icon}
            </div>
          ))}
        </div>

        <div className="options">
              <label className={`${iconClassName}`}>Theme:</label>
              <Select options={themes} value={userTheme} onChange={(e) => setUserTheme(e.value)} placeholder={userTheme} /> 
              <label className={`${iconClassName}`}>Font Size:</label>
              <input type="range" min="18" max="30" value={fontSize} step="2" onChange={handleFontSizeChange} />
        </div>
      </div>
  );
}

export default Navbar;